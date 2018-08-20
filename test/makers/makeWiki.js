import test from 'ava'
import { resolve } from 'path'
import { cat, cp, mkdir } from 'shelljs'
import defaultConfig from '../../constants/defaultConfig'
import makeWiki from '../../makers/makeWiki'

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
  const exp = JSON.parse(cat('./test/fixtures/expects/wikis.json').stdout)
  const wikis = await makeWiki(t.context.config)
  t.log(JSON.stringify(wikis))
  t.deepEqual(wikis, exp)
})
