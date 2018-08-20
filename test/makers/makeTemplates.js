import test from 'ava'
import { cat, cp } from 'shelljs'
import defaultConfig from '../../constants/defaultConfig'
import makeTemplates from '../../makers/makeTemplates'

test.beforeEach(t => {
  const work = './tmp/' + Math.random().toString(36).slice(-8)
  t.context.work = work
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
  const exp = JSON.parse(cat('./test/fixtures/expects/templates.json').stdout)
  const templates = await makeTemplates(t.context.config)
  // t.log(JSON.stringify(templates))
  t.deepEqual(templates, exp)
})
