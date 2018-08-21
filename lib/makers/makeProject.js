'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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