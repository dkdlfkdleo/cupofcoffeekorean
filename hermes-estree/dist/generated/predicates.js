/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @generated
 */

/*
 * !!! GENERATED FILE !!!
 *
 * Any manual changes to this file will be overwritten. To regenerate run `yarn build`.
 */
// lint directives to let us do some basic validation of generated files

/* eslint no-undef: 'error', no-unused-vars: ['error', {vars: "local"}], no-redeclare: 'error' */

/* global $NonMaybeType, Partial, $ReadOnly, $ReadOnlyArray */
'use strict';
/*::
import type {
  ESNode,
  Token,
  Identifier,
  JSXIdentifier,
  JSXText,
  AnyTypeAnnotation,
  ArrayExpression,
  ArrayPattern,
  ArrayTypeAnnotation,
  ArrowFunctionExpression,
  AsExpression,
  AssignmentExpression,
  AssignmentPattern,
  AwaitExpression,
  BigIntLiteralTypeAnnotation,
  BigIntTypeAnnotation,
  BinaryExpression,
  BlockStatement,
  BooleanLiteralTypeAnnotation,
  BooleanTypeAnnotation,
  BreakStatement,
  CallExpression,
  CatchClause,
  ChainExpression,
  ClassBody,
  ClassDeclaration,
  ClassExpression,
  ClassImplements,
  ComponentDeclaration,
  ComponentParameter,
  ComponentTypeAnnotation,
  ComponentTypeParameter,
  ConditionalExpression,
  ConditionalTypeAnnotation,
  ContinueStatement,
  DebuggerStatement,
  DeclareClass,
  DeclareComponent,
  DeclaredPredicate,
  DeclareEnum,
  DeclareExportAllDeclaration,
  DeclareExportDeclaration,
  DeclareFunction,
  DeclareHook,
  DeclareInterface,
  DeclareModule,
  DeclareModuleExports,
  DeclareNamespace,
  DeclareOpaqueType,
  DeclareTypeAlias,
  DeclareVariable,
  DoWhileStatement,
  EmptyStatement,
  EmptyTypeAnnotation,
  EnumBooleanBody,
  EnumBooleanMember,
  EnumDeclaration,
  EnumDefaultedMember,
  EnumNumberBody,
  EnumNumberMember,
  EnumStringBody,
  EnumStringMember,
  EnumSymbolBody,
  ExistsTypeAnnotation,
  ExportAllDeclaration,
  ExportDefaultDeclaration,
  ExportNamedDeclaration,
  ExportSpecifier,
  ExpressionStatement,
  ForInStatement,
  ForOfStatement,
  ForStatement,
  FunctionDeclaration,
  FunctionExpression,
  FunctionTypeAnnotation,
  FunctionTypeParam,
  GenericTypeAnnotation,
  HookDeclaration,
  HookTypeAnnotation,
  IfStatement,
  ImportAttribute,
  ImportDeclaration,
  ImportDefaultSpecifier,
  ImportExpression,
  ImportNamespaceSpecifier,
  ImportSpecifier,
  IndexedAccessType,
  InferredPredicate,
  InferTypeAnnotation,
  InterfaceDeclaration,
  InterfaceExtends,
  InterfaceTypeAnnotation,
  IntersectionTypeAnnotation,
  JSXAttribute,
  JSXClosingElement,
  JSXClosingFragment,
  JSXElement,
  JSXEmptyExpression,
  JSXExpressionContainer,
  JSXFragment,
  JSXMemberExpression,
  JSXNamespacedName,
  JSXOpeningElement,
  JSXOpeningFragment,
  JSXSpreadAttribute,
  JSXSpreadChild,
  KeyofTypeAnnotation,
  LabeledStatement,
  LogicalExpression,
  MemberExpression,
  MetaProperty,
  MethodDefinition,
  MixedTypeAnnotation,
  NewExpression,
  NullableTypeAnnotation,
  NullLiteralTypeAnnotation,
  NumberLiteralTypeAnnotation,
  NumberTypeAnnotation,
  ObjectExpression,
  ObjectPattern,
  ObjectTypeAnnotation,
  ObjectTypeCallProperty,
  ObjectTypeIndexer,
  ObjectTypeInternalSlot,
  ObjectTypeMappedTypeProperty,
  ObjectTypeProperty,
  ObjectTypeSpreadProperty,
  OpaqueType,
  OptionalIndexedAccessType,
  PrivateIdentifier,
  Property,
  PropertyDefinition,
  QualifiedTypeIdentifier,
  QualifiedTypeofIdentifier,
  RestElement,
  ReturnStatement,
  SequenceExpression,
  SpreadElement,
  StringLiteralTypeAnnotation,
  StringTypeAnnotation,
  Super,
  SwitchCase,
  SwitchStatement,
  SymbolTypeAnnotation,
  TaggedTemplateExpression,
  TemplateElement,
  TemplateLiteral,
  ThisExpression,
  ThisTypeAnnotation,
  ThrowStatement,
  TryStatement,
  TupleTypeAnnotation,
  TupleTypeLabeledElement,
  TupleTypeSpreadElement,
  TypeAlias,
  TypeAnnotation,
  TypeCastExpression,
  TypeofTypeAnnotation,
  TypeOperator,
  TypeParameter,
  TypeParameterDeclaration,
  TypeParameterInstantiation,
  TypePredicate,
  UnaryExpression,
  UnionTypeAnnotation,
  UpdateExpression,
  VariableDeclaration,
  VariableDeclarator,
  Variance,
  VoidTypeAnnotation,
  WhileStatement,
  WithStatement,
  YieldExpression,
  Literal,
  LineComment,
  BlockComment,
  MostTokens,
} from 'hermes-estree';
*/

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAnyTypeAnnotation = isAnyTypeAnnotation;
exports.isArrayExpression = isArrayExpression;
exports.isArrayPattern = isArrayPattern;
exports.isArrayTypeAnnotation = isArrayTypeAnnotation;
exports.isArrowFunctionExpression = isArrowFunctionExpression;
exports.isAsExpression = isAsExpression;
exports.isAsKeyword = isAsKeyword;
exports.isAssignmentExpression = isAssignmentExpression;
exports.isAssignmentPattern = isAssignmentPattern;
exports.isAsterixToken = isAsterixToken;
exports.isAsyncKeyword = isAsyncKeyword;
exports.isAwaitExpression = isAwaitExpression;
exports.isAwaitKeyword = isAwaitKeyword;
exports.isBigIntLiteralTypeAnnotation = isBigIntLiteralTypeAnnotation;
exports.isBigIntTypeAnnotation = isBigIntTypeAnnotation;
exports.isBinaryExpression = isBinaryExpression;
exports.isBitwiseANDEqualToken = isBitwiseANDEqualToken;
exports.isBitwiseANDToken = isBitwiseANDToken;
exports.isBitwiseLeftShiftEqualToken = isBitwiseLeftShiftEqualToken;
exports.isBitwiseLeftShiftToken = isBitwiseLeftShiftToken;
exports.isBitwiseOREqualToken = isBitwiseOREqualToken;
exports.isBitwiseORToken = isBitwiseORToken;
exports.isBitwiseRightShiftEqualToken = isBitwiseRightShiftEqualToken;
exports.isBitwiseRightShiftToken = isBitwiseRightShiftToken;
exports.isBitwiseUnsignedRightShiftEqualToken = isBitwiseUnsignedRightShiftEqualToken;
exports.isBitwiseUnsignedRightShiftToken = isBitwiseUnsignedRightShiftToken;
exports.isBitwiseXOREqualToken = isBitwiseXOREqualToken;
exports.isBitwiseXORToken = isBitwiseXORToken;
exports.isBlockComment = isBlockComment;
exports.isBlockStatement = isBlockStatement;
exports.isBooleanLiteralTypeAnnotation = isBooleanLiteralTypeAnnotation;
exports.isBooleanTypeAnnotation = isBooleanTypeAnnotation;
exports.isBreakStatement = isBreakStatement;
exports.isBreakToken = isBreakToken;
exports.isCallExpression = isCallExpression;
exports.isCaseToken = isCaseToken;
exports.isCatchClause = isCatchClause;
exports.isCatchToken = isCatchToken;
exports.isChainExpression = isChainExpression;
exports.isClassBody = isClassBody;
exports.isClassDeclaration = isClassDeclaration;
exports.isClassExpression = isClassExpression;
exports.isClassImplements = isClassImplements;
exports.isClassToken = isClassToken;
exports.isClosingAngleBracketToken = isClosingAngleBracketToken;
exports.isClosingCurlyBracketToken = isClosingCurlyBracketToken;
exports.isClosingParenthesisToken = isClosingParenthesisToken;
exports.isColonToken = isColonToken;
exports.isCommaToken = isCommaToken;
exports.isComponentDeclaration = isComponentDeclaration;
exports.isComponentParameter = isComponentParameter;
exports.isComponentTypeAnnotation = isComponentTypeAnnotation;
exports.isComponentTypeParameter = isComponentTypeParameter;
exports.isConditionalExpression = isConditionalExpression;
exports.isConditionalTypeAnnotation = isConditionalTypeAnnotation;
exports.isConstToken = isConstToken;
exports.isContinueStatement = isContinueStatement;
exports.isContinueToken = isContinueToken;
exports.isDebuggerStatement = isDebuggerStatement;
exports.isDebuggerToken = isDebuggerToken;
exports.isDeclareClass = isDeclareClass;
exports.isDeclareComponent = isDeclareComponent;
exports.isDeclareEnum = isDeclareEnum;
exports.isDeclareExportAllDeclaration = isDeclareExportAllDeclaration;
exports.isDeclareExportDeclaration = isDeclareExportDeclaration;
exports.isDeclareFunction = isDeclareFunction;
exports.isDeclareHook = isDeclareHook;
exports.isDeclareInterface = isDeclareInterface;
exports.isDeclareKeyword = isDeclareKeyword;
exports.isDeclareModule = isDeclareModule;
exports.isDeclareModuleExports = isDeclareModuleExports;
exports.isDeclareNamespace = isDeclareNamespace;
exports.isDeclareOpaqueType = isDeclareOpaqueType;
exports.isDeclareTypeAlias = isDeclareTypeAlias;
exports.isDeclareVariable = isDeclareVariable;
exports.isDeclaredPredicate = isDeclaredPredicate;
exports.isDecrementToken = isDecrementToken;
exports.isDefaultToken = isDefaultToken;
exports.isDeleteToken = isDeleteToken;
exports.isDivideEqualToken = isDivideEqualToken;
exports.isDoToken = isDoToken;
exports.isDoWhileStatement = isDoWhileStatement;
exports.isDotDotDotToken = isDotDotDotToken;
exports.isDotToken = isDotToken;
exports.isElseToken = isElseToken;
exports.isEmptyStatement = isEmptyStatement;
exports.isEmptyTypeAnnotation = isEmptyTypeAnnotation;
exports.isEnumBooleanBody = isEnumBooleanBody;
exports.isEnumBooleanMember = isEnumBooleanMember;
exports.isEnumDeclaration = isEnumDeclaration;
exports.isEnumDefaultedMember = isEnumDefaultedMember;
exports.isEnumNumberBody = isEnumNumberBody;
exports.isEnumNumberMember = isEnumNumberMember;
exports.isEnumStringBody = isEnumStringBody;
exports.isEnumStringMember = isEnumStringMember;
exports.isEnumSymbolBody = isEnumSymbolBody;
exports.isEnumToken = isEnumToken;
exports.isEqualToken = isEqualToken;
exports.isExistsTypeAnnotation = isExistsTypeAnnotation;
exports.isExponentateEqualToken = isExponentateEqualToken;
exports.isExponentiationToken = isExponentiationToken;
exports.isExportAllDeclaration = isExportAllDeclaration;
exports.isExportDefaultDeclaration = isExportDefaultDeclaration;
exports.isExportNamedDeclaration = isExportNamedDeclaration;
exports.isExportSpecifier = isExportSpecifier;
exports.isExportToken = isExportToken;
exports.isExpressionStatement = isExpressionStatement;
exports.isExtendsToken = isExtendsToken;
exports.isFinallyToken = isFinallyToken;
exports.isForInStatement = isForInStatement;
exports.isForOfStatement = isForOfStatement;
exports.isForStatement = isForStatement;
exports.isForToken = isForToken;
exports.isForwardSlashToken = isForwardSlashToken;
exports.isFromKeyword = isFromKeyword;
exports.isFunctionDeclaration = isFunctionDeclaration;
exports.isFunctionExpression = isFunctionExpression;
exports.isFunctionToken = isFunctionToken;
exports.isFunctionTypeAnnotation = isFunctionTypeAnnotation;
exports.isFunctionTypeParam = isFunctionTypeParam;
exports.isGenericTypeAnnotation = isGenericTypeAnnotation;
exports.isGetKeyword = isGetKeyword;
exports.isGreaterThanOrEqualToToken = isGreaterThanOrEqualToToken;
exports.isGreaterThanToken = isGreaterThanToken;
exports.isHookDeclaration = isHookDeclaration;
exports.isHookTypeAnnotation = isHookTypeAnnotation;
exports.isIdentifier = isIdentifier;
exports.isIfStatement = isIfStatement;
exports.isIfToken = isIfToken;
exports.isImplementsToken = isImplementsToken;
exports.isImportAttribute = isImportAttribute;
exports.isImportDeclaration = isImportDeclaration;
exports.isImportDefaultSpecifier = isImportDefaultSpecifier;
exports.isImportExpression = isImportExpression;
exports.isImportNamespaceSpecifier = isImportNamespaceSpecifier;
exports.isImportSpecifier = isImportSpecifier;
exports.isImportToken = isImportToken;
exports.isInToken = isInToken;
exports.isIncrementToken = isIncrementToken;
exports.isIndexedAccessType = isIndexedAccessType;
exports.isInferTypeAnnotation = isInferTypeAnnotation;
exports.isInferredPredicate = isInferredPredicate;
exports.isInstanceOfToken = isInstanceOfToken;
exports.isInterfaceDeclaration = isInterfaceDeclaration;
exports.isInterfaceExtends = isInterfaceExtends;
exports.isInterfaceToken = isInterfaceToken;
exports.isInterfaceTypeAnnotation = isInterfaceTypeAnnotation;
exports.isIntersectionTypeAnnotation = isIntersectionTypeAnnotation;
exports.isIntersectionTypeToken = isIntersectionTypeToken;
exports.isJSXAttribute = isJSXAttribute;
exports.isJSXClosingElement = isJSXClosingElement;
exports.isJSXClosingFragment = isJSXClosingFragment;
exports.isJSXElement = isJSXElement;
exports.isJSXEmptyExpression = isJSXEmptyExpression;
exports.isJSXExpressionContainer = isJSXExpressionContainer;
exports.isJSXFragment = isJSXFragment;
exports.isJSXIdentifier = isJSXIdentifier;
exports.isJSXMemberExpression = isJSXMemberExpression;
exports.isJSXNamespacedName = isJSXNamespacedName;
exports.isJSXOpeningElement = isJSXOpeningElement;
exports.isJSXOpeningFragment = isJSXOpeningFragment;
exports.isJSXSpreadAttribute = isJSXSpreadAttribute;
exports.isJSXSpreadChild = isJSXSpreadChild;
exports.isJSXText = isJSXText;
exports.isKeyofTypeAnnotation = isKeyofTypeAnnotation;
exports.isLabeledStatement = isLabeledStatement;
exports.isLessThanOrEqualToToken = isLessThanOrEqualToToken;
exports.isLessThanToken = isLessThanToken;
exports.isLetKeyword = isLetKeyword;
exports.isLineComment = isLineComment;
exports.isLiteral = isLiteral;
exports.isLogicalANDEqualToken = isLogicalANDEqualToken;
exports.isLogicalANDToken = isLogicalANDToken;
exports.isLogicalExpression = isLogicalExpression;
exports.isLogicalNotToken = isLogicalNotToken;
exports.isLogicalOREqualToken = isLogicalOREqualToken;
exports.isLogicalORToken = isLogicalORToken;
exports.isLooseEqualToken = isLooseEqualToken;
exports.isLooseNotEqualToken = isLooseNotEqualToken;
exports.isMemberExpression = isMemberExpression;
exports.isMetaProperty = isMetaProperty;
exports.isMethodDefinition = isMethodDefinition;
exports.isMinusEqualToken = isMinusEqualToken;
exports.isMinusToken = isMinusToken;
exports.isMixedTypeAnnotation = isMixedTypeAnnotation;
exports.isModuleKeyword = isModuleKeyword;
exports.isMultiplyEqualToken = isMultiplyEqualToken;
exports.isNewExpression = isNewExpression;
exports.isNewToken = isNewToken;
exports.isNullLiteralTypeAnnotation = isNullLiteralTypeAnnotation;
exports.isNullableTypeAnnotation = isNullableTypeAnnotation;
exports.isNullishCoalesceEqualToken = isNullishCoalesceEqualToken;
exports.isNullishCoalesceToken = isNullishCoalesceToken;
exports.isNumberLiteralTypeAnnotation = isNumberLiteralTypeAnnotation;
exports.isNumberTypeAnnotation = isNumberTypeAnnotation;
exports.isObjectExpression = isObjectExpression;
exports.isObjectPattern = isObjectPattern;
exports.isObjectTypeAnnotation = isObjectTypeAnnotation;
exports.isObjectTypeCallProperty = isObjectTypeCallProperty;
exports.isObjectTypeIndexer = isObjectTypeIndexer;
exports.isObjectTypeInternalSlot = isObjectTypeInternalSlot;
exports.isObjectTypeMappedTypeProperty = isObjectTypeMappedTypeProperty;
exports.isObjectTypeProperty = isObjectTypeProperty;
exports.isObjectTypeSpreadProperty = isObjectTypeSpreadProperty;
exports.isOfKeyword = isOfKeyword;
exports.isOpaqueType = isOpaqueType;
exports.isOpeningAngleBracketToken = isOpeningAngleBracketToken;
exports.isOpeningCurlyBracketToken = isOpeningCurlyBracketToken;
exports.isOpeningParenthesisToken = isOpeningParenthesisToken;
exports.isOptionalChainToken = isOptionalChainToken;
exports.isOptionalIndexedAccessType = isOptionalIndexedAccessType;
exports.isPercentToken = isPercentToken;
exports.isPlusEqualToken = isPlusEqualToken;
exports.isPlusToken = isPlusToken;
exports.isPrivateIdentifier = isPrivateIdentifier;
exports.isProperty = isProperty;
exports.isPropertyDefinition = isPropertyDefinition;
exports.isQualifiedTypeIdentifier = isQualifiedTypeIdentifier;
exports.isQualifiedTypeofIdentifier = isQualifiedTypeofIdentifier;
exports.isQuestionMarkToken = isQuestionMarkToken;
exports.isRemainderEqualToken = isRemainderEqualToken;
exports.isRestElement = isRestElement;
exports.isReturnStatement = isReturnStatement;
exports.isReturnToken = isReturnToken;
exports.isSemicolonToken = isSemicolonToken;
exports.isSequenceExpression = isSequenceExpression;
exports.isSetKeyword = isSetKeyword;
exports.isSpreadElement = isSpreadElement;
exports.isStaticToken = isStaticToken;
exports.isStrictEqualToken = isStrictEqualToken;
exports.isStrictNotEqualToken = isStrictNotEqualToken;
exports.isStringLiteralTypeAnnotation = isStringLiteralTypeAnnotation;
exports.isStringTypeAnnotation = isStringTypeAnnotation;
exports.isSuper = isSuper;
exports.isSuperToken = isSuperToken;
exports.isSwitchCase = isSwitchCase;
exports.isSwitchStatement = isSwitchStatement;
exports.isSwitchToken = isSwitchToken;
exports.isSymbolTypeAnnotation = isSymbolTypeAnnotation;
exports.isTaggedTemplateExpression = isTaggedTemplateExpression;
exports.isTemplateElement = isTemplateElement;
exports.isTemplateLiteral = isTemplateLiteral;
exports.isThisExpression = isThisExpression;
exports.isThisToken = isThisToken;
exports.isThisTypeAnnotation = isThisTypeAnnotation;
exports.isThrowStatement = isThrowStatement;
exports.isThrowToken = isThrowToken;
exports.isTryStatement = isTryStatement;
exports.isTryToken = isTryToken;
exports.isTupleTypeAnnotation = isTupleTypeAnnotation;
exports.isTupleTypeLabeledElement = isTupleTypeLabeledElement;
exports.isTupleTypeSpreadElement = isTupleTypeSpreadElement;
exports.isTypeAlias = isTypeAlias;
exports.isTypeAnnotation = isTypeAnnotation;
exports.isTypeCastExpression = isTypeCastExpression;
exports.isTypeKeyword = isTypeKeyword;
exports.isTypeOfToken = isTypeOfToken;
exports.isTypeOperator = isTypeOperator;
exports.isTypeParameter = isTypeParameter;
exports.isTypeParameterDeclaration = isTypeParameterDeclaration;
exports.isTypeParameterInstantiation = isTypeParameterInstantiation;
exports.isTypePredicate = isTypePredicate;
exports.isTypeofTypeAnnotation = isTypeofTypeAnnotation;
exports.isUnaryExpression = isUnaryExpression;
exports.isUnaryNegationToken = isUnaryNegationToken;
exports.isUnionTypeAnnotation = isUnionTypeAnnotation;
exports.isUnionTypeToken = isUnionTypeToken;
exports.isUpdateExpression = isUpdateExpression;
exports.isVarToken = isVarToken;
exports.isVariableDeclaration = isVariableDeclaration;
exports.isVariableDeclarator = isVariableDeclarator;
exports.isVariance = isVariance;
exports.isVoidToken = isVoidToken;
exports.isVoidTypeAnnotation = isVoidTypeAnnotation;
exports.isWhileStatement = isWhileStatement;
exports.isWhileToken = isWhileToken;
exports.isWithStatement = isWithStatement;
exports.isWithToken = isWithToken;
exports.isYieldExpression = isYieldExpression;
exports.isYieldToken = isYieldToken;

