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

require('source-map-support/register');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWtlcnMvbWFrZUxpYi5qcyJdLCJuYW1lcyI6WyJvbGQiLCJuYW1lc3BhY2UiLCJmaWxlbmFtZSIsImNvbmZpZyIsIklETWFrZXIiLCJjb2RlIiwiZGF0YSIsIm1hdGNoIiwiUmVnRXhwIiwiZGF0YVJlZ0V4cCIsIm1hcCIsImVsIiwic2hpZnQiLCJBcnJheSIsImZyb20iLCJmaWx0ZXIiLCJuYW1lIiwibGlicmFyeVJlZ0V4cCIsIm1ha2VMaWJyYXJ5UmVnRXhwIiwiZW5jbG9zdXJlQ291bnQiLCJsZW5ndGgiLCJyZXF1aXJlbWVudHMiLCJpZCIsIm5leHQiLCJ2YWx1ZSIsImkiLCJyZXBsYWNlIiwiaW1wb3J0cyIsImltcG9ydFJlZ0V4cCIsInJlZmFjdG9yZWQiLCJsaWJFbmRSZWdFeHAiLCJ0ZXN0IiwiZW5jbG9zZSIsImVuY2xvc2VkIiwicmVxdWlyZSIsImltcG9ydCIsImZpbmlzaGVkIiwicHJvY2Vzc2luZyIsIm1ha2VMaWIiLCJyZXNvbHZlIiwicGF0aCIsImNhdCIsInNoZWxsanMiLCJleCIsImZsYWdzIiwiU3RyaW5nIiwicmF3Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OzsrQkFrQk8sV0FBd0JBLEdBQXhCLEVBQTZCQyxTQUE3QixFQUF3Q0MsUUFBeEMsRUFBa0RDLE1BQWxELEVBQTBEO0FBQy9ELFVBQU1DLFVBQVUsc0JBQWhCO0FBQ0EsUUFBSUMsT0FBT0wsR0FBWCxDQUYrRCxDQUVoRDtBQUNmSyxXQUFPLE1BQU0sdUJBQU9BLElBQVAsRUFBYUYsTUFBYixDQUFiOztBQUVBO0FBQ0EsVUFBTUcsT0FBTyxDQUFDRCxLQUNYRSxLQURXLENBQ0wsSUFBSUMsTUFBSixDQUFXQyxVQUFYLEVBQXVCLEdBQXZCLENBREssS0FDMkIsRUFENUIsRUFFVkMsR0FGVSxDQUVOO0FBQUEsYUFBTUMsR0FBR0osS0FBSCxDQUFTRSxVQUFULENBQU47QUFBQSxLQUZNLEVBRXNCO0FBRnRCLEtBR1ZDLEdBSFUsQ0FHTjtBQUFBLGFBQU9DLEdB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dGggZnJvbSAncGF0aCdcbmltcG9ydCBzaGVsbGpzIGZyb20gJ3NoZWxsanMnXG5pbXBvcnQgeyBmb3JtYXQgfSBmcm9tICcuLi9mb3JtYXR0ZXInXG5pbXBvcnQgeyBoYXNoLCBtYWtlSURNYWtlciB9IGZyb20gJy4uL2lkJ1xuY29uc3QgeyByZXNvbHZlIH0gPSBwYXRoXG5jb25zdCB7IGNhdCB9ID0gc2hlbGxqc1xuXG5jb25zdCBpbXBvcnRSZWdFeHAgPSAvKD88PV58XFxuKVxcL1xcLyBAaW1wb3J0ICguKylcXG4/KFtcXHNcXFNdKj8pXFxuXFwvXFwvIEBAKD89XFxufCQpL1xuY29uc3QgZGF0YVJlZ0V4cCA9IC8oPzw9XnxcXG4pXFwvXFwvIEAoLis/KSAoLispKD86XFxufCQpL1xuLy8gKD88PV58XFxuKShbIFxcdF0qKVxcL1xcL1xcLyAtLS0gKD8hRm9vIExpYikoLis/KSB7e3sgXFwvXFwvXFwvW1xcc1xcU10qP1xcblxcMVxcL1xcL1xcLyB9fX0tLS0gXFwvXFwvXFwvKD89XFxufCQpXG5jb25zdCBtYWtlTGlicmFyeVJlZ0V4cCA9IChleCwgZmxhZ3MpID0+IG5ldyBSZWdFeHAoXG4gIFN0cmluZy5yYXdgKD88PV58XFxuKShbIFxcdF0qKVxcL1xcL1xcLyAtLS0gKD8ke2V4fSkoLis/KSB7e3sgXFwvXFwvXFwvW1xcc1xcU10qP1xcbiR7J1xcXFwxJ31cXC9cXC9cXC8gfX19LS0tIFxcL1xcL1xcLyg/PVxcbnwkKWAsXG4gIGZsYWdzXG4pXG5jb25zdCBsaWJFbmRSZWdFeHAgPSAvKD86XnxcXG4pWyBcXHRdKlxcL1xcL1xcLyB9fX0tLS0gXFwvXFwvXFwvKD86XFxufCYpL1xuXG5jb25zdCBlbmNsb3NlID0gKG5hbWUsIGNvZGUpID0+IGAvLy8gLS0tICR7bmFtZX0ge3t7IC8vL1xcbiR7Y29kZX1cXG4vLy8gfX19LS0tIC8vL2BcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1ha2VMaWIgKG9sZCwgbmFtZXNwYWNlLCBmaWxlbmFtZSwgY29uZmlnKSB7XG4gIGNvbnN0IElETWFrZXIgPSBtYWtlSURNYWtlcigpXG4gIGxldCBjb2RlID0gb2xkIC8vIOOBhOOCj+OChuOCi3NuaXBwZXTnlKjjga7jgrPjg7zjg4lcbiAgY29kZSA9IGF3YWl0IGZvcm1hdChjb2RlLCBjb25maWcpXG5cbiAgLy8g44OH44O844K/5oq95Ye6XG4gIGNvbnN0IGRhdGEgPSAoY29kZVxuICAgIC5tYXRjaChuZXcgUmVnRXhwKGRhdGFSZWdFeHAsICdnJykpIHx8IFtdKVxuICAgIC5tYXAoZWwgPT4gZWwubWF0Y2goZGF0YVJlZ0V4cCkpIC8vIFthbGwsIG5hbWUsIGRhdGFdXG4gICAgLm1hcChlbCA9PiAoZWwuc2hpZnQoKSwgQXJyYXkuZnJvbShlbCkpKSAvLyBbbmFtZSwgZGF0YV1cbiAgICAuZmlsdGVyKGVsID0+IGVsWzBdICE9PSAnaW1wb3J0JylcbiAgbGV0IG5hbWUgPSBkYXRhLmZpbHRlcihlbCA9PiBlbFswXSA9PT0gJ25hbWUnKVswXVxuICBpZiAoIW5hbWUpIHRocm93IGAke25hbWVzcGFjZSB8fCAnLid9LyR7ZmlsZW5hbWV9IDogbm8gbmFtZWBcbiAgbmFtZSA9IG5hbWVbMV1cbiAgLy9cblxuICAvLyDjg6njgqTjg5bjg6njg6rjgavplqLjgZfjgaZcbiAgY29uc3QgbGlicmFyeVJlZ0V4cCA9IG1ha2VMaWJyYXJ5UmVnRXhwKCchJyArIG5hbWUpXG4gIGNvbnN0IGVuY2xvc3VyZUNvdW50ID1cbiAgICAgIChjb2RlLm1hdGNoKG1ha2VMaWJyYXJ5UmVnRXhwKCc9JyArIG5hbWUsICdnJykpIHx8IFtdKS5sZW5ndGhcbiAgaWYgKGVuY2xvc3VyZUNvdW50ID49IDIpIHRocm93IGAke25hbWV9IDogY2Fubm90IGhhbmRsZSAyIG9yIG1vcmUgZW5jc29sdXJlcyBcIi8vLyAtLS0uLi5cImBcbiAgY29uc3QgcmVxdWlyZW1lbnRzID0gKGNvZGVcbiAgICAubWF0Y2gobmV3IFJlZ0V4cChsaWJyYXJ5UmVnRXhwLCAnZycpKSB8fCBbXSlcbiAgICAubWFwKGVsID0+ICh7XG4gICAgICBvbGQ6IGVsLCBuYW1lOiBlbC5tYXRjaChsaWJyYXJ5UmVnRXhwKVsyXSwgaWQ6IElETWFrZXIubmV4dCgpLnZhbHVlXG4gICAgfSkpIC8vIHtvbGQsIG5hbWV9XG4gICAgLy8g44Op44Kk44OW44Op44Oq44Gu572u44GN5o+b44GIXG4gIHtcbiAgICBsZXQgaSA9IDBcbiAgICBjb2RlID0gY29kZS5yZXBsYWNlKFxuICAgICAgbmV3IFJlZ0V4cChsaWJyYXJ5UmVnRXhwLCAnZycpLFxuICAgICAgKCkgPT4ge1xuICAgICAgICByZXR1cm4gaGFzaChyZXF1aXJlbWVudHNbaSsrXS5pZClcbiAgICAgIH1cbiAgICApXG4gIH1cbiAgLy9cblxuICAvLyBpbXBvcnQg5oq95Ye6XG4gIGNvbnN0IGltcG9ydHMgPSAoY29kZVxuICAgIC5tYXRjaChuZXcgUmVnRXhwKGltcG9ydFJlZ0V4cCwgJ2cnKSkgfHwgW10pXG4gICAgLm1hcChlbCA9PiBBcnJheS5mcm9tKGVsLm1hdGNoKGltcG9ydFJlZ0V4cCkpKSAvLyBbYWxsLCBuYW1lLCBjb2RlXVxuICAgIC5tYXAoZWwgPT4gKHtuYW1lOiBlbFsxXSwgb2xkOiBlbFsyXSwgaWQ6IElETWFrZXIubmV4dCgpLnZhbHVlfSkpXG5cbiAgbGV0IHJlZmFjdG9yZWQgPSBjb2RlIC8vIOOBk+OBk+OBi+OCieWIhuWykFxuXG4gIGNvZGUgPSBjb2RlLnJlcGxhY2UobmV3IFJlZ0V4cChpbXBvcnRSZWdFeHAsICdnJyksICcnKVxuICB7IC8vIGltcG9ydCDjga7nva7jgY3mj5vjgYhcbiAgICBsZXQgaSA9IDBcbiAgICByZWZhY3RvcmVkID0gcmVmYWN0b3JlZC5yZXBsYWNlKFxuICAgICAgbmV3IFJlZ0V4cChpbXBvcnRSZWdFeHAsICdnJyksXG4gICAgICAoKSA9PiBoYXNoKGltcG9ydHNbaSsrXS5pZClcbiAgICApXG4gIH1cblxuICAvLyBkYXRhIOOBrue9ruOBjeaPm+OBiFxuICBjb2RlID0gY29kZS5yZXBsYWNlKG5ldyBSZWdFeHAoZGF0YVJlZ0V4cCwgJ2cnKSwgJycpXG4gIC8vIHJlZmFjdG9yZWQg44GL44KJ44Gv5raI44GV44Gq44GEXG5cbiAgLy8g44Op44Kk44OW44Op44Oq44Gu57WC44KP44KK44GM5Y2Y5L2T44Gn5q6L44KL44Go5bSp44KM44KLXG4gIGlmIChsaWJFbmRSZWdFeHAudGVzdChcbiAgICBjb2RlLnJlcGxhY2UobWFrZUxpYnJhcnlSZWdFeHAoJz0nICsgbmFtZSwgJ2cnKSwgJycpXG4gICkpIHRocm93IGAke25hbWV9IDogY2Fubm90IGluY2x1ZGUgdW5pdCBsaWIgZW5kYFxuXG4gIGlmIChlbmNsb3N1cmVDb3VudCA9PT0gMCkge1xuICAgIGNvZGUgPSBlbmNsb3NlKG5hbWUsIGNvZGUpXG4gICAgcmVmYWN0b3JlZCA9IGVuY2xvc2UobmFtZSwgcmVmYWN0b3JlZClcbiAgfVxuXG4gIGNvbnN0IGVuY2xvc2VkID0gY29kZS5tYXRjaChtYWtlTGlicmFyeVJlZ0V4cCgnPScgKyBuYW1lKSlbMF1cblxuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgZGF0YToge1xuICAgICAgbmFtZXNwYWNlLFxuICAgICAgZmlsZW5hbWUsXG4gICAgICBjb2RlLCAvLyDjgrnjg4vjg5rjg4Pjg4jnlKhcbiAgICAgIHJlZmFjdG9yZWQsIC8vIOOCguOBqOOBruOCs+ODvOODiee9ruOBjeaPm+OBiOeUqFxuICAgICAgZW5jbG9zZWQsIC8vIOS7luOBrnJlZmFjdG9yZWTjgoLjga7jgavln4vjgoHovrzjgoDnlKhcbiAgICAgIGRhdGEsXG4gICAgICBvbGQsXG4gICAgICByZXF1aXJlOiByZXF1aXJlbWVudHMsXG4gICAgICBpbXBvcnQ6IGltcG9ydHMsXG4gICAgICBmaW5pc2hlZDogZmFsc2UsXG4gICAgICBwcm9jZXNzaW5nOiBmYWxzZVxuICAgIH1cbiAgfVxufVxuIl19