'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFileStructure;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { resolve } = _path2.default;
const { ls } = _shelljs2.default;
const { existsSync } = _fsExtra2.default;

function getFileStructure(config) {
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir);
  if (!existsSync(src)) throw 'no src';
  const all = ls('-AR', src).map(el => {
    const list = el.split('/');
    const name = list.pop();
    return [list, name];
  });
  const main = all.filter(el => el[1].match(/.*\.cpp$/));
  return { all, main };
}