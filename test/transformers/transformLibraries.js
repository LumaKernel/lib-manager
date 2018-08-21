import test from 'ava'
import shelljs from 'shelljs'
const { cat } = shelljs
import transformLibraries from '../../transformers/transformLibraries'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

// ###1###とかを変換する
test('transform libs', async t => {
  const libs = JSON.parse(cat('./test/fixtures/expects/libs.json'))
  const templates = JSON.parse(cat('./test/fixtures/expects/templates.json'))
  const exp = JSON.parse(cat('./test/fixtures/expects/libs_transformed.json'))
  await transformLibraries(t.context.config, libs, templates)
  // t.log(JSON.stringify(libs))
  t.deepEqual(libs, exp)
})
