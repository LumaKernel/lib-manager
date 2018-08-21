import { removeSync, writeFileSync, mkdirsSync, copySync, existsSync, readFileSync, readdirSync } from 'fs-extra'
import { buildWiki } from '../builders/buildWiki'
import { makeSnippet } from '../builders/buildSnippets'
import { resolve } from 'path'
import buildPrintable from '../builders/buildPrintable'

const libmanPrefix = 'libman_auto_generated_'

export default function build (config, project) {
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir)
  const dist = resolve(process.cwd(), config.WorkingDir, config.DistDir)

  const printlistPath = resolve(src, 'printlist.json')
  const printedPath = resolve(src, 'printed.json')

  if (!existsSync(printlistPath)) {
    throw "'printlist.json' is needed. build --init"
  }

  if (!existsSync(printedPath)) {
    writeFileSync(printedPath, '{}')
  }

  check(config.CopyWiki, 'wiki')

  removeSync(dist)
  mkdirsSync(dist)
  // wikiを作る
  buildWiki(config, project)
  autoRemove(config.CopyWiki)
  copy(dist, config.CopyWiki, 'wiki')
  // snippetsを作る(1ファイル)
  const snippet = makeSnippet(config, project.libs)
  writeFileSync(resolve(dist, 'libman.snip'), snippet)
  copy(dist, config.CopySnippet, 'libman.snip')
  // printable-one-pageを作る
  const printlist = JSON.parse(readFileSync(printlistPath))
  const printed = JSON.parse(readFileSync(printedPath))
  const {printed: newPrinted, printable} = buildPrintable(printlist, printed, project.libs)
  writeFileSync(resolve(dist, 'printable.md'), printable)
  copy(dist, config.CopyPrintable, 'printable.md')
  writeFileSync(printedPath, JSON.stringify(newPrinted))
}

function check (data, name) {
  if (data && typeof data === 'string') {
    const cp = resolve(process.cwd(), data)
    if (!existsSync(cp)) {
      throw `${cp} doesn't exist, skipped copy ` + name
    }
  }
}

function copy (dist, data, name) {
  if (data && typeof data === 'string') {
    const cp = resolve(process.cwd(), data)
    copySync(resolve(dist, name), cp)
  }
}

function autoRemove (data) {
  if (data && typeof data === 'string') {
    const dir = resolve(process.cwd(), data)
    readdirSync(dir)
      .filter(file => new RegExp(
        String.raw`^${libmanPrefix}.*\.md$`).test(file))
      .forEach(file => {
        removeSync(resolve(dir, file))
      })
  }
}
