import yaml from 'js-yaml'

const libRegExp = name => new RegExp(
  String.raw`(?<=^|\n)// @ ${name}(?=\n|$)`, 'g')
const mdEscape = code => code.replace(/\{\{/g, '{{"{{"}}')

// dfs
/**
 * 破壊する
 */
export default function transformWiki (wikiYAML, wikis, libs, paths = []) {
  const namespace = paths.filter(e => e).join('/')
  const lib = Object.values(libs)
    .filter(el => el.namespace === namespace &&
    el.filename === `${wikis.path}.cpp`)[0]
  paths = [...paths, wikis.path]
  const permalink = paths.filter(e => e).join('/')
  if (wikis.wiki) {
    Object.entries(libs).forEach(([key, value]) => {
      wikis.wiki = wikis.wiki
        .replace(libRegExp(key),
          `${'```cpp'}\n${mdEscape(value.code)}\n${'```'}`)
    })
  }
  if (!wikis.title && lib) {
    const title = lib.data.filter(el => el[1] === 'title')[0]
    if (title) wikis.title = title
  }
  wikis.title = wikis.title || wikis.path
  wikis.permalink = permalink
  const data = {
    ...wikiYAML,
    permalink,
    title: wikis.title
  }
  if (wikis.wiki) wikis.wiki = `---\n${yaml.safeDump(data)}\n---\n\n${wikis.wiki}`

  if (wikis.child) {
    wikis.child.forEach(child => {
      transformWiki(wikiYAML, child, libs, paths)
    })
  }
}
