import { resolve } from 'path'
import { echo } from 'shelljs'
import backup from '../makers/backup'

export function fix (config, project) {
  backup(config)
  applyLibraries(config, project.libs, true)
  applyTemplates(config, project.templates, true)
}

/**
 * backup before using
 */
export function applyLibraries (config, libs, apply = false) {
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir)
  const changes = []
  Object.values(libs).forEach(el => {
    if (el.code === el.refactored) return
    const path = resolve(src, ...el.namespace.split('/'), el.filename)
    changes.push([...el.namespace.split('/'), el.filename].filter(e => e).join('/'))
    if (apply) echo(el.refactored).to(path)
  })
  return changes
}

/**
 * backup before using
 */
export function applyTemplates (config, templates, apply = false) {
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir)
  const changes = []
  Object.keys(templates).forEach(key => {
    const el = templates[key]
    if (el.code === el.old) return
    const path = resolve(src, ...el.namespace.split('/'), key)
    changes.push([...el.namespace.split('/'), key].filter(e => e).join('/'))
    if (apply) echo(el.code).to(path)
  })
  return changes
}
