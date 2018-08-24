"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeConfig;

require("source-map-support/register");

var _jsYaml = _interopRequireDefault(require("js-yaml"));

var _fsExtra = require("fs-extra");

var _defaultConfig = _interopRequireDefault(require("./constants/defaultConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeConfig(setting) {
  if (!(0, _fsExtra.existsSync)(setting)) throw `no setting file ${setting}`;
  const config = { ...(0, _defaultConfig.default)(),
    ..._jsYaml.default.safeLoad((0, _fsExtra.readFileSync)(setting).toString())
  };
  ['CopyWiki', 'CopySnippet', 'CopyPrintable'].forEach(el => {
    if (process.env.HOME && typeof config[el] === 'string') {
      config[el] = config[el].replace(/~/g, process.env.HOME);
    }
  });
  return config;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWtlQ29uZmlnLmpzIl0sIm5hbWVzIjpbIm1ha2VDb25maWciLCJzZXR0aW5nIiwiY29uZmlnIiwieWFtbCIsInNhZmVMb2FkIiwidG9TdHJpbmciLCJmb3JFYWNoIiwiZWwiLCJwcm9jZXNzIiwiZW52IiwiSE9NRSIsInJlcGxhY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBRWUsU0FBU0EsVUFBVCxDQUFxQkMsT0FBckIsRUFBOEI7QUFDM0MsTUFBSSxDQUFDLHlCQUFXQSxPQUFYLENBQUwsRUFBMEIsTUFBTyxtQkFBa0JBLE9BQVEsRUFBakM7QUFDMUIsUUFBTUMsTUFBTSxHQUFHLEVBQ2IsR0FBRyw2QkFEVTtBQUViLE9BQUdDLGdCQUFLQyxRQUFMLENBQWMsMkJBQWFILE9BQWIsRUFBc0JJLFFBQXRCLEVBQWQ7QUFGVSxHQUFmO0FBSUEsR0FBQyxVQUFELEVBQWEsYUFBYixFQUE0QixlQUE1QixFQUE2Q0MsT0FBN0MsQ0FBcURDLEVBQUUsSUFBSTtBQUN6RCxRQUFJQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsSUFBWixJQUFvQixPQUFPUixNQUFNLENBQUNLLEVBQUQsQ0FBYixLQUFzQixRQUE5QyxFQUF3RDtBQUN0REwsTUFBQUEsTUFBTSxDQUFDSyxFQUFELENBQU4sR0FBYUwsTUFBTSxDQUFDSyxFQUFELENBQU4sQ0FBV0ksT0FBWCxDQUFtQixJQUFuQixFQUF5QkgsT0FBTyxDQUFDQyxHQUFSLENBQVlDLElBQXJDLENBQWI7QUFDRDtBQUNGLEdBSkQ7QUFLQSxTQUFPUixNQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeWFtbCBmcm9tICdqcy15YW1sJ1xuaW1wb3J0IHtleGlzdHNTeW5jLCByZWFkRmlsZVN5bmN9IGZyb20gJ2ZzLWV4dHJhJ1xuaW1wb3J0IGRlZmF1bHRDb25maWcgZnJvbSAnLi9jb25zdGFudHMvZGVmYXVsdENvbmZpZydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZUNvbmZpZyAoc2V0dGluZykge1xuICBpZiAoIWV4aXN0c1N5bmMoc2V0dGluZykpIHRocm93IGBubyBzZXR0aW5nIGZpbGUgJHtzZXR0aW5nfWBcbiAgY29uc3QgY29uZmlnID0ge1xuICAgIC4uLmRlZmF1bHRDb25maWcoKSxcbiAgICAuLi55YW1sLnNhZmVMb2FkKHJlYWRGaWxlU3luYyhzZXR0aW5nKS50b1N0cmluZygpKSxcbiAgfTtcbiAgWydDb3B5V2lraScsICdDb3B5U25pcHBldCcsICdDb3B5UHJpbnRhYmxlJ10uZm9yRWFjaChlbCA9PiB7XG4gICAgaWYgKHByb2Nlc3MuZW52LkhPTUUgJiYgdHlwZW9mIGNvbmZpZ1tlbF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25maWdbZWxdID0gY29uZmlnW2VsXS5yZXBsYWNlKC9+L2csIHByb2Nlc3MuZW52LkhPTUUpXG4gICAgfVxuICB9KVxuICByZXR1cm4gY29uZmlnXG59XG4iXX0=