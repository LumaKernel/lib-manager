import fs from 'fs-extra'
import path from 'path'
const { resolve } = path
const { existsSync, writeFileSync, readFileSync } = fs

export default function buildInit (config, project) {
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir)
  const printlistPath = resolve(src, 'printlist.json')
  const printedPath = resolve(src, 'printed.json')
  if (existsSync(printlistPath)) throw '"printlist.json" already exists'
  if (!existsSync(printedPath)) {
    writeFileSync(printedPath, '{}')
  }
  const printed = JSON.parse(readFileSync(printedPath).toString())
  const printlist = []
  Object.entries(project.libs).forEach(([key, value]) => {
    if (printed[key] === value.code) return
    printlist.push(key)
  })
  writeFileSync(printlistPath, JSON.stringify(printlist))
}
