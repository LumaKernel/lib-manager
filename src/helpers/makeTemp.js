import fs from 'fs-extra'
import path from 'path'
const { mkdirsSync } = fs
const { resolve } = path

export default function makeTemp (config) {
  const temp = resolve(process.cwd(), config.WorkingDir, config.TempDir, Math.random().toString(36).slice(-8))
  mkdirsSync(temp)
  return temp
}
