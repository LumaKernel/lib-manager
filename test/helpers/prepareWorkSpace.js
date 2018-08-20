import { copySync, existsSync, mkdirsSync, removeSync } from 'fs-extra'
import defaultConfig from '../../constants/defaultConfig'

export function prepareWorkSpace (test) {
  test.beforeEach(t => {
    const work = './tmp/' + Math.random().toString(36).slice(-8)
    t.context.work = work
    mkdirsSync('./tmp')
    copySync('./test/fixtures/workspace', work)
    t.true(existsSync(work))
    t.context.config = {
      ...defaultConfig(),
      WorkingDir: work
    }
  })

  test.afterEach(t => {
    if (!t.context.save) removeSync(t.context.work)
  })
}
