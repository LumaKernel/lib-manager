import path from "path"
// YAML用
module.exports = (dir) => ({
  WorkingDir : path.resolve(dir),
  TempDir : "./tmp",
  ClangFormatOptionPath : "./.clang-format",
  FormatOption: {
    AllowStructOneLine : true,
  },
})