function isIdentifier(node
/*: ESNode | Token */
)
/*: node is (Identifier | MostTokens) */
{
  return node.type === 'Identifier';
}

function isJSXIdentifier(node
/*: ESNode | Token */
)
/*: node is (JSXIdentifier | MostTokens) */
{
  return node.type === 'JSXIdentifier';
}

function isJSXText(node
/*: ESNode | Token */
)
/*: node is (JSXText | MostTokens) */
{
  return node.type === 'JSXText';
}

function isAnyTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is AnyTypeAnnotation */
{
  return node.type === 'AnyTypeAnnotation';
}

function isArrayExpression(node
/*: ESNode | Token */
)
/*: node is ArrayExpression */
{
  return node.type === 'ArrayExpression';
}

function isArrayPattern(node
/*: ESNode | Token */
)
/*: node is ArrayPattern */
{
  return node.type === 'ArrayPattern';
}

function isArrayTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is ArrayTypeAnnotation */
{
  return node.type === 'ArrayTypeAnnotation';
}

function isArrowFunctionExpression(node
/*: ESNode | Token */
)
/*: node is ArrowFunctionExpression */
{
  return node.type === 'ArrowFunctionExpression';
}

function isAsExpression(node
/*: ESNode | Token */
)
/*: node is AsExpression */
{
  return node.type === 'AsExpression';
}

