import { existsSync } from 'fs-extra'
import klawSync from 'klaw-sync'
import path from 'path'
const { resolve } = path

export default function getFileStructure (config) {
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir)
  if (!existsSync(src)) throw 'no src'
  // src下のすべてのファイルのパスを取得
  const all = klawSync(src, {nodir: true}).map(el => {
    const list = el.path.split('/')
    const name = list.pop()
    return [list, name]
  })
  const main = all.filter(el => el[1].match(/.*\.cpp$/))
  return {all, main}
}
