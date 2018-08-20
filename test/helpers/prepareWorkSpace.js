import { cp, mkdir, test as stest } from 'shelljs'
import defaultConfig from '../../constants/defaultConfig'

export function prepareWorkSpace (test) {
  test.beforeEach(t => {
    const work = './tmp/' + Math.random().toString(36).slice(-8)
    t.context.work = work
    mkdir('-p', './tmp')
    cp('-R', './test/fixtures/workspace', work)
    t.true(stest('-ed', work))
    t.context.config = {
      ...defaultConfig(),
      WorkingDir: work
    }
  })

  test.afterEach(t => {
    // よく動かないf
    // rm(t.context.work)
  })
}
