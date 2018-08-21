'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = transformWiki;

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _escape = require('../helpers/escape');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const libRegExp = name => new RegExp(String.raw`(?<=^|\n)// @ ${name}(?=\n|$)`, 'g');

// dfs
/**
 * 破壊する
 */
function transformWiki(wikiYAML, wikis, libs, paths = []) {
  const namespace = paths.filter(e => e).join('/');
  const lib = Object.values(libs).filter(el => el.namespace === namespace && el.filename === `${wikis.path}.cpp`)[0];
  paths = [...paths, wikis.path];
  const permalink = wikis.permalink || paths.filter(e => e).join('/');
  if (wikis.wiki) {
    Object.entries(libs).forEach(([key, value]) => {
      wikis.wiki = wikis.wiki.replace(libRegExp(key), `${'```cpp'}\n${(0, _escape.mdEscape)(value.code)}\n${'```'}`);
    });
  }
  if (!wikis.title && lib) {
    const title = lib.data.filter(el => el[1] === 'title')[0];
    if (title) wikis.title = title;
  }
  wikis.title = wikis.title || wikis.path;
  wikis.permalink = permalink;
  const data = _extends({}, wikiYAML, {
    permalink,
    title: wikis.title
  });
  if (wikis.wiki) wikis.wiki = `---\n${_jsYaml2.default.safeDump(data)}\n---\n\n${wikis.wiki}`;

  if (wikis.child) {
    wikis.child.forEach(child => {
      transformWiki(wikiYAML, child, libs, paths);
    });
  }
}