function isAssignmentExpression(node
/*: ESNode | Token */
)
/*: node is AssignmentExpression */
{
  return node.type === 'AssignmentExpression';
}

function isAssignmentPattern(node
/*: ESNode | Token */
)
/*: node is AssignmentPattern */
{
  return node.type === 'AssignmentPattern';
}

function isAwaitExpression(node
/*: ESNode | Token */
)
/*: node is AwaitExpression */
{
  return node.type === 'AwaitExpression';
}

function isBigIntLiteralTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is BigIntLiteralTypeAnnotation */
{
  return node.type === 'BigIntLiteralTypeAnnotation';
}

function isBigIntTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is BigIntTypeAnnotation */
{
  return node.type === 'BigIntTypeAnnotation';
}

function isBinaryExpression(node
/*: ESNode | Token */
)
/*: node is BinaryExpression */
{
  return node.type === 'BinaryExpression';
}

function isBlockStatement(node
/*: ESNode | Token */
)
/*: node is BlockStatement */
{
  return node.type === 'BlockStatement';
}

function isBooleanLiteralTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is BooleanLiteralTypeAnnotation */
{
  return node.type === 'BooleanLiteralTypeAnnotation';
}

function isBooleanTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is BooleanTypeAnnotation */
{
  return node.type === 'BooleanTypeAnnotation';
}

