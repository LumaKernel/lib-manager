// YAML用
export default function defaultConfig () {
  return {
    WorkingDir: './',
    SrcDir: './src',
    DistDir: './dist',
    BackUpDir: './backup',
    TempDir: './tmp',
    ClangFormatOptionPath: './.clang-format',
    FormatOption: {
      AllowStructOneLine: true,
    },
    wikiYAML: {
      layout: 'page'
    },
    printableYAML: {
      layout: 'printable'
    },
    CopyWiki: false,
    CopySnippet: false,
    CopyPrintable: false,
  }
}
