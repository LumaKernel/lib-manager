import {cat, test} from 'shelljs'
import yaml from 'js-yaml'
import defaultConfig from './constants/defaultConfig'

export default function makeConfig (dir, setting) {
  if (test('-ef', setting)) throw `${dir} : no setting file ${setting}`
  return {
    ...defaultConfig(),
    ...yaml.safeLoad(cat(setting)),
  }
}
