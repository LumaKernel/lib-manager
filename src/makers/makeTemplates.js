import none from 'array-foreach-async'
import { readFileSync } from 'fs-extra'
import path from 'path'
import { format } from '../formatter'
import getFileStructure from './getFileStructure'
const { resolve } = path
none  // eslint-disable-line

export default async function makeTemplates (config) {
  const {main} = getFileStructure(config)
  const templates = {}
  // [path-list, name]s
  const templateFiles = main.filter(el => el[1].match(/_.*$/))
  // テンプレートファイル
  await templateFiles.forEachAsync(async el => {
    const path = resolve(process.cwd(), config.WorkingDir, config.SrcDir, ...el[0], el[1])
    const old = readFileSync(path).toString()
    const code = await format(old, config)
    const name = el[1].match(/_(.+)\.cpp/)[1]
    templates[name] = {old, code, namespace: el[0].join('/'), filename: el[1]}
  })
  return templates
}
