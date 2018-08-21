import test from 'ava'
import { cat } from 'shelljs'
import makeWiki from '../../src/makers/makeWiki'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

test(async t => {
  const exp = JSON.parse(cat('./test/fixtures/expects/wikis.json').stdout)
  const wikis = await makeWiki(t.context.config)
  t.log(JSON.stringify(wikis))
  t.deepEqual(wikis, exp)
})
