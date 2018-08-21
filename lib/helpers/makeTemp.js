'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeTemp;

require('source-map-support/register');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { mkdirsSync } = _fsExtra2.default;
const { resolve } = _path2.default;

function makeTemp(config) {
  const temp = resolve(process.cwd(), config.WorkingDir, config.TempDir, Math.random().toString(36).slice(-8));
  mkdirsSync(temp);
  return temp;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL21ha2VUZW1wLmpzIl0sIm5hbWVzIjpbIm1ha2VUZW1wIiwibWtkaXJzU3luYyIsImZzIiwicmVzb2x2ZSIsInBhdGgiLCJjb25maWciLCJ0ZW1wIiwicHJvY2VzcyIsImN3ZCIsIldvcmtpbmdEaXIiLCJUZW1wRGlyIiwiTWF0aCIsInJhbmRvbSIsInRvU3RyaW5nIiwic2xpY2UiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQUt3QkEsUTs7OztBQUx4Qjs7OztBQUNBOzs7Ozs7QUFDQSxNQUFNLEVBQUVDLFVBQUYsS0FBaUJDLGlCQUF2QjtBQUNBLE1BQU0sRUFBRUMsT0FBRixLQUFjQyxjQUFwQjs7QUFFZSxTQUFTSixRQUFULENBQW1CSyxNQUFuQixFQUEyQjtBQUN4QyxRQUFNQyxPQUFPSCxRQUFRSSxRQUFRQyxHQUFSLEVBQVIsRUFBdUJILE9BQU9JLFVBQTlCLEVBQTBDSixPQUFPSyxPQUFqRCxFQUEwREMsS0FBS0MsTUFBTCxHQUFjQyxRQUFkLENBQXVCLEVBQXZCLEVBQTJCQyxLQUEzQixDQUFpQyxDQUFDLENBQWxDLENBQTFELENBQWI7QUFDQWIsYUFBV0ssSUFBWDtBQUNBLFNBQU9BLElBQVA7QUFDRCIsImZpbGUiOiJtYWtlVGVtcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcy1leHRyYSdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5jb25zdCB7IG1rZGlyc1N5bmMgfSA9IGZzXG5jb25zdCB7IHJlc29sdmUgfSA9IHBhdGhcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZVRlbXAgKGNvbmZpZykge1xuICBjb25zdCB0ZW1wID0gcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBjb25maWcuV29ya2luZ0RpciwgY29uZmlnLlRlbXBEaXIsIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKC04KSlcbiAgbWtkaXJzU3luYyh0ZW1wKVxuICByZXR1cm4gdGVtcFxufVxuIl19