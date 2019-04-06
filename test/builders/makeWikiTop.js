import test from 'ava'
import {readFileSync} from 'fs-extra'
import makeWikiTop from '../../src/builders/makeWikiTop'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

test(async t => {
  const wikis = JSON.parse(readFileSync('./test/fixtures/expects/wikis_transformed.json').toString())
  const topRaw = readFileSync('./test/fixtures/workspace/src/index.md').toString()
  const wikiTop = makeWikiTop(topRaw, wikis, 'someday')
  t.snapshot(wikiTop)
})
