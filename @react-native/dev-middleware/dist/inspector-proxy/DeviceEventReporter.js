"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;
var _ttlcache = _interopRequireDefault(require("@isaacs/ttlcache"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 */

class DeviceEventReporter {
  #eventReporter;
  #pendingCommands = new _ttlcache.default({
    ttl: 10000,
    dispose: (command, id, reason) => {
      if (reason === "delete" || reason === "set") {
        // TODO: Report clobbering ('set') using a dedicated error code
        return;
      }
      this.#logExpiredCommand(command);
    },
  });
  #metadata;
  constructor(eventReporter, metadata) {
    this.#eventReporter = eventReporter;
    this.#metadata = metadata;
  }
  logRequest(req, origin, metadata) {
    this.#pendingCommands.set(req.id, {
      method: req.method,
      requestOrigin: origin,
      requestTime: Date.now(),
      metadata,
    });
  }
  logResponse(res, origin, metadata) {
    const pendingCommand = this.#pendingCommands.get(res.id);
    if (!pendingCommand) {
      this.#eventReporter.logEvent({
        type: "debugger_command",
        protocol: "CDP",
        requestOrigin: null,
        method: null,
        status: "coded_error",
        errorCode: "UNMATCHED_REQUEST_ID",
        responseOrigin: "proxy",
        timeSinceStart: null,
        appId: this.#metadata.appId,
        deviceId: this.#metadata.deviceId,
        deviceName: this.#metadata.deviceName,
        pageId: metadata.pageId,
        frontendUserAgent: metadata.frontendUserAgent,
      });
      return;
    }
    const timeSinceStart = Date.now() - pendingCommand.requestTime;
    this.#pendingCommands.delete(res.id);
    if (res.error) {
      let { message } = res.error;
      if ("data" in res.error) {
        message += ` (${String(res.error.data)})`;
      }
      this.#eventReporter.logEvent({
        type: "debugger_command",
        requestOrigin: pendingCommand.requestOrigin,
        method: pendingCommand.method,
        protocol: "CDP",
        status: "coded_error",
        errorCode: "PROTOCOL_ERROR",
        errorDetails: message,
        responseOrigin: origin,
        timeSinceStart,
        appId: this.#metadata.appId,
        deviceId: this.#metadata.deviceId,
        deviceName: this.#metadata.deviceName,
        pageId: pendingCommand.metadata.pageId,
        frontendUserAgent: pendingCommand.metadata.frontendUserAgent,
      });
      return;
    }
    this.#eventReporter.logEvent({
      type: "debugger_command",
      protocol: "CDP",
      requestOrigin: pendingCommand.requestOrigin,
      method: pendingCommand.method,
      status: "success",
      responseOrigin: origin,
      timeSinceStart,
      appId: this.#metadata.appId,
      deviceId: this.#metadata.deviceId,
      deviceName: this.#metadata.deviceName,
      pageId: pendingCommand.metadata.pageId,
      frontendUserAgent: pendingCommand.metadata.frontendUserAgent,
    });
  }
  logConnection(connectedEntity, metadata) {
    this.#eventReporter.logEvent({
      type: "connect_debugger_frontend",
      status: "success",
      appId: this.#metadata.appId,
      deviceName: this.#metadata.deviceName,
      deviceId: this.#metadata.deviceId,
      pageId: metadata.pageId,
      frontendUserAgent: metadata.frontendUserAgent,
    });
  }
  logDisconnection(disconnectedEntity) {
    const eventReporter = this.#eventReporter;
    if (!eventReporter) {
      return;
    }
    const errorCode =
      disconnectedEntity === "device"
        ? "DEVICE_DISCONNECTED"
        : "DEBUGGER_DISCONNECTED";
    for (const pendingCommand of this.#pendingCommands.values()) {
      this.#eventReporter.logEvent({
        type: "debugger_command",
        protocol: "CDP",
        requestOrigin: pendingCommand.requestOrigin,
        method: pendingCommand.method,
        status: "coded_error",
        errorCode,
        responseOrigin: "proxy",
        timeSinceStart: Date.now() - pendingCommand.requestTime,
        appId: this.#metadata.appId,
        deviceId: this.#metadata.deviceId,
        deviceName: this.#metadata.deviceName,
        pageId: pendingCommand.metadata.pageId,
        frontendUserAgent: pendingCommand.metadata.frontendUserAgent,
      });
    }
    this.#pendingCommands.clear();
  }
  #logExpiredCommand(pendingCommand) {
    this.#eventReporter.logEvent({
      type: "debugger_command",
      protocol: "CDP",
      requestOrigin: pendingCommand.requestOrigin,
      method: pendingCommand.method,
      status: "coded_error",
      errorCode: "TIMED_OUT",
      responseOrigin: "proxy",
      timeSinceStart: Date.now() - pendingCommand.requestTime,
      appId: this.#metadata.appId,
      deviceId: this.#metadata.deviceId,
      deviceName: this.#metadata.deviceName,
      pageId: pendingCommand.metadata.pageId,
      frontendUserAgent: pendingCommand.metadata.frontendUserAgent,
    });
  }
}
var _default = DeviceEventReporter;
exports.default = _default;