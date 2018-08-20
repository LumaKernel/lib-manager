import test from 'ava'
import { cat, cp, mkdir } from 'shelljs'
import defaultConfig from '../../constants/defaultConfig'
import transformLibraries from '../../transformers/transformLibraries'

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

// ###1###とかを変換する
test('transform libs', async t => {
  const libs = JSON.parse(cat('./test/fixtures/expects/libs.json'))
  const templates = JSON.parse(cat('./test/fixtures/expects/templates.json'))
  const exp = JSON.parse(cat('./test/fixtures/expects/libs_transformed.json'))
  await transformLibraries(t.context.config, libs, templates)
  t.log(JSON.stringify(libs))
  t.deepEqual(libs, exp)
})
