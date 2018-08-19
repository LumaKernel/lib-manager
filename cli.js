#!/usr/bin/env node
import program from 'commander'
import makeProject from './makeProject'
import makeConfig from './makeConfig'

program
  .version('0.1.0', '-v, --version')
  .option('-s, --setting', 'YAML setting file path')

program
  .commscription('check only')
  .usage('[options] <dir>')
  .action(async (dir, cmd) => {
    const config = makeConfig(dir, cmd.setting)
    const project = makeProject(config)
    // await check(dir, cmd)
  })

program
  .command('fix')
  .description('check and fix it')
  .usage('[options] <dir>')
  .option('-y, --yes', 'skip confirm')
  .action(async (dir, cmd) => {
    const config = makeConfig(dir, cmd.setting)
    // await check(dir, cmd)
    // if (cmd.yes) fix(dir, cmd)
  })

program
  .command('build')
  .usage('[options] <dir>')
  .option('-f, --fix', 'when check is failed, fix and build')
  .action(async (dir, cmd) => {
    const config = makeConfig(dir, cmd.setting)
    // const ok = await check(dir, cmd)
    // if (ok) fix(dir, cmd)
  })

program
  .command('init')
  .description('make config file')
  .usage('[options] <dir>')
  .option('-d, --default', 'use default setting')
  .action(async (dir, cmd) => {
    const config = makeConfig(dir, cmd.setting)
  })

program
  .command('clean')
  .description('delete tmp, dist dir')
  .usage('[options] <dir>')
  .option('-d, --default', 'use default setting')
  .action(async (dir, cmd) => {
    const config = makeConfig(dir, cmd.setting)
  })

program.parse(process.argv)
