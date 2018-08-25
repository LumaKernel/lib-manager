import test from 'ava'
import { existsSync, readdirSync, readFileSync } from 'fs-extra'
import { resolve } from 'path'
import build from '../../src/commands/build'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

test.beforeEach(t => {
  const project = {
    wikis: JSON.parse(readFileSync('./test/fixtures/expects/wikis_transformed.json').toString()),
    libs: JSON.parse(readFileSync('./test/fixtures/expects/libs_transformed.json').toString()),
    files: JSON.parse(readFileSync('./test/fixtures/expects/files.json').toString()),
    templates: JSON.parse(readFileSync('./test/fixtures/expects/templates.json').toString()),
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
  const printedexp = JSON.parse(readFileSync('./test/fixtures/expects/printed.json').toString())
  const printed = JSON.parse(readFileSync(resolve(src, 'printed.json')).toString())
  t.log(JSON.stringify(printed))
  t.deepEqual(printed, printedexp)
})

test('printable.md が出力される', async t => {
  const config = t.context.config
  const dist = resolve(process.cwd(), config.WorkingDir, config.DistDir)
  const printableExp = readFileSync('./test/fixtures/expects/printable.md').toString()
  t.true(existsSync(resolve(dist, 'printable.md')))
  const printable = readFileSync(resolve(dist, 'printable.md')).toString()

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
  const snippetExp = readFileSync('./test/fixtures/expects/libman.snip').toString()
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
