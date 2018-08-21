'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = makeConfig;

require('source-map-support/register');

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _fsExtra = require('fs-extra');

var _defaultConfig = require('./constants/defaultConfig');

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeConfig(setting) {
  if (!(0, _fsExtra.existsSync)(setting)) throw `no setting file ${setting}`;
  const config = _extends({}, (0, _defaultConfig2.default)(), _jsYaml2.default.safeLoad((0, _fsExtra.readFileSync)(setting).toString()));
  ['CopyWiki', 'CopySnippet', 'CopyPrintable'].forEach(el => {
    if (process.env.HOME && typeof config[el] === 'string') {
      config[el] = config[el].replace(/~/g, process.env.HOME);
    }
  });
  return config;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWtlQ29uZmlnLmpzIl0sIm5hbWVzIjpbIm1ha2VDb25maWciLCJzZXR0aW5nIiwiY29uZmlnIiwieWFtbCIsInNhZmVMb2FkIiwidG9TdHJpbmciLCJmb3JFYWNoIiwiZWwiLCJwcm9jZXNzIiwiZW52IiwiSE9NRSIsInJlcGxhY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O2tCQUl3QkEsVTs7OztBQUp4Qjs7OztBQUNBOztBQUNBOzs7Ozs7QUFFZSxTQUFTQSxVQUFULENBQXFCQyxPQUFyQixFQUE4QjtBQUMzQyxNQUFJLENBQUMseUJBQVdBLE9BQVgsQ0FBTCxFQUEwQixNQUFPLG1CQUFrQkEsT0FBUSxFQUFqQztBQUMxQixRQUFNQyxzQkFDRCw4QkFEQyxFQUVEQyxpQkFBS0MsUUFBTCxDQUFjLDJCQUFhSCxPQUFiLEVBQXNCSSxRQUF0QixFQUFkLENBRkMsQ0FBTjtBQUlBLEdBQUMsVUFBRCxFQUFhLGFBQWIsRUFBNEIsZUFBNUIsRUFBNkNDLE9BQTdDLENBQXFEQyxNQUFNO0FBQ3pELFFBQUlDLFFBQVFDLEdBQVIsQ0FBWUMsSUFBWixJQUFvQixPQUFPUixPQUFPSyxFQUFQLENBQVAsS0FBc0IsUUFBOUMsRUFBd0Q7QUFDdERMLGFBQU9LLEVBQVAsSUFBYUwsT0FBT0ssRUFBUCxFQUFXSSxPQUFYLENBQW1CLElBQW5CLEVBQXlCSCxRQUFRQyxHQUFSLENBQVlDLElBQXJDLENBQWI7QUFDRDtBQUNGLEdBSkQ7QUFLQSxTQUFPUixNQUFQO0FBQ0QiLCJmaWxlIjoibWFrZUNvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB5YW1sIGZyb20gJ2pzLXlhbWwnXG5pbXBvcnQge2V4aXN0c1N5bmMsIHJlYWRGaWxlU3luY30gZnJvbSAnZnMtZXh0cmEnXG5pbXBvcnQgZGVmYXVsdENvbmZpZyBmcm9tICcuL2NvbnN0YW50cy9kZWZhdWx0Q29uZmlnJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWtlQ29uZmlnIChzZXR0aW5nKSB7XG4gIGlmICghZXhpc3RzU3luYyhzZXR0aW5nKSkgdGhyb3cgYG5vIHNldHRpbmcgZmlsZSAke3NldHRpbmd9YFxuICBjb25zdCBjb25maWcgPSB7XG4gICAgLi4uZGVmYXVsdENvbmZpZygpLFxuICAgIC4uLnlhbWwuc2FmZUxvYWQocmVhZEZpbGVTeW5jKHNldHRpbmcpLnRvU3RyaW5nKCkpLFxuICB9O1xuICBbJ0NvcHlXaWtpJywgJ0NvcHlTbmlwcGV0JywgJ0NvcHlQcmludGFibGUnXS5mb3JFYWNoKGVsID0+IHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuSE9NRSAmJiB0eXBlb2YgY29uZmlnW2VsXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbmZpZ1tlbF0gPSBjb25maWdbZWxdLnJlcGxhY2UoL34vZywgcHJvY2Vzcy5lbnYuSE9NRSlcbiAgICB9XG4gIH0pXG4gIHJldHVybiBjb25maWdcbn1cbiJdfQ==