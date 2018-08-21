import test from 'ava'
import { cat, cp, mkdir } from 'shelljs'
import { check } from '../../commands/check'
import { fix } from '../../commands/fix'
import defaultConfig from '../../constants/defaultConfig'
import makeProject from '../../makers/makeProject'

test.beforeEach(t => {
  const work = './tmp/' + Math.random().toString(36).slice(-8)
  t.context.work = work
  mkdir('-p', './tmp')
  cp('-R', './test/fixtures/workspace', work)
  t.context.config = {
    ...defaultConfig(),
    WorkingDir: work
  }
})

test.afterEach(t => {
  // よく動かないf
  // rm(t.context.work)
})

test('fixしたらcheckが通る', async t => {
  const project = {
    wikis: JSON.parse(cat('./test/fixtures/expects/wikis_transformed.json').stdout),
    libs: JSON.parse(cat('./test/fixtures/expects/libs_transformed.json').stdout),
    templates: JSON.parse(cat('./test/fixtures/expects/templates.json').stdout),
  }
  fix(t.context.config, project)
  const nproject = await makeProject(t.context.config)
  Object.values(nproject.libs).forEach(el => {
    t.is(el.refactored, el.old)
  })
  const changes = check(t.context.config, nproject)
  t.deepEqual(changes, [])
})
