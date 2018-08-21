'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = makeWiki;

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { cat, test } = _shelljs2.default;
const { resolve } = _path2.default;

function makeWiki(config, nowdir = null, path = '') {
  if (nowdir === null) nowdir = resolve(process.cwd(), config.WorkingDir, config.SrcDir);
  const wiki = {};
  const wikiYAML = resolve(nowdir, 'wiki.yml');
  if (!test('-e', wikiYAML)) return false;
  const wikiData = _extends({
    type: 'dir',
    order: []
  }, _jsYaml2.default.safeLoad(cat(wikiYAML).stdout));
  wiki.type = wikiData.type;
  if (wikiData.title) wiki.title = wikiData.title;
  if (wikiData.permalink) wiki.permalink = wikiData.permalink;
  wiki.path = path;
  if (Array.isArray(typeof wikiData.orde)) throw `${nowdir} : order must be array`;
  const wikipage = resolve(nowdir, 'wiki.md');
  if (test('-e', wikipage)) wiki.wiki = cat(wikipage).stdout;
  const child = [];
  wikiData.order.forEach(el => {
    const mdfile = resolve(nowdir, el + '.md');
    const newdir = resolve(nowdir, el);
    if (test('-e', mdfile)) {
      child.push({
        path: el,
        type: 'lib',
        wiki: cat(mdfile).stdout
      });
    } else if (test('-e', newdir)) {
      const d = makeWiki(config, newdir, el);
      if (d) child.push(d);
    } else {
      throw `${nowdir} : not found ${mdfile} and ${newdir}/`;
    }
  });
  wiki.child = child;
  return wiki;
}