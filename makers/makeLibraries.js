import { resolve } from 'path'
import { cat } from 'shelljs'
import getFileStructure from './getFileStructure'
import { makeLib } from './makeLib'
require('array-foreach-async')

export default async function makeLibraries (config) {
  const {main} = getFileStructure(config)
  const libs = {}
  //
  const libFiles = main.filter(el => !el[1].match(/_.*$/))
  // library files
  await libFiles.forEachAsync(async ([namespaceList, filename]) => {
    const namespace = namespaceList.join('/')
    const path = resolve(process.cwd(),
      config.WorkingDir, config.SrcDir, namespace, filename)
    const old = cat(path).stdout
    const {name, data} = await makeLib(old, namespace, filename, config)
    libs[name] = data
  })
  return libs
}
