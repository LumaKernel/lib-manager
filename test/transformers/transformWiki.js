import test from 'ava'
import { cat } from 'shelljs'
import transformWiki from '../../transformers/transformWiki'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

// "// @ Foo Lib" とかを変換する
test('transform wiki', async t => {
  const wikis = JSON.parse(cat('./test/fixtures/expects/wikis.json'))
  const libs = JSON.parse(cat('./test/fixtures/expects/libs_transformed.json'))
  const exp = JSON.parse(cat('./test/fixtures/expects/wikis_transformed.json'))
  transformWiki(wikis, libs)
  t.log(JSON.stringify(wikis))
  t.deepEqual(wikis, exp)
})
