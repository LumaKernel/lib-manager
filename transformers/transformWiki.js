const libRegExp = name => new RegExp(
  String.raw`(?<=^|\n)// @ ${name}(?=\n|$)`, 'g')
const mdEscape = code => code.replace(/\{\{/g, '{{"{{"}}')

export default function transformWiki (wikis, libs, paths = []) {
  paths = [...paths, wikis.path]
  const permalink = paths.filter(e => e).join('/')
  if (wikis.wiki) {
    Object.entries(libs).forEach(([key, value]) => {
      console.log(key)
      wikis.wiki = wikis.wiki
        .replace(libRegExp(key),
          `${'```cpp'}\n${mdEscape(value.code)}\n${'```'}`)
    })
  }
  if (wikis.child) {
    wikis.child.forEach(child => {
      transformWiki(child, libs, paths)
    })
  }
}
