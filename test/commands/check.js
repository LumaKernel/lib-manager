import test from 'ava'
import shelljs from 'shelljs'
const { cat } = shelljs
import { check } from '../../commands/check'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

test(async t => {
  const exp = JSON.parse(cat('./test/fixtures/expects/changes.json').stdout)
  const project = {
    wikis: JSON.parse(cat('./test/fixtures/expects/wikis_transformed.json').stdout),
    libs: JSON.parse(cat('./test/fixtures/expects/libs_transformed.json').stdout),
    templates: JSON.parse(cat('./test/fixtures/expects/templates.json').stdout),
  }
  const changes = check(t.context.config, project)
  t.deepEqual(changes, exp)
})