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
  const libs = await (0, _makeLibraries.default)(config);
  const templates = await (0, _makeTemplates.default)(config);
  const wikis = (0, _makeWiki.default)(config);
  if (!wikis) throw `you must put wiki.yml in src dir`;
  await (0, _transformLibraries.default)(config, libs, templates);
  (0, _transformWiki.default)(config.wikiYAML, wikis, libs);
  return {
    wikis,
    libs,
    templates
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWtlcnMvbWFrZVByb2plY3QuanMiXSwibmFtZXMiOlsibm9uZSIsIm1ha2VQcm9qZWN0IiwiY29uZmlnIiwibGlicyIsInRlbXBsYXRlcyIsIndpa2lzIiwid2lraVlBTUwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0FBLDJCLENBQU07O0FBRVMsZUFBZUMsV0FBZixDQUE0QkMsTUFBNUIsRUFBb0M7QUFDakQsUUFBTUMsSUFBSSxHQUFHLE1BQU0sNEJBQWNELE1BQWQsQ0FBbkI7QUFDQSxRQUFNRSxTQUFTLEdBQUcsTUFBTSw0QkFBY0YsTUFBZCxDQUF4QjtBQUNBLFFBQU1HLEtBQUssR0FBRyx1QkFBU0gsTUFBVCxDQUFkO0FBQ0EsTUFBSSxDQUFDRyxLQUFMLEVBQVksTUFBTyxrQ0FBUDtBQUNaLFFBQU0saUNBQW1CSCxNQUFuQixFQUEyQkMsSUFBM0IsRUFBaUNDLFNBQWpDLENBQU47QUFDQSw4QkFBY0YsTUFBTSxDQUFDSSxRQUFyQixFQUErQkQsS0FBL0IsRUFBc0NGLElBQXRDO0FBQ0EsU0FBTztBQUFFRSxJQUFBQSxLQUFGO0FBQVNGLElBQUFBLElBQVQ7QUFBZUMsSUFBQUE7QUFBZixHQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWFrZUxpYnJhcmllcyBmcm9tICcuL21ha2VMaWJyYXJpZXMnXG5pbXBvcnQgbWFrZVRlbXBsYXRlcyBmcm9tICcuL21ha2VUZW1wbGF0ZXMnXG5pbXBvcnQgbWFrZVdpa2kgZnJvbSAnLi9tYWtlV2lraSdcbmltcG9ydCB0cmFuc2Zvcm1MaWJyYXJpZXMgZnJvbSAnLi4vdHJhbnNmb3JtZXJzL3RyYW5zZm9ybUxpYnJhcmllcydcbmltcG9ydCB0cmFuc2Zvcm1XaWtpIGZyb20gJy4uL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1XaWtpJ1xuaW1wb3J0IG5vbmUgZnJvbSAnYXJyYXktZm9yZWFjaC1hc3luYydcbm5vbmUgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gbWFrZVByb2plY3QgKGNvbmZpZykge1xuICBjb25zdCBsaWJzID0gYXdhaXQgbWFrZUxpYnJhcmllcyhjb25maWcpXG4gIGNvbnN0IHRlbXBsYXRlcyA9IGF3YWl0IG1ha2VUZW1wbGF0ZXMoY29uZmlnKVxuICBjb25zdCB3aWtpcyA9IG1ha2VXaWtpKGNvbmZpZylcbiAgaWYgKCF3aWtpcykgdGhyb3cgYHlvdSBtdXN0IHB1dCB3aWtpLnltbCBpbiBzcmMgZGlyYFxuICBhd2FpdCB0cmFuc2Zvcm1MaWJyYXJpZXMoY29uZmlnLCBsaWJzLCB0ZW1wbGF0ZXMpXG4gIHRyYW5zZm9ybVdpa2koY29uZmlnLndpa2lZQU1MLCB3aWtpcywgbGlicylcbiAgcmV0dXJuIHsgd2lraXMsIGxpYnMsIHRlbXBsYXRlcyB9XG59XG4iXX0=