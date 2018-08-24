"use strict";

require("source-map-support/register");

var _commander = _interopRequireDefault(require("commander"));

var _fsExtra = require("fs-extra");

var _jsYaml = _interopRequireDefault(require("js-yaml"));

var _path = _interopRequireDefault(require("path"));

var _shelljs = _interopRequireDefault(require("shelljs"));

var _buidInit = _interopRequireDefault(require("./commands/buidInit"));

var _build = _interopRequireDefault(require("./commands/build"));

var _check = require("./commands/check");

var _fix = require("./commands/fix");

var _defaultConfig = _interopRequireDefault(require("./constants/defaultConfig"));

var _makeConfig = _interopRequireDefault(require("./makeConfig"));

var _makeProject = _interopRequireDefault(require("./makers/makeProject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  resolve
} = _path.default;
const {
  exit
} = _shelljs.default;
const defaultSettingFile = 'libman.yml';

_commander.default.version('0.1.0', '-v, --version').option('-s, --setting', 'YAML setting file path');

_commander.default.command('check').description('check only').usage('[options]').action(async cmd => {
  try {
    const setting = cmd.setting || defaultSettingFile;
    const config = (0, _makeConfig.default)(setting);
    const project = await (0, _makeProject.default)(config);
    const changes = (0, _check.check)(config, project);

    if (changes.length === 0) {
      console.log('no file needs fixing');
    } else {
      console.log('these files will be replaced when fixing');
      changes.forEach(change => {
        console.log(change);
      });
    }
  } catch (e) {
    if (typeof e === 'string') console.error(e);else throw e;
  }
});

_commander.default.command('fix').description('check and fix it').usage('[options]').action(async cmd => {
  try {
    const setting = cmd.setting || defaultSettingFile;
    const config = (0, _makeConfig.default)(setting);
    const project = await (0, _makeProject.default)(config);
    const changes = (0, _check.check)(config, project);
    console.log(`${changes.length} files will be fixed`);
    (0, _fix.fix)(config, project);
  } catch (e) {
    if (typeof e === 'string') console.error(e);else throw e;
  }
});

_commander.default.command('build').usage('[options]').option('-i, --init', 'put printlist.json').option('-f, --fix', 'when check is failed, fix and build').option('-o, --one', 'output one-printable-page').action(async cmd => {
  try {
    const setting = cmd.setting || defaultSettingFile;
    const config = (0, _makeConfig.default)(setting);
    const project = await (0, _makeProject.default)(config);

    if (cmd.init) {
      (0, _buidInit.default)(config, project);
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
    (0, _build.default)(config, project, cmd.one);
  } catch (e) {
    if (typeof e === 'string') console.error(e);else throw e;
  }
});

_commander.default.command('init').description('make config file').usage('[options]').option('-d, --default', 'use default setting').option('-f, --force', "when there's already a setting, replace").action(async cmd => {
  try {
    const setting = cmd.setting || defaultSettingFile;

    if ((0, _fsExtra.existsSync)(setting) && !cmd.force) {
      throw `${setting} already exists`;
    }

    const cfgObj = cmd.default ? (0, _defaultConfig.default)() : {};
    (0, _fsExtra.writeFileSync)(resolve(process.cwd(), setting), _jsYaml.default.safeDump(cfgObj));
  } catch (e) {
    if (typeof e === 'string') console.error(e);else throw e;
  }
});

_commander.default.command('clean').description('delete tmp, dist dir').usage('[options]').action(async cmd => {
  try {
    const setting = cmd.setting || defaultSettingFile;
    const config = (0, _makeConfig.default)(setting);
    const work = resolve(process.cwd(), config.WorkingDir);
    const tmp = resolve(work, config.TempDir);
    const dist = resolve(work, config.DistDir);
    if ((0, _fsExtra.existsSync)(tmp)) (0, _fsExtra.removeSync)(tmp);
    if ((0, _fsExtra.existsSync)(dist)) (0, _fsExtra.removeSync)(dist);
  } catch (e) {
    if (typeof e === 'string') console.error(e);else throw e;
  }
}); // error on unknown commands


_commander.default.on('command:*', function () {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', _commander.default.args.join(' '));
});

_commander.default.parse(process.argv);

if (!process.argv.slice(2).length) {
  _commander.default.help();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGkuanMiXSwibmFtZXMiOlsicmVzb2x2ZSIsInBhdGgiLCJleGl0Iiwic2hlbGxqcyIsImRlZmF1bHRTZXR0aW5nRmlsZSIsInByb2dyYW0iLCJ2ZXJzaW9uIiwib3B0aW9uIiwiY29tbWFuZCIsImRlc2NyaXB0aW9uIiwidXNhZ2UiLCJhY3Rpb24iLCJjbWQiLCJzZXR0aW5nIiwiY29uZmlnIiwicHJvamVjdCIsImNoYW5nZXMiLCJsZW5ndGgiLCJjb25zb2xlIiwibG9nIiwiZm9yRWFjaCIsImNoYW5nZSIsImUiLCJlcnJvciIsImluaXQiLCJmaXgiLCJvbmUiLCJmb3JjZSIsImNmZ09iaiIsImRlZmF1bHQiLCJwcm9jZXNzIiwiY3dkIiwieWFtbCIsInNhZmVEdW1wIiwid29yayIsIldvcmtpbmdEaXIiLCJ0bXAiLCJUZW1wRGlyIiwiZGlzdCIsIkRpc3REaXIiLCJvbiIsImFyZ3MiLCJqb2luIiwicGFyc2UiLCJhcmd2Iiwic2xpY2UiLCJoZWxwIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQSxNQUFNO0FBQUVBLEVBQUFBO0FBQUYsSUFBY0MsYUFBcEI7QUFDQSxNQUFNO0FBQUVDLEVBQUFBO0FBQUYsSUFBV0MsZ0JBQWpCO0FBRUEsTUFBTUMsa0JBQWtCLEdBQUcsWUFBM0I7O0FBRUFDLG1CQUNHQyxPQURILENBQ1csT0FEWCxFQUNvQixlQURwQixFQUVHQyxNQUZILENBRVUsZUFGVixFQUUyQix3QkFGM0I7O0FBSUFGLG1CQUNHRyxPQURILENBQ1csT0FEWCxFQUVHQyxXQUZILENBRWUsWUFGZixFQUdHQyxLQUhILENBR1MsV0FIVCxFQUlHQyxNQUpILENBSVUsTUFBT0MsR0FBUCxJQUFlO0FBQ3JCLE1BQUk7QUFDRixVQUFNQyxPQUFPLEdBQUdELEdBQUcsQ0FBQ0MsT0FBSixJQUFlVCxrQkFBL0I7QUFD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Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb2dyYW0gZnJvbSAnY29tbWFuZGVyJ1xuaW1wb3J0IHsgZXhpc3RzU3luYywgcmVtb3ZlU3luYywgd3JpdGVGaWxlU3luYyB9IGZyb20gJ2ZzLWV4dHJhJ1xuaW1wb3J0IHlhbWwgZnJvbSAnanMteWFtbCdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgc2hlbGxqcyBmcm9tICdzaGVsbGpzJ1xuaW1wb3J0IGJ1aWxkSW5pdCBmcm9tICcuL2NvbW1hbmRzL2J1aWRJbml0J1xuaW1wb3J0IGJ1aWxkIGZyb20gJy4vY29tbWFuZHMvYnVpbGQnXG5pbXBvcnQgeyBjaGVjayB9IGZyb20gJy4vY29tbWFuZHMvY2hlY2snXG5pbXBvcnQgeyBmaXggfSBmcm9tICcuL2NvbW1hbmRzL2ZpeCdcbmltcG9ydCBkZWZhdWx0Q29uZmlnIGZyb20gJy4vY29uc3RhbnRzL2RlZmF1bHRDb25maWcnXG5pbXBvcnQgbWFrZUNvbmZpZyBmcm9tICcuL21ha2VDb25maWcnXG5pbXBvcnQgbWFrZVByb2plY3QgZnJvbSAnLi9tYWtlcnMvbWFrZVByb2plY3QnXG5jb25zdCB7IHJlc29sdmUgfSA9IHBhdGhcbmNvbnN0IHsgZXhpdCB9ID0gc2hlbGxqc1xuXG5jb25zdCBkZWZhdWx0U2V0dGluZ0ZpbGUgPSAnbGlibWFuLnltbCdcblxucHJvZ3JhbVxuICAudmVyc2lvbignMC4xLjAnLCAnLXYsIC0tdmVyc2lvbicpXG4gIC5vcHRpb24oJy1zLCAtLXNldHRpbmcnLCAnWUFNTCBzZXR0aW5nIGZpbGUgcGF0aCcpXG5cbnByb2dyYW1cbiAgLmNvbW1hbmQoJ2NoZWNrJylcbiAgLmRlc2NyaXB0aW9uKCdjaGVjayBvbmx5JylcbiAgLnVzYWdlKCdbb3B0aW9uc10nKVxuICAuYWN0aW9uKGFzeW5jIChjbWQpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc2V0dGluZyA9IGNtZC5zZXR0aW5nIHx8IGRlZmF1bHRTZXR0aW5nRmlsZVxuICAgICAgY29uc3QgY29uZmlnID0gbWFrZUNvbmZpZyhzZXR0aW5nKVxuICAgICAgY29uc3QgcHJvamVjdCA9IGF3YWl0IG1ha2VQcm9qZWN0KGNvbmZpZylcbiAgICAgIGNvbnN0IGNoYW5nZXMgPSBjaGVjayhjb25maWcsIHByb2plY3QpXG4gICAgICBpZiAoY2hhbmdlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29uc29sZS5sb2coJ25vIGZpbGUgbmVlZHMgZml4aW5nJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0aGVzZSBmaWxlcyB3aWxsIGJlIHJlcGxhY2VkIHdoZW4gZml4aW5nJylcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoKGNoYW5nZSA9PiB7IGNvbnNvbGUubG9nKGNoYW5nZSkgfSlcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAodHlwZW9mIGUgPT09ICdzdHJpbmcnKSBjb25zb2xlLmVycm9yKGUpXG4gICAgICBlbHNlIHRocm93IGVcbiAgICB9XG4gIH0pXG5cbnByb2dyYW1cbiAgLmNvbW1hbmQoJ2ZpeCcpXG4gIC5kZXNjcmlwdGlvbignY2hlY2sgYW5kIGZpeCBpdCcpXG4gIC51c2FnZSgnW29wdGlvbnNdJylcbiAgLmFjdGlvbihhc3luYyAoY21kKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNldHRpbmcgPSBjbWQuc2V0dGluZyB8fCBkZWZhdWx0U2V0dGluZ0ZpbGVcbiAgICAgIGNvbnN0IGNvbmZpZyA9IG1ha2VDb25maWcoc2V0dGluZylcbiAgICAgIGNvbnN0IHByb2plY3QgPSBhd2FpdCBtYWtlUHJvamVjdChjb25maWcpXG4gICAgICBjb25zdCBjaGFuZ2VzID0gY2hlY2soY29uZmlnLCBwcm9qZWN0KVxuICAgICAgY29uc29sZS5sb2coYCR7Y2hhbmdlcy5sZW5ndGh9IGZpbGVzIHdpbGwgYmUgZml4ZWRgKVxuICAgICAgZml4KGNvbmZpZywgcHJvamVjdClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAodHlwZW9mIGUgPT09ICdzdHJpbmcnKSBjb25zb2xlLmVycm9yKGUpXG4gICAgICBlbHNlIHRocm93IGVcbiAgICB9XG4gIH0pXG5cbnByb2dyYW1cbiAgLmNvbW1hbmQoJ2J1aWxkJylcbiAgLnVzYWdlKCdbb3B0aW9uc10nKVxuICAub3B0aW9uKCctaSwgLS1pbml0JywgJ3B1dCBwcmludGxpc3QuanNvbicpXG4gIC5vcHRpb24oJy1mLCAtLWZpeCcsICd3aGVuIGNoZWNrIGlzIGZhaWxlZCwgZml4IGFuZCBidWlsZCcpXG4gIC5vcHRpb24oJy1vLCAtLW9uZScsICdvdXRwdXQgb25lLXByaW50YWJsZS1wYWdlJylcbiAgLmFjdGlvbihhc3luYyAoY21kKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNldHRpbmcgPSBjbWQuc2V0dGluZyB8fCBkZWZhdWx0U2V0dGluZ0ZpbGVcbiAgICAgIGNvbnN0IGNvbmZpZyA9IG1ha2VDb25maWcoc2V0dGluZylcbiAgICAgIGNvbnN0IHByb2plY3QgPSBhd2FpdCBtYWtlUHJvamVjdChjb25maWcpXG4gICAgICBpZiAoY21kLmluaXQpIHtcbiAgICAgICAgYnVpbGRJbml0KGNvbmZpZywgcHJvamVjdClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjb25zdCBjaGFuZ2VzID0gY2hlY2soY29uZmlnLCBwcm9qZWN0KVxuICAgICAgaWYgKGNoYW5nZXMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIGlmIChjbWQuZml4KSB7XG4gICAgICAgICAgY29uc29sZS5jb25zb2xlKGBmaXhpbmcuLi5gKVxuICAgICAgICAgIGZpeChjb25maWcsIHByb2plY3QpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihgeW91IG5lZWQgdG8gZml4YClcbiAgICAgICAgICBleGl0KDEpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBwYXNzZWQgY2hlY2tpbmdgKVxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coJ2J1aWxkaW5nLi4uJylcbiAgICAgIGJ1aWxkKGNvbmZpZywgcHJvamVjdCwgY21kLm9uZSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAodHlwZW9mIGUgPT09ICdzdHJpbmcnKSBjb25zb2xlLmVycm9yKGUpXG4gICAgICBlbHNlIHRocm93IGVcbiAgICB9XG4gIH0pXG5cbnByb2dyYW1cbiAgLmNvbW1hbmQoJ2luaXQnKVxuICAuZGVzY3JpcHRpb24oJ21ha2UgY29uZmlnIGZpbGUnKVxuICAudXNhZ2UoJ1tvcHRpb25zXScpXG4gIC5vcHRpb24oJy1kLCAtLWRlZmF1bHQnLCAndXNlIGRlZmF1bHQgc2V0dGluZycpXG4gIC5vcHRpb24oJy1mLCAtLWZvcmNlJywgXCJ3aGVuIHRoZXJlJ3MgYWxyZWFkeSBhIHNldHRpbmcsIHJlcGxhY2VcIilcbiAgLmFjdGlvbihhc3luYyAoY21kKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNldHRpbmcgPSBjbWQuc2V0dGluZyB8fCBkZWZhdWx0U2V0dGluZ0ZpbGVcbiAgICAgIGlmIChleGlzdHNTeW5jKHNldHRpbmcpICYmICFjbWQuZm9yY2UpIHtcbiAgICAgICAgdGhyb3cgYCR7c2V0dGluZ30gYWxyZWFkeSBleGlzdHNgXG4gICAgICB9XG4gICAgICBjb25zdCBjZmdPYmogPSBjbWQuZGVmYXVsdCA/IGRlZmF1bHRDb25maWcoKSA6IHt9XG4gICAgICB3cml0ZUZpbGVTeW5jKHJlc29sdmUocHJvY2Vzcy5jd2QoKSwgc2V0dGluZyksIHlhbWwuc2FmZUR1bXAoY2ZnT2JqKSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAodHlwZW9mIGUgPT09ICdzdHJpbmcnKSBjb25zb2xlLmVycm9yKGUpXG4gICAgICBlbHNlIHRocm93IGVcbiAgICB9XG4gIH0pXG5cbnByb2dyYW1cbiAgLmNvbW1hbmQoJ2NsZWFuJylcbiAgLmRlc2NyaXB0aW9uKCdkZWxldGUgdG1wLCBkaXN0IGRpcicpXG4gIC51c2FnZSgnW29wdGlvbnNdJylcbiAgLmFjdGlvbihhc3luYyAoY21kKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNldHRpbmcgPSBjbWQuc2V0dGluZyB8fCBkZWZhdWx0U2V0dGluZ0ZpbGVcbiAgICAgIGNvbnN0IGNvbmZpZyA9IG1ha2VDb25maWcoc2V0dGluZylcbiAgICAgIGNvbnN0IHdvcmsgPSByZXNvbHZlKHByb2Nlc3MuY3dkKCksIGNvbmZpZy5Xb3JraW5nRGlyKVxuICAgICAgY29uc3QgdG1wID0gcmVzb2x2ZSh3b3JrLCBjb25maWcuVGVtcERpcilcbiAgICAgIGNvbnN0IGRpc3QgPSByZXNvbHZlKHdvcmssIGNvbmZpZy5EaXN0RGlyKVxuICAgICAgaWYgKGV4aXN0c1N5bmModG1wKSlyZW1vdmVTeW5jKHRtcClcbiAgICAgIGlmIChleGlzdHNTeW5jKGRpc3QpKXJlbW92ZVN5bmMoZGlzdClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAodHlwZW9mIGUgPT09ICdzdHJpbmcnKSBjb25zb2xlLmVycm9yKGUpXG4gICAgICBlbHNlIHRocm93IGVcbiAgICB9XG4gIH0pXG5cbi8vIGVycm9yIG9uIHVua25vd24gY29tbWFuZHNcbnByb2dyYW0ub24oJ2NvbW1hbmQ6KicsIGZ1bmN0aW9uICgpIHtcbiAgY29uc29sZS5lcnJvcignSW52YWxpZCBjb21tYW5kOiAlc1xcblNlZSAtLWhlbHAgZm9yIGEgbGlzdCBvZiBhdmFpbGFibGUgY29tbWFuZHMuJywgcHJvZ3JhbS5hcmdzLmpvaW4oJyAnKSlcbn0pXG5cbnByb2dyYW0ucGFyc2UocHJvY2Vzcy5hcmd2KVxuXG5pZiAoIXByb2Nlc3MuYXJndi5zbGljZSgyKS5sZW5ndGgpIHtcbiAgcHJvZ3JhbS5oZWxwKClcbn1cbiJdfQ==