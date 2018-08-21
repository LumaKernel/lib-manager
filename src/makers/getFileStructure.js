import path from 'path'
import shelljs from 'shelljs'
import fs from 'fs-extra'
const { resolve } = path
const { ls } = shelljs
const {existsSync} = fs

export default function getFileStructure (config) {
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir)
  if (!existsSync(src)) throw 'no src'
  const all = ls('-AR', src).map(el => {
    const list = el.split('/')
    const name = list.pop()
    return [list, name]
  })
  const main = all.filter(el => el[1].match(/.*\.cpp$/))
  return {all, main}
}
