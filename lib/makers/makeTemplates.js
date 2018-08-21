'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('source-map-support/register');

var _arrayForeachAsync = require('array-foreach-async');

var _arrayForeachAsync2 = _interopRequireDefault(_arrayForeachAsync);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _formatter = require('../formatter');

var _getFileStructure = require('./getFileStructure');

var _getFileStructure2 = _interopRequireDefault(_getFileStructure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { resolve } = _path2.default;
const { cat } = _shelljs2.default;
_arrayForeachAsync2.default; // eslint-disable-line

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (config) {
    const { main } = (0, _getFileStructure2.default)(config);
    const templates = {};
    // [path-list, name]s
    const templateFiles = main.filter(function (el) {
      return el[1].match(/_.*$/);
    });
    // テンプレートファイル
    yield templateFiles.forEachAsync((() => {
      var _ref2 = _asyncToGenerator(function* (el) {
        const path = resolve(process.cwd(), config.WorkingDir, config.SrcDir, ...el[0], el[1]);
        const old = cat(path).stdout;
        const code = yield (0, _formatter.format)(old, config);
        const name = el[1].match(/_(.+)\.cpp/)[1];
        templates[name] = { old, code, namespace: el[0].join('/'), filename: el[1] };
      });

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    })());
    return templates;
  });

  function makeTemplates(_x) {
    return _ref.apply(this, arguments);
  }

  return makeTemplates;
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWtlcnMvbWFrZVRlbXBsYXRlcy5qcyJdLCJuYW1lcyI6WyJyZXNvbHZlIiwicGF0aCIsImNhdCIsInNoZWxsanMiLCJub25lIiwiY29uZmlnIiwibWFpbiIsInRlbXBsYXRlcyIsInRlbXBsYXRlRmlsZXMiLCJmaWx0ZXIiLCJlbCIsIm1hdGNoIiwiZm9yRWFjaEFzeW5jIiwicHJvY2VzcyIsImN3ZCIsIldvcmtpbmdEaXIiLCJTcmNEaXIiLCJvbGQiLCJzdGRvdXQiLCJjb2RlIiwibmFtZSIsIm5hbWVzcGFjZSIsImpvaW4iLCJmaWxlbmFtZSIsIm1ha2VUZW1wbGF0ZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBQ0EsTUFBTSxFQUFFQSxPQUFGLEtBQWNDLGNBQXBCO0FBQ0EsTUFBTSxFQUFFQyxHQUFGLEtBQVVDLGlCQUFoQjtBQUNBQyw0QixDQUFNOzs7K0JBRVMsV0FBOEJDLE1BQTlCLEVBQXNDO0FBQ25ELFVBQU0sRUFBQ0MsSUFBRCxLQUFTLGdDQUFpQkQsTUFBakIsQ0FBZjtBQUNBLFVBQU1FLFlBQVksRUFBbEI7QUFDQTtBQUNBLFVBQU1DLGdCQUFnQkYsS0FBS0csTUFBTCxDQUFZO0FBQUEsYUFBTUMsR0FBRyxDQUFILEVBQU1DLEtBQU4sQ0FBWSxNQUFaLENBQU47QUFBQSxLQUFaLENBQXRCO0FBQ0E7QUFDQSxVQUFNSCxjQUFjSSxZQUFkO0FBQUEsb0NBQTJCLFdBQU1GLEVBQU4sRUFBWTtBQUMzQyxjQUFNVCxPQUFPRCxRQUFRYSxRQUFRQyxHQUFSLEVBQVIsRUFBdUJULE9BQU9VLFVBQTlCLEVBQTBDVixPQUFPVyxNQUFqRCxFQUF5RCxHQUFHTixHQUFHLENBQUgsQ0FBNUQsRUFBbUVBLEdBQUcsQ0FBSCxDQUFuRSxDQUFiO0FBQ0EsY0FBTU8sTUFBTWYsSUFBSUQsSUFBSixFQUFVaUIsTUFBdEI7QUFDQSxjQUFNQyxPQUFPLE1BQU0sdUJBQU9GLEdBQVAsRUFBWVosTUFBWixDQUFuQjtBQUNBLGNBQU1lLE9BQU9WLEdBQUcsQ0FBSCxFQUFNQyxLQUFOLENBQVksWUFBWixFQUEwQixDQUExQixDQUFiO0FBQ0FKLGtCQUFVYSxJQUFWLElBQWtCLEVBQUNILEdBQUQsRUFBTUUsSUFBTixFQUFZRSxXQUFXWCxHQUFHLENBQUgsRUFBTVksSUFBTixDQUFXLEdBQVgsQ0FBdkIsRUFBd0NDLFVBQVViLEdBQUcsQ0FBSCxDQUFsRCxFQUFsQjtBQUNELE9BTks7O0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBTjtBQU9BLFdBQU9ILFNBQVA7QUFDRCxHOztXQWQ2QmlCLGE7Ozs7U0FBQUEsYSIsImZpbGUiOiJtYWtlVGVtcGxhdGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5vbmUgZnJvbSAnYXJyYXktZm9yZWFjaC1hc3luYydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgc2hlbGxqcyBmcm9tICdzaGVsbGpzJ1xuaW1wb3J0IHsgZm9ybWF0IH0gZnJvbSAnLi4vZm9ybWF0dGVyJ1xuaW1wb3J0IGdldEZpbGVTdHJ1Y3R1cmUgZnJvbSAnLi9nZXRGaWxlU3RydWN0dXJlJ1xuY29uc3QgeyByZXNvbHZlIH0gPSBwYXRoXG5jb25zdCB7IGNhdCB9ID0gc2hlbGxqc1xubm9uZSAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBtYWtlVGVtcGxhdGVzIChjb25maWcpIHtcbiAgY29uc3Qge21haW59ID0gZ2V0RmlsZVN0cnVjdHVyZShjb25maWcpXG4gIGNvbnN0IHRlbXBsYXRlcyA9IHt9XG4gIC8vIFtwYXRoLWxpc3QsIG5hbWVdc1xuICBjb25zdCB0ZW1wbGF0ZUZpbGVzID0gbWFpbi5maWx0ZXIoZWwgPT4gZWxbMV0ubWF0Y2goL18uKiQvKSlcbiAgLy8g44OG44Oz44OX44Os44O844OI44OV44Kh44Kk44OrXG4gIGF3YWl0IHRlbXBsYXRlRmlsZXMuZm9yRWFjaEFzeW5jKGFzeW5jIGVsID0+IHtcbiAgICBjb25zdCBwYXRoID0gcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBjb25maWcuV29ya2luZ0RpciwgY29uZmlnLlNyY0RpciwgLi4uZWxbMF0sIGVsWzFdKVxuICAgIGNvbnN0IG9sZCA9IGNhdChwYXRoKS5zdGRvdXRcbiAgICBjb25zdCBjb2RlID0gYXdhaXQgZm9ybWF0KG9sZCwgY29uZmlnKVxuICAgIGNvbnN0IG5hbWUgPSBlbFsxXS5tYXRjaCgvXyguKylcXC5jcHAvKVsxXVxuICAgIHRlbXBsYXRlc1tuYW1lXSA9IHtvbGQsIGNvZGUsIG5hbWVzcGFjZTogZWxbMF0uam9pbignLycpLCBmaWxlbmFtZTogZWxbMV19XG4gIH0pXG4gIHJldHVybiB0ZW1wbGF0ZXNcbn1cbiJdfQ==