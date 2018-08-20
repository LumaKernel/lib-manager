// YAML用
export default function defaultConfig () {
  return {
    WorkingDir: './',
    SrcDir: './src',
    BackUpDir: './backup',
    TempDir: './tmp',
    ClangFormatOptionPath: './.clang-format',
    FormatOption: {
      AllowStructOneLine: true,
    },
  }
}
