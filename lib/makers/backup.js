'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = backup;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { copySync, mkdirsSync } = _fsExtra2.default;
const { resolve } = _path2.default;

function backup(config) {
  const dir = resolve(process.cwd(), config.WorkingDir, config.BackUpDir);
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir);
  mkdirsSync(dir);
  const tmp = resolve(dir, Math.random().toString(36).slice(-8));
  copySync(src, tmp);
}