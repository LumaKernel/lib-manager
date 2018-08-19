import {cat} from 'shelljs'
import yaml from 'js-yaml'
import defaultConfig from './constants/defaultConfig'

export default function makeConfig (dir, setting) {
  return {
    ...defaultConfig(dir),
    ...yaml.safeLoad(cat(setting)),
  }
}
