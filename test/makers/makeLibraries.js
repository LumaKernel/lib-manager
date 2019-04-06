import test from 'ava'
import makeLibraries from '../../src/makers/makeLibraries'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

test(async t => {
  const {libs, files} = await makeLibraries(t.context.config)
  t.snapshot(libs)
  t.snapshot(files)
})
