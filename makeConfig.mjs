import yaml from 'js-yaml'
import shelljs from 'shelljs'
import defaultConfig from './constants/defaultConfig'
const {cat, test} = shelljs

export default function makeConfig (setting) {
  if (!test('-ef', setting)) throw `no setting file ${setting}`
  return {
    ...defaultConfig(),
    ...yaml.safeLoad(cat(setting)),
  }
}
