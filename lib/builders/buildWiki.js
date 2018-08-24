"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildWiki = buildWiki;

require("source-map-support/register");

var _fsExtra = _interopRequireWildcard(require("fs-extra"));

var _moment = _interopRequireDefault(require("moment"));

var _path = _interopRequireDefault(require("path"));

var _makeWikiTop = _interopRequireDefault(require("./makeWikiTop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const {
  resolve
} = _path.default;
const {
  readFileSync,
  writeFileSync,
  mkdirsSync
} = _fsExtra.default;
const dateFormat = 'YYYY-MM-DD';
const libmanPrefix = 'libman_auto_generated_';

const seqnumGen = function* () {
  let i = 1;

  while (1) yield i++;
};

function buildWiki(config, project) {
  // 指定ディレクトリにwiki.mdを展開していくだけ
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir);
  const dist = resolve(process.cwd(), config.WorkingDir, config.DistDir);
  const dir = resolve(dist, 'wiki');
  if (!(0, _fsExtra.existsSync)(resolve(src, 'top.md'))) throw `top.md not found`;
  mkdirsSync(dir);
  const wikiTop = (0, _makeWikiTop.default)(readFileSync(resolve(src, 'top.md')).toString(), project.wikis, (0, _moment.default)().format(dateFormat));
  writeFileSync(resolve(dir, 'top.md'), wikiTop);
  const seqnum = seqnumGen();
  writeWikis(dir, project.wikis, seqnum);
}

