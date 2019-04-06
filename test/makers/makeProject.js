import test from 'ava'
import makeProject from '../../src/makers/makeProject'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

test(async t => {
  const project = await makeProject(t.context.config)
  t.snapshot(project)
})
