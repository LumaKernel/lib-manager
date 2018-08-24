import test from 'ava'
import {readFileSync} from 'fs-extra'
import makeProject from '../../src/makers/makeProject'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

test(async t => {
  const exp = {
    wikis: JSON.parse(readFileSync('./test/fixtures/expects/wikis_transformed.json').toString()),
    libs: JSON.parse(readFileSync('./test/fixtures/expects/libs_transformed.json').toString()),
    templates: JSON.parse(readFileSync('./test/fixtures/expects/templates.json').toString()),
    files: JSON.parse(readFileSync('./test/fixtures/expects/files.json').toString()),
  }
  const project = await makeProject(t.context.config)
  t.log(JSON.stringify(project))
  t.deepEqual(project, exp)
})
