/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */

'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _Platform = _interopRequireDefault(require("../../../exports/Platform"));
var _UIManager = _interopRequireDefault(require("../../../exports/UIManager"));
var __DEV__ = process.env.NODE_ENV !== 'production';
function configureNext(config, onAnimationDidEnd) {
  if (!_Platform.default.isTesting) {
    _UIManager.default.configureNextLayoutAnimation(config, onAnimationDidEnd !== null && onAnimationDidEnd !== void 0 ? onAnimationDidEnd : function () {}, function () {} /* unused onError */);
  }
}
function create(duration, type, property) {
  return {
    duration,
    create: {
      type,
      property
    },
    update: {
      type
    },
    delete: {
      type,
      property
    }
  };
}
var Presets = {
  easeInEaseOut: create(300, 'easeInEaseOut', 'opacity'),
  linear: create(500, 'linear', 'opacity'),
  spring: {
    duration: 700,
    create: {
      type: 'linear',
      property: 'opacity'
    },
    update: {
      type: 'spring',
      springDamping: 0.4
    },
    delete: {
      type: 'linear',
      property: 'opacity'
    }
  }
};

/**
 * Automatically animates views to their new positions when the
 * next layout happens.
 *
 * A common way to use this API is to call it before calling `setState`.
 *
 * Note that in order to get this to work on **Android** you need to set the following flags via `UIManager`:
 *
 *     UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
 */
var LayoutAnimation = {
  /**
   * Schedules an animation to happen on the next layout.
   *
   * @param config Specifies animation properties:
   *
   *   - `duration` in milliseconds
   *   - `create`, `AnimationConfig` for animating in new views
   *   - `update`, `AnimationConfig` for animating views that have been updated
   *
   * @param onAnimationDidEnd Called when the animation finished.
   * Only supported on iOS.
   * @param onError Called on error. Only supported on iOS.
   */
  configureNext,
  /**
   * Helper for creating a config for `configureNext`.
   */
  create,
  Types: Object.freeze({
    spring: 'spring',
    linear: 'linear',
    easeInEaseOut: 'easeInEaseOut',
    easeIn: 'easeIn',
    easeOut: 'easeOut',
    keyboard: 'keyboard'
  }),
  Properties: Object.freeze({
    opacity: 'opacity',
    scaleX: 'scaleX',
    scaleY: 'scaleY',
    scaleXY: 'scaleXY'
  }),
  checkConfig() {
    console.error('LayoutAnimation.checkConfig(...) has been disabled.');
  },
  Presets,
  easeInEaseOut: configureNext.bind(null, Presets.easeInEaseOut),
  linear: configureNext.bind(null, Presets.linear),
  spring: configureNext.bind(null, Presets.spring)
};
var _default = exports.default = LayoutAnimation;
module.exports = exports.default;