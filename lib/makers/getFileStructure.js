"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFileStructure;

require("source-map-support/register");

var _path = _interopRequireDefault(require("path"));

var _shelljs = _interopRequireDefault(require("shelljs"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  resolve
} = _path.default;
const {
  ls
} = _shelljs.default;
const {
  existsSync
} = _fsExtra.default;

function getFileStructure(config) {
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir);
  if (!existsSync(src)) throw 'no src';
  const all = ls('-AR', src).map(el => {
    const list = el.split('/');
    const name = list.pop();
    return [list, name];
  });
  const main = all.filter(el => el[1].match(/.*\.cpp$/));
  return {
    all,
    main
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWtlcnMvZ2V0RmlsZVN0cnVjdHVyZS5qcyJdLCJuYW1lcyI6WyJyZXNvbHZlIiwicGF0aCIsImxzIiwic2hlbGxqcyIsImV4aXN0c1N5bmMiLCJmcyIsImdldEZpbGVTdHJ1Y3R1cmUiLCJjb25maWciLCJzcmMiLCJwcm9jZXNzIiwiY3dkIiwiV29ya2luZ0RpciIsIlNyY0RpciIsImFsbCIsIm1hcCIsImVsIiwibGlzdCIsInNwbGl0IiwibmFtZSIsInBvcCIsIm1haW4iLCJmaWx0ZXIiLCJtYXRjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFDQSxNQUFNO0FBQUVBLEVBQUFBO0FBQUYsSUFBY0MsYUFBcEI7QUFDQSxNQUFNO0FBQUVDLEVBQUFBO0FBQUYsSUFBU0MsZ0JBQWY7QUFDQSxNQUFNO0FBQUNDLEVBQUFBO0FBQUQsSUFBZUMsZ0JBQXJCOztBQUVlLFNBQVNDLGdCQUFULENBQTJCQyxNQUEzQixFQUFtQztBQUNoRCxRQUFNQyxHQUFHLEdBQUdSLE9BQU8sQ0FBQ1MsT0FBTyxDQUFDQyxHQUFSLEVBQUQsRUFBZ0JILE1BQU0sQ0FBQ0ksVUFBdkIsRUFBbUNKLE1BQU0sQ0FBQ0ssTUFBMUMsQ0FBbkI7QUFDQSxNQUFJLENBQUNSLFVBQVUsQ0FBQ0ksR0FBRCxDQUFmLEVBQXNCLE1BQU0sUUFBTjtBQUN0QixRQUFNSyxHQUFHLEdBQUdYLEVBQUUsQ0FBQyxLQUFELEVBQVFNLEdBQVIsQ0FBRixDQUFlTSxHQUFmLENBQW1CQyxFQUFFLElBQUk7QUFDbkMsVUFBTUMsSUFBSSxHQUFHRCxFQUFFLENBQUNFLEtBQUgsQ0FBUyxHQUFULENBQWI7QUFDQSxVQUFNQyxJQUFJLEdBQUdGLElBQUksQ0FBQ0csR0FBTCxFQUFiO0FBQ0EsV0FBTyxDQUFDSCxJQUFELEVBQU9FLElBQVAsQ0FBUDtBQUNELEdBSlcsQ0FBWjtBQUtBLFFBQU1FLElBQUksR0FBR1AsR0FBRyxDQUFDUSxNQUFKLENBQVdOLEVBQUUsSUFBSUEsRUFBRSxDQUFDLENBQUQsQ0FBRixDQUFNTyxLQUFOLENBQVksVUFBWixDQUFqQixDQUFiO0FBQ0EsU0FBTztBQUFDVCxJQUFBQSxHQUFEO0FBQU1PLElBQUFBO0FBQU4sR0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBzaGVsbGpzIGZyb20gJ3NoZWxsanMnXG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnXG5jb25zdCB7IHJlc29sdmUgfSA9IHBhdGhcbmNvbnN0IHsgbHMgfSA9IHNoZWxsanNcbmNvbnN0IHtleGlzdHNTeW5jfSA9IGZzXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEZpbGVTdHJ1Y3R1cmUgKGNvbmZpZykge1xuICBjb25zdCBzcmMgPSByZXNvbHZlKHByb2Nlc3MuY3dkKCksIGNvbmZpZy5Xb3JraW5nRGlyLCBjb25maWcuU3JjRGlyKVxuICBpZiAoIWV4aXN0c1N5bmMoc3JjKSkgdGhyb3cgJ25vIHNyYydcbiAgY29uc3QgYWxsID0gbHMoJy1BUicsIHNyYykubWFwKGVsID0+IHtcbiAgICBjb25zdCBsaXN0ID0gZWwuc3BsaXQoJy8nKVxuICAgIGNvbnN0IG5hbWUgPSBsaXN0LnBvcCgpXG4gICAgcmV0dXJuIFtsaXN0LCBuYW1lXVxuICB9KVxuICBjb25zdCBtYWluID0gYWxsLmZpbHRlcihlbCA9PiBlbFsxXS5tYXRjaCgvLipcXC5jcHAkLykpXG4gIHJldHVybiB7YWxsLCBtYWlufVxufVxuIl19