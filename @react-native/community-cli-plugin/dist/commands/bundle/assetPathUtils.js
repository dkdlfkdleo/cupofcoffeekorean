"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 * @oncall react_native
 */

/**
 * FIXME: using number to represent discrete scale numbers is fragile in essence because of
 * floating point numbers imprecision.
 */
function getAndroidAssetSuffix(scale) {
  switch (scale) {
    case 0.75:
      return "ldpi";
    case 1:
      return "mdpi";
    case 1.5:
      return "hdpi";
    case 2:
      return "xhdpi";
    case 3:
      return "xxhdpi";
    case 4:
      return "xxxhdpi";
    default:
      return "";
  }
}

// See https://developer.android.com/guide/topics/resources/drawable-resource.html
const drawableFileTypes = new Set(["gif", "jpeg", "jpg", "png", "webp", "xml"]);
function getAndroidResourceFolderName(asset, scale) {
  if (!drawableFileTypes.has(asset.type)) {
    return "raw";
  }
  const suffix = getAndroidAssetSuffix(scale);
  if (!suffix) {
    throw new Error(
      `Don't know which android drawable suffix to use for asset: ${JSON.stringify(
        asset
      )}`
    );
  }
  return `drawable-${suffix}`;
}
function getResourceIdentifier(asset) {
  const folderPath = getBasePath(asset);
  return `${folderPath}/${asset.name}`
    .toLowerCase()
    .replace(/\//g, "_") // Encode folder structure in file name
    .replace(/([^a-z0-9_])/g, "") // Remove illegal chars
    .replace(/^assets_/, ""); // Remove "assets_" prefix
}

function getBasePath(asset) {
  let basePath = asset.httpServerLocation;
  if (basePath[0] === "/") {
    basePath = basePath.substr(1);
  }
  return basePath;
}
var _default = {
  getAndroidAssetSuffix,
  getAndroidResourceFolderName,
  getResourceIdentifier,
  getBasePath,
};
exports.default = _default;
