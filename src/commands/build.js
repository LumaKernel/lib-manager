import { copySync, existsSync, mkdirsSync, readdirSync, readFileSync, removeSync, renameSync, writeFileSync } from 'fs-extra'
import { resolve } from 'path'
import buildPrintable from '../builders/buildPrintable'
import { makeSnippet } from '../builders/buildSnippets'
import { buildWiki } from '../builders/buildWiki'

const libmanPrefix = 'libman_auto_generated_'

export default function build (config, project, one = false) {
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir)
  const dist = resolve(process.cwd(), config.WorkingDir, config.DistDir)

  const printlistPath = resolve(src, 'printlist.json')
  const printlistUsedPath = resolve(src, 'printlist_used.json')
  const printedPath = resolve(src, 'printed.json')

  if (one && !existsSync(printlistPath)) {
    throw "'printlist.json' is needed. build --init"
  }

  if (one && !existsSync(printedPath)) {
    writeFileSync(printedPath, '{}')
  }


  removeSync(dist)
  mkdirsSync(dist)
  // wikiを作る
  buildWiki(config, project)

  if (check(config.CopyWiki, 'wiki')) {
    autoRemove(config.CopyWiki)
    copy(dist, config.CopyWiki, 'wiki')
  }
  // snippetsを作る(1ファイル)
  const snippet = makeSnippet(config, project.libs)
  writeFileSync(resolve(dist, 'libman.snip'), snippet)
  copy(dist, config.CopySnippet, 'libman.snip')

  // printable-one-pageを作る
  if (one) {
    const printlist = JSON.parse(readFileSync(printlistPath))
    const printed = JSON.parse(readFileSync(printedPath))
    const {printed: newPrinted, printable} = buildPrintable(config.printableYAML, printlist, printed, project.libs)
    writeFileSync(resolve(dist, 'printable.md'), printable)
    copy(dist, config.CopyPrintable, 'printable.md')
    writeFileSync(printedPath, JSON.stringify(newPrinted))

    renameSync(printlistPath, printlistUsedPath)
  }
}

function check (data, name) {
  if (!data) return false
  if (data && typeof data === 'string') {
    const cp = resolve(process.cwd(), data)
    if (!existsSync(cp)) {
      console.error(`${cp} doesn't exist, skipped copy ` + name)
      return false
    }
  }
  return true
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
