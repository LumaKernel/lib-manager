import { writeFileSync } from 'fs'
import path from 'path'
import backup from '../makers/backup'
const { resolve } = path

export function fix (config, project) {
  backup(config)
  applyLibraries(config, project.files, project.libs, true)
  applyTemplates(config, project.templates, true)
}

/**
 * backup before using
 */
export function applyLibraries (config, files, libs, apply = false) {
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir)
  const changes = []
  files.forEach(({namespace, filename, data}) => {
    let changed = false
    const refacrtored = data
      .map(name => {
        if (libs[name].old !== libs[name].refactored) changed = true
        return libs[name].refactored
      })
      .join('\n')
    if (!changed) return
    const path = resolve(src, ...namespace.split('/'), filename)
    changes.push([...namespace.split('/'), filename].filter(e => e).join('/'))
    if (apply) writeFileSync(path, refacrtored)
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
    const path = resolve(src, ...el.namespace.split('/'), el.filename)
    changes.push([...el.namespace.split('/'), el.filename].filter(e => e).join('/'))
    if (apply) writeFileSync(path, el.code)
  })
  return changes
}
