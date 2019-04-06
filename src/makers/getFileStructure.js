import { existsSync } from 'fs-extra'
import klawSync from 'klaw-sync'
import path from 'path'
import relative from 'relative'
const { resolve } = path

export default function getFileStructure (config) {
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir)
  if (!existsSync(src)) throw 'no src'
  // src下のすべてのファイルのパスを取得
  const all = klawSync(src, {nodir: true}).map(el => {
    const list = relative(src, el.path).split('\\')
    const name = list.pop()
    return [list, name]
  })
  const main = all.filter(el => el[1].match(/.*\.cpp$/))
  return {all, main}
}
