import { resolve } from 'path'
import { cp, mkdir } from 'shelljs'
export default function backup (config) {
  const dir = resolve(process.cwd(), config.WorkingDir, config.BackUpDir)
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir)
  mkdir('-p', dir)
  const tmp = resolve(dir, Math.random().toString(16).slice(-8))
  cp('-r', src, tmp)
}
