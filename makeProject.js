import { ls, cat } from 'shelljs'
import { resolve } from 'path'
import { format } from './formatter'
require('array-foreach-async')

export default async function makeProject (config) {
  const all = ls('-AR', config.WorkingDir).map(el => {
    const list = el.split('/')
    const name = list.pop()
    return [list, name]
  })
  const importRegExp = /(?<=^|\n)\/\/ @import (.+)\n?([\s\S]*?)\n\/\/ @@(?=\n|$)/
  const dataRegExp = /(?<=^|\n)\/\/ @(.+?) (.+)(?:\n|$)/
  const libs = {}
  const main = all.filter(el => el[1].match(/.*\.cpp$/))
  const templateFiles = main.filter(el => el[1].match(/_.*$/))
  const libFiles = main.filter(el => !el[1].match(/_.*$/))
  await libFiles.forEachAsync(async el => {
    const namespace = el[0].join('/')
    const original = cat(resolve(config.WorkingDir, namespace, el[1]))
    let code = original
    const importMatch = code.match(new RegExp(importRegExp, 'g'))
    code = await format(code, config)
    code = code.replace(new RegExp(importRegExp, 'g'), '###1###')
    console.log(el, code)
    const data = (code
      .match(new RegExp(dataRegExp, 'g')) || []
    )
      .map(el => el.match(dataRegExp)) // [all, name, data]
      .map(el => (el.shift(), el)) // [name, data]
    code = code.replace(new RegExp(dataRegExp, 'g'), '')
    let name = data.filter(el => el[0] === 'name')[0]
    if (!name) {
      throw `${namespace}/${el[1]} : no name`
    }
    name = name[1]
    libs[name] = {
      namespace,
      code,
      data,
      original,
      finished: false,
      processing: false
    }
  })
  return { libs }
}
