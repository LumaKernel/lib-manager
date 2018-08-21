import test from 'ava'
import shelljs from 'shelljs'
const { cat } = shelljs
import makeProject from '../../makers/makeProject'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

test(async t => {
  const exp = {
    wikis: JSON.parse(cat('./test/fixtures/expects/wikis_transformed.json').stdout),
    libs: JSON.parse(cat('./test/fixtures/expects/libs_transformed.json').stdout),
    templates: JSON.parse(cat('./test/fixtures/expects/templates.json').stdout),
  }
  const project = await makeProject(t.context.config)
  t.deepEqual(project, exp)
})