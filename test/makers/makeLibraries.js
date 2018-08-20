import test from 'ava'
import { cat } from 'shelljs'
import makeLibraries from '../../makers/makeLibraries'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

test(async t => {
  const exp = JSON.parse(cat('./test/fixtures/expects/libs.json').stdout)
  const libs = await makeLibraries(t.context.config)
  t.log(JSON.stringify(libs))
  t.deepEqual(libs, exp)
})
