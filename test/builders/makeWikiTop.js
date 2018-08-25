import test from 'ava'
import { cat } from 'shelljs'
import makeWikiTop from '../../src/builders/makeWikiTop'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

test(async t => {
  const wikis = JSON.parse(cat('./test/fixtures/expects/wikis_transformed.json').stdout)
  const topRaw = cat('./test/fixtures/workspace/src/index.md').stdout
  const exp = cat('./test/fixtures/expects/index.md').stdout
  const wikiTop = makeWikiTop(topRaw, wikis, 'someday')
  // console.log(wikiTop)
  t.deepEqual(wikiTop, exp)
})
