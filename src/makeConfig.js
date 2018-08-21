import yaml from 'js-yaml'
import {existsSync, readFileSync} from 'fs-extra'
import defaultConfig from './constants/defaultConfig'

export default function makeConfig (setting) {
  if (!existsSync(setting)) throw `no setting file ${setting}`
  const config = {
    ...defaultConfig(),
    ...yaml.safeLoad(readFileSync(setting).toString()),
  };
  ['CopyWiki', 'CopySnippet', 'CopyPrintable'].forEach(el => {
    if (process.env.HOME && typeof config[el] === 'string') {
      config[el] = config[el].replace(/~/g, process.env.HOME)
    }
  })
  return config
}