function isBreakStatement(node
/*: ESNode | Token */
)
/*: node is BreakStatement */
{
  return node.type === 'BreakStatement';
}

function isCallExpression(node
/*: ESNode | Token */
)
/*: node is CallExpression */
{
  return node.type === 'CallExpression';
}

function isCatchClause(node
/*: ESNode | Token */
)
/*: node is CatchClause */
{
  return node.type === 'CatchClause';
}

function isChainExpression(node
/*: ESNode | Token */
)
/*: node is ChainExpression */
{
  return node.type === 'ChainExpression';
}

function isClassBody(node
/*: ESNode | Token */
)
/*: node is ClassBody */
{
  return node.type === 'ClassBody';
}

function isClassDeclaration(node
/*: ESNode | Token */
)
/*: node is ClassDeclaration */
{
  return node.type === 'ClassDeclaration';
}

function isClassExpression(node
/*: ESNode | Token */
)
/*: node is ClassExpression */
{
  return node.type === 'ClassExpression';
}

function isClassImplements(node
/*: ESNode | Token */
)
/*: node is ClassImplements */
{
  return node.type === 'ClassImplements';
}

function isComponentDeclaration(node
/*: ESNode | Token */
)
/*: node is ComponentDeclaration */
{
  return node.type === 'ComponentDeclaration';
}

function isComponentParameter(node
/*: ESNode | Token */
)
/*: node is ComponentParameter */
{
  return node.type === 'ComponentParameter';
}

function isComponentTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is ComponentTypeAnnotation */
{
  return node.type === 'ComponentTypeAnnotation';
}

function isComponentTypeParameter(node
/*: ESNode | Token */
)
/*: node is ComponentTypeParameter */
{
  return node.type === 'ComponentTypeParameter';
}

function isConditionalExpression(node
/*: ESNode | Token */
)
/*: node is ConditionalExpression */
{
  return node.type === 'ConditionalExpression';
}

function isConditionalTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is ConditionalTypeAnnotation */
{
  return node.type === 'ConditionalTypeAnnotation';
}

function isContinueStatement(node
/*: ESNode | Token */
)
/*: node is ContinueStatement */
{
  return node.type === 'ContinueStatement';
}

function isDebuggerStatement(node
/*: ESNode | Token */
)
/*: node is DebuggerStatement */
{
  return node.type === 'DebuggerStatement';
}

function isDeclareClass(node
/*: ESNode | Token */
)
/*: node is DeclareClass */
{
  return node.type === 'DeclareClass';
}

function isDeclareComponent(node
/*: ESNode | Token */
)
/*: node is DeclareComponent */
{
  return node.type === 'DeclareComponent';
}

