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

const ALLOWED_SCALES = {
  ios: [1, 2, 3],
};
function filterPlatformAssetScales(platform, scales) {
  const whitelist = ALLOWED_SCALES[platform];
  if (!whitelist) {
    return scales;
  }
  const result = scales.filter((scale) => whitelist.indexOf(scale) > -1);
  if (result.length === 0 && scales.length > 0) {
    // No matching scale found, but there are some available. Ideally we don't
    // want to be in this situation and should throw, but for now as a fallback
    // let's just use the closest larger image
    const maxScale = whitelist[whitelist.length - 1];
    for (const scale of scales) {
      if (scale > maxScale) {
        result.push(scale);
        break;
      }
    }

    // There is no larger scales available, use the largest we have
    if (result.length === 0) {
      result.push(scales[scales.length - 1]);
    }
  }
  return result;
}
var _default = filterPlatformAssetScales;
exports.default = _default;
