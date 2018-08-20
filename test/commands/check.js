import test from 'ava'
import { cat, cp, mkdir } from 'shelljs'
import { check } from '../../commands/check'
import defaultConfig from '../../constants/defaultConfig'

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

test(async t => {
  const exp = JSON.parse(cat('./test/fixtures/expects/changes.json').stdout)
  const project = {
    wikis: JSON.parse(cat('./test/fixtures/expects/wikis.json').stdout),
    libs: JSON.parse(cat('./test/fixtures/expects/libs_transformed.json').stdout),
    templates: JSON.parse(cat('./test/fixtures/expects/templates.json').stdout),
  }
  const changes = check(t.context.config, project)
  t.deepEqual(changes, exp)
})
