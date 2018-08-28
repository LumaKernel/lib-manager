import yaml from 'js-yaml'
import { mdEscape } from '../helpers/escape'

const libRegExp = name => new RegExp(
  String.raw`(?<=^|\n)// @ ${name}(?=\n|$)`, 'g')

const mdYAMlRegExp = /^---\n(.*?)\n---(?:\n|$)/s

// dfs
/**
 * 破壊する
 */
export default function transformWiki (wikiYAML, wikis, libs, paths = [], ids = []) {
  const namespace = paths.filter(e => e).join('/')
  const lib = (() => {
    const tmp = Object.values(libs)
      .filter(el => el.namespace === namespace && el.filename === `${wikis.path}.cpp`)
    if (tmp && tmp.length === 1) return tmp[0]
    else return null
  })()
  const data = (() => {
    let _data = {
      ...wikiYAML,
    }
    if (wikis.wiki && wikis.wiki.match(mdYAMlRegExp)) {
      const innerData = yaml.safeLoad(wikis.wiki.match(mdYAMlRegExp)[1])
      _data = {
        ..._data,
        ...innerData,
      }
      Object.keys(innerData).forEach(key => {
        wikis[key] = innerData[key]
      })
      wikis.wiki = wikis.wiki.replace(mdYAMlRegExp, '')
    }
    return _data
  })()
  const id = (() => {
    if (data.id) return data.id
    if (lib) {
      const _id = lib.data.filter(([name, value]) => name === 'id')[0]
      if (_id) return _id[1]
    }
    return wikis.path
  })()
  const title = (() => {
    if (data.title) return data.title
    if (wikis.title) return wikis.title
    if (lib) {
      const _title = lib.data.filter(([name]) => name === 'title')[0]
      if (_title) return _title[1]
    }
    return wikis.path
  })()

  paths = [...paths, wikis.path]
  ids = [...ids, id]
  const permalink = wikis.permalink || ids.filter(e => e).join('/')
  if (wikis.wiki) {
    Object.entries(libs).forEach(([key, value]) => {
      wikis.wiki = wikis.wiki
        .replace(libRegExp(key),
          () => `\n${'```cpp'}\n${mdEscape(value.code)}\n${'```'}\n`)
    })
  }

  // データは後入れ（順序関係がバグる）

  data.title = wikis.title = title
  data.permalink = wikis.permalink = permalink
  if (wikis.wiki) wikis.wiki = `---\n${yaml.safeDump(data)}\n---\n\n${wikis.wiki}`

  if (wikis.child) {
    wikis.child.forEach(child => {
      transformWiki(wikiYAML, child, libs, paths, ids)
    })
  }
}
