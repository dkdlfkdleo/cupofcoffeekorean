function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

export default function objectMergeDeep() {
  var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  for (var i = 0, len = arguments.length <= 1 ? 0 : arguments.length - 1; i < len; ++i) {
    var obj = i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1];

    for (var key in obj) {
      // see https://github.com/robinweser/fast-loops/issues/18
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        continue;
      }

      var value = obj[key];

      if (_typeof(value) === 'object' && !Array.isArray(value) && value !== null) {
        base[key] = objectMergeDeep(base[key], value);
        continue;
      }

      base[key] = value;
    }
  }

  return base;
}