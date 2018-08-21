import fs, { existsSync } from 'fs-extra'
import moment from 'moment'
import path from 'path'
import makeWikiTop from './makeWikiTop'
const { resolve } = path
const { readFileSync, writeFileSync, mkdirsSync } = fs

const dateFormat = 'YYYY-MM-DD'
const libmanPrefix = 'libman_auto_generated_'

const seqnumGen = function * () {
  let i = 1
  while (1) yield i++
}

export function buildWiki (config, project) {
  // 指定ディレクトリにwiki.mdを展開していくだけ
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir)
  const dist = resolve(process.cwd(), config.WorkingDir, config.DistDir)
  const dir = resolve(dist, 'wiki')
  if (!existsSync(resolve(src, 'top.md'))) throw `top.md not found`
  mkdirsSync(dir)
  const wikiTop = makeWikiTop(
    readFileSync(resolve(src, 'top.md')).toString(),
    project.wikis,
    moment().format(dateFormat))
  writeFileSync(resolve(dir, 'top.md'), wikiTop)
  const seqnum = seqnumGen()
  writeWikis(dir, project.wikis, seqnum)
}

function writeWikis (dir, wikis, seqnum) {
  if (wikis.wiki) {
    writeFileSync(resolve(dir,
      libmanPrefix + seqnum.next().value + '_' +
       Math.random().toString(36).slice(-8) + '.md'), wikis.wiki)
  }
  if (wikis.child) {
    wikis.child.forEach(child => {
      writeWikis(dir, child, seqnum)
    })
  }
}
