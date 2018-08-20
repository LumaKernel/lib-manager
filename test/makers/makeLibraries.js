import test from 'ava'
import { cat, cp, mkdir } from 'shelljs'
import defaultConfig from '../../constants/defaultConfig'
import makeLibraries from '../../makers/makeLibraries'

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
  const exp = JSON.parse(cat('./test/fixtures/expects/libs.json').stdout)
  const libs = await makeLibraries(t.context.config)
  // t.log(JSON.stringify(libs))
  t.deepEqual(libs, exp)
})
