// YAML用
export default function defaultConfig () {
  return {
    WorkingDir: './',
    SrcDir: './src',
    TempDir: './tmp',
    ClangFormatOptionPath: './.clang-format',
    FormatOption: {
      AllowStructOneLine: true,
    },
  }
}
