"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeProject;

require("source-map-support/register");

var _makeLibraries = _interopRequireDefault(require("./makeLibraries"));

var _makeTemplates = _interopRequireDefault(require("./makeTemplates"));

var _makeWiki = _interopRequireDefault(require("./makeWiki"));

var _transformLibraries = _interopRequireDefault(require("../transformers/transformLibraries"));

var _transformWiki = _interopRequireDefault(require("../transformers/transformWiki"));

var _arrayForeachAsync = _interopRequireDefault(require("array-foreach-async"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_arrayForeachAsync.default; // eslint-disable-line

async function makeProject(config) {
  const {
    libs,
    files
  } = await (0, _makeLibraries.default)(config);
  const templates = await (0, _makeTemplates.default)(config);
  const wikis = (0, _makeWiki.default)(config);
  if (!wikis) throw `you must put wiki.yml in src dir`;
  await (0, _transformLibraries.default)(config, libs, templates);
  (0, _transformWiki.default)(config.wikiYAML, wikis, libs);
  return {
    wikis,
    libs,
    files,
    templates
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWtlcnMvbWFrZVByb2plY3QuanMiXSwibmFtZXMiOlsibm9uZSIsIm1ha2VQcm9qZWN0IiwiY29uZmlnIiwibGlicyIsImZpbGVzIiwidGVtcGxhdGVzIiwid2lraXMiLCJ3aWtpWUFNTCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQUEsMkIsQ0FBTTs7QUFFUyxlQUFlQyxXQUFmLENBQTRCQyxNQUE1QixFQUFvQztBQUNqRCxRQUFNO0FBQUNDLElBQUFBLElBQUQ7QUFBT0MsSUFBQUE7QUFBUCxNQUFnQixNQUFNLDRCQUFjRixNQUFkLENBQTVCO0FBQ0EsUUFBTUcsU0FBUyxHQUFHLE1BQU0sNEJBQWNILE1BQWQsQ0FBeEI7QUFDQSxRQUFNSSxLQUFLLEdBQUcsdUJBQVNKLE1BQVQsQ0FBZDtBQUNBLE1BQUksQ0FBQ0ksS0FBTCxFQUFZLE1BQU8sa0NBQVA7QUFDWixRQUFNLGlDQUFtQkosTUFBbkIsRUFBMkJDLElBQTNCLEVBQWlDRSxTQUFqQyxDQUFOO0FBQ0EsOEJBQWNILE1BQU0sQ0FBQ0ssUUFBckIsRUFBK0JELEtBQS9CLEVBQXNDSCxJQUF0QztBQUNBLFNBQU87QUFBRUcsSUFBQUEsS0FBRjtBQUFTSCxJQUFBQSxJQUFUO0FBQWVDLElBQUFBLEtBQWY7QUFBc0JDLElBQUFBO0FBQXRCLEdBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtYWtlTGlicmFyaWVzIGZyb20gJy4vbWFrZUxpYnJhcmllcydcclxuaW1wb3J0IG1ha2VUZW1wbGF0ZXMgZnJvbSAnLi9tYWtlVGVtcGxhdGVzJ1xyXG5pbXBvcnQgbWFrZVdpa2kgZnJvbSAnLi9tYWtlV2lraSdcclxuaW1wb3J0IHRyYW5zZm9ybUxpYnJhcmllcyBmcm9tICcuLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtTGlicmFyaWVzJ1xyXG5pbXBvcnQgdHJhbnNmb3JtV2lraSBmcm9tICcuLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtV2lraSdcclxuaW1wb3J0IG5vbmUgZnJvbSAnYXJyYXktZm9yZWFjaC1hc3luYydcclxubm9uZSAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gbWFrZVByb2plY3QgKGNvbmZpZykge1xyXG4gIGNvbnN0IHtsaWJzLCBmaWxlc30gPSBhd2FpdCBtYWtlTGlicmFyaWVzKGNvbmZpZylcclxuICBjb25zdCB0ZW1wbGF0ZXMgPSBhd2FpdCBtYWtlVGVtcGxhdGVzKGNvbmZpZylcclxuICBjb25zdCB3aWtpcyA9IG1ha2VXaWtpKGNvbmZpZylcclxuICBpZiAoIXdpa2lzKSB0aHJvdyBgeW91IG11c3QgcHV0IHdpa2kueW1sIGluIHNyYyBkaXJgXHJcbiAgYXdhaXQgdHJhbnNmb3JtTGlicmFyaWVzKGNvbmZpZywgbGlicywgdGVtcGxhdGVzKVxyXG4gIHRyYW5zZm9ybVdpa2koY29uZmlnLndpa2lZQU1MLCB3aWtpcywgbGlicylcclxuICByZXR1cm4geyB3aWtpcywgbGlicywgZmlsZXMsIHRlbXBsYXRlcyB9XHJcbn1cclxuIl19