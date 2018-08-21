'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = build;

var _fsExtra = require('fs-extra');

var _path = require('path');

var _buildPrintable = require('../builders/buildPrintable');

var _buildPrintable2 = _interopRequireDefault(_buildPrintable);

var _buildSnippets = require('../builders/buildSnippets');

var _buildWiki = require('../builders/buildWiki');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const libmanPrefix = 'libman_auto_generated_';

function build(config, project, one = false) {
  const src = (0, _path.resolve)(process.cwd(), config.WorkingDir, config.SrcDir);
  const dist = (0, _path.resolve)(process.cwd(), config.WorkingDir, config.DistDir);

  const printlistPath = (0, _path.resolve)(src, 'printlist.json');
  const printlistUsedPath = (0, _path.resolve)(src, 'printlist_used.json');
  const printedPath = (0, _path.resolve)(src, 'printed.json');

  if (one && !(0, _fsExtra.existsSync)(printlistPath)) {
    throw "'printlist.json' is needed. build --init";
  }

  if (one && !(0, _fsExtra.existsSync)(printedPath)) {
    (0, _fsExtra.writeFileSync)(printedPath, '{}');
  }

  check(config.CopyWiki, 'wiki');

  (0, _fsExtra.removeSync)(dist);
  (0, _fsExtra.mkdirsSync)(dist);
  // wikiを作る
  (0, _buildWiki.buildWiki)(config, project);
  autoRemove(config.CopyWiki);
  copy(dist, config.CopyWiki, 'wiki');
  // snippetsを作る(1ファイル)
  const snippet = (0, _buildSnippets.makeSnippet)(config, project.libs);
  (0, _fsExtra.writeFileSync)((0, _path.resolve)(dist, 'libman.snip'), snippet);
  copy(dist, config.CopySnippet, 'libman.snip');

  // printable-one-pageを作る
  if (one) {
    const printlist = JSON.parse((0, _fsExtra.readFileSync)(printlistPath));
    const printed = JSON.parse((0, _fsExtra.readFileSync)(printedPath));
    const { printed: newPrinted, printable } = (0, _buildPrintable2.default)(config.printableYAML, printlist, printed, project.libs);
    (0, _fsExtra.writeFileSync)((0, _path.resolve)(dist, 'printable.md'), printable);
    copy(dist, config.CopyPrintable, 'printable.md');
    (0, _fsExtra.writeFileSync)(printedPath, JSON.stringify(newPrinted));

    (0, _fsExtra.renameSync)(printlistPath, printlistUsedPath);
  }
}

function check(data, name) {
  if (data && typeof data === 'string') {
    const cp = (0, _path.resolve)(process.cwd(), data);
    if (!(0, _fsExtra.existsSync)(cp)) {
      throw `${cp} doesn't exist, skipped copy ` + name;
    }
  }
}

function copy(dist, data, name) {
  if (data && typeof data === 'string') {
    const cp = (0, _path.resolve)(process.cwd(), data);
    (0, _fsExtra.copySync)((0, _path.resolve)(dist, name), cp);
  }
}

function autoRemove(data) {
  if (data && typeof data === 'string') {
    const dir = (0, _path.resolve)(process.cwd(), data);
    (0, _fsExtra.readdirSync)(dir).filter(file => new RegExp(String.raw`^${libmanPrefix}.*\.md$`).test(file)).forEach(file => {
      (0, _fsExtra.removeSync)((0, _path.resolve)(dir, file));
    });
  }
}