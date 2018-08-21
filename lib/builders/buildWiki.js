'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildWiki = buildWiki;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _makeWikiTop = require('./makeWikiTop');

var _makeWikiTop2 = _interopRequireDefault(_makeWikiTop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { resolve } = _path2.default;
const { readFileSync, writeFileSync, mkdirsSync } = _fsExtra2.default;

const dateFormat = 'YYYY-MM-DD';
const libmanPrefix = 'libman_auto_generated_';

const seqnumGen = function* () {
  let i = 1;
  while (1) yield i++;
};

function buildWiki(config, project) {
  // 指定ディレクトリにwiki.mdを展開していくだけ
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir);
  const dist = resolve(process.cwd(), config.WorkingDir, config.DistDir);
  const dir = resolve(dist, 'wiki');
  mkdirsSync(dir);
  const wikiTop = (0, _makeWikiTop2.default)(readFileSync(resolve(src, 'top.md')).toString(), project.wikis, (0, _moment2.default)().format(dateFormat));
  writeFileSync(resolve(dir, 'top.md'), wikiTop);
  const seqnum = seqnumGen();
  writeWikis(dir, project.wikis, seqnum);
}

function writeWikis(dir, wikis, seqnum) {
  if (wikis.wiki) {
    writeFileSync(resolve(dir, libmanPrefix + seqnum.next().value + '_' + Math.random().toString(36).slice(-8) + '.md'), wikis.wiki);
  }
  if (wikis.child) {
    wikis.child.forEach(child => {
      writeWikis(dir, child, seqnum);
    });
  }
}