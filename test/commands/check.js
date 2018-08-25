import test from 'ava'
import { readFileSync } from 'fs-extra'
import { check } from '../../src/commands/check'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

test(async t => {
  const exp = JSON.parse(readFileSync('./test/fixtures/expects/changes.json').toString())
  const project = {
    wikis: JSON.parse(readFileSync('./test/fixtures/expects/wikis_transformed.json').toString()),
    libs: JSON.parse(readFileSync('./test/fixtures/expects/libs_transformed.json').toString()),
    files: JSON.parse(readFileSync('./test/fixtures/expects/files.json').toString()),
    templates: JSON.parse(readFileSync('./test/fixtures/expects/templates.json').toString()),
  }
  const changes = check(t.context.config, project)
  t.log(JSON.stringify(changes))
  t.deepEqual(changes, exp)
})
