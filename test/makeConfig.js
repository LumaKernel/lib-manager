import test from 'ava'
import { prepareWorkSpace } from './helpers/prepareWorkSpace'
import makeConfig from '../src/makeConfig'
import { resolve } from 'path'
import defaultConfig from '../src/constants/defaultConfig';

prepareWorkSpace(test)

test(async t => {
  const config = makeConfig(resolve(process.cwd(), t.context.work, 'libman.yml'))
  const exp = defaultConfig()
  t.deepEqual(config, exp)
})
