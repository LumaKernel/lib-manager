import test from 'ava'
import makeWiki from '../../src/makers/makeWiki'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

test(async t => {
  const wikis = await makeWiki(t.context.config)
  t.log(JSON.stringify(wikis))
  t.snapshot(wikis)
})
