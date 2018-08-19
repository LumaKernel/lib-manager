import fs from 'fs'
import path from 'path'
import pify from 'pify'
import { exec } from 'child_process'
import { mkdir, rm } from 'shelljs'

// 独自ルールでフォーマット
export async function format (code, config) {
  code = await clangFormat(code, config)
  if (config.FormatOption.AllowStructOneLine) {
    code = code.replace(/(?:^|\n)(\s*)struct (.*) {\n\1};/g, '$1struct $2 {}')
  }
  return code
}

export async function clangFormat (code, config) {
  // tmpに作業フォルダを作る
  // .clang-formatなどを設置
  // clang-formatをかける
  const work = path.resolve(config.WorkingDir, config.TempDir, Math.random().toString(36).slice(-8))
  const originalOpt = path.resolve(config.WorkingDir, config.ClangFormatOptionPath)
  mkdir('-p', work)
  const tmp = path.resolve(work, 'tmp.cpp')
  const opt = path.resolve(work, '.clang-format')
  await pify(fs.writeFile)(tmp, code)
  await pify(fs.writeFile)(opt, await pify(fs.readFile)(originalOpt))
  const formatted = await pify(exec)(`clang-format ${tmp}`, { style: 'file' })
  // 作業フォルダごと消す
  rm('-r', work)
  return formatted
}
