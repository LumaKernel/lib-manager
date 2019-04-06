import test from 'ava'
import {readFileSync} from 'fs-extra'
import transformLibraries from '../../src/transformers/transformLibraries'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

// ###1###とかを変換する
test('transform libs', async t => {
  const libs = JSON.parse(readFileSync('./test/fixtures/expects/libs.json').toString())
  const templates = JSON.parse(readFileSync('./test/fixtures/expects/templates.json').toString())
  const exp = JSON.parse(readFileSync('./test/fixtures/expects/libs_transformed.json').toString())
  await transformLibraries(t.context.config, libs, templates)
  t.log(JSON.stringify(libs))
  t.deepEqual(libs, exp)
})
