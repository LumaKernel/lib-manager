'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildPrintable;

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _escape = require('../helpers/escape');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildPrintable(printableYAML, printlist, printed, libs) {
  if (!Array.isArray(printlist)) throw 'printlist must be array';
  const printRaw = [];
  printlist.forEach(name => {
    const libEnt = Object.entries(libs).filter(([key, value]) => key === name)[0];
    if (libEnt) {
      printed[name] = libEnt[1].code;
      printRaw.push(`<span class="lib-title">${name}</span>\n\n${'```'}\n${(0, _escape.mdEscape)(libEnt[1].code)}\n${'```'}`);
    }
  });
  return {
    printed,
    printable: '```\n' + _jsYaml2.default.safeDump(printableYAML) + '\n```\n\n' + printRaw.join('\n\n')
  };
}