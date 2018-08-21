import test from 'ava'
import shelljs from 'shelljs'
const { cat } = shelljs
import makeTemplates from '../../makers/makeTemplates'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

test(async t => {
  const exp = JSON.parse(cat('./test/fixtures/expects/templates.json').stdout)
  const templates = await makeTemplates(t.context.config)
  // t.log(JSON.stringify(templates))
  t.deepEqual(templates, exp)
})