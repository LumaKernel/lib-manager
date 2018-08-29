import { format } from '../formatter'
import { hash, makeIDMaker } from '../id'

const importRegExp = /(?<=^|\n)\/\/ @import (.+)\n?([\s\S]*?)\n\/\/ @@(?=\n|$)/

const dataRegExp = /(?<=^|\n)\/\/ @([^ \t\n]+)[ \t]+([^ \n].*)(?:\n|$)/
// (?<=^|\n)([ \t]*)\/\/\/ --- (?!Foo Lib)(.+?) {{{ \/\/\/[\s\S]*?\n\1\/\/\/ }}}--- \/\/\/(?=\n|$)
const libHead = String.raw`\/\/\/ --- .* {{{ \/\/\/\n`
const makeLibraryRegExp = (ex, flags) => new RegExp(
  String.raw`(?<=^|\n)([ \t]*)\/\/\/ --- (?${ex})(.+?) {{{ \/\/\/\n(?!${libHead})` +
  String.raw`(?:[\s\S](?!${libHead}))*?\n` +
  String.raw`\1\/\/\/ }}}--- \/\/\/(?=\n|$)`,
  flags
)

const libHeadRegExp = /(?:^|\n)([ \t]*)\/\/\/ --- (.+?) {{{ \/\/\/[\s\S]*?\n(?:\n|$)/
const libEndRegExp = /(?:^|\n)[ \t]*\/\/\/ }}}--- \/\/\/(?:\n|$)/
const newRegExp = /^\/\/ @new(?:[ \t]+([^ \n].*))?(?:\n|$)/
const nameRegExp = /(?<=^|\n)\/\/ @[ \t]+([^ \t\n].*)(?:\n|$)/

const enclose = (name, code) => `/// --- ${name} {{{ ///\n${code}\n/// }}}--- ///`

export async function makeLib (old, namespace, filename, config) {
  const IDMaker = makeIDMaker()
  let code = old // いわゆるsnippet用のコード
  code = await format(code, config)

  // データ抽出
  let data = (code.match(new RegExp(dataRegExp, 'g')) || [])
    .map(el => Array.from(el.match(dataRegExp))) // [all, name, data]
    .map(el => (el.shift(), el)) // [name, data]
    .filter(el => el[0] !== 'import')
    .filter(el => el[0] !== 'new')
  const name = (() => {
    // @new {name}
    const newData = code.match(newRegExp)
    if (newData && newData[1]) return newData[1]
    // @ {name}
    const nameData = code.match(nameRegExp)
    if (nameData) return nameData[1]
    // @name {name}
    let name = data.filter(el => el[0] === 'name')[0]
    if (!name) throw `${namespace} / ${filename} : no name`
    return name[1]
  })()
  data = data.filter(el => el[0] !== 'name')
  //

  // ライブラリに関して
  const requirements = (() => {
    let _requirements = []
    const libraryRegExp = makeLibraryRegExp('!' + name)
    while (libraryRegExp.test(code)) {
      const tmp = (code
        .match(new RegExp(libraryRegExp, 'g')) || [])
        .map(el => ({
          old: el, name: el.match(libraryRegExp)[2], id: IDMaker.next().value
        })) // {old, name, id}
      _requirements = [..._requirements, ...tmp]
      // ライブラリの置き換え
      {
        let i = 0
        code = code.replace(
          new RegExp(libraryRegExp, 'g'),
          () => {
            return hash(tmp[i++].id)
          }
        )
      }
    }
    return _requirements
  })()
  //
  // ライブラリの置き換えをした跡に調べないと壊れる
  const enclosureCount =
      (code.match(makeLibraryRegExp('=' + name, 'g')) || []).length
  if (enclosureCount >= 2) throw `${namespace} / ${filename} : ${name} : cannot handle 2 or more enclosures "/// ---..."`

  // import 抽出
  const imports = (code
    .match(new RegExp(importRegExp, 'g')) || [])
    .map(el => Array.from(el.match(importRegExp))) // [all, name, code]
    .map(([, name, old]) => ({name, old, id: IDMaker.next().value}))

  let refactored = code // ここから分岐

  code = code.replace(newRegExp, '')
  code = code.replace(nameRegExp, '')

  code = code.replace(new RegExp(importRegExp, 'g'), '')
  { // import の置き換え
    let i = 0
    refactored = refactored.replace(
      new RegExp(importRegExp, 'g'),
      () => hash(imports[i++].id)
    )
  }

  // data の置き換え
  code = code.replace(new RegExp(dataRegExp, 'g'), '')
  // refactored からは消さない

  // ライブラリの終わりが単体で残ると崩れる
  {
    const hollow = code.replace(makeLibraryRegExp('=' + name, 'g'), '')
    if (libEndRegExp.test(hollow)) {
      console.error(hollow)
      throw `${namespace} / ${filename} : ${name} : cannot include unit lib END "/// }}}--- ///`
    }
    // ついでにhead残りも調べる．
    if (libHeadRegExp.test(hollow)) {
      console.error(hollow)
      throw `${namespace} / ${filename} : ${name} : cannot include unit lib HEAD "/// --- {name} }}} ///"`
    }
  }

  const enclosed = enclosureCount ? code.match(makeLibraryRegExp('=' + name))[0] : enclose(name, code)

  return {
    name,
    data: {
      name,
      namespace,
      filename,
      code, // スニペット用
      refactored, // もとのコード置き換え用
      enclosed, // 他のrefactoredのものに埋め込む用
      data,
      old,
      require: requirements,
      import: imports,
      finished: false,
      processing: false
    }
  }
}
