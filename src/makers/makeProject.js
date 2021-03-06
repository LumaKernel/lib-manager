import makeLibraries from './makeLibraries'
import makeTemplates from './makeTemplates'
import makeWiki from './makeWiki'
import transformLibraries from '../transformers/transformLibraries'
import transformWiki from '../transformers/transformWiki'
import none from 'array-foreach-async'
none  // eslint-disable-line

export default async function makeProject (config) {
  const {libs, files} = await makeLibraries(config)
  const templates = await makeTemplates(config)
  const wikis = makeWiki(config)
  if (!wikis) throw `you must put wiki.yml in src dir`
  await transformLibraries(config, libs, templates)
  transformWiki(config.wikiYAML, wikis, libs)
  return { wikis, libs, files, templates }
}
