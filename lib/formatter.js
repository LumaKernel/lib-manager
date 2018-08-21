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