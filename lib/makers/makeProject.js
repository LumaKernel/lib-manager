'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('source-map-support/register');

var _makeLibraries = require('./makeLibraries');

var _makeLibraries2 = _interopRequireDefault(_makeLibraries);

var _makeTemplates = require('./makeTemplates');

var _makeTemplates2 = _interopRequireDefault(_makeTemplates);

var _makeWiki = require('./makeWiki');

var _makeWiki2 = _interopRequireDefault(_makeWiki);

var _transformLibraries = require('../transformers/transformLibraries');

var _transformLibraries2 = _interopRequireDefault(_transformLibraries);

var _transformWiki = require('../transformers/transformWiki');

var _transformWiki2 = _interopRequireDefault(_transformWiki);

var _arrayForeachAsync = require('array-foreach-async');

var _arrayForeachAsync2 = _interopRequireDefault(_arrayForeachAsync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_arrayForeachAsync2.default; // eslint-disable-line

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (config) {
    const libs = yield (0, _makeLibraries2.default)(config);
    const templates = yield (0, _makeTemplates2.default)(config);
    const wikis = (0, _makeWiki2.default)(config);
    if (!wikis) throw `you must put wiki.yml in src dir`;
    yield (0, _transformLibraries2.default)(config, libs, templates);
    (0, _transformWiki2.default)(config.wikiYAML, wikis, libs);
    return { wikis, libs, templates };
  });

  function makeProject(_x) {
    return _ref.apply(this, arguments);
  }

  return makeProject;
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWtlcnMvbWFrZVByb2plY3QuanMiXSwibmFtZXMiOlsibm9uZSIsImNvbmZpZyIsImxpYnMiLCJ0ZW1wbGF0ZXMiLCJ3aWtpcyIsIndpa2lZQU1MIiwibWFrZVByb2plY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUNBQSw0QixDQUFNOzs7K0JBRVMsV0FBNEJDLE1BQTVCLEVBQW9DO0FBQ2pELFVBQU1DLE9BQU8sTUFBTSw2QkFBY0QsTUFBZCxDQUFuQjtBQUNBLFVBQU1FLFlBQVksTUFBTSw2QkFBY0YsTUFBZCxDQUF4QjtBQUNBLFVBQU1HLFFBQVEsd0JBQVNILE1BQVQsQ0FBZDtBQUNBLFFBQUksQ0FBQ0csS0FBTCxFQUFZLE1BQU8sa0NBQVA7QUFDWixVQUFNLGtDQUFtQkgsTUFBbkIsRUFBMkJDLElBQTNCLEVBQWlDQyxTQUFqQyxDQUFOO0FBQ0EsaUNBQWNGLE9BQU9JLFFBQXJCLEVBQStCRCxLQUEvQixFQUFzQ0YsSUFBdEM7QUFDQSxXQUFPLEVBQUVFLEtBQUYsRUFBU0YsSUFBVCxFQUFlQyxTQUFmLEVBQVA7QUFDRCxHOztXQVI2QkcsVzs7OztTQUFBQSxXIiwiZmlsZSI6Im1ha2VQcm9qZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1ha2VMaWJyYXJpZXMgZnJvbSAnLi9tYWtlTGlicmFyaWVzJ1xuaW1wb3J0IG1ha2VUZW1wbGF0ZXMgZnJvbSAnLi9tYWtlVGVtcGxhdGVzJ1xuaW1wb3J0IG1ha2VXaWtpIGZyb20gJy4vbWFrZVdpa2knXG5pbXBvcnQgdHJhbnNmb3JtTGlicmFyaWVzIGZyb20gJy4uL3RyYW5zZm9ybWVycy90cmFuc2Zvcm1MaWJyYXJpZXMnXG5pbXBvcnQgdHJhbnNmb3JtV2lraSBmcm9tICcuLi90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtV2lraSdcbmltcG9ydCBub25lIGZyb20gJ2FycmF5LWZvcmVhY2gtYXN5bmMnXG5ub25lICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIG1ha2VQcm9qZWN0IChjb25maWcpIHtcbiAgY29uc3QgbGlicyA9IGF3YWl0IG1ha2VMaWJyYXJpZXMoY29uZmlnKVxuICBjb25zdCB0ZW1wbGF0ZXMgPSBhd2FpdCBtYWtlVGVtcGxhdGVzKGNvbmZpZylcbiAgY29uc3Qgd2lraXMgPSBtYWtlV2lraShjb25maWcpXG4gIGlmICghd2lraXMpIHRocm93IGB5b3UgbXVzdCBwdXQgd2lraS55bWwgaW4gc3JjIGRpcmBcbiAgYXdhaXQgdHJhbnNmb3JtTGlicmFyaWVzKGNvbmZpZywgbGlicywgdGVtcGxhdGVzKVxuICB0cmFuc2Zvcm1XaWtpKGNvbmZpZy53aWtpWUFNTCwgd2lraXMsIGxpYnMpXG4gIHJldHVybiB7IHdpa2lzLCBsaWJzLCB0ZW1wbGF0ZXMgfVxufVxuIl19