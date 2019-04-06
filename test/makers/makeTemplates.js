import test from 'ava'
import {readFileSync} from 'fs-extra'
import makeTemplates from '../../src/makers/makeTemplates'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

test(async t => {
  const exp = JSON.parse(readFileSync('./test/fixtures/expects/templates.json').toString())
  const templates = await makeTemplates(t.context.config)
  // t.log(JSON.stringify(templates))
  t.deepEqual(templates, exp)
})
