"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.format = format;
exports.clangFormat = clangFormat;

require("source-map-support/register");

var _child_process = require("child_process");

var _fsExtra = require("fs-extra");

var _path = _interopRequireDefault(require("path"));

var _pify = _interopRequireDefault(require("pify"));

var _makeTemp = _interopRequireDefault(require("./helpers/makeTemp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const structRegExp = /(?<=^|\n)([ \t]*)(.*)struct (.+) {\n\1}([^;]*);(?=\n|$)/g; // 独自ルールでフォーマット

async function format(code, config) {
  code = await clangFormat(code, config);

  if (config.FormatOption.AllowStructOneLine) {
    code = code.replace(structRegExp, '$1$2struct $3 {}$4;');
  }

  return code;
}

async function clangFormat(code, config) {
  // tmpに作業フォルダを作る
  const temp = (0, _makeTemp.default)(config);

  const originalOpt = _path.default.resolve(process.cwd(), config.WorkingDir, config.ClangFormatOptionPath);

  if (!(0, _fsExtra.existsSync)(originalOpt)) throw `${originalOpt} not found`;
  (0, _fsExtra.mkdirsSync)(temp);

  const tmp = _path.default.resolve(temp, 'tmp.cpp');

  const opt = _path.default.resolve(temp, '.clang-format'); // .clang-formatなどを設置


  (0, _fsExtra.writeFileSync)(tmp, code);
  (0, _fsExtra.writeFileSync)(opt, (0, _fsExtra.readFileSync)(originalOpt)); // clang-formatをかける

  const formatted = await (0, _pify.default)(_child_process.exec)(`clang-format ${tmp}`, {
    style: 'file'
  }); // 作業フォルダごと消す

  (0, _fsExtra.removeSync)(temp);
  return formatted;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9mb3JtYXR0ZXIuanMiXSwibmFtZXMiOlsic3RydWN0UmVnRXhwIiwiZm9ybWF0IiwiY29kZSIsImNvbmZpZyIsImNsYW5nRm9ybWF0IiwiRm9ybWF0T3B0aW9uIiwiQWxsb3dTdHJ1Y3RPbmVMaW5lIiwicmVwbGFjZSIsInRlbXAiLCJvcmlnaW5hbE9wdCIsInBhdGgiLCJyZXNvbHZlIiwicHJvY2VzcyIsImN3ZCIsIldvcmtpbmdEaXIiLCJDbGFuZ0Zvcm1hdE9wdGlvblBhdGgiLCJ0bXAiLCJvcHQiLCJmb3JtYXR0ZWQiLCJleGVjIiwic3R5bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU1BLFlBQVksR0FBRywwREFBckIsQyxDQUVBOztBQUNPLGVBQWVDLE1BQWYsQ0FBdUJDLElBQXZCLEVBQTZCQyxNQUE3QixFQUFxQztBQUMxQ0QsRUFBQUEsSUFBSSxHQUFHLE1BQU1FLFdBQVcsQ0FBQ0YsSUFBRCxFQUFPQyxNQUFQLENBQXhCOztBQUNBLE1BQUlBLE1BQU0sQ0FBQ0UsWUFBUCxDQUFvQkMsa0JBQXhCLEVBQTRDO0FBQzFDSixJQUFBQSxJQUFJLEdBQUdBLElBQUksQ0FBQ0ssT0FBTCxDQUFhUCxZQUFiLEVBQTJCLHFCQUEzQixDQUFQO0FBQ0Q7O0FBQ0QsU0FBT0UsSUFBUDtBQUNEOztBQUVNLGVBQWVFLFdBQWYsQ0FBNEJGLElBQTVCLEVBQWtDQyxNQUFsQyxFQUEwQztBQUMvQztBQUNBLFFBQU1LLElBQUksR0FBRyx1QkFBU0wsTUFBVCxDQUFiOztBQUNBLFFBQU1NLFdBQVcsR0FBR0MsY0FBS0MsT0FBTCxDQUFhQyxPQUFPLENBQUNDLEdBQVIsRUFBYixFQUE0QlYsTUFBTSxDQUFDVyxVQUFuQyxFQUErQ1gsTUFBTSxDQUFDWSxxQkFBdEQsQ0FBcEI7O0FBQ0EsTUFBSSxDQUFDLHlCQUFXTixXQUFYLENBQUwsRUFBOEIsTUFBTyxHQUFFQSxXQUFZLFlBQXJCO0FBQzlCLDJCQUFXRCxJQUFYOztBQUNBLFFBQU1RLEdBQUcsR0FBR04sY0FBS0MsT0FBTCxDQUFhSCxJQUFiLEVBQW1CLFNBQW5CLENBQVo7O0FBQ0EsUUFBTVMsR0FBRyxHQUFHUCxjQUFLQyxPQUFMLENBQWFILElBQWIsRUFBbUIsZUFBbkIsQ0FBWixDQVArQyxDQVEvQzs7O0FBQ0EsOEJBQWNRLEdBQWQsRUFBbUJkLElBQW5CO0FBQ0EsOEJBQWNlLEdBQWQsRUFBbUIsMkJBQWFSLFdBQWIsQ0FBbkIsRUFWK0MsQ0FXL0M7O0FBQ0EsUUFBTVMsU0FBUyxHQUFHLE1BQU0sbUJBQUtDLG1CQUFMLEVBQVksZ0JBQWVILEdBQUksRUFBL0IsRUFBa0M7QUFBRUksSUFBQUEsS0FBSyxFQUFFO0FBQVQsR0FBbEMsQ0FBeEIsQ0FaK0MsQ0FhL0M7O0FBQ0EsMkJBQVdaLElBQVg7QUFDQSxTQUFPVSxTQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleGVjIH0gZnJvbSAnY2hpbGRfcHJvY2VzcydcbmltcG9ydCB7IGV4aXN0c1N5bmMsIG1rZGlyc1N5bmMsIHJlYWRGaWxlU3luYywgcmVtb3ZlU3luYywgd3JpdGVGaWxlU3luYyB9IGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgcGlmeSBmcm9tICdwaWZ5J1xuaW1wb3J0IG1ha2VUZW1wIGZyb20gJy4vaGVscGVycy9tYWtlVGVtcCdcblxuY29uc3Qgc3RydWN0UmVnRXhwID0gLyg/PD1efFxcbikoWyBcXHRdKikoLiopc3RydWN0ICguKykge1xcblxcMX0oW147XSopOyg/PVxcbnwkKS9nXG5cbi8vIOeLrOiHquODq+ODvOODq+OBp+ODleOCqeODvOODnuODg+ODiFxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZvcm1hdCAoY29kZSwgY29uZmlnKSB7XG4gIGNvZGUgPSBhd2FpdCBjbGFuZ0Zvcm1hdChjb2RlLCBjb25maWcpXG4gIGlmIChjb25maWcuRm9ybWF0T3B0aW9uLkFsbG93U3RydWN0T25lTGluZSkge1xuICAgIGNvZGUgPSBjb2RlLnJlcGxhY2Uoc3RydWN0UmVnRXhwLCAnJDEkMnN0cnVjdCAkMyB7fSQ0OycpXG4gIH1cbiAgcmV0dXJuIGNvZGVcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNsYW5nRm9ybWF0IChjb2RlLCBjb25maWcpIHtcbiAgLy8gdG1w44Gr5L2c5qWt44OV44Kp44Or44OA44KS5L2c44KLXG4gIGNvbnN0IHRlbXAgPSBtYWtlVGVtcChjb25maWcpXG4gIGNvbnN0IG9yaWdpbmFsT3B0ID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIGNvbmZpZy5Xb3JraW5nRGlyLCBjb25maWcuQ2xhbmdGb3JtYXRPcHRpb25QYXRoKVxuICBpZiAoIWV4aXN0c1N5bmMob3JpZ2luYWxPcHQpKSB0aHJvdyBgJHtvcmlnaW5hbE9wdH0gbm90IGZvdW5kYFxuICBta2RpcnNTeW5jKHRlbXApXG4gIGNvbnN0IHRtcCA9IHBhdGgucmVzb2x2ZSh0ZW1wLCAndG1wLmNwcCcpXG4gIGNvbnN0IG9wdCA9IHBhdGgucmVzb2x2ZSh0ZW1wLCAnLmNsYW5nLWZvcm1hdCcpXG4gIC8vIC5jbGFuZy1mb3JtYXTjgarjganjgpLoqK3nva5cbiAgd3JpdGVGaWxlU3luYyh0bXAsIGNvZGUpXG4gIHdyaXRlRmlsZVN5bmMob3B0LCByZWFkRmlsZVN5bmMob3JpZ2luYWxPcHQpKVxuICAvLyBjbGFuZy1mb3JtYXTjgpLjgYvjgZHjgotcbiAgY29uc3QgZm9ybWF0dGVkID0gYXdhaXQgcGlmeShleGVjKShgY2xhbmctZm9ybWF0ICR7dG1wfWAsIHsgc3R5bGU6ICdmaWxlJyB9KVxuICAvLyDkvZzmpa3jg5Xjgqnjg6vjg4DjgZTjgajmtojjgZlcbiAgcmVtb3ZlU3luYyh0ZW1wKVxuICByZXR1cm4gZm9ybWF0dGVkXG59XG4iXX0=