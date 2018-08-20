import { exec } from 'child_process'
import { existsSync, mkdirsSync, readFileSync, removeSync, writeFileSync } from 'fs-extra'
import path from 'path'
import pify from 'pify'
import makeTemp from './helpers/makeTemp'

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
  const temp = makeTemp(config)
  const originalOpt = path.resolve(process.cwd(), config.WorkingDir, config.ClangFormatOptionPath)
  if (!existsSync(originalOpt)) throw `${originalOpt} not found`
  mkdirsSync(temp)
  const tmp = path.resolve(temp, 'tmp.cpp')
  const opt = path.resolve(temp, '.clang-format')
  // .clang-formatなどを設置
  writeFileSync(tmp, code)
  writeFileSync(opt, readFileSync(originalOpt))
  // clang-formatをかける
  const formatted = await pify(exec)(`clang-format ${tmp}`, { style: 'file' })
  // 作業フォルダごと消す
  removeSync(temp)
  return formatted
}
