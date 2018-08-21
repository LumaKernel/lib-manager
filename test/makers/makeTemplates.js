import test from 'ava'
import { cat } from 'shelljs'
import makeTemplates from '../../src/makers/makeTemplates'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

test(async t => {
  const exp = JSON.parse(cat('./test/fixtures/expects/templates.json').stdout)
  const templates = await makeTemplates(t.context.config)
  // t.log(JSON.stringify(templates))
  t.deepEqual(templates, exp)
})
