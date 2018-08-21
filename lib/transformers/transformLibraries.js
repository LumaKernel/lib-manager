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
      if (!templates[el.name]) throw `template ${el.name} not found`;
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

require('source-map-support/register');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtTGlicmFyaWVzLmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsImxpYnMiLCJ0ZW1wbGF0ZXMiLCJrZXkiLCJub3ciLCJwcm9jZXNzaW5nIiwiY29kZXMiLCJjb2RlIiwicmVmYWN0b3JlZCIsImVuY2xvc2VkIiwiZm9yRWFjaCIsImVsIiwibmFtZSIsInJlcGxhY2UiLCJpZCIsInJlcXVpcmUiLCJmb3JFYWNoQXN5bmMiLCJmaW5pc2hlZCIsImRmcyIsIm1hcCIsInRyaW0iLCJub25lIiwiT2JqZWN0Iiwia2V5cyIsInRyYW5zZm9ybUxpYnJhcmllcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztnQ0FjQSxXQUFvQkEsTUFBcEIsRUFBNEJDLElBQTVCLEVBQWtDQyxTQUFsQyxFQUE2Q0MsR0FBN0MsRUFBa0Q7QUFDaEQsVUFBTUMsTUFBTUgsS0FBS0UsR0FBTCxDQUFaO0FBQ0EsUUFBSUMsSUFBSUMsVUFBUixFQUFvQixNQUFPLHdCQUF1QkYsR0FBSSx5QkFBbEM7QUFDcEJDLFFBQUlDLFVBQUosR0FBaUIsSUFBakI7QUFDQSxRQUFJQyxRQUFRLENBQUNGLElBQUlHLElBQUwsRUFBV0gsSUFBSUksVUFBZixFQUEyQkosSUFBSUssUUFBL0IsQ0FBWjtBQUNBTCxRQUFJLFFBQUosRUFBY00sT0FBZCxDQUFzQixjQUFNO0FBQzFCLFVBQUksQ0FBQ1IsVUFBVVMsR0FBR0MsSUFBYixDQUFMLEVBQXlCLE1BQU8sWUFBV0QsR0FBR0MsSUFBSyxZQUExQjtBQUN6Qk4sWUFBTSxDQUFOLElBQVdBLE1BQU0sQ0FBTixFQUFTTyxPQUFULENBQWlCLGNBQUtGLEdBQUdHLEVBQVIsQ0FBakIsRUFBK0IsY0FBYUgsR0FBR0MsSUFBSyxLQUFJVixVQUFVUyxHQUFHQyxJQUFiLEVBQW1CTCxJQUFLLFNBQWhGLENBQVg7QUFDRCxLQUhEO0FBSUEsVUFBTUgsSUFBSVcsT0FBSixDQUFZQyxZQUFaO0FBQUEsb0NBQXlCLFdBQU1MLEVBQU4sRUFBWTtBQUN6QyxZQUFJLENBQUNWLEtBQUtVLEdBQUdDLElBQVIsRUFBY0ssUUFBbkIsRUFBNkIsTUFBTUMsSUFBSWxCLE1BQUosRUFBWUMsSUFBWixFQUFrQkMsU0FBbEIsRUFBNkJTLEdBQUdDLElBQWhDLEVBQXNDWCxLQUFLVSxHQUFHQyxJQUFSLENBQXRDLENBQU47QUFDN0JOLGdCQUFRQSxNQUFNYSxHQUFOLENBQVU7QUFBQSxpQkFBUVosS0FBS00sT0FBTCxDQUFhLGNBQUtGLEdBQUdHLEVBQVIsQ0FBYixFQUEwQmIsS0FBS1UsR0FBR0MsSUFBUixFQUFjSCxRQUF4QyxDQUFSO0FBQUEsU0FBVixDQUFSO0FBQ0QsT0FISzs7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFOO0FBSUFMLFFBQUlHLElBQUosR0FBVyxNQUFNLHVCQUFPRCxNQUFNLENBQU4sRUFBU2MsSUFBVCxFQUFQLEVBQXdCcEIsTUFBeEIsQ0FBakI7QUFDQUksUUFBSUksVUFBSixHQUFpQixNQUFNLHVCQUFPRixNQUFNLENBQU4sQ0FBUCxFQUFpQk4sTUFBakIsQ0FBdkI7QUFDQUksUUFBSUssUUFBSixHQUFlLE1BQU0sdUJBQU9ILE1BQU0sQ0FBTixDQUFQLEVBQWlCTixNQUFqQixDQUFyQjtBQUNBSSxRQUFJYSxRQUFKLEdBQWUsSUFBZjtBQUNELEc7O2tCQWpCY0MsRzs7Ozs7OztBQWRmOzs7O0FBQ0E7O0FBQ0E7Ozs7OztBQUNBRyw0QixDQUFNOztBQUVOOzs7OzsrQkFHZSxXQUFtQ3JCLE1BQW5DLEVBQTJDQyxJQUEzQyxFQUFpREMsU0FBakQsRUFBNEQ7QUFDekUsVUFBTW9CLE9BQU9DLElBQVAsQ0FBWXRCLElBQVosRUFBa0JlLFlBQWxCO0FBQUEsb0NBQStCLFdBQU1iLEdBQU4sRUFBYTtBQUNoRCxZQUFJLENBQUNGLEtBQUtFLEdBQUwsRUFBVWMsUUFBZixFQUF5QixNQUFNQyxJQUFJbEIsTUFBSixFQUFZQyxJQUFaLEVBQWtCQyxTQUFsQixFQUE2QkMsR0FBN0IsQ0FBTjtBQUMxQixPQUZLOztBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQU47QUFHRCxHOztXQUo2QnFCLGtCOzs7O1NBQUFBLGtCIiwiZmlsZSI6InRyYW5zZm9ybUxpYnJhcmllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBub25lIGZyb20gJ2FycmF5LWZvcmVhY2gtYXN5bmMnXG5pbXBvcnQgeyBmb3JtYXQgfSBmcm9tICcuLi9mb3JtYXR0ZXInXG5pbXBvcnQgeyBoYXNoIH0gZnJvbSAnLi4vaWQnXG5ub25lICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbi8qKlxuICogIGxpYnPjga5jb2Rl44Gu5Yem55CG44KS44GZ44KLLCDnoLTlo4rjgZnjgotcbiAqL1xuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gdHJhbnNmb3JtTGlicmFyaWVzIChjb25maWcsIGxpYnMsIHRlbXBsYXRlcykge1xuICBhd2FpdCBPYmplY3Qua2V5cyhsaWJzKS5mb3JFYWNoQXN5bmMoYXN5bmMga2V5ID0+IHtcbiAgICBpZiAoIWxpYnNba2V5XS5maW5pc2hlZCkgYXdhaXQgZGZzKGNvbmZpZywgbGlicywgdGVtcGxhdGVzLCBrZXkpXG4gIH0pXG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRmcyAoY29uZmlnLCBsaWJzLCB0ZW1wbGF0ZXMsIGtleSkge1xuICBjb25zdCBub3cgPSBsaWJzW2tleV1cbiAgaWYgKG5vdy5wcm9jZXNzaW5nKSB0aHJvdyBgW3RyYW5zZm9ybUxpYnJhcmllc10gJHtrZXl9IDogY2Fubm90IGluY2x1ZGUgY3ljbGVgXG4gIG5vdy5wcm9jZXNzaW5nID0gdHJ1ZVxuICBsZXQgY29kZXMgPSBbbm93LmNvZGUsIG5vdy5yZWZhY3RvcmVkLCBub3cuZW5jbG9zZWRdXG4gIG5vd1snaW1wb3J0J10uZm9yRWFjaChlbCA9PiB7XG4gICAgaWYgKCF0ZW1wbGF0ZXNbZWwubmFtZV0pIHRocm93IGB0ZW1wbGF0ZSAke2VsLm5hbWV9IG5vdCBmb3VuZGBcbiAgICBjb2Rlc1sxXSA9IGNvZGVzWzFdLnJlcGxhY2UoaGFzaChlbC5pZCksIGAvLyBAaW1wb3J0ICR7ZWwubmFtZX1cXG4ke3RlbXBsYXRlc1tlbC5uYW1lXS5jb2RlfVxcbi8vIEBAYClcbiAgfSlcbiAgYXdhaXQgbm93LnJlcXVpcmUuZm9yRWFjaEFzeW5jKGFzeW5jIGVsID0+IHtcbiAgICBpZiAoIWxpYnNbZWwubmFtZV0uZmluaXNoZWQpIGF3YWl0IGRmcyhjb25maWcsIGxpYnMsIHRlbXBsYXRlcywgZWwubmFtZSwgbGlic1tlbC5uYW1lXSlcbiAgICBjb2RlcyA9IGNvZGVzLm1hcChjb2RlID0+IGNvZGUucmVwbGFjZShoYXNoKGVsLmlkKSwgbGlic1tlbC5uYW1lXS5lbmNsb3NlZCkpXG4gIH0pXG4gIG5vdy5jb2RlID0gYXdhaXQgZm9ybWF0KGNvZGVzWzBdLnRyaW0oKSwgY29uZmlnKVxuICBub3cucmVmYWN0b3JlZCA9IGF3YWl0IGZvcm1hdChjb2Rlc1sxXSwgY29uZmlnKVxuICBub3cuZW5jbG9zZWQgPSBhd2FpdCBmb3JtYXQoY29kZXNbMl0sIGNvbmZpZylcbiAgbm93LmZpbmlzaGVkID0gdHJ1ZVxufVxuIl19