"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _PooledClass = _interopRequireDefault(require("../../vendor/react-native/PooledClass"));
/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var twoArgumentPooler = _PooledClass.default.twoArgumentPooler;

/**
 * PooledClass representing the bounding rectangle of a region.
 */
function BoundingDimensions(width, height) {
  this.width = width;
  this.height = height;
}
BoundingDimensions.prototype.destructor = function () {
  this.width = null;
  this.height = null;
};
BoundingDimensions.getPooledFromElement = function (element) {
  return BoundingDimensions.getPooled(element.offsetWidth, element.offsetHeight);
};
_PooledClass.default.addPoolingTo(BoundingDimensions, twoArgumentPooler);
var _default = exports.default = BoundingDimensions;
module.exports = exports.default;