function isDeclaredPredicate(node
/*: ESNode | Token */
)
/*: node is DeclaredPredicate */
{
  return node.type === 'DeclaredPredicate';
}

function isDeclareEnum(node
/*: ESNode | Token */
)
/*: node is DeclareEnum */
{
  return node.type === 'DeclareEnum';
}

function isDeclareExportAllDeclaration(node
/*: ESNode | Token */
)
/*: node is DeclareExportAllDeclaration */
{
  return node.type === 'DeclareExportAllDeclaration';
}

function isDeclareExportDeclaration(node
/*: ESNode | Token */
)
/*: node is DeclareExportDeclaration */
{
  return node.type === 'DeclareExportDeclaration';
}

function isDeclareFunction(node
/*: ESNode | Token */
)
/*: node is DeclareFunction */
{
  return node.type === 'DeclareFunction';
}

function isDeclareHook(node
/*: ESNode | Token */
)
/*: node is DeclareHook */
{
  return node.type === 'DeclareHook';
}

function isDeclareInterface(node
/*: ESNode | Token */
)
/*: node is DeclareInterface */
{
  return node.type === 'DeclareInterface';
}

function isDeclareModule(node
/*: ESNode | Token */
)
/*: node is DeclareModule */
{
  return node.type === 'DeclareModule';
}

function isDeclareModuleExports(node
/*: ESNode | Token */
)
/*: node is DeclareModuleExports */
{
  return node.type === 'DeclareModuleExports';
}

function isDeclareNamespace(node
/*: ESNode | Token */
)
/*: node is DeclareNamespace */
{
  return node.type === 'DeclareNamespace';
}

function isDeclareOpaqueType(node
/*: ESNode | Token */
)
/*: node is DeclareOpaqueType */
{
  return node.type === 'DeclareOpaqueType';
}

function isDeclareTypeAlias(node
/*: ESNode | Token */
)
/*: node is DeclareTypeAlias */
{
  return node.type === 'DeclareTypeAlias';
}

function isDeclareVariable(node
/*: ESNode | Token */
)
/*: node is DeclareVariable */
{
  return node.type === 'DeclareVariable';
}

function isDoWhileStatement(node
/*: ESNode | Token */
)
/*: node is DoWhileStatement */
{
  return node.type === 'DoWhileStatement';
}

function isEmptyStatement(node
/*: ESNode | Token */
)
/*: node is EmptyStatement */
{
  return node.type === 'EmptyStatement';
}

function isEmptyTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is EmptyTypeAnnotation */
{
  return node.type === 'EmptyTypeAnnotation';
}

function isEnumBooleanBody(node
/*: ESNode | Token */
)
/*: node is EnumBooleanBody */
{
  return node.type === 'EnumBooleanBody';
}

function isEnumBooleanMember(node
/*: ESNode | Token */
)
/*: node is EnumBooleanMember */
{
  return node.type === 'EnumBooleanMember';
}

function isEnumDeclaration(node
/*: ESNode | Token */
)
/*: node is EnumDeclaration */
{
  return node.type === 'EnumDeclaration';
}

function isEnumDefaultedMember(node
/*: ESNode | Token */
)
/*: node is EnumDefaultedMember */
{
  return node.type === 'EnumDefaultedMember';
}

function isEnumNumberBody(node
/*: ESNode | Token */
)
/*: node is EnumNumberBody */
{
  return node.type === 'EnumNumberBody';
}

function isEnumNumberMember(node
/*: ESNode | Token */
)
/*: node is EnumNumberMember */
{
  return node.type === 'EnumNumberMember';
}

function isEnumStringBody(node
/*: ESNode | Token */
)
/*: node is EnumStringBody */
{
  return node.type === 'EnumStringBody';
}

function isEnumStringMember(node
/*: ESNode | Token */
)
/*: node is EnumStringMember */
{
  return node.type === 'EnumStringMember';
}

function isEnumSymbolBody(node
/*: ESNode | Token */
)
/*: node is EnumSymbolBody */
{
  return node.type === 'EnumSymbolBody';
}

function isExistsTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is ExistsTypeAnnotation */
{
  return node.type === 'ExistsTypeAnnotation';
}

function isExportAllDeclaration(node
/*: ESNode | Token */
)
/*: node is ExportAllDeclaration */
{
  return node.type === 'ExportAllDeclaration';
}

function isExportDefaultDeclaration(node
/*: ESNode | Token */
)
/*: node is ExportDefaultDeclaration */
{
  return node.type === 'ExportDefaultDeclaration';
}

function isExportNamedDeclaration(node
/*: ESNode | Token */
)
/*: node is ExportNamedDeclaration */
{
  return node.type === 'ExportNamedDeclaration';
}

function isExportSpecifier(node
/*: ESNode | Token */
)
/*: node is ExportSpecifier */
{
  return node.type === 'ExportSpecifier';
}

function isExpressionStatement(node
/*: ESNode | Token */
)
/*: node is ExpressionStatement */
{
  return node.type === 'ExpressionStatement';
}

function isForInStatement(node
/*: ESNode | Token */
)
/*: node is ForInStatement */
{
  return node.type === 'ForInStatement';
}

function isForOfStatement(node
/*: ESNode | Token */
)
/*: node is ForOfStatement */
{
  return node.type === 'ForOfStatement';
}

function isForStatement(node
/*: ESNode | Token */
)
/*: node is ForStatement */
{
  return node.type === 'ForStatement';
}

function isFunctionDeclaration(node
/*: ESNode | Token */
)
/*: node is FunctionDeclaration */
{
  return node.type === 'FunctionDeclaration';
}

function isFunctionExpression(node
/*: ESNode | Token */
)
/*: node is FunctionExpression */
{
  return node.type === 'FunctionExpression';
}

function isFunctionTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is FunctionTypeAnnotation */
{
  return node.type === 'FunctionTypeAnnotation';
}

function isFunctionTypeParam(node
/*: ESNode | Token */
)
/*: node is FunctionTypeParam */
{
  return node.type === 'FunctionTypeParam';
}

function isGenericTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is GenericTypeAnnotation */
{
  return node.type === 'GenericTypeAnnotation';
}

function isHookDeclaration(node
/*: ESNode | Token */
)
/*: node is HookDeclaration */
{
  return node.type === 'HookDeclaration';
}

function isHookTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is HookTypeAnnotation */
{
  return node.type === 'HookTypeAnnotation';
}

function isIfStatement(node
/*: ESNode | Token */
)
/*: node is IfStatement */
{
  return node.type === 'IfStatement';
}

function isImportAttribute(node
/*: ESNode | Token */
)
/*: node is ImportAttribute */
{
  return node.type === 'ImportAttribute';
}

function isImportDeclaration(node
/*: ESNode | Token */
)
/*: node is ImportDeclaration */
{
  return node.type === 'ImportDeclaration';
}

function isImportDefaultSpecifier(node
/*: ESNode | Token */
)
/*: node is ImportDefaultSpecifier */
{
  return node.type === 'ImportDefaultSpecifier';
}

