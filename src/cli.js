import program from 'commander'
import { existsSync, removeSync, writeFileSync } from 'fs-extra'
import yaml from 'js-yaml'
import path from 'path'
import buildInit from './commands/buidInit'
import build from './commands/build'
import { check } from './commands/check'
import { fix } from './commands/fix'
import defaultConfig from './constants/defaultConfig'
import makeConfig from './makeConfig'
import makeProject from './makers/makeProject'
import exit from 'exit'
const { resolve } = path

const version = require('../package.json').version

const defaultSettingFile = 'libman.yml'

program
  .version(version, '-v, --version')
  .option('-s, --setting', 'YAML setting file path')

program
  .command('check')
  .description('check only')
  .usage('[options]')
  .action(async (cmd) => {
    try {
      const setting = cmd.setting || defaultSettingFile
      const config = makeConfig(setting)
      const project = await makeProject(config)
      const changes = check(config, project)
      if (changes.length === 0) {
        console.log('no file needs fixing')
      } else {
        console.log('these files will be replaced when fixing')
        changes.forEach(change => { console.log(change) })
      }
    } catch (e) {
      if (typeof e === 'string') console.error(e)
      else throw e
    }
  })

program
  .command('fix')
  .description('check and fix it')
  .usage('[options]')
  .action(async (cmd) => {
    try {
      const setting = cmd.setting || defaultSettingFile
      const config = makeConfig(setting)
      const project = await makeProject(config)
      const changes = check(config, project)
      console.log(`${changes.length} files will be fixed`)
      fix(config, project)
    } catch (e) {
      if (typeof e === 'string') console.error(e)
      else throw e
    }
  })

program
  .command('build')
  .usage('[options]')
  .option('-i, --init', 'put printlist.json')
  .option('-f, --fix', 'when check is failed, fix and build')
  .option('-o, --one', 'output one-printable-page')
  .action(async (cmd) => {
    try {
      const setting = cmd.setting || defaultSettingFile
      const config = makeConfig(setting)
      const project = await makeProject(config)
      if (cmd.init) {
        buildInit(config, project)
        return
      }
      const changes = check(config, project)
      if (changes.length !== 0) {
        if (cmd.fix) {
          console.log(`fixing...`)
          fix(config, project)
        } else {
          console.error(`you need to fix`)
          exit(1)
        }
      } else {
        console.log(`passed checking`)
      }
      console.log('building...')
      build(config, project, cmd.one)
    } catch (e) {
      if (typeof e === 'string') console.error(e)
      else throw e
    }
  })

program
  .command('init')
  .description('make config file')
  .usage('[options]')
  .option('-d, --default', 'use default setting')
  .option('-f, --force', "when there's already a setting, replace")
  .action(async (cmd) => {
    try {
      const setting = cmd.setting || defaultSettingFile
      if (existsSync(setting) && !cmd.force) {
        throw `${setting} already exists`
      }
      const cfgObj = cmd.default ? defaultConfig() : {}
      writeFileSync(resolve(process.cwd(), setting), yaml.safeDump(cfgObj))
    } catch (e) {
      if (typeof e === 'string') console.error(e)
      else throw e
    }
  })

program
  .command('clean')
  .description('delete tmp, dist dir')
  .usage('[options]')
  .action(async (cmd) => {
    try {
      const setting = cmd.setting || defaultSettingFile
      const config = makeConfig(setting)
      const work = resolve(process.cwd(), config.WorkingDir)
      const tmp = resolve(work, config.TempDir)
      const dist = resolve(work, config.DistDir)
      if (existsSync(tmp))removeSync(tmp)
      if (existsSync(dist))removeSync(dist)
    } catch (e) {
      if (typeof e === 'string') console.error(e)
      else throw e
    }
  })

// error on unknown commands
program.on('command:*', function () {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '))
})

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.help()
}
