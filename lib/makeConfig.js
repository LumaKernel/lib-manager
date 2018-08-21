'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = makeConfig;

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _shelljs = require('shelljs');

var _defaultConfig = require('./constants/defaultConfig');

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeConfig(setting) {
  if (!(0, _shelljs.test)('-ef', setting)) throw `no setting file ${setting}`;
  const config = _extends({}, (0, _defaultConfig2.default)(), _jsYaml2.default.safeLoad((0, _shelljs.cat)(setting)));
  ['CopyWiki', 'CopySnippet', 'CopyPrintable'].forEach(el => {
    if (process.env.HOME) {
      config[el] = config[el].replace(/~/g, process.env.HOME);
    }
  });
  return config;
}