function writeWikis(dir, wikis, seqnum) {
  if (wikis.wiki) {
    writeFileSync(resolve(dir, libmanPrefix + seqnum.next().value + '_' + Math.random().toString(36).slice(-8) + '.md'), wikis.wiki);
  }

  if (wikis.child) {
    wikis.child.forEach(child => {
      writeWikis(dir, child, seqnum);
    });
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9idWlsZGVycy9idWlsZFdpa2kuanMiXSwibmFtZXMiOlsicmVzb2x2ZSIsInBhdGgiLCJyZWFkRmlsZVN5bmMiLCJ3cml0ZUZpbGVTeW5jIiwibWtkaXJzU3luYyIsImZzIiwiZGF0ZUZvcm1hdCIsImxpYm1hblByZWZpeCIsInNlcW51bUdlbiIsImkiLCJidWlsZFdpa2kiLCJjb25maWciLCJwcm9qZWN0Iiwic3JjIiwicHJvY2VzcyIsImN3ZCIsIldvcmtpbmdEaXIiLCJTcmNEaXIiLCJkaXN0IiwiRGlzdERpciIsImRpciIsIndpa2lUb3AiLCJ0b1N0cmluZyIsIndpa2lzIiwiZm9ybWF0Iiwic2VxbnVtIiwid3JpdGVXaWtpcyIsIndpa2kiLCJuZXh0IiwidmFsdWUiLCJNYXRoIiwicmFuZG9tIiwic2xpY2UiLCJjaGlsZCIsImZvckVhY2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7QUFDQSxNQUFNO0FBQUVBLEVBQUFBO0FBQUYsSUFBY0MsYUFBcEI7QUFDQSxNQUFNO0FBQUVDLEVBQUFBLFlBQUY7QUFBZ0JDLEVBQUFBLGFBQWhCO0FBQStCQyxFQUFBQTtBQUEvQixJQUE4Q0MsZ0JBQXBEO0FBRUEsTUFBTUMsVUFBVSxHQUFHLFlBQW5CO0FBQ0EsTUFBTUMsWUFBWSxHQUFHLHdCQUFyQjs7QUFFQSxNQUFNQyxTQUFTLEdBQUcsYUFBYztBQUM5QixNQUFJQyxDQUFDLEdBQUcsQ0FBUjs7QUFDQSxTQUFPLENBQVAsRUFBVSxNQUFNQSxDQUFDLEVBQVA7QUFDWCxDQUhEOztBQUtPLFNBQVNDLFNBQVQsQ0FBb0JDLE1BQXBCLEVBQTRCQyxPQUE1QixFQUFxQztBQUMxQztBQUNBLFFBQU1DLEdBQUcsR0FBR2IsT0FBTyxDQUFDYyxPQUFPLENBQUNDLEdBQVIsRUFBRCxFQUFnQkosTUFBTSxDQUFDSyxVQUF2QixFQUFtQ0wsTUFBTSxDQUFDTSxNQUExQyxDQUFuQjtBQUNBLFFBQU1DLElBQUksR0FBR2xCLE9BQU8sQ0FBQ2MsT0FBTyxDQUFDQyxHQUFSLEVBQUQsRUFBZ0JKLE1BQU0sQ0FBQ0ssVUFBdkIsRUFBbUNMLE1BQU0sQ0FBQ1EsT0FBMUMsQ0FBcEI7QUFDQSxRQUFNQyxHQUFHLEdBQUdwQixPQUFPLENBQUNrQixJQUFELEVBQU8sTUFBUCxDQUFuQjtBQUNBLE1BQUksQ0FBQyx5QkFBV2xCLE9BQU8sQ0FBQ2EsR0FBRCxFQUFNLFFBQU4sQ0FBbEIsQ0FBTCxFQUF5QyxNQUFPLGtCQUFQO0FBQ3pDVCxFQUFBQSxVQUFVLENBQUNnQixHQUFELENBQVY7QUFDQSxRQUFNQyxPQUFPLEdBQUcsMEJBQ2RuQixZQUFZLENBQUNGLE9BQU8sQ0FBQ2EsR0FBRCxFQUFNLFFBQU4sQ0FBUixDQUFaLENBQXFDUyxRQUFyQyxFQURjLEVBRWRWLE9BQU8sQ0FBQ1csS0FGTSxFQUdkLHVCQUFTQyxNQUFULENBQWdCbEIsVUFBaEIsQ0FIYyxDQUFoQjtBQUlBSCxFQUFBQSxhQUFhLENBQUNILE9BQU8sQ0FBQ29CLEdBQUQsRUFBTSxRQUFOLENBQVIsRUFBeUJDLE9BQXpCLENBQWI7QUFDQSxRQUFNSSxNQUFNLEdBQUdqQixTQUFTLEVBQXhCO0FBQ0FrQixFQUFBQSxVQUFVLENBQUNOLEdBQUQsRUFBTVIsT0FBTyxDQUFDVyxLQUFkLEVBQXFCRSxNQUFyQixDQUFWO0FBQ0Q7O0FBRUQsU0FBU0MsVUFBVCxDQUFxQk4sR0FBckIsRUFBMEJHLEtBQTFCLEVBQWlDRSxNQUFqQyxFQUF5QztBQUN2QyxNQUFJRixLQUFLLENBQUNJLElBQVYsRUFBZ0I7QUFDZHhCLElBQUFBLGFBQWEsQ0FBQ0gsT0FBTyxDQUFDb0IsR0FBRCxFQUNuQmIsWUFBWSxHQUFHa0IsTUFBTSxDQUFDRyxJQUFQLEdBQWNDLEtBQTdCLEdBQXFDLEdBQXJDLEdBQ0NDLElBQUksQ0FBQ0MsTUFBTCxHQUFjVCxRQUFkLENBQXVCLEVBQXZCLEVBQTJCVSxLQUEzQixDQUFpQyxDQUFDLENBQWxDLENBREQsR0FDd0MsS0FGckIsQ0FBUixFQUVxQ1QsS0FBSyxDQUFDSSxJQUYzQyxDQUFiO0FBR0Q7O0FBQ0QsTUFBSUosS0FBSyxDQUFDVSxLQUFWLEVBQWlCO0FBQ2ZWLElBQUFBLEtBQUssQ0FBQ1UsS0FBTixDQUFZQyxPQUFaLENBQW9CRCxLQUFLLElBQUk7QUFDM0JQLE1BQUFBLFVBQVUsQ0FBQ04sR0FBRCxFQUFNYSxLQUFOLEVBQWFSLE1BQWIsQ0FBVjtBQUNELEtBRkQ7QUFHRDtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzLCB7IGV4aXN0c1N5bmMgfSBmcm9tICdmcy1leHRyYSdcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50J1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBtYWtlV2lraVRvcCBmcm9tICcuL21ha2VXaWtpVG9wJ1xuY29uc3QgeyByZXNvbHZlIH0gPSBwYXRoXG5jb25zdCB7IHJlYWRGaWxlU3luYywgd3JpdGVGaWxlU3luYywgbWtkaXJzU3luYyB9ID0gZnNcblxuY29uc3QgZGF0ZUZvcm1hdCA9ICdZWVlZLU1NLUREJ1xuY29uc3QgbGlibWFuUHJlZml4ID0gJ2xpYm1hbl9hdXRvX2dlbmVyYXRlZF8nXG5cbmNvbnN0IHNlcW51bUdlbiA9IGZ1bmN0aW9uICogKCkge1xuICBsZXQgaSA9IDFcbiAgd2hpbGUgKDEpIHlpZWxkIGkrK1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRXaWtpIChjb25maWcsIHByb2plY3QpIHtcbiAgLy8g5oyH5a6a44OH44Kj44Os44Kv44OI44Oq44Grd2lraS5tZOOCkuWxlemWi+OBl+OBpuOBhOOBj+OBoOOBkVxuICBjb25zdCBzcmMgPSByZXNvbHZlKHByb2Nlc3MuY3dkKCksIGNvbmZpZy5Xb3JraW5nRGlyLCBjb25maWcuU3JjRGlyKVxuICBjb25zdCBkaXN0ID0gcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBjb25maWcuV29ya2luZ0RpciwgY29uZmlnLkRpc3REaXIpXG4gIGNvbnN0IGRpciA9IHJlc29sdmUoZGlzdCwgJ3dpa2knKVxuICBpZiAoIWV4aXN0c1N5bmMocmVzb2x2ZShzcmMsICd0b3AubWQnKSkpIHRocm93IGB0b3AubWQgbm90IGZvdW5kYFxuICBta2RpcnNTeW5jKGRpcilcbiAgY29uc3Qgd2lraVRvcCA9IG1ha2VXaWtpVG9wKFxuICAgIHJlYWRGaWxlU3luYyhyZXNvbHZlKHNyYywgJ3RvcC5tZCcpKS50b1N0cmluZygpLFxuICAgIHByb2plY3Qud2lraXMsXG4gICAgbW9tZW50KCkuZm9ybWF0KGRhdGVGb3JtYXQpKVxuICB3cml0ZUZpbGVTeW5jKHJlc29sdmUoZGlyLCAndG9wLm1kJyksIHdpa2lUb3ApXG4gIGNvbnN0IHNlcW51bSA9IHNlcW51bUdlbigpXG4gIHdyaXRlV2lraXMoZGlyLCBwcm9qZWN0Lndpa2lzLCBzZXFudW0pXG59XG5cbmZ1bmN0aW9uIHdyaXRlV2lraXMgKGRpciwgd2lraXMsIHNlcW51bSkge1xuICBpZiAod2lraXMud2lraSkge1xuICAgIHdyaXRlRmlsZVN5bmMocmVzb2x2ZShkaXIsXG4gICAgICBsaWJtYW5QcmVmaXggKyBzZXFudW0ubmV4dCgpLnZhbHVlICsgJ18nICtcbiAgICAgICBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgtOCkgKyAnLm1kJyksIHdpa2lzLndpa2kpXG4gIH1cbiAgaWYgKHdpa2lzLmNoaWxkKSB7XG4gICAgd2lraXMuY2hpbGQuZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICB3cml0ZVdpa2lzKGRpciwgY2hpbGQsIHNlcW51bSlcbiAgICB9KVxuICB9XG59XG4iXX0=