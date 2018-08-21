#!/usr/bin/env node
import program from 'commander'
import { existsSync, removeSync, writeFileSync } from 'fs-extra'
import { resolve } from 'path'
import { exit } from 'shelljs'
import yaml from 'js-yaml'
import { check } from './commands/check'
import defaultConfig from './constants/defaultConfig'
import makeConfig from './makeConfig'
import makeProject from './makers/makeProject'
import fix from './transformers/commands/fix'
import buildInit from './commands/buidInit'
import build from './commands/build'

const defaultSettingFile = 'libman.yml'

program
  .version('0.1.0', '-v, --version')
  .option('-s, --setting', 'YAML setting file path')

program
  .command('check')
  .description('check only')
  .usage('[options] <dir>')
  .action(async (dir, cmd) => {
    const setting = cmd.setting || defaultSettingFile
    const config = makeConfig(dir, setting)
    const project = await makeProject(config)
    const changes = check(config, project)
    if (changes.length === 0) {
      console.log('no file needs fixing')
    } else {
      console.log('these files will be replaced when fixing')
      changes.forEach(change => { console.log(change) })
    }
  })

program
  .command('fix')
  .description('check and fix it')
  .usage('[options] <dir>')
  .action(async (dir, cmd) => {
    const setting = cmd.setting || defaultSettingFile
    const config = makeConfig(dir, setting)
    const project = await makeProject(config)
    fix(config, project)
  })

program
  .command('build')
  .usage('[options] <dir>')
  .option('-i, --init', 'put printlist.json')
  .option('-f, --fix', 'when check is failed, fix and build')
  .action(async (dir, cmd) => {
    const setting = cmd.setting || defaultSettingFile
    const config = makeConfig(dir, setting)
    const project = await makeProject(config)
    if (cmd.init) {
      buildInit(config, project)
      return
    }
    const changes = check(config, project)
    if (changes.length !== 0) {
      if (cmd.fix) {
        console.console(`fixing...`)
        fix(config, project)
      } else {
        console.error(`${dir} : you need to fix`)
        exit(1)
      }
    } else {
      console.console(`passed checking`)
    }
    console.log('building...')
    build(config, project)
  })

program
  .command('init')
  .description('make config file')
  .usage('[options] <dir>')
  .option('-d, --default', 'use default setting')
  .action(async (dir, cmd) => {
    const setting = cmd.setting || defaultSettingFile
    if (existsSync(setting)) throw `${dir} : ${setting} already exists`
    const cfgObj = cmd.default ? defaultConfig() : {}
    writeFileSync(resolve(process.cwd(), setting), yaml.safeDump(cfgObj))
  })

program
  .command('clean')
  .description('delete tmp, dist dir')
  .usage('[options] <dir>')
  .action(async (dir, cmd) => {
    const setting = cmd.setting || defaultSettingFile
    const config = makeConfig(dir, setting)
    const work = resolve(process.cwd(), config.WorkingDir)
    const tmp = resolve(work, config.TempDir)
    const dist = resolve(work, config.DistDir)
    removeSync(tmp, dist)
  })

program.parse(process.argv)
