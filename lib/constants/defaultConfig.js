'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = defaultConfig;

require('source-map-support/register');

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
    printableYAML: {
      layout: 'printable'
    },
    CopyWiki: false,
    CopySnippet: false,
    CopyPrintable: false
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25zdGFudHMvZGVmYXVsdENvbmZpZy5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0Q29uZmlnIiwiV29ya2luZ0RpciIsIlNyY0RpciIsIkRpc3REaXIiLCJCYWNrVXBEaXIiLCJUZW1wRGlyIiwiQ2xhbmdGb3JtYXRPcHRpb25QYXRoIiwiRm9ybWF0T3B0aW9uIiwiQWxsb3dTdHJ1Y3RPbmVMaW5lIiwid2lraVlBTUwiLCJsYXlvdXQiLCJwcmludGFibGVZQU1MIiwiQ29weVdpa2kiLCJDb3B5U25pcHBldCIsIkNvcHlQcmludGFibGUiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQUN3QkEsYTs7OztBQUR4QjtBQUNlLFNBQVNBLGFBQVQsR0FBMEI7QUFDdkMsU0FBTztBQUNMQyxnQkFBWSxJQURQO0FBRUxDLFlBQVEsT0FGSDtBQUdMQyxhQUFTLFFBSEo7QUFJTEMsZUFBVyxVQUpOO0FBS0xDLGFBQVMsT0FMSjtBQU1MQywyQkFBdUIsaUJBTmxCO0FBT0xDLGtCQUFjO0FBQ1pDLDBCQUFvQjtBQURSLEtBUFQ7QUFVTEMsY0FBVTtBQUNSQyxjQUFRO0FBREEsS0FWTDtBQWFMQyxtQkFBZTtBQUNiRCxjQUFRO0FBREssS0FiVjtBQWdCTEUsY0FBVSxLQWhCTDtBQWlCTEMsaUJBQWEsS0FqQlI7QUFrQkxDLG1CQUFlO0FBbEJWLEdBQVA7QUFvQkQiLCJmaWxlIjoiZGVmYXVsdENvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFlBTUznlKhcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlZmF1bHRDb25maWcgKCkge1xuICByZXR1cm4ge1xuICAgIFdvcmtpbmdEaXI6ICcuLycsXG4gICAgU3JjRGlyOiAnLi9zcmMnLFxuICAgIERpc3REaXI6ICcuL2Rpc3QnLFxuICAgIEJhY2tVcERpcjogJy4vYmFja3VwJyxcbiAgICBUZW1wRGlyOiAnLi90bXAnLFxuICAgIENsYW5nRm9ybWF0T3B0aW9uUGF0aDogJy4vLmNsYW5nLWZvcm1hdCcsXG4gICAgRm9ybWF0T3B0aW9uOiB7XG4gICAgICBBbGxvd1N0cnVjdE9uZUxpbmU6IHRydWUsXG4gICAgfSxcbiAgICB3aWtpWUFNTDoge1xuICAgICAgbGF5b3V0OiAncGFnZSdcbiAgICB9LFxuICAgIHByaW50YWJsZVlBTUw6IHtcbiAgICAgIGxheW91dDogJ3ByaW50YWJsZSdcbiAgICB9LFxuICAgIENvcHlXaWtpOiBmYWxzZSxcbiAgICBDb3B5U25pcHBldDogZmFsc2UsXG4gICAgQ29weVByaW50YWJsZTogZmFsc2UsXG4gIH1cbn1cbiJdfQ==