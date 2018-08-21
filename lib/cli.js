'use strict';

require('source-map-support/register');

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _fsExtra = require('fs-extra');

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _buidInit = require('./commands/buidInit');

var _buidInit2 = _interopRequireDefault(_buidInit);

var _build = require('./commands/build');

var _build2 = _interopRequireDefault(_build);

var _check = require('./commands/check');

var _fix = require('./commands/fix');

var _defaultConfig = require('./constants/defaultConfig');

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

var _makeConfig = require('./makeConfig');

var _makeConfig2 = _interopRequireDefault(_makeConfig);

var _makeProject = require('./makers/makeProject');

var _makeProject2 = _interopRequireDefault(_makeProject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { resolve } = _path2.default;
const { exit } = _shelljs2.default;

const defaultSettingFile = 'libman.yml';

_commander2.default.version('0.1.0', '-v, --version').option('-s, --setting', 'YAML setting file path');

_commander2.default.command('check').description('check only').usage('[options]').action((() => {
  var _ref = _asyncToGenerator(function* (cmd) {
    try {
      const setting = cmd.setting || defaultSettingFile;
      const config = (0, _makeConfig2.default)(setting);
      const project = yield (0, _makeProject2.default)(config);
      const changes = (0, _check.check)(config, project);
      if (changes.length === 0) {
        console.log('no file needs fixing');
      } else {
        console.log('these files will be replaced when fixing');
        changes.forEach(function (change) {
          console.log(change);
        });
      }
    } catch (e) {
      if (typeof e === 'string') console.error(e);else throw e;
    }
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})());

_commander2.default.command('fix').description('check and fix it').usage('[options]').action((() => {
  var _ref2 = _asyncToGenerator(function* (cmd) {
    try {
      const setting = cmd.setting || defaultSettingFile;
      const config = (0, _makeConfig2.default)(setting);
      const project = yield (0, _makeProject2.default)(config);
      const changes = (0, _check.check)(config, project);
      console.log(`${changes.length} files will be fixed`);
      (0, _fix.fix)(config, project);
    } catch (e) {
      if (typeof e === 'string') console.error(e);else throw e;
    }
  });

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
})());

_commander2.default.command('build').usage('[options]').option('-i, --init', 'put printlist.json').option('-f, --fix', 'when check is failed, fix and build').option('-o, --one', 'output one-printable-page').action((() => {
  var _ref3 = _asyncToGenerator(function* (cmd) {
    try {
      const setting = cmd.setting || defaultSettingFile;
      const config = (0, _makeConfig2.default)(setting);
      const project = yield (0, _makeProject2.default)(config);
      if (cmd.init) {
        (0, _buidInit2.default)(config, project);
        return;
      }
      const changes = (0, _check.check)(config, project);
      if (changes.length !== 0) {
        if (cmd.fix) {
          console.console(`fixing...`);
          (0, _fix.fix)(config, project);
        } else {
          console.error(`you need to fix`);
          exit(1);
        }
      } else {
        console.log(`passed checking`);
      }
      console.log('building...');
      (0, _build2.default)(config, project, cmd.one);
    } catch (e) {
      if (typeof e === 'string') console.error(e);else throw e;
    }
  });

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
})());

_commander2.default.command('init').description('make config file').usage('[options]').option('-d, --default', 'use default setting').option('-f, --force', "when there's already a setting, replace").action((() => {
  var _ref4 = _asyncToGenerator(function* (cmd) {
    try {
      const setting = cmd.setting || defaultSettingFile;
      if ((0, _fsExtra.existsSync)(setting) && !cmd.force) {
        throw `${setting} already exists`;
      }
      const cfgObj = cmd.default ? (0, _defaultConfig2.default)() : {};
      (0, _fsExtra.writeFileSync)(resolve(process.cwd(), setting), _jsYaml2.default.safeDump(cfgObj));
    } catch (e) {
      if (typeof e === 'string') console.error(e);else throw e;
    }
  });

  return function (_x4) {
    return _ref4.apply(this, arguments);
  };
})());

_commander2.default.command('clean').description('delete tmp, dist dir').usage('[options]').action((() => {
  var _ref5 = _asyncToGenerator(function* (cmd) {
    try {
      const setting = cmd.setting || defaultSettingFile;
      const config = (0, _makeConfig2.default)(setting);
      const work = resolve(process.cwd(), config.WorkingDir);
      const tmp = resolve(work, config.TempDir);
      const dist = resolve(work, config.DistDir);
      if ((0, _fsExtra.existsSync)(tmp)) (0, _fsExtra.removeSync)(tmp);
      if ((0, _fsExtra.existsSync)(dist)) (0, _fsExtra.removeSync)(dist);
    } catch (e) {
      if (typeof e === 'string') console.error(e);else throw e;
    }
  });

  return function (_x5) {
    return _ref5.apply(this, arguments);
  };
})());

// error on unknown commands
_commander2.default.on('command:*', function () {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', _commander2.default.args.join(' '));
});

_commander2.default.parse(process.argv);

if (!process.argv.slice(2).length) {
  _commander2.default.help();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGkuanMiXSwibmFtZXMiOlsicmVzb2x2ZSIsInBhdGgiLCJleGl0Iiwic2hlbGxqcyIsImRlZmF1bHRTZXR0aW5nRmlsZSIsInByb2dyYW0iLCJ2ZXJzaW9uIiwib3B0aW9uIiwiY29tbWFuZCIsImRlc2NyaXB0aW9uIiwidXNhZ2UiLCJhY3Rpb24iLCJjbWQiLCJzZXR0aW5nIiwiY29uZmlnIiwicHJvamVjdCIsImNoYW5nZXMiLCJsZW5ndGgiLCJjb25zb2xlIiwibG9nIiwiZm9yRWFjaCIsImNoYW5nZSIsImUiLCJlcnJvciIsImluaXQiLCJmaXgiLCJvbmUiLCJmb3JjZSIsImNmZ09iaiIsImRlZmF1bHQiLCJwcm9jZXNzIiwiY3dkIiwieWFtbCIsInNhZmVEdW1wIiwid29yayIsIldvcmtpbmdEaXIiLCJ0bXAiLCJUZW1wRGlyIiwiZGlzdCIsIkRpc3REaXIiLCJvbiIsImFyZ3MiLCJqb2luIiwicGFyc2UiLCJhcmd2Iiwic2xpY2UiLCJoZWxwIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUNBLE1BQU0sRUFBRUEsT0FBRixLQUFjQyxjQUFwQjtBQUNBLE1BQU0sRUFBRUMsSUFBRixLQUFXQyxpQkFBakI7O0FBRUEsTUFBTUMscUJBQXFCLFlBQTNCOztBQUVBQyxvQkFDR0MsT0FESCxDQUNXLE9BRFgsRUFDb0IsZUFEcEIsRUFFR0MsTUFGSCxDQUVVLGVBRlYsRUFFMkIsd0JBRjNCOztBQUlBRixvQkFDR0csT0FESCxDQUNXLE9BRFgsRUFFR0MsV0FGSCxDQUVlLFlBRmYsRUFHR0MsS0FISCxDQUdTLFdBSFQsRUFJR0MsTUFKSDtBQUFBLCtCQUlVLFdBQU9DLEdBQVAsRUFBZTtBQUNyQixRQUFJO0FBQ0YsWUFBTUMsVUFBVUQsSUFBSUMsT0FBSixJQUFlVCxrQkFBL0I7QUFD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LEdBQVIsRUFBUixFQUF1QmpCLE9BQU9xQixVQUE5QixDQUFiO0FBQ0EsWUFBTUMsTUFBTXBDLFFBQVFrQyxJQUFSLEVBQWNwQixPQUFPdUIsT0FBckIsQ0FBWjtBQUNBLFlBQU1DLE9BQU90QyxRQUFRa0MsSUFBUixFQUFjcEIsT0FBT3lCLE9BQXJCLENBQWI7QUFDQSxVQUFJLHlCQUFXSCxHQUFYLENBQUosRUFBb0IseUJBQVdBLEdBQVg7QUFDcEIsVUFBSSx5QkFBV0UsSUFBWCxDQUFKLEVBQXFCLHlCQUFXQSxJQUFYO0FBQ3RCLEtBUkQsQ0FRRSxPQUFPaEIsQ0FBUCxFQUFVO0FBQ1YsVUFBSSxPQUFPQSxDQUFQLEtBQWEsUUFBakIsRUFBMkJKLFFBQVFLLEtBQVIsQ0FBY0QsQ0FBZCxFQUEzQixLQUNLLE1BQU1BLENBQU47QUFDTjtBQUNGLEdBakJIOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQW1CQTtBQUNBakIsb0JBQVFtQyxFQUFSLENBQVcsV0FBWCxFQUF3QixZQUFZO0FBQ2xDdEIsVUFBUUssS0FBUixDQUFjLG1FQUFkLEVBQW1GbEIsb0JBQVFvQyxJQUFSLENBQWFDLElBQWIsQ0FBa0IsR0FBbEIsQ0FBbkY7QUFDRCxDQUZEOztBQUlBckMsb0JBQVFzQyxLQUFSLENBQWNiLFFBQVFjLElBQXRCOztBQUVBLElBQUksQ0FBQ2QsUUFBUWMsSUFBUixDQUFhQyxLQUFiLENBQW1CLENBQW5CLEVBQXNCNUIsTUFBM0IsRUFBbUM7QUFDakNaLHNCQUFReUMsSUFBUjtBQUNEIiwiZmlsZSI6ImNsaS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwcm9ncmFtIGZyb20gJ2NvbW1hbmRlcidcbmltcG9ydCB7IGV4aXN0c1N5bmMsIHJlbW92ZVN5bmMsIHdyaXRlRmlsZVN5bmMgfSBmcm9tICdmcy1leHRyYSdcbmltcG9ydCB5YW1sIGZyb20gJ2pzLXlhbWwnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHNoZWxsanMgZnJvbSAnc2hlbGxqcydcbmltcG9ydCBidWlsZEluaXQgZnJvbSAnLi9jb21tYW5kcy9idWlkSW5pdCdcbmltcG9ydCBidWlsZCBmcm9tICcuL2NvbW1hbmRzL2J1aWxkJ1xuaW1wb3J0IHsgY2hlY2sgfSBmcm9tICcuL2NvbW1hbmRzL2NoZWNrJ1xuaW1wb3J0IHsgZml4IH0gZnJvbSAnLi9jb21tYW5kcy9maXgnXG5pbXBvcnQgZGVmYXVsdENvbmZpZyBmcm9tICcuL2NvbnN0YW50cy9kZWZhdWx0Q29uZmlnJ1xuaW1wb3J0IG1ha2VDb25maWcgZnJvbSAnLi9tYWtlQ29uZmlnJ1xuaW1wb3J0IG1ha2VQcm9qZWN0IGZyb20gJy4vbWFrZXJzL21ha2VQcm9qZWN0J1xuY29uc3QgeyByZXNvbHZlIH0gPSBwYXRoXG5jb25zdCB7IGV4aXQgfSA9IHNoZWxsanNcblxuY29uc3QgZGVmYXVsdFNldHRpbmdGaWxlID0gJ2xpYm1hbi55bWwnXG5cbnByb2dyYW1cbiAgLnZlcnNpb24oJzAuMS4wJywgJy12LCAtLXZlcnNpb24nKVxuICAub3B0aW9uKCctcywgLS1zZXR0aW5nJywgJ1lBTUwgc2V0dGluZyBmaWxlIHBhdGgnKVxuXG5wcm9ncmFtXG4gIC5jb21tYW5kKCdjaGVjaycpXG4gIC5kZXNjcmlwdGlvbignY2hlY2sgb25seScpXG4gIC51c2FnZSgnW29wdGlvbnNdJylcbiAgLmFjdGlvbihhc3luYyAoY21kKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNldHRpbmcgPSBjbWQuc2V0dGluZyB8fCBkZWZhdWx0U2V0dGluZ0ZpbGVcbiAgICAgIGNvbnN0IGNvbmZpZyA9IG1ha2VDb25maWcoc2V0dGluZylcbiAgICAgIGNvbnN0IHByb2plY3QgPSBhd2FpdCBtYWtlUHJvamVjdChjb25maWcpXG4gICAgICBjb25zdCBjaGFuZ2VzID0gY2hlY2soY29uZmlnLCBwcm9qZWN0KVxuICAgICAgaWYgKGNoYW5nZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdubyBmaWxlIG5lZWRzIGZpeGluZycpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygndGhlc2UgZmlsZXMgd2lsbCBiZSByZXBsYWNlZCB3aGVuIGZpeGluZycpXG4gICAgICAgIGNoYW5nZXMuZm9yRWFjaChjaGFuZ2UgPT4geyBjb25zb2xlLmxvZyhjaGFuZ2UpIH0pXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKHR5cGVvZiBlID09PSAnc3RyaW5nJykgY29uc29sZS5lcnJvcihlKVxuICAgICAgZWxzZSB0aHJvdyBlXG4gICAgfVxuICB9KVxuXG5wcm9ncmFtXG4gIC5jb21tYW5kKCdmaXgnKVxuICAuZGVzY3JpcHRpb24oJ2NoZWNrIGFuZCBmaXggaXQnKVxuICAudXNhZ2UoJ1tvcHRpb25zXScpXG4gIC5hY3Rpb24oYXN5bmMgKGNtZCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzZXR0aW5nID0gY21kLnNldHRpbmcgfHwgZGVmYXVsdFNldHRpbmdGaWxlXG4gICAgICBjb25zdCBjb25maWcgPSBtYWtlQ29uZmlnKHNldHRpbmcpXG4gICAgICBjb25zdCBwcm9qZWN0ID0gYXdhaXQgbWFrZVByb2plY3QoY29uZmlnKVxuICAgICAgY29uc3QgY2hhbmdlcyA9IGNoZWNrKGNvbmZpZywgcHJvamVjdClcbiAgICAgIGNvbnNvbGUubG9nKGAke2NoYW5nZXMubGVuZ3RofSBmaWxlcyB3aWxsIGJlIGZpeGVkYClcbiAgICAgIGZpeChjb25maWcsIHByb2plY3QpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKHR5cGVvZiBlID09PSAnc3RyaW5nJykgY29uc29sZS5lcnJvcihlKVxuICAgICAgZWxzZSB0aHJvdyBlXG4gICAgfVxuICB9KVxuXG5wcm9ncmFtXG4gIC5jb21tYW5kKCdidWlsZCcpXG4gIC51c2FnZSgnW29wdGlvbnNdJylcbiAgLm9wdGlvbignLWksIC0taW5pdCcsICdwdXQgcHJpbnRsaXN0Lmpzb24nKVxuICAub3B0aW9uKCctZiwgLS1maXgnLCAnd2hlbiBjaGVjayBpcyBmYWlsZWQsIGZpeCBhbmQgYnVpbGQnKVxuICAub3B0aW9uKCctbywgLS1vbmUnLCAnb3V0cHV0IG9uZS1wcmludGFibGUtcGFnZScpXG4gIC5hY3Rpb24oYXN5bmMgKGNtZCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzZXR0aW5nID0gY21kLnNldHRpbmcgfHwgZGVmYXVsdFNldHRpbmdGaWxlXG4gICAgICBjb25zdCBjb25maWcgPSBtYWtlQ29uZmlnKHNldHRpbmcpXG4gICAgICBjb25zdCBwcm9qZWN0ID0gYXdhaXQgbWFrZVByb2plY3QoY29uZmlnKVxuICAgICAgaWYgKGNtZC5pbml0KSB7XG4gICAgICAgIGJ1aWxkSW5pdChjb25maWcsIHByb2plY3QpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgY29uc3QgY2hhbmdlcyA9IGNoZWNrKGNvbmZpZywgcHJvamVjdClcbiAgICAgIGlmIChjaGFuZ2VzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBpZiAoY21kLmZpeCkge1xuICAgICAgICAgIGNvbnNvbGUuY29uc29sZShgZml4aW5nLi4uYClcbiAgICAgICAgICBmaXgoY29uZmlnLCBwcm9qZWN0KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYHlvdSBuZWVkIHRvIGZpeGApXG4gICAgICAgICAgZXhpdCgxKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhgcGFzc2VkIGNoZWNraW5nYClcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKCdidWlsZGluZy4uLicpXG4gICAgICBidWlsZChjb25maWcsIHByb2plY3QsIGNtZC5vbmUpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKHR5cGVvZiBlID09PSAnc3RyaW5nJykgY29uc29sZS5lcnJvcihlKVxuICAgICAgZWxzZSB0aHJvdyBlXG4gICAgfVxuICB9KVxuXG5wcm9ncmFtXG4gIC5jb21tYW5kKCdpbml0JylcbiAgLmRlc2NyaXB0aW9uKCdtYWtlIGNvbmZpZyBmaWxlJylcbiAgLnVzYWdlKCdbb3B0aW9uc10nKVxuICAub3B0aW9uKCctZCwgLS1kZWZhdWx0JywgJ3VzZSBkZWZhdWx0IHNldHRpbmcnKVxuICAub3B0aW9uKCctZiwgLS1mb3JjZScsIFwid2hlbiB0aGVyZSdzIGFscmVhZHkgYSBzZXR0aW5nLCByZXBsYWNlXCIpXG4gIC5hY3Rpb24oYXN5bmMgKGNtZCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzZXR0aW5nID0gY21kLnNldHRpbmcgfHwgZGVmYXVsdFNldHRpbmdGaWxlXG4gICAgICBpZiAoZXhpc3RzU3luYyhzZXR0aW5nKSAmJiAhY21kLmZvcmNlKSB7XG4gICAgICAgIHRocm93IGAke3NldHRpbmd9IGFscmVhZHkgZXhpc3RzYFxuICAgICAgfVxuICAgICAgY29uc3QgY2ZnT2JqID0gY21kLmRlZmF1bHQgPyBkZWZhdWx0Q29uZmlnKCkgOiB7fVxuICAgICAgd3JpdGVGaWxlU3luYyhyZXNvbHZlKHByb2Nlc3MuY3dkKCksIHNldHRpbmcpLCB5YW1sLnNhZmVEdW1wKGNmZ09iaikpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKHR5cGVvZiBlID09PSAnc3RyaW5nJykgY29uc29sZS5lcnJvcihlKVxuICAgICAgZWxzZSB0aHJvdyBlXG4gICAgfVxuICB9KVxuXG5wcm9ncmFtXG4gIC5jb21tYW5kKCdjbGVhbicpXG4gIC5kZXNjcmlwdGlvbignZGVsZXRlIHRtcCwgZGlzdCBkaXInKVxuICAudXNhZ2UoJ1tvcHRpb25zXScpXG4gIC5hY3Rpb24oYXN5bmMgKGNtZCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzZXR0aW5nID0gY21kLnNldHRpbmcgfHwgZGVmYXVsdFNldHRpbmdGaWxlXG4gICAgICBjb25zdCBjb25maWcgPSBtYWtlQ29uZmlnKHNldHRpbmcpXG4gICAgICBjb25zdCB3b3JrID0gcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBjb25maWcuV29ya2luZ0RpcilcbiAgICAgIGNvbnN0IHRtcCA9IHJlc29sdmUod29yaywgY29uZmlnLlRlbXBEaXIpXG4gICAgICBjb25zdCBkaXN0ID0gcmVzb2x2ZSh3b3JrLCBjb25maWcuRGlzdERpcilcbiAgICAgIGlmIChleGlzdHNTeW5jKHRtcCkpcmVtb3ZlU3luYyh0bXApXG4gICAgICBpZiAoZXhpc3RzU3luYyhkaXN0KSlyZW1vdmVTeW5jKGRpc3QpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKHR5cGVvZiBlID09PSAnc3RyaW5nJykgY29uc29sZS5lcnJvcihlKVxuICAgICAgZWxzZSB0aHJvdyBlXG4gICAgfVxuICB9KVxuXG4vLyBlcnJvciBvbiB1bmtub3duIGNvbW1hbmRzXG5wcm9ncmFtLm9uKCdjb21tYW5kOionLCBmdW5jdGlvbiAoKSB7XG4gIGNvbnNvbGUuZXJyb3IoJ0ludmFsaWQgY29tbWFuZDogJXNcXG5TZWUgLS1oZWxwIGZvciBhIGxpc3Qgb2YgYXZhaWxhYmxlIGNvbW1hbmRzLicsIHByb2dyYW0uYXJncy5qb2luKCcgJykpXG59KVxuXG5wcm9ncmFtLnBhcnNlKHByb2Nlc3MuYXJndilcblxuaWYgKCFwcm9jZXNzLmFyZ3Yuc2xpY2UoMikubGVuZ3RoKSB7XG4gIHByb2dyYW0uaGVscCgpXG59XG4iXX0=