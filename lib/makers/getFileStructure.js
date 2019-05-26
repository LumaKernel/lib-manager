"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFileStructure;

require("source-map-support/register");

var _fsExtra = require("fs-extra");

var _klawSync = _interopRequireDefault(require("klaw-sync"));

var _path = _interopRequireDefault(require("path"));

var _relative = _interopRequireDefault(require("relative"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  resolve
} = _path.default;

function getFileStructure(config) {
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir);
  if (!(0, _fsExtra.existsSync)(src)) throw 'no src'; // src下のすべてのファイルのパスを取得

  const all = (0, _klawSync.default)(src, {
    nodir: true
  }).map(el => {
    const list = (0, _relative.default)(src, el.path).split('\\');
    const name = list.pop();
    return [list, name];
  });
  const main = all.filter(el => el[1].match(/.*\.cpp$/));
  return {
    all,
    main
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWtlcnMvZ2V0RmlsZVN0cnVjdHVyZS5qcyJdLCJuYW1lcyI6WyJyZXNvbHZlIiwicGF0aCIsImdldEZpbGVTdHJ1Y3R1cmUiLCJjb25maWciLCJzcmMiLCJwcm9jZXNzIiwiY3dkIiwiV29ya2luZ0RpciIsIlNyY0RpciIsImFsbCIsIm5vZGlyIiwibWFwIiwiZWwiLCJsaXN0Iiwic3BsaXQiLCJuYW1lIiwicG9wIiwibWFpbiIsImZpbHRlciIsIm1hdGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBLE1BQU07QUFBRUEsRUFBQUE7QUFBRixJQUFjQyxhQUFwQjs7QUFFZSxTQUFTQyxnQkFBVCxDQUEyQkMsTUFBM0IsRUFBbUM7QUFDaEQsUUFBTUMsR0FBRyxHQUFHSixPQUFPLENBQUNLLE9BQU8sQ0FBQ0MsR0FBUixFQUFELEVBQWdCSCxNQUFNLENBQUNJLFVBQXZCLEVBQW1DSixNQUFNLENBQUNLLE1BQTFDLENBQW5CO0FBQ0EsTUFBSSxDQUFDLHlCQUFXSixHQUFYLENBQUwsRUFBc0IsTUFBTSxRQUFOLENBRjBCLENBR2hEOztBQUNBLFFBQU1LLEdBQUcsR0FBRyx1QkFBU0wsR0FBVCxFQUFjO0FBQUNNLElBQUFBLEtBQUssRUFBRTtBQUFSLEdBQWQsRUFBNkJDLEdBQTdCLENBQWlDQyxFQUFFLElBQUk7QUFDakQsVUFBTUMsSUFBSSxHQUFHLHVCQUFTVCxHQUFULEVBQWNRLEVBQUUsQ0FBQ1gsSUFBakIsRUFBdUJhLEtBQXZCLENBQTZCLElBQTdCLENBQWI7QUFDQSxVQUFNQyxJQUFJLEdBQUdGLElBQUksQ0FBQ0csR0FBTCxFQUFiO0FBQ0EsV0FBTyxDQUFDSCxJQUFELEVBQU9FLElBQVAsQ0FBUDtBQUNELEdBSlcsQ0FBWjtBQUtBLFFBQU1FLElBQUksR0FBR1IsR0FBRyxDQUFDUyxNQUFKLENBQVdOLEVBQUUsSUFBSUEsRUFBRSxDQUFDLENBQUQsQ0FBRixDQUFNTyxLQUFOLENBQVksVUFBWixDQUFqQixDQUFiO0FBQ0EsU0FBTztBQUFDVixJQUFBQSxHQUFEO0FBQU1RLElBQUFBO0FBQU4sR0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhpc3RzU3luYyB9IGZyb20gJ2ZzLWV4dHJhJ1xyXG5pbXBvcnQga2xhd1N5bmMgZnJvbSAna2xhdy1zeW5jJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgcmVsYXRpdmUgZnJvbSAncmVsYXRpdmUnXHJcbmNvbnN0IHsgcmVzb2x2ZSB9ID0gcGF0aFxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0RmlsZVN0cnVjdHVyZSAoY29uZmlnKSB7XHJcbiAgY29uc3Qgc3JjID0gcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBjb25maWcuV29ya2luZ0RpciwgY29uZmlnLlNyY0RpcilcclxuICBpZiAoIWV4aXN0c1N5bmMoc3JjKSkgdGhyb3cgJ25vIHNyYydcclxuICAvLyBzcmPkuIvjga7jgZnjgbnjgabjga7jg5XjgqHjgqTjg6vjga7jg5HjgrnjgpLlj5blvpdcclxuICBjb25zdCBhbGwgPSBrbGF3U3luYyhzcmMsIHtub2RpcjogdHJ1ZX0pLm1hcChlbCA9PiB7XHJcbiAgICBjb25zdCBsaXN0ID0gcmVsYXRpdmUoc3JjLCBlbC5wYXRoKS5zcGxpdCgnXFxcXCcpXHJcbiAgICBjb25zdCBuYW1lID0gbGlzdC5wb3AoKVxyXG4gICAgcmV0dXJuIFtsaXN0LCBuYW1lXVxyXG4gIH0pXHJcbiAgY29uc3QgbWFpbiA9IGFsbC5maWx0ZXIoZWwgPT4gZWxbMV0ubWF0Y2goLy4qXFwuY3BwJC8pKVxyXG4gIHJldHVybiB7YWxsLCBtYWlufVxyXG59XHJcbiJdfQ==