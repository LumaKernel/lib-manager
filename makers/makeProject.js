import makeLibraries from './makeLibraries'
import makeTemplates from './makeTemplates'
import makeWiki from './makeWiki'
import transformLibraries from '../transformers/transformLibraries';
require('array-foreach-async')

export default async function makeProject (config) {
  const libs = makeLibraries(config)
  const templates = makeTemplates(config)
  const wikis = makeWiki(config, config.WokingDir)
  if (!wikis) throw `${config.WokingDir} : you must put wiki.yml`
  transformLibraries(libs, templates)
  return { wikis, libs, templates }
}
