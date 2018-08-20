import { mkdirsSync } from 'fs-extra'
import { resolve } from 'path'

export default function makeTemp (config) {
  const temp = resolve(process.cwd(), config.WorkingDir, config.TempDir, Math.random().toString(36).slice(-8))
  mkdirsSync(temp)
  return temp
}
