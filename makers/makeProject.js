import makeLibraries from './makeLibraries'
import makeTemplates from './makeTemplates'
import makeWiki from './makeWiki'
import transformLibraries from '../transformers/transformLibraries'
require('array-foreach-async')

export default async function makeProject (config) {
  const libs = await makeLibraries(config)
  const templates = await makeTemplates(config)
  const wikis = makeWiki(config)
  if (!wikis) throw `${config.WokingDir} : you must put wiki.yml`
  await transformLibraries(config, libs, templates)
  return { wikis, libs, templates }
}
