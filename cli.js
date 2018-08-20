#!/usr/bin/env node
import program from 'commander'
import makeProject from './makers/makeProject'
import makeConfig from './makeConfig'
import { resolve } from 'path'
import defaultConfig from './constants/defaultConfig'
import {echo, test} from 'shelljs'
import {toYaml} from 'toYaml'
import backup from './makers/backup'
import fix from './transformers/fix'
const defaultSettingFile = 'libman.yml'

program
  .version('0.1.0', '-v, --version')
  .option('-s, --setting', 'YAML setting file path')

program
  .commscription('check only')
  .usage('[options] <dir>')
  .action(async (dir, cmd) => {
    const setting = cmd.setting || defaultSettingFile
    const config = makeConfig(dir, setting)
    const project = makeProject(config)
    // await check(dir, cmd)
  })

program
  .command('fix')
  .description('check and fix it')
  .usage('[options] <dir>')
  .action(async (dir, cmd) => {
    const setting = cmd.setting || defaultSettingFile
    const config = makeConfig(dir, setting)
    const project = makeProject(config)
    fix(config, project)
  })

program
  .command('build')
  .usage('[options] <dir>')
  .option('-f, --fix', 'when check is failed, fix and build')
  .action(async (dir, cmd) => {
    const setting = cmd.setting || defaultSettingFile
    const config = makeConfig(dir, setting)
    // const ok = await check(dir, cmd)
    // if (ok) fix(dir, cmd)
  })

program
  .command('init')
  .description('make config file')
  .usage('[options] <dir>')
  .option('-d, --default', 'use default setting')
  .action(async (dir, cmd) => {
    const setting = cmd.setting || defaultSettingFile
    if (test('-e', setting)) throw `${dir} : ${setting} already exists`
    const cfgObj = cmd.default ? defaultConfig() : {}
    echo(toYaml(cfgObj)).to(resolve(process.cwd(), setting))
  })

program
  .command('clean')
  .description('delete tmp, dist dir')
  .usage('[options] <dir>')
  .option('-d, --default', 'use default setting')
  .action(async (dir, cmd) => {
    const setting = cmd.setting || defaultSettingFile
    const config = makeConfig(dir, setting)
  })

program.parse(process.argv)
