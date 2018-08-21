'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildInit;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { resolve } = _path2.default;
const { existsSync, writeFileSync, readFileSync } = _fsExtra2.default;

function buildInit(config, project) {
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir);
  const printlistPath = resolve(src, 'printlist.json');
  const printedPath = resolve(src, 'printed.json');
  if (existsSync(printlistPath)) throw '"printlist.json" already exists';
  if (!existsSync(printedPath)) {
    writeFileSync(printedPath, '{}');
  }
  const printed = JSON.parse(readFileSync(printedPath).toString());
  const printlist = [];
  Object.entries(project.libs).forEach(([key, value]) => {
    if (printed[key] === value.code) return;
    printlist.push(key);
  });
  writeFileSync(printlistPath, JSON.stringify(printlist));
}