'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _getFileStructure = require('./getFileStructure');

var _getFileStructure2 = _interopRequireDefault(_getFileStructure);

var _makeLib = require('./makeLib');

var _arrayForeachAsync = require('array-foreach-async');

var _arrayForeachAsync2 = _interopRequireDefault(_arrayForeachAsync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { resolve } = _path2.default;
const { cat } = _shelljs2.default;
_arrayForeachAsync2.default; // eslint-disable-line

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (config) {
    const { main } = (0, _getFileStructure2.default)(config);
    const libs = {};
    //
    const libFiles = main.filter(function (el) {
      return !el[1].match(/_.*$/);
    });
    // library files
    yield libFiles.forEachAsync((() => {
      var _ref2 = _asyncToGenerator(function* ([namespaceList, filename]) {
        const namespace = namespaceList.join('/');
        const path = resolve(process.cwd(), config.WorkingDir, config.SrcDir, namespace, filename);
        const old = cat(path).stdout;
        const { name, data } = yield (0, _makeLib.makeLib)(old, namespace, filename, config);
        libs[name] = data;
      });

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    })());
    return libs;
  });

  function makeLibraries(_x) {
    return _ref.apply(this, arguments);
  }

  return makeLibraries;
})();