import test from 'ava'
import {readFileSync} from 'fs-extra'
import { makeSnippet } from '../../src/builders/buildSnippets'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

test(async t => {
  const libs = JSON.parse(readFileSync('./test/fixtures/expects/libs_transformed.json').toString())
  const exp = readFileSync('./test/fixtures/expects/libman.snip').toString()
  const snippet = makeSnippet(t.context.config, libs)
  // console.log(snippet)
  t.is(snippet, exp)
})
