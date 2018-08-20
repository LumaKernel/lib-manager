import { hash } from '../id'

/**
 *  libsのcodeの処理をする, 破壊する
 */
export default function transformLibraries (libs, templates) {
  Object.keys(libs).forEach(key => {
    if (!libs[key].finished) dfs(libs, templates, key)
  })
}

function dfs (libs, templates, key) {
  const now = libs[key]
  if (now.processing) throw `[transformLibraries] ${key} : cannot include cycle`
  now.processing = true
  let codes = [now.code, now.refactored]
  now['import'].forEach(el => {
    codes[1] = codes[1].replace(hash(el.id), `// @import ${el.name}\n${templates[el.name].code}\n// @@`)
  })
  now.require.forEach(el => {
    if (!libs[el.name].finished) dfs(libs, templates, el.name, libs[el.name])
    codes = codes.map(code => code.replace(hash(el.id), libs[el.name].code))
  })
  now.code = codes[0].trim()
  now.refactored = codes[1]
  now.finished = true
}
