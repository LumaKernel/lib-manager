"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeTemplates;

require("source-map-support/register");

var _arrayForeachAsync = _interopRequireDefault(require("array-foreach-async"));

var _path = _interopRequireDefault(require("path"));

var _shelljs = _interopRequireDefault(require("shelljs"));

var _formatter = require("../formatter");

var _getFileStructure = _interopRequireDefault(require("./getFileStructure"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  resolve
} = _path.default;
const {
  cat
} = _shelljs.default;
_arrayForeachAsync.default; // eslint-disable-line

async function makeTemplates(config) {
  const {
    main
  } = (0, _getFileStructure.default)(config);
  const templates = {}; // [path-list, name]s

  const templateFiles = main.filter(el => el[1].match(/_.*$/)); // テンプレートファイル

  await templateFiles.forEachAsync(async el => {
    const path = resolve(process.cwd(), config.WorkingDir, config.SrcDir, ...el[0], el[1]);
    const old = cat(path).stdout;
    const code = await (0, _formatter.format)(old, config);
    const name = el[1].match(/_(.+)\.cpp/)[1];
    templates[name] = {
      old,
      code,
      namespace: el[0].join('/'),
      filename: el[1]
    };
  });
  return templates;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWtlcnMvbWFrZVRlbXBsYXRlcy5qcyJdLCJuYW1lcyI6WyJyZXNvbHZlIiwicGF0aCIsImNhdCIsInNoZWxsanMiLCJub25lIiwibWFrZVRlbXBsYXRlcyIsImNvbmZpZyIsIm1haW4iLCJ0ZW1wbGF0ZXMiLCJ0ZW1wbGF0ZUZpbGVzIiwiZmlsdGVyIiwiZWwiLCJtYXRjaCIsImZvckVhY2hBc3luYyIsInByb2Nlc3MiLCJjd2QiLCJXb3JraW5nRGlyIiwiU3JjRGlyIiwib2xkIiwic3Rkb3V0IiwiY29kZSIsIm5hbWUiLCJuYW1lc3BhY2UiLCJqb2luIiwiZmlsZW5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0EsTUFBTTtBQUFFQSxFQUFBQTtBQUFGLElBQWNDLGFBQXBCO0FBQ0EsTUFBTTtBQUFFQyxFQUFBQTtBQUFGLElBQVVDLGdCQUFoQjtBQUNBQywyQixDQUFNOztBQUVTLGVBQWVDLGFBQWYsQ0FBOEJDLE1BQTlCLEVBQXNDO0FBQ25ELFFBQU07QUFBQ0MsSUFBQUE7QUFBRCxNQUFTLCtCQUFpQkQsTUFBakIsQ0FBZjtBQUNBLFFBQU1FLFNBQVMsR0FBRyxFQUFsQixDQUZtRCxDQUduRDs7QUFDQSxRQUFNQyxhQUFhLEdBQUdGLElBQUksQ0FBQ0csTUFBTCxDQUFZQyxFQUFFLElBQUlBLEVBQUUsQ0FBQyxDQUFELENBQUYsQ0FBTUMsS0FBTixDQUFZLE1BQVosQ0FBbEIsQ0FBdEIsQ0FKbUQsQ0FLbkQ7O0FBQ0EsUUFBTUgsYUFBYSxDQUFDSSxZQUFkLENBQTJCLE1BQU1GLEVBQU4sSUFBWTtBQUMzQyxVQUFNVixJQUFJLEdBQUdELE9BQU8sQ0FBQ2MsT0FBTyxDQUFDQyxHQUFSLEVBQUQsRUFBZ0JULE1BQU0sQ0FBQ1UsVUFBdkIsRUFBbUNWLE1BQU0sQ0FBQ1csTUFBMUMsRUFBa0QsR0FBR04sRUFBRSxDQUFDLENBQUQsQ0FBdkQsRUFBNERBLEVBQUUsQ0FBQyxDQUFELENBQTlELENBQXBCO0FBQ0EsVUFBTU8sR0FBRyxHQUFHaEIsR0FBRyxDQUFDRCxJQUFELENBQUgsQ0FBVWtCLE1BQXRCO0FBQ0EsVUFBTUMsSUFBSSxHQUFHLE1BQU0sdUJBQU9GLEdBQVAsRUFBWVosTUFBWixDQUFuQjtBQUNBLFVBQU1lLElBQUksR0FBR1YsRUFBRSxDQUFDLENBQUQsQ0FBRixDQUFNQyxLQUFOLENBQVksWUFBWixFQUEwQixDQUExQixDQUFiO0FBQ0FKLElBQUFBLFNBQVMsQ0FBQ2EsSUFBRCxDQUFULEdBQWtCO0FBQUNILE1BQUFBLEdBQUQ7QUFBTUUsTUFBQUEsSUFBTjtBQUFZRSxNQUFBQSxTQUFTLEVBQUVYLEVBQUUsQ0FBQyxDQUFELENBQUYsQ0FBTVksSUFBTixDQUFXLEdBQVgsQ0FBdkI7QUFBd0NDLE1BQUFBLFFBQVEsRUFBRWIsRUFBRSxDQUFDLENBQUQ7QUFBcEQsS0FBbEI7QUFDRCxHQU5LLENBQU47QUFPQSxTQUFPSCxTQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbm9uZSBmcm9tICdhcnJheS1mb3JlYWNoLWFzeW5jJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBzaGVsbGpzIGZyb20gJ3NoZWxsanMnXG5pbXBvcnQgeyBmb3JtYXQgfSBmcm9tICcuLi9mb3JtYXR0ZXInXG5pbXBvcnQgZ2V0RmlsZVN0cnVjdHVyZSBmcm9tICcuL2dldEZpbGVTdHJ1Y3R1cmUnXG5jb25zdCB7IHJlc29sdmUgfSA9IHBhdGhcbmNvbnN0IHsgY2F0IH0gPSBzaGVsbGpzXG5ub25lICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIG1ha2VUZW1wbGF0ZXMgKGNvbmZpZykge1xuICBjb25zdCB7bWFpbn0gPSBnZXRGaWxlU3RydWN0dXJlKGNvbmZpZylcbiAgY29uc3QgdGVtcGxhdGVzID0ge31cbiAgLy8gW3BhdGgtbGlzdCwgbmFtZV1zXG4gIGNvbnN0IHRlbXBsYXRlRmlsZXMgPSBtYWluLmZpbHRlcihlbCA9PiBlbFsxXS5tYXRjaCgvXy4qJC8pKVxuICAvLyDjg4bjg7Pjg5fjg6zjg7zjg4jjg5XjgqHjgqTjg6tcbiAgYXdhaXQgdGVtcGxhdGVGaWxlcy5mb3JFYWNoQXN5bmMoYXN5bmMgZWwgPT4ge1xuICAgIGNvbnN0IHBhdGggPSByZXNvbHZlKHByb2Nlc3MuY3dkKCksIGNvbmZpZy5Xb3JraW5nRGlyLCBjb25maWcuU3JjRGlyLCAuLi5lbFswXSwgZWxbMV0pXG4gICAgY29uc3Qgb2xkID0gY2F0KHBhdGgpLnN0ZG91dFxuICAgIGNvbnN0IGNvZGUgPSBhd2FpdCBmb3JtYXQob2xkLCBjb25maWcpXG4gICAgY29uc3QgbmFtZSA9IGVsWzFdLm1hdGNoKC9fKC4rKVxcLmNwcC8pWzFdXG4gICAgdGVtcGxhdGVzW25hbWVdID0ge29sZCwgY29kZSwgbmFtZXNwYWNlOiBlbFswXS5qb2luKCcvJyksIGZpbGVuYW1lOiBlbFsxXX1cbiAgfSlcbiAgcmV0dXJuIHRlbXBsYXRlc1xufVxuIl19