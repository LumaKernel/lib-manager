import path from 'path'
import shelljs from 'shelljs'
const { resolve } = path
const { ls } = shelljs

export default function getFileStructure (config) {
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir)
  const all = ls('-AR', src).map(el => {
    const list = el.split('/')
    const name = list.pop()
    return [list, name]
  })
  const main = all.filter(el => el[1].match(/.*\.cpp$/))
  return {all, main}
}
