import { copySync, mkdirsSync } from 'fs-extra'
import { resolve } from 'path'

export default function backup (config) {
  const dir = resolve(process.cwd(), config.WorkingDir, config.BackUpDir)
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir)
  mkdirsSync(dir)
  const tmp = resolve(dir, Math.random().toString(36).slice(-8))
  copySync(src, tmp)
}
