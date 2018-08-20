import { hash } from '../id'
import { format } from '../formatter'
require('array-foreach-async')

/**
 *  libsのcodeの処理をする, 破壊する
 */
export default async function transformLibraries (config, libs, templates) {
  await Object.keys(libs).forEachAsync(async key => {
    if (!libs[key].finished) await dfs(config, libs, templates, key)
  })
}

async function dfs (config, libs, templates, key) {
  const now = libs[key]
  if (now.processing) throw `[transformLibraries] ${key} : cannot include cycle`
  now.processing = true
  let codes = [now.code, now.refactored]
  now['import'].forEach(el => {
    codes[1] = codes[1].replace(hash(el.id), `// @import ${el.name}\n${templates[el.name].code}\n// @@`)
  })
  await now.require.forEachAsync(async el => {
    if (!libs[el.name].finished) await dfs(config, libs, templates, el.name, libs[el.name])
    codes = codes.map(code => code.replace(hash(el.id), libs[el.name].code))
  })
  now.code = await format(codes[0].trim(), config)
  now.refactored = await format(codes[1], config)
  now.finished = true
}
