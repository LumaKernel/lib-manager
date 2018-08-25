import test from 'ava'
import { check } from '../../src/commands/check'
import { fix } from '../../src/commands/fix'
import makeProject from '../../src/makers/makeProject'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'
import { readFileSync } from 'fs-extra'

prepareWorkSpace(test)

test('fixしたらcheckが通る', async t => {
  // t.context.save = 1
  const project = {
    wikis: JSON.parse(readFileSync('./test/fixtures/expects/wikis_transformed.json').toString()),
    libs: JSON.parse(readFileSync('./test/fixtures/expects/libs_transformed.json').toString()),
    files: JSON.parse(readFileSync('./test/fixtures/expects/files.json').toString()),
    templates: JSON.parse(readFileSync('./test/fixtures/expects/templates.json').toString()),
  }
  const exp = JSON.parse(readFileSync('./test/fixtures/expects/project_fixed.json').toString())
  fix(t.context.config, project)
  const fixedProject = await makeProject(t.context.config)
  t.log(JSON.stringify(fixedProject))
  t.deepEqual(fixedProject, exp)
  Object.values(fixedProject.libs).forEach(el => {
    t.is(el.refactored, el.old)
  })
  const changes = check(t.context.config, fixedProject)
  t.deepEqual(changes, [])
})
