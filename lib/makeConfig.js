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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWtlQ29uZmlnLmpzIl0sIm5hbWVzIjpbIm1ha2VDb25maWciLCJzZXR0aW5nIiwiY29uZmlnIiwieWFtbCIsInNhZmVMb2FkIiwidG9TdHJpbmciLCJmb3JFYWNoIiwiZWwiLCJwcm9jZXNzIiwiZW52IiwiSE9NRSIsInJlcGxhY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBRWUsU0FBU0EsVUFBVCxDQUFxQkMsT0FBckIsRUFBOEI7QUFDM0MsTUFBSSxDQUFDLHlCQUFXQSxPQUFYLENBQUwsRUFBMEIsTUFBTyxtQkFBa0JBLE9BQVEsRUFBakM7QUFDMUIsUUFBTUMsTUFBTSxHQUFHLEVBQ2IsR0FBRyw2QkFEVTtBQUViLE9BQUdDLGdCQUFLQyxRQUFMLENBQWMsMkJBQWFILE9BQWIsRUFBc0JJLFFBQXRCLEVBQWQ7QUFGVSxHQUFmO0FBSUEsR0FBQyxVQUFELEVBQWEsYUFBYixFQUE0QixlQUE1QixFQUE2Q0MsT0FBN0MsQ0FBcURDLEVBQUUsSUFBSTtBQUN6RCxRQUFJQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsSUFBWixJQUFvQixPQUFPUixNQUFNLENBQUNLLEVBQUQsQ0FBYixLQUFzQixRQUE5QyxFQUF3RDtBQUN0REwsTUFBQUEsTUFBTSxDQUFDSyxFQUFELENBQU4sR0FBYUwsTUFBTSxDQUFDSyxFQUFELENBQU4sQ0FBV0ksT0FBWCxDQUFtQixJQUFuQixFQUF5QkgsT0FBTyxDQUFDQyxHQUFSLENBQVlDLElBQXJDLENBQWI7QUFDRDtBQUNGLEdBSkQ7QUFLQSxTQUFPUixNQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeWFtbCBmcm9tICdqcy15YW1sJ1xyXG5pbXBvcnQge2V4aXN0c1N5bmMsIHJlYWRGaWxlU3luY30gZnJvbSAnZnMtZXh0cmEnXHJcbmltcG9ydCBkZWZhdWx0Q29uZmlnIGZyb20gJy4vY29uc3RhbnRzL2RlZmF1bHRDb25maWcnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWtlQ29uZmlnIChzZXR0aW5nKSB7XHJcbiAgaWYgKCFleGlzdHNTeW5jKHNldHRpbmcpKSB0aHJvdyBgbm8gc2V0dGluZyBmaWxlICR7c2V0dGluZ31gXHJcbiAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgLi4uZGVmYXVsdENvbmZpZygpLFxyXG4gICAgLi4ueWFtbC5zYWZlTG9hZChyZWFkRmlsZVN5bmMoc2V0dGluZykudG9TdHJpbmcoKSksXHJcbiAgfTtcclxuICBbJ0NvcHlXaWtpJywgJ0NvcHlTbmlwcGV0JywgJ0NvcHlQcmludGFibGUnXS5mb3JFYWNoKGVsID0+IHtcclxuICAgIGlmIChwcm9jZXNzLmVudi5IT01FICYmIHR5cGVvZiBjb25maWdbZWxdID09PSAnc3RyaW5nJykge1xyXG4gICAgICBjb25maWdbZWxdID0gY29uZmlnW2VsXS5yZXBsYWNlKC9+L2csIHByb2Nlc3MuZW52LkhPTUUpXHJcbiAgICB9XHJcbiAgfSlcclxuICByZXR1cm4gY29uZmlnXHJcbn1cclxuIl19