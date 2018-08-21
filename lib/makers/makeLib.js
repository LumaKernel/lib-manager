'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeLib = undefined;

let makeLib = exports.makeLib = (() => {
  var _ref = _asyncToGenerator(function* (old, namespace, filename, config) {
    const IDMaker = (0, _id.makeIDMaker)();
    let code = old; // いわゆるsnippet用のコード
    code = yield (0, _formatter.format)(code, config);

    // データ抽出
    const data = (code.match(new RegExp(dataRegExp, 'g')) || []).map(function (el) {
      return el.match(dataRegExp);
    }) // [all, name, data]
    .map(function (el) {
      return el.shift(), Array.from(el);
    }) // [name, data]
    .filter(function (el) {
      return el[0] !== 'import';
    });
    let name = data.filter(function (el) {
      return el[0] === 'name';
    })[0];
    if (!name) throw `${namespace || '.'}/${filename} : no name`;
    name = name[1];
    //

    // ライブラリに関して
    const libraryRegExp = makeLibraryRegExp('!' + name);
    const enclosureCount = (code.match(makeLibraryRegExp('=' + name, 'g')) || []).length;
    if (enclosureCount >= 2) throw `${name} : cannot handle 2 or more encsolures "/// ---..."`;
    const requirements = (code.match(new RegExp(libraryRegExp, 'g')) || []).map(function (el) {
      return {
        old: el, name: el.match(libraryRegExp)[2], id: IDMaker.next().value
      };
    }); // {old, name}
    // ライブラリの置き換え
    {
      let i = 0;
      code = code.replace(new RegExp(libraryRegExp, 'g'), function () {
        return (0, _id.hash)(requirements[i++].id);
      });
    }
    //

    // import 抽出
    const imports = (code.match(new RegExp(importRegExp, 'g')) || []).map(function (el) {
      return Array.from(el.match(importRegExp));
    }) // [all, name, code]
    .map(function (el) {
      return { name: el[1], old: el[2], id: IDMaker.next().value };
    });

    let refactored = code; // ここから分岐

    code = code.replace(new RegExp(importRegExp, 'g'), '');
    {
      // import の置き換え
      let i = 0;
      refactored = refactored.replace(new RegExp(importRegExp, 'g'), function () {
        return (0, _id.hash)(imports[i++].id);
      });
    }

    // data の置き換え
    code = code.replace(new RegExp(dataRegExp, 'g'), '');
    // refactored からは消さない

    // ライブラリの終わりが単体で残ると崩れる
    if (libEndRegExp.test(code.replace(makeLibraryRegExp('=' + name, 'g'), ''))) throw `${name} : cannot include unit lib end`;

    if (enclosureCount === 0) {
      code = enclose(name, code);
      refactored = enclose(name, refactored);
    }

    const enclosed = code.match(makeLibraryRegExp('=' + name))[0];

    return {
      name,
      data: {
        namespace,
        filename,
        code, // スニペット用
        refactored, // もとのコード置き換え用
        enclosed, // 他のrefactoredものに埋め込む用
        data,
        old,
        require: requirements,
        import: imports,
        finished: false,
        processing: false
      }
    };
  });

  return function makeLib(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
})();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _formatter = require('../formatter');

var _id = require('../id');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { resolve } = _path2.default;
const { cat } = _shelljs2.default;

const importRegExp = /(?<=^|\n)\/\/ @import (.+)\n?([\s\S]*?)\n\/\/ @@(?=\n|$)/;
const dataRegExp = /(?<=^|\n)\/\/ @(.+?) (.+)(?:\n|$)/;
// (?<=^|\n)([ \t]*)\/\/\/ --- (?!Foo Lib)(.+?) {{{ \/\/\/[\s\S]*?\n\1\/\/\/ }}}--- \/\/\/(?=\n|$)
const makeLibraryRegExp = (ex, flags) => new RegExp(String.raw`(?<=^|\n)([ \t]*)\/\/\/ --- (?${ex})(.+?) {{{ \/\/\/[\s\S]*?\n${'\\1'}\/\/\/ }}}--- \/\/\/(?=\n|$)`, flags);
const libEndRegExp = /(?:^|\n)[ \t]*\/\/\/ }}}--- \/\/\/(?:\n|&)/;

const enclose = (name, code) => `/// --- ${name} {{{ ///\n${code}\n/// }}}--- ///`;