import yaml from 'js-yaml'
import { cat, test } from 'shelljs'
import defaultConfig from './constants/defaultConfig'

export default function makeConfig (setting) {
  if (!test('-ef', setting)) throw `no setting file ${setting}`
  const config = {
    ...defaultConfig(),
    ...yaml.safeLoad(cat(setting)),
  };
  ['CopyWiki', 'CopySnippet', 'CopyPrintable'].forEach(el => {
    if (process.env.HOME) {
      config[el] = config[el].replace(/~/g, process.env.HOME)
    }
  })
  return config
}
