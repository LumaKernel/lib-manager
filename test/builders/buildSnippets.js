import test from 'ava'
import { cat } from 'shelljs'
import { makeSnippet } from '../../src/builders/buildSnippets'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

test(async t => {
  const libs = JSON.parse(cat('./test/fixtures/expects/libs_transformed.json').stdout)
  const exp = cat('./test/fixtures/expects/libman.snip').stdout
  const snippet = makeSnippet(t.context.config, libs)
  t.is(snippet, exp)
})
