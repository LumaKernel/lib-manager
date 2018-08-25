import yaml from 'js-yaml'
import { mdEscape } from '../helpers/escape'

const libRegExp = name => new RegExp(
  String.raw`(?<=^|\n)// @ ${name}(?=\n|$)`, 'g')

const mdYAMlRegExp = /^---\n(.*?)\n---(?:\n|$)/

// dfs
/**
 * 破壊する
 */
export default function transformWiki (wikiYAML, wikis, libs, paths = []) {
  const namespace = paths.filter(e => e).join('/')
  let lib = Object.values(libs)
    .filter(el => el.namespace === namespace &&
    el.filename === `${wikis.path}.cpp`)
  if (lib && lib.length === 1) lib = lib[0]
  else lib = null
  paths = [...paths, wikis.path]
  const permalink = wikis.permalink || paths.filter(e => e).join('/')
  if (wikis.wiki) {
    Object.entries(libs).forEach(([key, value]) => {
      wikis.wiki = wikis.wiki
        .replace(libRegExp(key),
          `\n${'```cpp'}\n${mdEscape(value.code)}\n${'```'}\n`)
    })
  }
  if (!wikis.title && lib) {
    const title = lib.data.filter(el => el[1] === 'title')[0]
    if (title) wikis.title = title
  }
  wikis.title = wikis.title || wikis.path
  wikis.permalink = permalink
  let data = {
    ...wikiYAML,
    permalink,
    title: wikis.title
  }
  if (wikis.wiki && wikis.wiki.match(mdYAMlRegExp)) {
    const innerData = yaml.safeLoad(wikis.wiki.match(mdYAMlRegExp)[1])
    data = {
      ...data,
      ...innerData,
    }
    Object.keys(innerData).forEach(key => {
      wikis[key] = innerData[key]
    })
    wikis.wiki = wikis.wiki.replace(mdYAMlRegExp, '')
  }
  if (wikis.wiki) wikis.wiki = `---\n${yaml.safeDump(data)}\n---\n\n${wikis.wiki}`

  if (wikis.child) {
    wikis.child.forEach(child => {
      transformWiki(wikiYAML, child, libs, paths)
    })
  }
}
