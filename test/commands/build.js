import test from 'ava'
import { existsSync, readdirSync, readFileSync } from 'fs-extra'
import { resolve } from 'path'
import { cat } from 'shelljs'
import build from '../../src/commands/build'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

test.beforeEach(t => {
  const project = {
    wikis: JSON.parse(cat('./test/fixtures/expects/wikis_transformed.json').stdout),
    libs: JSON.parse(cat('./test/fixtures/expects/libs_transformed.json').stdout),
    templates: JSON.parse(cat('./test/fixtures/expects/templates.json').stdout),
  }
  const config = t.context.config
  const work = resolve(process.cwd(), config.WorkingDir)
  const dist = resolve(process.cwd(), config.WorkingDir, config.DistDir)

  config.CopyWiki = resolve(work, 'copy_wiki')
  config.CopySnippet = resolve(dist, 'copied_snippet.txt')

  build(config, project, true)
})

test('printed が新しく作られる', async t => {
  const config = t.context.config
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir)
  const printedexp = JSON.parse(cat('./test/fixtures/expects/printed.json').stdout)
  const printed = JSON.parse(cat(resolve(src, 'printed.json')).stdout)
  t.log(JSON.stringify(printed))
  t.deepEqual(printed, printedexp)
})

test('printable.md が出力される', async t => {
  const config = t.context.config
  const dist = resolve(process.cwd(), config.WorkingDir, config.DistDir)
  const printableExp = cat('./test/fixtures/expects/printable.md').stdout
  t.true(existsSync(resolve(dist, 'printable.md')))
  const printable = cat(resolve(dist, 'printable.md')).stdout

  t.is(printable, printableExp)
})

test('copywiki に指定したディレクトリにwikiがコピーされ，古いのは消される', async t => {
  const config = t.context.config
  t.log(readdirSync(config.CopyWiki))
  t.is(readdirSync(config.CopyWiki).length, 5)
  t.not(readFileSync(config.CopyWiki + '/top.md').toString(), '')
})

test('スニペットをコピーする', async t => {
  const config = t.context.config
  const snippetExp = cat('./test/fixtures/expects/libman.snip').stdout
  // console.log(readFileSync(config.CopySnippet).toString())
  t.is(readFileSync(config.CopySnippet).toString(), snippetExp)
})

test('printlist.md がなくなり， printlist_used.md が新しく作られる', async t => {
  const config = t.context.config
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir)
  const printlistPath = resolve(src, 'printlist.json')
  const printlistUsedPath = resolve(src, 'printlist_used.json')

  t.false(existsSync(printlistPath))
  t.true(existsSync(printlistUsedPath))
})