function isImportExpression(node
/*: ESNode | Token */
)
/*: node is ImportExpression */
{
  return node.type === 'ImportExpression';
}

function isImportNamespaceSpecifier(node
/*: ESNode | Token */
)
/*: node is ImportNamespaceSpecifier */
{
  return node.type === 'ImportNamespaceSpecifier';
}

function isImportSpecifier(node
/*: ESNode | Token */
)
/*: node is ImportSpecifier */
{
  return node.type === 'ImportSpecifier';
}

function isIndexedAccessType(node
/*: ESNode | Token */
)
/*: node is IndexedAccessType */
{
  return node.type === 'IndexedAccessType';
}

function isInferredPredicate(node
/*: ESNode | Token */
)
/*: node is InferredPredicate */
{
  return node.type === 'InferredPredicate';
}

function isInferTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is InferTypeAnnotation */
{
  return node.type === 'InferTypeAnnotation';
}

function isInterfaceDeclaration(node
/*: ESNode | Token */
)
/*: node is InterfaceDeclaration */
{
  return node.type === 'InterfaceDeclaration';
}

function isInterfaceExtends(node
/*: ESNode | Token */
)
/*: node is InterfaceExtends */
{
  return node.type === 'InterfaceExtends';
}

function isInterfaceTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is InterfaceTypeAnnotation */
{
  return node.type === 'InterfaceTypeAnnotation';
}

function isIntersectionTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is IntersectionTypeAnnotation */
{
  return node.type === 'IntersectionTypeAnnotation';
}

function isJSXAttribute(node
/*: ESNode | Token */
)
/*: node is JSXAttribute */
{
  return node.type === 'JSXAttribute';
}

function isJSXClosingElement(node
/*: ESNode | Token */
)
/*: node is JSXClosingElement */
{
  return node.type === 'JSXClosingElement';
}

function isJSXClosingFragment(node
/*: ESNode | Token */
)
/*: node is JSXClosingFragment */
{
  return node.type === 'JSXClosingFragment';
}

function isJSXElement(node
/*: ESNode | Token */
)
/*: node is JSXElement */
{
  return node.type === 'JSXElement';
}

function isJSXEmptyExpression(node
/*: ESNode | Token */
)
/*: node is JSXEmptyExpression */
{
  return node.type === 'JSXEmptyExpression';
}

function isJSXExpressionContainer(node
/*: ESNode | Token */
)
/*: node is JSXExpressionContainer */
{
  return node.type === 'JSXExpressionContainer';
}

function isJSXFragment(node
/*: ESNode | Token */
)
/*: node is JSXFragment */
{
  return node.type === 'JSXFragment';
}

function isJSXMemberExpression(node
/*: ESNode | Token */
)
/*: node is JSXMemberExpression */
{
  return node.type === 'JSXMemberExpression';
}

function isJSXNamespacedName(node
/*: ESNode | Token */
)
/*: node is JSXNamespacedName */
{
  return node.type === 'JSXNamespacedName';
}

function isJSXOpeningElement(node
/*: ESNode | Token */
)
/*: node is JSXOpeningElement */
{
  return node.type === 'JSXOpeningElement';
}

function isJSXOpeningFragment(node
/*: ESNode | Token */
)
/*: node is JSXOpeningFragment */
{
  return node.type === 'JSXOpeningFragment';
}

function isJSXSpreadAttribute(node
/*: ESNode | Token */
)
/*: node is JSXSpreadAttribute */
{
  return node.type === 'JSXSpreadAttribute';
}

function isJSXSpreadChild(node
/*: ESNode | Token */
)
/*: node is JSXSpreadChild */
{
  return node.type === 'JSXSpreadChild';
}

function isKeyofTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is KeyofTypeAnnotation */
{
  return node.type === 'KeyofTypeAnnotation';
}

function isLabeledStatement(node
/*: ESNode | Token */
)
/*: node is LabeledStatement */
{
  return node.type === 'LabeledStatement';
}

function isLogicalExpression(node
/*: ESNode | Token */
)
/*: node is LogicalExpression */
{
  return node.type === 'LogicalExpression';
}

function isMemberExpression(node
/*: ESNode | Token */
)
/*: node is MemberExpression */
{
  return node.type === 'MemberExpression';
}

function isMetaProperty(node
/*: ESNode | Token */
)
/*: node is MetaProperty */
{
  return node.type === 'MetaProperty';
}

function isMethodDefinition(node
/*: ESNode | Token */
)
/*: node is MethodDefinition */
{
  return node.type === 'MethodDefinition';
}

function isMixedTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is MixedTypeAnnotation */
{
  return node.type === 'MixedTypeAnnotation';
}

function isNewExpression(node
/*: ESNode | Token */
)
/*: node is NewExpression */
{
  return node.type === 'NewExpression';
}

function isNullableTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is NullableTypeAnnotation */
{
  return node.type === 'NullableTypeAnnotation';
}

function isNullLiteralTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is NullLiteralTypeAnnotation */
{
  return node.type === 'NullLiteralTypeAnnotation';
}

function isNumberLiteralTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is NumberLiteralTypeAnnotation */
{
  return node.type === 'NumberLiteralTypeAnnotation';
}

function isNumberTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is NumberTypeAnnotation */
{
  return node.type === 'NumberTypeAnnotation';
}

function isObjectExpression(node
/*: ESNode | Token */
)
/*: node is ObjectExpression */
{
  return node.type === 'ObjectExpression';
}

function isObjectPattern(node
/*: ESNode | Token */
)
/*: node is ObjectPattern */
{
  return node.type === 'ObjectPattern';
}

function isObjectTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is ObjectTypeAnnotation */
{
  return node.type === 'ObjectTypeAnnotation';
}

function isObjectTypeCallProperty(node
/*: ESNode | Token */
)
/*: node is ObjectTypeCallProperty */
{
  return node.type === 'ObjectTypeCallProperty';
}

function isObjectTypeIndexer(node
/*: ESNode | Token */
)
/*: node is ObjectTypeIndexer */
{
  return node.type === 'ObjectTypeIndexer';
}

function isObjectTypeInternalSlot(node
/*: ESNode | Token */
)
/*: node is ObjectTypeInternalSlot */
{
  return node.type === 'ObjectTypeInternalSlot';
}

function isObjectTypeMappedTypeProperty(node
/*: ESNode | Token */
)
/*: node is ObjectTypeMappedTypeProperty */
{
  return node.type === 'ObjectTypeMappedTypeProperty';
}

function isObjectTypeProperty(node
/*: ESNode | Token */
)
/*: node is ObjectTypeProperty */
{
  return node.type === 'ObjectTypeProperty';
}

function isObjectTypeSpreadProperty(node
/*: ESNode | Token */
)
/*: node is ObjectTypeSpreadProperty */
{
  return node.type === 'ObjectTypeSpreadProperty';
}

function isOpaqueType(node
/*: ESNode | Token */
)
/*: node is OpaqueType */
{
  return node.type === 'OpaqueType';
}

