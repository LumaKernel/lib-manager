import backup from '../makers/backup'
import { resolve, echo } from 'path'

export default function fix (config, project) {
  backup(config)
  const src = resolve(process.cwd(), config.WorkinDir, config.SrcDir)
  Object.values(project.libs).forEach(el => {
    if (el.code === el.refactored) return
    const path = resolve(src, ...el.namespace.split('/'), el.filename)
    echo(el.refactored).to(path)
  })
}
