'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let dfs = (() => {
  var _ref3 = _asyncToGenerator(function* (config, libs, templates, key) {
    const now = libs[key];
    if (now.processing) throw `[transformLibraries] ${key} : cannot include cycle`;
    now.processing = true;
    let codes = [now.code, now.refactored, now.enclosed];
    now['import'].forEach(function (el) {
      codes[1] = codes[1].replace((0, _id.hash)(el.id), `// @import ${el.name}\n${templates[el.name].code}\n// @@`);
    });
    yield now.require.forEachAsync((() => {
      var _ref4 = _asyncToGenerator(function* (el) {
        if (!libs[el.name].finished) yield dfs(config, libs, templates, el.name, libs[el.name]);
        codes = codes.map(function (code) {
          return code.replace((0, _id.hash)(el.id), libs[el.name].enclosed);
        });
      });

      return function (_x9) {
        return _ref4.apply(this, arguments);
      };
    })());
    now.code = yield (0, _formatter.format)(codes[0].trim(), config);
    now.refactored = yield (0, _formatter.format)(codes[1], config);
    now.enclosed = yield (0, _formatter.format)(codes[2], config);
    now.finished = true;
  });

  return function dfs(_x5, _x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
})();

var _arrayForeachAsync = require('array-foreach-async');

var _arrayForeachAsync2 = _interopRequireDefault(_arrayForeachAsync);

var _formatter = require('../formatter');

var _id = require('../id');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_arrayForeachAsync2.default; // eslint-disable-line

/**
 *  libsのcodeの処理をする, 破壊する
 */

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (config, libs, templates) {
    yield Object.keys(libs).forEachAsync((() => {
      var _ref2 = _asyncToGenerator(function* (key) {
        if (!libs[key].finished) yield dfs(config, libs, templates, key);
      });

      return function (_x4) {
        return _ref2.apply(this, arguments);
      };
    })());
  });

  function transformLibraries(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return transformLibraries;
})();