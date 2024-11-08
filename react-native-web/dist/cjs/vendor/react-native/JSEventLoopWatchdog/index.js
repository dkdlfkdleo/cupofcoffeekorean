/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * 
 */

'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _infoLog = _interopRequireDefault(require("../infoLog"));
/**
 * A utility for tracking stalls in the JS event loop that prevent timers and
 * other events from being processed in a timely manner.
 *
 * The "stall" time is defined as the amount of time in access of the acceptable
 * threshold, which is typically around 100-200ms. So if the treshold is set to
 * 100 and a timer fires 150 ms later than it was scheduled because the event
 * loop was tied up, that would be considered a 50ms stall.
 *
 * By default, logs stall events to the console when installed. Can also be
 * queried with `getStats`.
 */
var JSEventLoopWatchdog = {
  getStats: function getStats() {
    return {
      stallCount,
      totalStallTime,
      longestStall,
      acceptableBusyTime
    };
  },
  reset: function reset() {
    (0, _infoLog.default)('JSEventLoopWatchdog: reset');
    totalStallTime = 0;
    stallCount = 0;
    longestStall = 0;
    lastInterval = window.performance.now();
  },
  addHandler: function addHandler(handler) {
    handlers.push(handler);
  },
  install: function install(_ref) {
    var thresholdMS = _ref.thresholdMS;
    acceptableBusyTime = thresholdMS;
    if (installed) {
      return;
    }
    installed = true;
    lastInterval = window.performance.now();
    function iteration() {
      var now = window.performance.now();
      var busyTime = now - lastInterval;
      if (busyTime >= thresholdMS) {
        var stallTime = busyTime - thresholdMS;
        stallCount++;
        totalStallTime += stallTime;
        longestStall = Math.max(longestStall, stallTime);
        var msg = "JSEventLoopWatchdog: JS thread busy for " + busyTime + "ms. " + (totalStallTime + "ms in " + stallCount + " stalls so far. ");
        handlers.forEach(handler => {
          msg += handler.onStall({
            lastInterval,
            busyTime
          }) || '';
        });
        (0, _infoLog.default)(msg);
      }
      handlers.forEach(handler => {
        handler.onIterate && handler.onIterate();
      });
      lastInterval = now;
      setTimeout(iteration, thresholdMS / 5);
    }
    iteration();
  }
};
var acceptableBusyTime = 0;
var installed = false;
var totalStallTime = 0;
var stallCount = 0;
var longestStall = 0;
var lastInterval = 0;
var handlers = [];
var _default = exports.default = JSEventLoopWatchdog;
module.exports = exports.default;