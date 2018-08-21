import test from 'ava'
import path from 'path'
const { resolve } = path
import shelljs from 'shelljs'
const { cat } = shelljs
import buildInit from '../../commands/buidInit'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'
import fs from 'fs-extra'
const { removeSync } = fs

prepareWorkSpace(test)

test.beforeEach(t => {
  const project = {
    wikis: JSON.parse(cat('./test/fixtures/expects/wikis_transformed.json').stdout),
    libs: JSON.parse(cat('./test/fixtures/expects/libs_transformed.json').stdout),
    templates: JSON.parse(cat('./test/fixtures/expects/templates.json').stdout),
  }
  const config = t.context.config
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir)

  removeSync(resolve(src, 'printlist.json'))

  buildInit(config, project)
})

test(async t => {
  const config = t.context.config
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir)
  const printlistExp = JSON.parse(cat('./test/fixtures/expects/printlist.json').stdout)
  const printlist = JSON.parse(cat(resolve(src, 'printlist.json')).stdout)

  // console.log(JSON.stringify(printlist))
  t.deepEqual(printlist, printlistExp)
})
