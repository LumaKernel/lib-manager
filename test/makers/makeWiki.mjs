import test from 'ava'
import shelljs from 'shelljs'
const { cat } = shelljs
import makeWiki from '../../makers/makeWiki'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

test(async t => {
  const exp = JSON.parse(cat('./test/fixtures/expects/wikis.json').stdout)
  const wikis = await makeWiki(t.context.config)
  t.log(JSON.stringify(wikis))
  t.deepEqual(wikis, exp)
})
