import test from 'ava'
import makeTemplates from '../../src/makers/makeTemplates'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

test(async t => {
  const templates = await makeTemplates(t.context.config)
  t.snapshot(templates)
})
