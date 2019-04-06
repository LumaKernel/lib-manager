import test from 'ava'
import { readFileSync, removeSync } from 'fs-extra'
import { resolve } from 'path'
import {readFileSync} from "fs-extra"
import buildInit from '../../src/commands/buidInit'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

test.beforeEach(t => {
  const project = {
    wikis: JSON.parse(readFileSync('./test/fixtures/expects/wikis_transformed.json').toString()),
    libs: JSON.parse(readFileSync('./test/fixtures/expects/libs_transformed.json').toString()),
    files: JSON.parse(readFileSync('./test/fixtures/expects/files.json').toString()),
    templates: JSON.parse(readFileSync('./test/fixtures/expects/templates.json').toString()),
  }
  const config = t.context.config
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir)

  removeSync(resolve(src, 'printlist.json'))

  buildInit(config, project)
})

test(async t => {
  const config = t.context.config
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir)
  const printlistExp = JSON.parse(readFileSync('./test/fixtures/expects/printlist.json').toString())
  const printlist = JSON.parse(readFileSync(resolve(src, 'printlist.json')).toString())

  // console.log(JSON.stringify(printlist))
  t.deepEqual(printlist, printlistExp)
})
