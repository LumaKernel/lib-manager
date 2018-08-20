import test from 'ava'
import path from 'path'
import makeProject from '../../makers/makeProject'
import defaultConfig from '../../constants/defaultConfig'
import {cp, rm} from 'shelljs'

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

test.todo('write')
