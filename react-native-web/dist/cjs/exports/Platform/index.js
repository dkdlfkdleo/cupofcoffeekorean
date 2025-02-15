"use strict";

exports.__esModule = true;
exports.default = void 0;
/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var Platform = {
  OS: 'web',
  select: obj => 'web' in obj ? obj.web : obj.default,
  get isTesting() {
    if (process.env.NODE_ENV === 'test') {
      return true;
    }
    return false;
  }
};
var _default = exports.default = Platform;
module.exports = exports.default;