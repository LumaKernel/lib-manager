"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = backup;

require("source-map-support/register");

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  copySync,
  mkdirsSync
} = _fsExtra.default;
const {
  resolve
} = _path.default;

function backup(config) {
  const dir = resolve(process.cwd(), config.WorkingDir, config.BackUpDir);
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir);
  mkdirsSync(dir);
  const tmp = resolve(dir, Math.random().toString(36).slice(-8));
  copySync(src, tmp);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWtlcnMvYmFja3VwLmpzIl0sIm5hbWVzIjpbImNvcHlTeW5jIiwibWtkaXJzU3luYyIsImZzIiwicmVzb2x2ZSIsInBhdGgiLCJiYWNrdXAiLCJjb25maWciLCJkaXIiLCJwcm9jZXNzIiwiY3dkIiwiV29ya2luZ0RpciIsIkJhY2tVcERpciIsInNyYyIsIlNyY0RpciIsInRtcCIsIk1hdGgiLCJyYW5kb20iLCJ0b1N0cmluZyIsInNsaWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBLE1BQU07QUFBRUEsRUFBQUEsUUFBRjtBQUFZQyxFQUFBQTtBQUFaLElBQTJCQyxnQkFBakM7QUFDQSxNQUFNO0FBQUVDLEVBQUFBO0FBQUYsSUFBY0MsYUFBcEI7O0FBRWUsU0FBU0MsTUFBVCxDQUFpQkMsTUFBakIsRUFBeUI7QUFDdEMsUUFBTUMsR0FBRyxHQUFHSixPQUFPLENBQUNLLE9BQU8sQ0FBQ0MsR0FBUixFQUFELEVBQWdCSCxNQUFNLENBQUNJLFVBQXZCLEVBQW1DSixNQUFNLENBQUNLLFNBQTFDLENBQW5CO0FBQ0EsUUFBTUMsR0FBRyxHQUFHVCxPQUFPLENBQUNLLE9BQU8sQ0FBQ0MsR0FBUixFQUFELEVBQWdCSCxNQUFNLENBQUNJLFVBQXZCLEVBQW1DSixNQUFNLENBQUNPLE1BQTFDLENBQW5CO0FBQ0FaLEVBQUFBLFVBQVUsQ0FBQ00sR0FBRCxDQUFWO0FBQ0EsUUFBTU8sR0FBRyxHQUFHWCxPQUFPLENBQUNJLEdBQUQsRUFBTVEsSUFBSSxDQUFDQyxNQUFMLEdBQWNDLFFBQWQsQ0FBdUIsRUFBdkIsRUFBMkJDLEtBQTNCLENBQWlDLENBQUMsQ0FBbEMsQ0FBTixDQUFuQjtBQUNBbEIsRUFBQUEsUUFBUSxDQUFDWSxHQUFELEVBQU1FLEdBQU4sQ0FBUjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmNvbnN0IHsgY29weVN5bmMsIG1rZGlyc1N5bmMgfSA9IGZzXG5jb25zdCB7IHJlc29sdmUgfSA9IHBhdGhcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmFja3VwIChjb25maWcpIHtcbiAgY29uc3QgZGlyID0gcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBjb25maWcuV29ya2luZ0RpciwgY29uZmlnLkJhY2tVcERpcilcbiAgY29uc3Qgc3JjID0gcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBjb25maWcuV29ya2luZ0RpciwgY29uZmlnLlNyY0RpcilcbiAgbWtkaXJzU3luYyhkaXIpXG4gIGNvbnN0IHRtcCA9IHJlc29sdmUoZGlyLCBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgtOCkpXG4gIGNvcHlTeW5jKHNyYywgdG1wKVxufVxuIl19