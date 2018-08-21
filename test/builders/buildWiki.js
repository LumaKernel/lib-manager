import test from 'ava'
import { cat } from 'shelljs'
import { buildWiki } from '../../builders/buildWiki'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'
import { resolve } from 'path'
import { readdirSync } from 'fs-extra'

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
