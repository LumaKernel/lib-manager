import { resolve } from 'path'
import { cat } from 'shelljs'
import { format } from '../formatter'
import { hash, makeIDMaker } from '../id'
import getFileStructure from './getFileStructure'
require('array-foreach-async')

const importRegExp = /(?<=^|\n)\/\/ @import (.+)\n?([\s\S]*?)\n\/\/ @@(?=\n|$)/
const dataRegExp = /(?<=^|\n)\/\/ @(.+?) (.+)(?:\n|$)/

export default async function makeLibraries (config) {
  const {main} = getFileStructure(config)
  const libs = {}
  //
  const libFiles = main.filter(el => !el[1].match(/_.*$/))
  // library files
  await libFiles.forEachAsync(async el => {
    const IDMaker = makeIDMaker()
    const namespace = el[0].join('/')
    const path = resolve(process.cwd(), config.WorkingDir, config.SrcDir, namespace, el[1])
    const old = cat(path).stdout
    let code = old // いわゆるsnippet用のコード
    code = await format(code, config)

    // データ抽出
    const data = (code
      .match(new RegExp(dataRegExp, 'g')) || [])
      .map(el => el.match(dataRegExp)) // [all, name, data]
      .map(el => (el.shift(), Array.from(el))) // [name, data]
    let name = data.filter(el => el[0] === 'name')[0]
    if (!name) {
      throw `${namespace}/${el[1]} : no name`
    }
    name = name[1]
    //

    // ライブラリに関して
    const libraryRegExp = makeLibraryRegExp(name)
    const requirements = (code
      .match(new RegExp(libraryRegExp, 'g')) || [])
      .map(el => ({
        old: el, name: el.match(libraryRegExp)[2], id: IDMaker.next().value
      })) // {old, name}
    // ライブラリの置き換え
    {
      let i = 0
      code = code.replace(
        new RegExp(libraryRegExp, 'g'),
        () => {
          return hash(requirements[i++].id)
        }
      )
    }
    //

    // import 抽出
    const imports = (code
      .match(new RegExp(importRegExp, 'g')) || [])
      .map(el => Array.from(el.match(importRegExp))) // [all, name, code]
      .map(el => ({name: el[1], old: el[2], id: IDMaker.next().value}))

    let refactored = code // ここから分岐

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
    libs[name] = {
      namespace,
      filename: el[1],
      code,
      refactored,
      data,
      old,
      require: requirements,
      import: imports,
      finished: false,
      processing: false
    }
  })
  return libs
}

function makeLibraryRegExp (ex) {
  // (?<=^|\n)([ \t]*)\/\/\/ --- (?!Foo Lib)(.+?) {{{ \/\/\/[\s\S]*?\n\1\/\/\/ }}}--- \/\/\/(?=\n|$)
  return new RegExp(String.raw`(?<=^|\n)([ \t]*)\/\/\/ --- (?!${ex})(.+?) {{{ \/\/\/[\s\S]*?\n\1\/\/\/ }}}--- \/\/\/(?=\n|$)`)
}