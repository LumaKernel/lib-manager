'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = defaultConfig;
// YAML用
function defaultConfig() {
  return {
    WorkingDir: './',
    SrcDir: './src',
    DistDir: './dist',
    BackUpDir: './backup',
    TempDir: './tmp',
    ClangFormatOptionPath: './.clang-format',
    FormatOption: {
      AllowStructOneLine: true
    },
    wikiYAML: {
      layout: 'page'
    },
    CopyWiki: false,
    CopySnippet: false,
    CopyPrintable: false
  };
}