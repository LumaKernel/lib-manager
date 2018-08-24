import test from 'ava'
import {readFileSync} from 'fs-extra'
import makeLibraries from '../../src/makers/makeLibraries'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

test(async t => {
  const libsExp = JSON.parse(readFileSync('./test/fixtures/expects/libs.json').toString())
  const fielsExp = JSON.parse(readFileSync('./test/fixtures/expects/files.json').toString())
  const {libs, files} = await makeLibraries(t.context.config)
  t.log(JSON.stringify(libs))
  t.log(JSON.stringify(files))
  t.deepEqual(libs, libsExp)
  t.deepEqual(files, fielsExp)
})
