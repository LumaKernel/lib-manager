import test from 'ava'
import {readFileSync} from 'fs-extra'
import makeWiki from '../../src/makers/makeWiki'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

test(async t => {
  const exp = JSON.parse(readFileSync('./test/fixtures/expects/wikis.json').toString())
  const wikis = await makeWiki(t.context.config)
  t.log(JSON.stringify(wikis))
  t.deepEqual(wikis, exp)
})
