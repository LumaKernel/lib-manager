#!/usr/bin/env node
import program from 'commander'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { test } from 'shelljs'
import { toYaml } from 'toYaml'
import defaultConfig from './constants/defaultConfig'
import makeConfig from './makeConfig'
import makeProject from './makers/makeProject'
import fix from './transformers/commands/fix'
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
    const project = await makeProject(config)
    // await check(dir, cmd)
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
    writeFileSync(resolve(process.cwd(), setting), toYaml(cfgObj))
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
