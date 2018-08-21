'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('source-map-support/register');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWtlcnMvbWFrZUxpYnJhcmllcy5qcyJdLCJuYW1lcyI6WyJyZXNvbHZlIiwicGF0aCIsImNhdCIsInNoZWxsanMiLCJub25lIiwiY29uZmlnIiwibWFpbiIsImxpYnMiLCJsaWJGaWxlcyIsImZpbHRlciIsImVsIiwibWF0Y2giLCJmb3JFYWNoQXN5bmMiLCJuYW1lc3BhY2VMaXN0IiwiZmlsZW5hbWUiLCJuYW1lc3BhY2UiLCJqb2luIiwicHJvY2VzcyIsImN3ZCIsIldvcmtpbmdEaXIiLCJTcmNEaXIiLCJvbGQiLCJzdGRvdXQiLCJuYW1lIiwiZGF0YSIsIm1ha2VMaWJyYXJpZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBQ0EsTUFBTSxFQUFFQSxPQUFGLEtBQWNDLGNBQXBCO0FBQ0EsTUFBTSxFQUFFQyxHQUFGLEtBQVVDLGlCQUFoQjtBQUNBQyw0QixDQUFLOzs7K0JBRVUsV0FBOEJDLE1BQTlCLEVBQXNDO0FBQ25ELFVBQU0sRUFBQ0MsSUFBRCxLQUFTLGdDQUFpQkQsTUFBakIsQ0FBZjtBQUNBLFVBQU1FLE9BQU8sRUFBYjtBQUNBO0FBQ0EsVUFBTUMsV0FBV0YsS0FBS0csTUFBTCxDQUFZO0FBQUEsYUFBTSxDQUFDQyxHQUFHLENBQUgsRUFBTUMsS0FBTixDQUFZLE1BQVosQ0FBUDtBQUFBLEtBQVosQ0FBakI7QUFDQTtBQUNBLFVBQU1ILFNBQVNJLFlBQVQ7QUFBQSxvQ0FBc0IsV0FBTyxDQUFDQyxhQUFELEVBQWdCQyxRQUFoQixDQUFQLEVBQXFDO0FBQy9ELGNBQU1DLFlBQVlGLGNBQWNHLElBQWQsQ0FBbUIsR0FBbkIsQ0FBbEI7QUFDQSxjQUFNZixPQUFPRCxRQUFRaUIsUUFBUUMsR0FBUixFQUFSLEVBQ1hiLE9BQU9jLFVBREksRUFDUWQsT0FBT2UsTUFEZixFQUN1QkwsU0FEdkIsRUFDa0NELFFBRGxDLENBQWI7QUFFQSxjQUFNTyxNQUFNbkIsSUFBSUQsSUFBSixFQUFVcUIsTUFBdEI7QUFDQSxjQUFNLEVBQUNDLElBQUQsRUFBT0MsSUFBUCxLQUFlLE1BQU0sc0JBQVFILEdBQVIsRUFBYU4sU0FBYixFQUF3QkQsUUFBeEIsRUFBa0NULE1BQWxDLENBQTNCO0FBQ0FFLGFBQUtnQixJQUFMLElBQWFDLElBQWI7QUFDRCxPQVBLOztBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQU47QUFRQSxXQUFPakIsSUFBUDtBQUNELEc7O1dBZjZCa0IsYTs7OztTQUFBQSxhIiwiZmlsZSI6Im1ha2VMaWJyYXJpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHNoZWxsanMgZnJvbSAnc2hlbGxqcydcbmltcG9ydCBnZXRGaWxlU3RydWN0dXJlIGZyb20gJy4vZ2V0RmlsZVN0cnVjdHVyZSdcbmltcG9ydCB7IG1ha2VMaWIgfSBmcm9tICcuL21ha2VMaWInXG5pbXBvcnQgbm9uZSBmcm9tICdhcnJheS1mb3JlYWNoLWFzeW5jJ1xuY29uc3QgeyByZXNvbHZlIH0gPSBwYXRoXG5jb25zdCB7IGNhdCB9ID0gc2hlbGxqc1xubm9uZSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIG1ha2VMaWJyYXJpZXMgKGNvbmZpZykge1xuICBjb25zdCB7bWFpbn0gPSBnZXRGaWxlU3RydWN0dXJlKGNvbmZpZylcbiAgY29uc3QgbGlicyA9IHt9XG4gIC8vXG4gIGNvbnN0IGxpYkZpbGVzID0gbWFpbi5maWx0ZXIoZWwgPT4gIWVsWzFdLm1hdGNoKC9fLiokLykpXG4gIC8vIGxpYnJhcnkgZmlsZXNcbiAgYXdhaXQgbGliRmlsZXMuZm9yRWFjaEFzeW5jKGFzeW5jIChbbmFtZXNwYWNlTGlzdCwgZmlsZW5hbWVdKSA9PiB7XG4gICAgY29uc3QgbmFtZXNwYWNlID0gbmFtZXNwYWNlTGlzdC5qb2luKCcvJylcbiAgICBjb25zdCBwYXRoID0gcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLFxuICAgICAgY29uZmlnLldvcmtpbmdEaXIsIGNvbmZpZy5TcmNEaXIsIG5hbWVzcGFjZSwgZmlsZW5hbWUpXG4gICAgY29uc3Qgb2xkID0gY2F0KHBhdGgpLnN0ZG91dFxuICAgIGNvbnN0IHtuYW1lLCBkYXRhfSA9IGF3YWl0IG1ha2VMaWIob2xkLCBuYW1lc3BhY2UsIGZpbGVuYW1lLCBjb25maWcpXG4gICAgbGlic1tuYW1lXSA9IGRhdGFcbiAgfSlcbiAgcmV0dXJuIGxpYnNcbn1cbiJdfQ==