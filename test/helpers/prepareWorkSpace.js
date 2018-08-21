import { copySync, existsSync, mkdirsSync, removeSync } from 'fs-extra'
import defaultConfig from '../../constants/defaultConfig'

/**
 * to stop to remove tmp dir,
 * let t.context.save be true
 */
export function prepareWorkSpace (test) {
  test.beforeEach(t => {
    const work = './tmp/' + Math.random().toString(36).slice(-8)
    t.context.save = 0
    t.context.work = work
    mkdirsSync('./tmp')
    copySync('./test/fixtures/workspace', work)
    t.true(existsSync(work))
    t.context.config = {
      ...defaultConfig(),
      WorkingDir: work
    }
  })

  test.afterEach.always(t => {
    if (!t.context.save) removeSync(t.context.work)
    else console.log(t.context.work, 'was not removed')
  })
}
