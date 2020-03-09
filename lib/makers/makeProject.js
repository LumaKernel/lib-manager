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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWtlcnMvbWFrZVByb2plY3QuanMiXSwibmFtZXMiOlsibm9uZSIsIm1ha2VQcm9qZWN0IiwiY29uZmlnIiwibGlicyIsImZpbGVzIiwidGVtcGxhdGVzIiwid2lraXMiLCJ3aWtpWUFNTCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQUEsMkIsQ0FBTTs7QUFFUyxlQUFlQyxXQUFmLENBQTRCQyxNQUE1QixFQUFvQztBQUNqRCxRQUFNO0FBQUNDLElBQUFBLElBQUQ7QUFBT0MsSUFBQUE7QUFBUCxNQUFnQixNQUFNLDRCQUFjRixNQUFkLENBQTVCO0FBQ0EsUUFBTUcsU0FBUyxHQUFHLE1BQU0sNEJBQWNILE1BQWQsQ0FBeEI7QUFDQSxRQUFNSSxLQUFLLEdBQUcsdUJBQVNKLE1BQVQsQ0FBZDtBQUNBLE1BQUksQ0FBQ0ksS0FBTCxFQUFZLE1BQU8sa0NBQVA7QUFDWixRQUFNLGlDQUFtQkosTUFBbkIsRUFBMkJDLElBQTNCLEVBQWlDRSxTQUFqQyxDQUFOO0FBQ0EsOEJBQWNILE1BQU0sQ0FBQ0ssUUFBckIsRUFBK0JELEtBQS9CLEVBQXNDSCxJQUF0QztBQUNBLFNBQU87QUFBRUcsSUFBQUEsS0FBRjtBQUFTSCxJQUFBQSxJQUFUO0FBQWVDLElBQUFBLEtBQWY7QUFBc0JDLElBQUFBO0FBQXRCLEdBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtYWtlTGlicmFyaWVzIGZyb20gJy4vbWFrZUxpYnJhcmllcydcbmltcG9ydCBtYWtlVGVtcGxhdGVzIGZyb20gJy4vbWFrZVRlbXBsYXRlcydcbmltcG9ydCBtYWtlV2lraSBmcm9tICcuL21ha2VXaWtpJ1xuaW1wb3J0IHRyYW5zZm9ybUxpYnJhcmllcyBmcm9tICcuLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtTGlicmFyaWVzJ1xuaW1wb3J0IHRyYW5zZm9ybVdpa2kgZnJvbSAnLi4vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybVdpa2knXG5pbXBvcnQgbm9uZSBmcm9tICdhcnJheS1mb3JlYWNoLWFzeW5jJ1xubm9uZSAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBtYWtlUHJvamVjdCAoY29uZmlnKSB7XG4gIGNvbnN0IHtsaWJzLCBmaWxlc30gPSBhd2FpdCBtYWtlTGlicmFyaWVzKGNvbmZpZylcbiAgY29uc3QgdGVtcGxhdGVzID0gYXdhaXQgbWFrZVRlbXBsYXRlcyhjb25maWcpXG4gIGNvbnN0IHdpa2lzID0gbWFrZVdpa2koY29uZmlnKVxuICBpZiAoIXdpa2lzKSB0aHJvdyBgeW91IG11c3QgcHV0IHdpa2kueW1sIGluIHNyYyBkaXJgXG4gIGF3YWl0IHRyYW5zZm9ybUxpYnJhcmllcyhjb25maWcsIGxpYnMsIHRlbXBsYXRlcylcbiAgdHJhbnNmb3JtV2lraShjb25maWcud2lraVlBTUwsIHdpa2lzLCBsaWJzKVxuICByZXR1cm4geyB3aWtpcywgbGlicywgZmlsZXMsIHRlbXBsYXRlcyB9XG59XG4iXX0=