function isOptionalIndexedAccessType(node
/*: ESNode | Token */
)
/*: node is OptionalIndexedAccessType */
{
  return node.type === 'OptionalIndexedAccessType';
}

function isPrivateIdentifier(node
/*: ESNode | Token */
)
/*: node is PrivateIdentifier */
{
  return node.type === 'PrivateIdentifier';
}

function isProperty(node
/*: ESNode | Token */
)
/*: node is Property */
{
  return node.type === 'Property';
}

function isPropertyDefinition(node
/*: ESNode | Token */
)
/*: node is PropertyDefinition */
{
  return node.type === 'PropertyDefinition';
}

function isQualifiedTypeIdentifier(node
/*: ESNode | Token */
)
/*: node is QualifiedTypeIdentifier */
{
  return node.type === 'QualifiedTypeIdentifier';
}

function isQualifiedTypeofIdentifier(node
/*: ESNode | Token */
)
/*: node is QualifiedTypeofIdentifier */
{
  return node.type === 'QualifiedTypeofIdentifier';
}

function isRestElement(node
/*: ESNode | Token */
)
/*: node is RestElement */
{
  return node.type === 'RestElement';
}

function isReturnStatement(node
/*: ESNode | Token */
)
/*: node is ReturnStatement */
{
  return node.type === 'ReturnStatement';
}

function isSequenceExpression(node
/*: ESNode | Token */
)
/*: node is SequenceExpression */
{
  return node.type === 'SequenceExpression';
}

function isSpreadElement(node
/*: ESNode | Token */
)
/*: node is SpreadElement */
{
  return node.type === 'SpreadElement';
}

function isStringLiteralTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is StringLiteralTypeAnnotation */
{
  return node.type === 'StringLiteralTypeAnnotation';
}

function isStringTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is StringTypeAnnotation */
{
  return node.type === 'StringTypeAnnotation';
}

function isSuper(node
/*: ESNode | Token */
)
/*: node is Super */
{
  return node.type === 'Super';
}

function isSwitchCase(node
/*: ESNode | Token */
)
/*: node is SwitchCase */
{
  return node.type === 'SwitchCase';
}

function isSwitchStatement(node
/*: ESNode | Token */
)
/*: node is SwitchStatement */
{
  return node.type === 'SwitchStatement';
}

function isSymbolTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is SymbolTypeAnnotation */
{
  return node.type === 'SymbolTypeAnnotation';
}

function isTaggedTemplateExpression(node
/*: ESNode | Token */
)
/*: node is TaggedTemplateExpression */
{
  return node.type === 'TaggedTemplateExpression';
}

function isTemplateElement(node
/*: ESNode | Token */
)
/*: node is TemplateElement */
{
  return node.type === 'TemplateElement';
}

function isTemplateLiteral(node
/*: ESNode | Token */
)
/*: node is TemplateLiteral */
{
  return node.type === 'TemplateLiteral';
}

function isThisExpression(node
/*: ESNode | Token */
)
/*: node is ThisExpression */
{
  return node.type === 'ThisExpression';
}

function isThisTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is ThisTypeAnnotation */
{
  return node.type === 'ThisTypeAnnotation';
}

function isThrowStatement(node
/*: ESNode | Token */
)
/*: node is ThrowStatement */
{
  return node.type === 'ThrowStatement';
}

function isTryStatement(node
/*: ESNode | Token */
)
/*: node is TryStatement */
{
  return node.type === 'TryStatement';
}

function isTupleTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is TupleTypeAnnotation */
{
  return node.type === 'TupleTypeAnnotation';
}

function isTupleTypeLabeledElement(node
/*: ESNode | Token */
)
/*: node is TupleTypeLabeledElement */
{
  return node.type === 'TupleTypeLabeledElement';
}

function isTupleTypeSpreadElement(node
/*: ESNode | Token */
)
/*: node is TupleTypeSpreadElement */
{
  return node.type === 'TupleTypeSpreadElement';
}

function isTypeAlias(node
/*: ESNode | Token */
)
/*: node is TypeAlias */
{
  return node.type === 'TypeAlias';
}

function isTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is TypeAnnotation */
{
  return node.type === 'TypeAnnotation';
}

function isTypeCastExpression(node
/*: ESNode | Token */
)
/*: node is TypeCastExpression */
{
  return node.type === 'TypeCastExpression';
}

function isTypeofTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is TypeofTypeAnnotation */
{
  return node.type === 'TypeofTypeAnnotation';
}

function isTypeOperator(node
/*: ESNode | Token */
)
/*: node is TypeOperator */
{
  return node.type === 'TypeOperator';
}

function isTypeParameter(node
/*: ESNode | Token */
)
/*: node is TypeParameter */
{
  return node.type === 'TypeParameter';
}

function isTypeParameterDeclaration(node
/*: ESNode | Token */
)
/*: node is TypeParameterDeclaration */
{
  return node.type === 'TypeParameterDeclaration';
}

function isTypeParameterInstantiation(node
/*: ESNode | Token */
)
/*: node is TypeParameterInstantiation */
{
  return node.type === 'TypeParameterInstantiation';
}

function isTypePredicate(node
/*: ESNode | Token */
)
/*: node is TypePredicate */
{
  return node.type === 'TypePredicate';
}

function isUnaryExpression(node
/*: ESNode | Token */
)
/*: node is UnaryExpression */
{
  return node.type === 'UnaryExpression';
}

function isUnionTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is UnionTypeAnnotation */
{
  return node.type === 'UnionTypeAnnotation';
}

function isUpdateExpression(node
/*: ESNode | Token */
)
/*: node is UpdateExpression */
{
  return node.type === 'UpdateExpression';
}

function isVariableDeclaration(node
/*: ESNode | Token */
)
/*: node is VariableDeclaration */
{
  return node.type === 'VariableDeclaration';
}

function isVariableDeclarator(node
/*: ESNode | Token */
)
/*: node is VariableDeclarator */
{
  return node.type === 'VariableDeclarator';
}

function isVariance(node
/*: ESNode | Token */
)
/*: node is Variance */
{
  return node.type === 'Variance';
}

function isVoidTypeAnnotation(node
/*: ESNode | Token */
)
/*: node is VoidTypeAnnotation */
{
  return node.type === 'VoidTypeAnnotation';
}

function isWhileStatement(node
/*: ESNode | Token */
)
/*: node is WhileStatement */
{
  return node.type === 'WhileStatement';
}

function isWithStatement(node
/*: ESNode | Token */
)
/*: node is WithStatement */
{
  return node.type === 'WithStatement';
}

function isYieldExpression(node
/*: ESNode | Token */
)
/*: node is YieldExpression */
{
  return node.type === 'YieldExpression';
}

function isLiteral(node
/*: ESNode | Token */
)
/*: node is Literal */
{
  return node.type === 'Literal';
}

function isLineComment(node
/*: ESNode | Token */
)
/*: node is (MostTokens | LineComment) */
{
  return node.type === 'Line';
}

