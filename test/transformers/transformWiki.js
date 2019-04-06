import test from 'ava'
import {readFileSync} from 'fs-extra'
import transformWiki from '../../src/transformers/transformWiki'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

// "// @ Foo Lib" とかを変換する
test('transform wiki', async t => {
  const wikis = JSON.parse(readFileSync('./test/fixtures/expects/wikis.json').toString())
  const libs = Object.freeze(JSON.parse(readFileSync('./test/fixtures/expects/libs_transformed.json').toString()))
  transformWiki(t.context.config.wikiYAML, wikis, libs)
  t.snapshot(wikis)
})
