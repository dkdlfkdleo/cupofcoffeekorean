/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */

/**
 * This transform strips Flow types that are not supported past Babel 7.
 *
 * It is expected that all transforms create valid ESTree AST output. If
 * the transform requires outputting Babel specific AST nodes then it
 * should live in `ConvertESTreeToBabel.js`
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformProgram = transformProgram;

var _SimpleTransform = require("../transform/SimpleTransform");

var _createSyntaxError = require("../utils/createSyntaxError");

const nodeWith = _SimpleTransform.SimpleTransform.nodeWith; // Rely on the mapper to fix up parent relationships.

const EMPTY_PARENT = null;

function createSimpleGenericTypeAnnotation(name, nodeForLoc) {
  return {
    type: 'GenericTypeAnnotation',
    id: {
      type: 'Identifier',
      name,
      optional: false,
      typeAnnotation: null,
      loc: nodeForLoc.loc,
      range: nodeForLoc.range,
      parent: EMPTY_PARENT
    },
    typeParameters: null,
    loc: nodeForLoc.loc,
    range: nodeForLoc.range,
    parent: nodeForLoc.parent
  };
}

function createAnyTypeAnnotation(node) {
  return {
    type: 'AnyTypeAnnotation',
    loc: node.loc,
    range: node.range,
    parent: node.parent
  };
}
/**
 * Convert DeclareEnum nodes to DeclareVariable
 */


function mapDeclareEnum(node) {
  return {
    type: 'DeclareVariable',
    kind: 'const',
    id: nodeWith(node.id, {
      typeAnnotation: {
        type: 'TypeAnnotation',
        typeAnnotation: createAnyTypeAnnotation(node.body),
        loc: node.body.loc,
        range: node.body.range,
        parent: EMPTY_PARENT
      }
    }),
    loc: node.loc,
    range: node.range,
    parent: node.parent
  };
}
/**
 * Convert DeclareNamespace nodes to DeclareVariable
 */


function mapDeclareNamespace(node) {
  return {
    type: 'DeclareVariable',
    kind: 'const',
    id: nodeWith(node.id, {
      typeAnnotation: {
        type: 'TypeAnnotation',
        typeAnnotation: createAnyTypeAnnotation(node.body),
        loc: node.body.loc,
        range: node.body.range,
        parent: EMPTY_PARENT
      }
    }),
    loc: node.loc,
    range: node.range,
    parent: node.parent
  };
}
/**
 * Remove `this` param from functions.
 */


function mapFunction(node) {
  // Remove the first parameter if it is a this-type annotation,
  // which is not recognized by Babel.
  if (node.params.length !== 0 && node.params[0].name === 'this') {
    return nodeWith(node, {
      params: node.params.slice(1)
    });
  }

  return node;
}
/**
 * Convert to QualifiedTypeIdentifier
 */


function mapQualifiedTypeofIdentifier(node) {
  return {
    type: 'QualifiedTypeIdentifier',
    qualification: node.qualification.type === 'QualifiedTypeofIdentifier' ? mapQualifiedTypeofIdentifier(node.qualification) : node.qualification,
    id: node.id,
    loc: node.loc,
    range: node.range,
    parent: node.parent
  };
}

function transformProgram(program, _options) {
  return _SimpleTransform.SimpleTransform.transformProgram(program, {
    transform(node) {
      switch (node.type) {
        case 'SymbolTypeAnnotation':
          {
            // Convert to simple generic type annotation
            return createSimpleGenericTypeAnnotation('symbol', node);
          }

        case 'BigIntTypeAnnotation':
          {
            // Convert to simple generic type annotation
            return createSimpleGenericTypeAnnotation('bigint', node);
          }

        case 'ObjectTypeAnnotation':
          {
            const shouldStrip = node.properties.some(prop => prop.type === 'ObjectTypeMappedTypeProperty');

            if (shouldStrip) {
              return createAnyTypeAnnotation(node);
            }

            return node;
          }

        case 'ObjectTypeMappedTypeProperty':
          {
            throw (0, _createSyntaxError.createSyntaxError)(node, `Invalid AST structure, ObjectTypeMappedTypeProperty found outside of an ObjectTypeAnnotation`);
          }

        case 'IndexedAccessType':
        case 'OptionalIndexedAccessType':
        case 'KeyofTypeAnnotation':
        case 'ConditionalTypeAnnotation':
        case 'InferTypeAnnotation':
        case 'TupleTypeLabeledElement':
        case 'TupleTypeSpreadElement':
        case 'ComponentTypeAnnotation':
        case 'HookTypeAnnotation':
        case 'TypeOperator':
        case 'TypePredicate':
          {
            // Babel does not support these generic types, so convert to any
            return createAnyTypeAnnotation(node);
          }

        case 'QualifiedTypeofIdentifier':
          {
            return mapQualifiedTypeofIdentifier(node);
          }

        case 'DeclareEnum':
          {
            return mapDeclareEnum(node);
          }

        case 'DeclareNamespace':
          {
            return mapDeclareNamespace(node);
          }

        case 'FunctionDeclaration':
        case 'FunctionExpression':
          {
            return mapFunction(node);
          }

        default:
          {
            return node;
          }
      }
    }

  });
}