'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clangFormat = exports.format = undefined;

// 独自ルールでフォーマット
let format = exports.format = (() => {
  var _ref = _asyncToGenerator(function* (code, config) {
    code = yield clangFormat(code, config);
    if (config.FormatOption.AllowStructOneLine) {
      code = code.replace(/(?:^|\n)(\s*)struct (.*) {\n\1};/g, '$1struct $2 {}');
    }
    return code;
  });

  return function format(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

let clangFormat = exports.clangFormat = (() => {
  var _ref2 = _asyncToGenerator(function* (code, config) {
    // tmpに作業フォルダを作る
    const temp = (0, _makeTemp2.default)(config);
    const originalOpt = _path2.default.resolve(process.cwd(), config.WorkingDir, config.ClangFormatOptionPath);
    if (!(0, _fsExtra.existsSync)(originalOpt)) throw `${originalOpt} not found`;
    (0, _fsExtra.mkdirsSync)(temp);
    const tmp = _path2.default.resolve(temp, 'tmp.cpp');
    const opt = _path2.default.resolve(temp, '.clang-format');
    // .clang-formatなどを設置
    (0, _fsExtra.writeFileSync)(tmp, code);
    (0, _fsExtra.writeFileSync)(opt, (0, _fsExtra.readFileSync)(originalOpt));
    // clang-formatをかける
    const formatted = yield (0, _pify2.default)(_child_process.exec)(`clang-format ${tmp}`, { style: 'file' });
    // 作業フォルダごと消す
    (0, _fsExtra.removeSync)(temp);
    return formatted;
  });

  return function clangFormat(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

require('source-map-support/register');

var _child_process = require('child_process');

var _fsExtra = require('fs-extra');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pify = require('pify');

var _pify2 = _interopRequireDefault(_pify);

var _makeTemp = require('./helpers/makeTemp');

var _makeTemp2 = _interopRequireDefault(_makeTemp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9mb3JtYXR0ZXIuanMiXSwibmFtZXMiOlsiY29kZSIsImNvbmZpZyIsImNsYW5nRm9ybWF0IiwiRm9ybWF0T3B0aW9uIiwiQWxsb3dTdHJ1Y3RPbmVMaW5lIiwicmVwbGFjZSIsImZvcm1hdCIsInRlbXAiLCJvcmlnaW5hbE9wdCIsInBhdGgiLCJyZXNvbHZlIiwicHJvY2VzcyIsImN3ZCIsIldvcmtpbmdEaXIiLCJDbGFuZ0Zvcm1hdE9wdGlvblBhdGgiLCJ0bXAiLCJvcHQiLCJmb3JtYXR0ZWQiLCJleGVjIiwic3R5bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFNQTs7K0JBQ08sV0FBdUJBLElBQXZCLEVBQTZCQyxNQUE3QixFQUFxQztBQUMxQ0QsV0FBTyxNQUFNRSxZQUFZRixJQUFaLEVBQWtCQyxNQUFsQixDQUFiO0FBQ0EsUUFBSUEsT0FBT0UsWUFBUCxDQUFvQkMsa0JBQXhCLEVBQTRDO0FBQzFDSixhQUFPQSxLQUFLSyxPQUFMLENBQWEsbUNBQWIsRUFBa0QsZ0JBQWxELENBQVA7QUFDRDtBQUNELFdBQU9MLElBQVA7QUFDRCxHOztrQkFOcUJNLE07Ozs7OztnQ0FRZixXQUE0Qk4sSUFBNUIsRUFBa0NDLE1BQWxDLEVBQTBDO0FBQy9DO0FBQ0EsVUFBTU0sT0FBTyx3QkFBU04sTUFBVCxDQUFiO0FBQ0EsVUFBTU8sY0FBY0MsZUFBS0MsT0FBTCxDQUFhQyxRQUFRQyxHQUFSLEVBQWIsRUFBNEJYLE9BQU9ZLFVBQW5DLEVBQStDWixPQUFPYSxxQkFBdEQsQ0FBcEI7QUFDQSxRQUFJLENBQUMseUJBQVdOLFdBQVgsQ0FBTCxFQUE4QixNQUFPLEdBQUVBLFdBQVksWUFBckI7QUFDOUIsNkJBQVdELElBQVg7QUFDQSxVQUFNUSxNQUFNTixlQUFLQyxPQUFMLENBQWFILElBQWIsRUFBbUIsU0FBbkIsQ0FBWjtBQUNBLFVBQU1TLE1BQU1QLGVBQUtDLE9BQUwsQ0FBYUgsSUFBYixFQUFtQixlQUFuQixDQUFaO0FBQ0E7QUFDQSxnQ0FBY1EsR0FBZCxFQUFtQmYsSUFBbkI7QUFDQSxnQ0FBY2dCLEdBQWQsRUFBbUIsMkJBQWFSLFdBQWIsQ0FBbkI7QUFDQTtBQUNBLFVBQU1TLFlBQVksTUFBTSxvQkFBS0MsbUJBQUwsRUFBWSxnQkFBZUgsR0FBSSxFQUEvQixFQUFrQyxFQUFFSSxPQUFPLE1BQVQsRUFBbEMsQ0FBeEI7QUFDQTtBQUNBLDZCQUFXWixJQUFYO0FBQ0EsV0FBT1UsU0FBUDtBQUNELEc7O2tCQWhCcUJmLFc7Ozs7Ozs7QUFmdEI7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBIiwiZmlsZSI6ImZvcm1hdHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4ZWMgfSBmcm9tICdjaGlsZF9wcm9jZXNzJ1xuaW1wb3J0IHsgZXhpc3RzU3luYywgbWtkaXJzU3luYywgcmVhZEZpbGVTeW5jLCByZW1vdmVTeW5jLCB3cml0ZUZpbGVTeW5jIH0gZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBwaWZ5IGZyb20gJ3BpZnknXG5pbXBvcnQgbWFrZVRlbXAgZnJvbSAnLi9oZWxwZXJzL21ha2VUZW1wJ1xuXG4vLyDni6zoh6rjg6vjg7zjg6vjgafjg5Xjgqnjg7zjg57jg4Pjg4hcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmb3JtYXQgKGNvZGUsIGNvbmZpZykge1xuICBjb2RlID0gYXdhaXQgY2xhbmdGb3JtYXQoY29kZSwgY29uZmlnKVxuICBpZiAoY29uZmlnLkZvcm1hdE9wdGlvbi5BbGxvd1N0cnVjdE9uZUxpbmUpIHtcbiAgICBjb2RlID0gY29kZS5yZXBsYWNlKC8oPzpefFxcbikoXFxzKilzdHJ1Y3QgKC4qKSB7XFxuXFwxfTsvZywgJyQxc3RydWN0ICQyIHt9JylcbiAgfVxuICByZXR1cm4gY29kZVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2xhbmdGb3JtYXQgKGNvZGUsIGNvbmZpZykge1xuICAvLyB0bXDjgavkvZzmpa3jg5Xjgqnjg6vjg4DjgpLkvZzjgotcbiAgY29uc3QgdGVtcCA9IG1ha2VUZW1wKGNvbmZpZylcbiAgY29uc3Qgb3JpZ2luYWxPcHQgPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgY29uZmlnLldvcmtpbmdEaXIsIGNvbmZpZy5DbGFuZ0Zvcm1hdE9wdGlvblBhdGgpXG4gIGlmICghZXhpc3RzU3luYyhvcmlnaW5hbE9wdCkpIHRocm93IGAke29yaWdpbmFsT3B0fSBub3QgZm91bmRgXG4gIG1rZGlyc1N5bmModGVtcClcbiAgY29uc3QgdG1wID0gcGF0aC5yZXNvbHZlKHRlbXAsICd0bXAuY3BwJylcbiAgY29uc3Qgb3B0ID0gcGF0aC5yZXNvbHZlKHRlbXAsICcuY2xhbmctZm9ybWF0JylcbiAgLy8gLmNsYW5nLWZvcm1hdOOBquOBqeOCkuioree9rlxuICB3cml0ZUZpbGVTeW5jKHRtcCwgY29kZSlcbiAgd3JpdGVGaWxlU3luYyhvcHQsIHJlYWRGaWxlU3luYyhvcmlnaW5hbE9wdCkpXG4gIC8vIGNsYW5nLWZvcm1hdOOCkuOBi+OBkeOCi1xuICBjb25zdCBmb3JtYXR0ZWQgPSBhd2FpdCBwaWZ5KGV4ZWMpKGBjbGFuZy1mb3JtYXQgJHt0bXB9YCwgeyBzdHlsZTogJ2ZpbGUnIH0pXG4gIC8vIOS9nOalreODleOCqeODq+ODgOOBlOOBqOa2iOOBmVxuICByZW1vdmVTeW5jKHRlbXApXG4gIHJldHVybiBmb3JtYXR0ZWRcbn1cbiJdfQ==