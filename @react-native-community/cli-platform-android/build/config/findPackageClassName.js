"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPackageClassName;
exports.matchClassName = matchClassName;
function _fs() {
  const data = _interopRequireDefault(require("fs"));
  _fs = function () {
    return data;
  };
  return data;
}
function _fastGlob() {
  const data = _interopRequireDefault(require("fast-glob"));
  _fastGlob = function () {
    return data;
  };
  return data;
}
function _path() {
  const data = _interopRequireDefault(require("path"));
  _path = function () {
    return data;
  };
  return data;
}
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
    return data;
  };
  return data;
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function getPackageClassName(folder) {
  const files = _fastGlob().default.sync('**/+(*.java|*.kt)', {
    cwd: (0, _cliTools().unixifyPaths)(folder)
  });
  const packages = files.map(filePath => _fs().default.readFileSync(_path().default.join(folder, filePath), 'utf8')).map(matchClassName).filter(match => match);

  // @ts-ignore
  return packages.length ? packages[0][1] : null;
}
function matchClassName(file) {
  const nativeModuleMatch = file.match(/class\s+(\w+[^(\s]*)[\s\w():]*(\s+implements\s+|:)[\s\w():,]*[^{]*ReactPackage/);
  // We first check for implementation of ReactPackage to find native
  // modules and then for subclasses of TurboReactPackage to find turbo modules.
  if (nativeModuleMatch) {
    return nativeModuleMatch;
  } else {
    return file.match(/class\s+(\w+[^(\s]*)[\s\w():]*(\s+extends\s+|:)[\s\w():,]*[^{]*TurboReactPackage/);
  }
}

//# sourceMappingURL=findPackageClassName.ts.map