import test from 'ava'
import { readdirSync } from 'fs-extra'
import { resolve } from 'path'
import { cat } from 'shelljs'
import { buildWiki } from '../../src/builders/buildWiki'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

test('build wiki', async t => {
  const project = {
    wikis: JSON.parse(cat('./test/fixtures/expects/wikis_transformed.json').stdout),
    libs: JSON.parse(cat('./test/fixtures/expects/libs_transformed.json').stdout),
    templates: JSON.parse(cat('./test/fixtures/expects/templates.json').stdout),
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
