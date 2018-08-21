import {cat, test} from 'shelljs'
import {resolve} from 'path'
import yaml from 'js-yaml'

export default function makeWiki (config, nowdir = null, path = '') {
  if (nowdir === null) nowdir = resolve(process.cwd(), config.WorkingDir, config.SrcDir)
  const wiki = {}
  const wikiYAML = resolve(nowdir, 'wiki.yml')
  if (!test('-e', wikiYAML)) return false
  const wikiData = {
    type: 'dir',
    order: [],
    ...yaml.safeLoad(cat(wikiYAML).stdout),
  }
  wiki.type = wikiData.type
  if (wikiData.title) wiki.title = wikiData.title
  wiki.path = path
  if (Array.isArray(typeof wikiData.orde)) throw `${nowdir} : order must be array`
  const wikipage = resolve(nowdir, 'wiki.md')
  if (test('-e', wikipage)) wiki.wiki = cat(wikipage).stdout
  const child = []
  wikiData.order.forEach(el => {
    const mdfile = resolve(nowdir, el + '.md')
    const newdir = resolve(nowdir, el)
    if (test('-e', mdfile)) {
      child.push({
        path: el,
        type: 'lib',
        wiki: cat(mdfile).stdout,
      })
    } else if (test('-e', newdir)) {
      const d = makeWiki(config, newdir, el)
      if (d) child.push(d)
    } else {
      throw `${nowdir} : not found ${mdfile} and ${newdir}/`
    }
  })
  wiki.child = child
  return wiki
}
