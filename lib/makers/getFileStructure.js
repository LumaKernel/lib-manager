'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFileStructure;

require('source-map-support/register');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { resolve } = _path2.default;
const { ls } = _shelljs2.default;
const { existsSync } = _fsExtra2.default;

function getFileStructure(config) {
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir);
  if (!existsSync(src)) throw 'no src';
  const all = ls('-AR', src).map(el => {
    const list = el.split('/');
    const name = list.pop();
    return [list, name];
  });
  const main = all.filter(el => el[1].match(/.*\.cpp$/));
  return { all, main };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWtlcnMvZ2V0RmlsZVN0cnVjdHVyZS5qcyJdLCJuYW1lcyI6WyJnZXRGaWxlU3RydWN0dXJlIiwicmVzb2x2ZSIsInBhdGgiLCJscyIsInNoZWxsanMiLCJleGlzdHNTeW5jIiwiZnMiLCJjb25maWciLCJzcmMiLCJwcm9jZXNzIiwiY3dkIiwiV29ya2luZ0RpciIsIlNyY0RpciIsImFsbCIsIm1hcCIsImVsIiwibGlzdCIsInNwbGl0IiwibmFtZSIsInBvcCIsIm1haW4iLCJmaWx0ZXIiLCJtYXRjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBT3dCQSxnQjs7OztBQVB4Qjs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUNBLE1BQU0sRUFBRUMsT0FBRixLQUFjQyxjQUFwQjtBQUNBLE1BQU0sRUFBRUMsRUFBRixLQUFTQyxpQkFBZjtBQUNBLE1BQU0sRUFBQ0MsVUFBRCxLQUFlQyxpQkFBckI7O0FBRWUsU0FBU04sZ0JBQVQsQ0FBMkJPLE1BQTNCLEVBQW1DO0FBQ2hELFFBQU1DLE1BQU1QLFFBQVFRLFFBQVFDLEdBQVIsRUFBUixFQUF1QkgsT0FBT0ksVUFBOUIsRUFBMENKLE9BQU9LLE1BQWpELENBQVo7QUFDQSxNQUFJLENBQUNQLFdBQVdHLEdBQVgsQ0FBTCxFQUFzQixNQUFNLFFBQU47QUFDdEIsUUFBTUssTUFBTVYsR0FBRyxLQUFILEVBQVVLLEdBQVYsRUFBZU0sR0FBZixDQUFtQkMsTUFBTTtBQUNuQyxVQUFNQyxPQUFPRCxHQUFHRSxLQUFILENBQVMsR0FBVCxDQUFiO0FBQ0EsVUFBTUMsT0FBT0YsS0FBS0csR0FBTCxFQUFiO0FBQ0EsV0FBTyxDQUFDSCxJQUFELEVBQU9FLElBQVAsQ0FBUDtBQUNELEdBSlcsQ0FBWjtBQUtBLFFBQU1FLE9BQU9QLElBQUlRLE1BQUosQ0FBV04sTUFBTUEsR0FBRyxDQUFILEVBQU1PLEtBQU4sQ0FBWSxVQUFaLENBQWpCLENBQWI7QUFDQSxTQUFPLEVBQUNULEdBQUQsRUFBTU8sSUFBTixFQUFQO0FBQ0QiLCJmaWxlIjoiZ2V0RmlsZVN0cnVjdHVyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgc2hlbGxqcyBmcm9tICdzaGVsbGpzJ1xuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJ1xuY29uc3QgeyByZXNvbHZlIH0gPSBwYXRoXG5jb25zdCB7IGxzIH0gPSBzaGVsbGpzXG5jb25zdCB7ZXhpc3RzU3luY30gPSBmc1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRGaWxlU3RydWN0dXJlIChjb25maWcpIHtcbiAgY29uc3Qgc3JjID0gcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBjb25maWcuV29ya2luZ0RpciwgY29uZmlnLlNyY0RpcilcbiAgaWYgKCFleGlzdHNTeW5jKHNyYykpIHRocm93ICdubyBzcmMnXG4gIGNvbnN0IGFsbCA9IGxzKCctQVInLCBzcmMpLm1hcChlbCA9PiB7XG4gICAgY29uc3QgbGlzdCA9IGVsLnNwbGl0KCcvJylcbiAgICBjb25zdCBuYW1lID0gbGlzdC5wb3AoKVxuICAgIHJldHVybiBbbGlzdCwgbmFtZV1cbiAgfSlcbiAgY29uc3QgbWFpbiA9IGFsbC5maWx0ZXIoZWwgPT4gZWxbMV0ubWF0Y2goLy4qXFwuY3BwJC8pKVxuICByZXR1cm4ge2FsbCwgbWFpbn1cbn1cbiJdfQ==