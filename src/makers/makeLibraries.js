import 'array-foreach-async'
import { readFileSync } from 'fs-extra'
import { resolve } from 'path'
import getFileStructure from './getFileStructure'
import { makeLib } from './makeLib'

const newRegExp = /\n(?=\/\/ @new(?: .+)?)/

export default async function makeLibraries (config) {
  const {main} = getFileStructure(config)
  const libs = {}
  const files = []
  //
  const libFiles = main.filter(el => !el[1].match(/_.*$/))
  // library files
  await libFiles.forEachAsync(async ([namespaceList, filename]) => {
    const namespace = namespaceList.join('/')
    const path = resolve(process.cwd(),
      config.WorkingDir, config.SrcDir, namespace, filename)
    const raw = readFileSync(path).toString().replace(/\r\n?/g, '\n')
    const olds = raw.split(newRegExp)
    const file = {namespace, filename, data: []}
    await olds.forEachAsync(async old => {
      const {name, data} = await makeLib(old, namespace, filename, config)
      if (libs[name]) throw `name "${name}" duplicates`
      libs[name] = data
      file.data.push(name)
    })
    files.push(file)
  })
  return {
    libs, files
  }
}
