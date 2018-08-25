import test from 'ava'
import { readdirSync, readFileSync } from 'fs-extra'
import { resolve } from 'path'
import { buildWiki } from '../../src/builders/buildWiki'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

test('build wiki', async t => {
  const project = {
    wikis: JSON.parse(readFileSync('./test/fixtures/expects/wikis_transformed.json').toString()),
    libs: JSON.parse(readFileSync('./test/fixtures/expects/libs_transformed.json').toString()),
    files: JSON.parse(readFileSync('./test/fixtures/expects/files.json').toString()),
    templates: JSON.parse(readFileSync('./test/fixtures/expects/templates.json').toString()),
  }
  const config = t.context.config
  buildWiki(config, project)
  const dist = resolve(process.cwd(), config.WorkingDir, config.DistDir)
  const dir = resolve(dist, 'wiki')
  t.is(readdirSync(dir).length, 5)
  t.true(readdirSync(dir).includes('top.md'))
  // t.context.save = 1
  // t.fail()
})
