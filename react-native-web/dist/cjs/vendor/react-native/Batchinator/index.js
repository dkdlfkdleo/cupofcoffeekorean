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
var _InteractionManager = _interopRequireDefault(require("../../../exports/InteractionManager"));
/**
 * A simple class for batching up invocations of a low-pri callback. A timeout is set to run the
 * callback once after a delay, no matter how many times it's scheduled. Once the delay is reached,
 * InteractionManager.runAfterInteractions is used to invoke the callback after any hi-pri
 * interactions are done running.
 *
 * Make sure to cleanup with dispose().  Example:
 *
 *   class Widget extends React.Component {
 *     _batchedSave: new Batchinator(() => this._saveState, 1000);
 *     _saveSate() {
 *       // save this.state to disk
 *     }
 *     componentDidUpdate() {
 *       this._batchedSave.schedule();
 *     }
 *     componentWillUnmount() {
 *       this._batchedSave.dispose();
 *     }
 *     ...
 *   }
 */
class Batchinator {
  constructor(callback, delayMS) {
    this._delay = delayMS;
    this._callback = callback;
  }
  /*
   * Cleanup any pending tasks.
   *
   * By default, if there is a pending task the callback is run immediately. Set the option abort to
   * true to not call the callback if it was pending.
   */
  dispose(options) {
    if (options === void 0) {
      options = {
        abort: false
      };
    }
    if (this._taskHandle) {
      this._taskHandle.cancel();
      if (!options.abort) {
        this._callback();
      }
      this._taskHandle = null;
    }
  }
  schedule() {
    if (this._taskHandle) {
      return;
    }
    var timeoutHandle = setTimeout(() => {
      this._taskHandle = _InteractionManager.default.runAfterInteractions(() => {
        // Note that we clear the handle before invoking the callback so that if the callback calls
        // schedule again, it will actually schedule another task.
        this._taskHandle = null;
        this._callback();
      });
    }, this._delay);
    this._taskHandle = {
      cancel: () => clearTimeout(timeoutHandle)
    };
  }
}
var _default = exports.default = Batchinator;
module.exports = exports.default;