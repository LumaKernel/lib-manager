import { existsSync, readFileSync } from 'fs-extra'
import yaml from 'js-yaml'
import { resolve } from 'path'

export default function makeWiki (config, nowdir = null, path = '') {
  if (nowdir === null) nowdir = resolve(process.cwd(), config.WorkingDir, config.SrcDir)
  const wiki = {}
  const wikiYAML = resolve(nowdir, 'wiki.yml')
  if (!existsSync(wikiYAML)) return false
  const wikiData = {
    type: 'dir',
    order: [],
    ...yaml.safeLoad(readFileSync(wikiYAML).toString()),
  }
  wiki.type = wikiData.type
  if (wikiData.title) wiki.title = wikiData.title
  if (wikiData.permalink) wiki.permalink = wikiData.permalink
  wiki.path = path
  if (Array.isArray(typeof wikiData.orde)) throw `${nowdir} : order must be array`
  const wikipage = resolve(nowdir, 'wiki.md')

  // 改行コードを統一
  if (existsSync(wikipage)) wiki.wiki = myReadFile(wikipage)
  const child = []
  wikiData.order.forEach(el => {
    const mdfile = resolve(nowdir, el + '.md')
    const newdir = resolve(nowdir, el)
    if (existsSync(mdfile)) {
      child.push({
        path: el,
        type: 'lib',
        wiki: myReadFile(mdfile),
      })
    } else if (existsSync(newdir)) {
      const d = makeWiki(config, newdir, el)
      if (d) child.push(d)
    } else {
      throw `${nowdir} : not found ${mdfile} and ${newdir}/`
    }
  })
  wiki.child = child
  return wiki
}

function myReadFile (path) {
  return readFileSync(path).toString().replace(/\r\n?/g, '\n')
}
