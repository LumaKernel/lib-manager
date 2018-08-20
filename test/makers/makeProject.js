import test from 'ava'
import { cp, mkdir, cat } from 'shelljs'
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
  // よく動かない
  // rm(t.context.work)
})

test(async t => {
  const exp = {
    wikis: JSON.parse(cat('./test/fixtures/expects/wikis.json').stdout),
    libs: JSON.parse(cat('./test/fixtures/expects/libs_transformed.json').stdout),
    templates: JSON.parse(cat('./test/fixtures/expects/templates.json').stdout),
  }
  const project = await makeProject(t.context.config)
  t.deepEqual(project, exp)
})