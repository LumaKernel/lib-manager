import test from 'ava'
import { cat } from 'shelljs'
import { makeSnippet } from '../../builders/buildSnippets'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

test(async t => {
  const project = {
    wikis: JSON.parse(cat('./test/fixtures/expects/wikis.json').stdout),
    libs: JSON.parse(cat('./test/fixtures/expects/libs_transformed.json').stdout),
    templates: JSON.parse(cat('./test/fixtures/expects/templates.json').stdout),
  }
  const exp = cat('./test/fixtures/expects/libman.snip').stdout
  const snippet = makeSnippet(t.context.config, project)
  t.is(snippet, exp)
  t.fail()
})
