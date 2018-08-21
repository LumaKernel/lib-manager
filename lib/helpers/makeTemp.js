'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeTemp;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { mkdirsSync } = _fsExtra2.default;
const { resolve } = _path2.default;

function makeTemp(config) {
  const temp = resolve(process.cwd(), config.WorkingDir, config.TempDir, Math.random().toString(36).slice(-8));
  mkdirsSync(temp);
  return temp;
}