function isBlockComment(node
/*: ESNode | Token */
)
/*: node is (MostTokens | BlockComment) */
{
  return node.type === 'Block';
}

function isMinusToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '-';
}

function isPlusToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '+';
}

function isLogicalNotToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '!';
}

function isUnaryNegationToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '~';
}

function isTypeOfToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'typeof';
}

function isVoidToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'void';
}

function isDeleteToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'delete';
}

function isLooseEqualToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '==';
}

function isLooseNotEqualToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '!=';
}

function isStrictEqualToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '===';
}

function isStrictNotEqualToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '!==';
}

function isLessThanToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '<';
}

function isLessThanOrEqualToToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '<=';
}

function isGreaterThanToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '>';
}

function isGreaterThanOrEqualToToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '>=';
}

function isBitwiseLeftShiftToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '<<';
}

function isBitwiseRightShiftToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '>>';
}

function isBitwiseUnsignedRightShiftToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '>>>';
}

function isAsterixToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '*';
}

function isForwardSlashToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '/';
}

function isPercentToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '%';
}

function isExponentiationToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '**';
}

function isBitwiseORToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '|';
}

function isBitwiseXORToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '^';
}

function isBitwiseANDToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '&';
}

function isInToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'in';
}

function isInstanceOfToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'instanceof';
}

function isLogicalORToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '||';
}

function isLogicalANDToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '&&';
}

function isNullishCoalesceToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '??';
}

function isEqualToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '=';
}

function isPlusEqualToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '+=';
}

function isMinusEqualToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '-=';
}

function isMultiplyEqualToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '*=';
}

function isDivideEqualToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '/=';
}

function isRemainderEqualToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '%=';
}

function isExponentateEqualToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '**=';
}

function isBitwiseLeftShiftEqualToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '<<=';
}

function isBitwiseRightShiftEqualToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '>>=';
}

function isBitwiseUnsignedRightShiftEqualToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '>>>=';
}

function isBitwiseOREqualToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '|=';
}

function isBitwiseXOREqualToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '^=';
}

function isBitwiseANDEqualToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '&=';
}

function isLogicalOREqualToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '||=';
}

function isLogicalANDEqualToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '&&=';
}

function isNullishCoalesceEqualToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '??=';
}

function isIncrementToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '++';
}

function isDecrementToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '--';
}

function isUnionTypeToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '|';
}

function isIntersectionTypeToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '&';
}

function isBreakToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'break';
}

function isCaseToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'case';
}

function isCatchToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'catch';
}

function isClassToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'class';
}

function isConstToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'const';
}

function isContinueToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'continue';
}

function isDebuggerToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'debugger';
}

function isDefaultToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'default';
}

function isDoToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'do';
}

function isElseToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'else';
}

function isEnumToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'enum';
}

function isExportToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'export';
}

function isExtendsToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'extends';
}

function isFinallyToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'finally';
}

function isForToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'for';
}

function isFunctionToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'function';
}

function isIfToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'if';
}

function isImplementsToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'implements';
}

function isImportToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'import';
}

function isInterfaceToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'interface';
}

function isNewToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'new';
}

function isReturnToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'return';
}

function isStaticToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'static';
}

function isSuperToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'super';
}

function isSwitchToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'switch';
}

function isThisToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'this';
}

function isThrowToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'throw';
}

function isTryToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'try';
}

function isVarToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'var';
}

function isWhileToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'while';
}

function isWithToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'with';
}

function isYieldToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Keyword' && node.value === 'yield';
}

function isAsKeyword(node
/*: ESNode | Token */
)
/*: node is (Identifier | MostTokens) */
{
  return node.type === 'Identifier' && node.name === 'as' || node.type === 'Keyword' && node.value === 'as';
}

function isAsyncKeyword(node
/*: ESNode | Token */
)
/*: node is (Identifier | MostTokens) */
{
  return node.type === 'Identifier' && node.name === 'async' || node.type === 'Keyword' && node.value === 'async';
}

function isAwaitKeyword(node
/*: ESNode | Token */
)
/*: node is (Identifier | MostTokens) */
{
  return node.type === 'Identifier' && node.name === 'await' || node.type === 'Keyword' && node.value === 'await';
}

function isDeclareKeyword(node
/*: ESNode | Token */
)
/*: node is (Identifier | MostTokens) */
{
  return node.type === 'Identifier' && node.name === 'declare' || node.type === 'Keyword' && node.value === 'declare';
}

function isFromKeyword(node
/*: ESNode | Token */
)
/*: node is (Identifier | MostTokens) */
{
  return node.type === 'Identifier' && node.name === 'from' || node.type === 'Keyword' && node.value === 'from';
}

function isGetKeyword(node
/*: ESNode | Token */
)
/*: node is (Identifier | MostTokens) */
{
  return node.type === 'Identifier' && node.name === 'get' || node.type === 'Keyword' && node.value === 'get';
}

function isLetKeyword(node
/*: ESNode | Token */
)
/*: node is (Identifier | MostTokens) */
{
  return node.type === 'Identifier' && node.name === 'let' || node.type === 'Keyword' && node.value === 'let';
}

function isModuleKeyword(node
/*: ESNode | Token */
)
/*: node is (Identifier | MostTokens) */
{
  return node.type === 'Identifier' && node.name === 'module' || node.type === 'Keyword' && node.value === 'module';
}

function isOfKeyword(node
/*: ESNode | Token */
)
/*: node is (Identifier | MostTokens) */
{
  return node.type === 'Identifier' && node.name === 'of' || node.type === 'Keyword' && node.value === 'of';
}

function isSetKeyword(node
/*: ESNode | Token */
)
/*: node is (Identifier | MostTokens) */
{
  return node.type === 'Identifier' && node.name === 'set' || node.type === 'Keyword' && node.value === 'set';
}

function isTypeKeyword(node
/*: ESNode | Token */
)
/*: node is (Identifier | MostTokens) */
{
  return node.type === 'Identifier' && node.name === 'type' || node.type === 'Keyword' && node.value === 'type';
}

function isCommaToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === ',';
}

function isColonToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === ':';
}

function isSemicolonToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === ';';
}

function isDotToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '.';
}

function isDotDotDotToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '...';
}

function isOptionalChainToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '?.';
}

function isQuestionMarkToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '?';
}

function isOpeningParenthesisToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '(';
}

function isClosingParenthesisToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === ')';
}

function isOpeningCurlyBracketToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '{';
}

function isClosingCurlyBracketToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '}';
}

function isOpeningAngleBracketToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '<';
}

function isClosingAngleBracketToken(node
/*: ESNode | Token */
)
/*: node is MostTokens */
{
  return node.type === 'Punctuator' && node.value === '>';
}