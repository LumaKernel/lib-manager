"use strict";

require("source-map-support/register");

var _commander = _interopRequireDefault(require("commander"));

var _fsExtra = require("fs-extra");

var _jsYaml = _interopRequireDefault(require("js-yaml"));

var _path = _interopRequireDefault(require("path"));

var _buidInit = _interopRequireDefault(require("./commands/buidInit"));

var _build = _interopRequireDefault(require("./commands/build"));

var _check = require("./commands/check");

var _fix = require("./commands/fix");

var _defaultConfig = _interopRequireDefault(require("./constants/defaultConfig"));

var _makeConfig = _interopRequireDefault(require("./makeConfig"));

var _makeProject = _interopRequireDefault(require("./makers/makeProject"));

var _exit = _interopRequireDefault(require("exit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  resolve
} = _path.default;
const version = "0.7.0";
const defaultSettingFile = 'libman.yml';

_commander.default.version(version, '-v, --version').option('-s, --setting', 'YAML setting file path');

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
        console.log(`fixing...`);
        (0, _fix.fix)(config, project);
      } else {
        console.error(`you need to fix`);
        (0, _exit.default)(1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGkuanMiXSwibmFtZXMiOlsicmVzb2x2ZSIsInBhdGgiLCJ2ZXJzaW9uIiwiZGVmYXVsdFNldHRpbmdGaWxlIiwicHJvZ3JhbSIsIm9wdGlvbiIsImNvbW1hbmQiLCJkZXNjcmlwdGlvbiIsInVzYWdlIiwiYWN0aW9uIiwiY21kIiwic2V0dGluZyIsImNvbmZpZyIsInByb2plY3QiLCJjaGFuZ2VzIiwibGVuZ3RoIiwiY29uc29sZSIsImxvZyIsImZvckVhY2giLCJjaGFuZ2UiLCJlIiwiZXJyb3IiLCJpbml0IiwiZml4Iiwib25lIiwiZm9yY2UiLCJjZmdPYmoiLCJkZWZhdWx0IiwicHJvY2VzcyIsImN3ZCIsInlhbWwiLCJzYWZlRHVtcCIsIndvcmsiLCJXb3JraW5nRGlyIiwidG1wIiwiVGVtcERpciIsImRpc3QiLCJEaXN0RGlyIiwib24iLCJhcmdzIiwiam9pbiIsInBhcnNlIiwiYXJndiIsInNsaWNlIiwiaGVscCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0EsTUFBTTtBQUFFQSxFQUFBQTtBQUFGLElBQWNDLGFBQXBCO0FBRUEsTUFBTUMsT0FBTyxVQUFiO0FBRUEsTUFBTUMsa0JBQWtCLEdBQUcsWUFBM0I7O0FBRUFDLG1CQUNHRixPQURILENBQ1dBLE9BRFgsRUFDb0IsZUFEcEIsRUFFR0csTUFGSCxDQUVVLGVBRlYsRUFFMkIsd0JBRjNCOztBQUlBRCxtQkFDR0UsT0FESCxDQUNXLE9BRFgsRUFFR0MsV0FGSCxDQUVlLFlBRmYsRUFHR0MsS0FISCxDQUdTLFdBSFQsRUFJR0MsTUFKSCxDQUlVLE1BQU9DLEdBQVAsSUFBZTtBQUNyQixNQUFJO0FBQ0YsVUFBTUMsT0FBTyxHQUFHRCxHQUFHLENBQUNDLE9BQUosSUFBZVIsa0JBQS9CO0FBQ0EsVUFBTVMsTUFBTSxHQUFHLHlCQUFXRCxPQUFYLENBQWY7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bXBvcnQgeyBleGlzdHNTeW5jLCByZW1vdmVTeW5jLCB3cml0ZUZpbGVTeW5jIH0gZnJvbSAnZnMtZXh0cmEnXG5pbXBvcnQgeWFtbCBmcm9tICdqcy15YW1sJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBidWlsZEluaXQgZnJvbSAnLi9jb21tYW5kcy9idWlkSW5pdCdcbmltcG9ydCBidWlsZCBmcm9tICcuL2NvbW1hbmRzL2J1aWxkJ1xuaW1wb3J0IHsgY2hlY2sgfSBmcm9tICcuL2NvbW1hbmRzL2NoZWNrJ1xuaW1wb3J0IHsgZml4IH0gZnJvbSAnLi9jb21tYW5kcy9maXgnXG5pbXBvcnQgZGVmYXVsdENvbmZpZyBmcm9tICcuL2NvbnN0YW50cy9kZWZhdWx0Q29uZmlnJ1xuaW1wb3J0IG1ha2VDb25maWcgZnJvbSAnLi9tYWtlQ29uZmlnJ1xuaW1wb3J0IG1ha2VQcm9qZWN0IGZyb20gJy4vbWFrZXJzL21ha2VQcm9qZWN0J1xuaW1wb3J0IGV4aXQgZnJvbSAnZXhpdCdcbmNvbnN0IHsgcmVzb2x2ZSB9ID0gcGF0aFxuXG5jb25zdCB2ZXJzaW9uID0gcmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJykudmVyc2lvblxuXG5jb25zdCBkZWZhdWx0U2V0dGluZ0ZpbGUgPSAnbGlibWFuLnltbCdcblxucHJvZ3JhbVxuICAudmVyc2lvbih2ZXJzaW9uLCAnLXYsIC0tdmVyc2lvbicpXG4gIC5vcHRpb24oJy1zLCAtLXNldHRpbmcnLCAnWUFNTCBzZXR0aW5nIGZpbGUgcGF0aCcpXG5cbnByb2dyYW1cbiAgLmNvbW1hbmQoJ2NoZWNrJylcbiAgLmRlc2NyaXB0aW9uKCdjaGVjayBvbmx5JylcbiAgLnVzYWdlKCdbb3B0aW9uc10nKVxuICAuYWN0aW9uKGFzeW5jIChjbWQpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc2V0dGluZyA9IGNtZC5zZXR0aW5nIHx8IGRlZmF1bHRTZXR0aW5nRmlsZVxuICAgICAgY29uc3QgY29uZmlnID0gbWFrZUNvbmZpZyhzZXR0aW5nKVxuICAgICAgY29uc3QgcHJvamVjdCA9IGF3YWl0IG1ha2VQcm9qZWN0KGNvbmZpZylcbiAgICAgIGNvbnN0IGNoYW5nZXMgPSBjaGVjayhjb25maWcsIHByb2plY3QpXG4gICAgICBpZiAoY2hhbmdlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29uc29sZS5sb2coJ25vIGZpbGUgbmVlZHMgZml4aW5nJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0aGVzZSBmaWxlcyB3aWxsIGJlIHJlcGxhY2VkIHdoZW4gZml4aW5nJylcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoKGNoYW5nZSA9PiB7IGNvbnNvbGUubG9nKGNoYW5nZSkgfSlcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAodHlwZW9mIGUgPT09ICdzdHJpbmcnKSBjb25zb2xlLmVycm9yKGUpXG4gICAgICBlbHNlIHRocm93IGVcbiAgICB9XG4gIH0pXG5cbnByb2dyYW1cbiAgLmNvbW1hbmQoJ2ZpeCcpXG4gIC5kZXNjcmlwdGlvbignY2hlY2sgYW5kIGZpeCBpdCcpXG4gIC51c2FnZSgnW29wdGlvbnNdJylcbiAgLmFjdGlvbihhc3luYyAoY21kKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNldHRpbmcgPSBjbWQuc2V0dGluZyB8fCBkZWZhdWx0U2V0dGluZ0ZpbGVcbiAgICAgIGNvbnN0IGNvbmZpZyA9IG1ha2VDb25maWcoc2V0dGluZylcbiAgICAgIGNvbnN0IHByb2plY3QgPSBhd2FpdCBtYWtlUHJvamVjdChjb25maWcpXG4gICAgICBjb25zdCBjaGFuZ2VzID0gY2hlY2soY29uZmlnLCBwcm9qZWN0KVxuICAgICAgY29uc29sZS5sb2coYCR7Y2hhbmdlcy5sZW5ndGh9IGZpbGVzIHdpbGwgYmUgZml4ZWRgKVxuICAgICAgZml4KGNvbmZpZywgcHJvamVjdClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAodHlwZW9mIGUgPT09ICdzdHJpbmcnKSBjb25zb2xlLmVycm9yKGUpXG4gICAgICBlbHNlIHRocm93IGVcbiAgICB9XG4gIH0pXG5cbnByb2dyYW1cbiAgLmNvbW1hbmQoJ2J1aWxkJylcbiAgLnVzYWdlKCdbb3B0aW9uc10nKVxuICAub3B0aW9uKCctaSwgLS1pbml0JywgJ3B1dCBwcmludGxpc3QuanNvbicpXG4gIC5vcHRpb24oJy1mLCAtLWZpeCcsICd3aGVuIGNoZWNrIGlzIGZhaWxlZCwgZml4IGFuZCBidWlsZCcpXG4gIC5vcHRpb24oJy1vLCAtLW9uZScsICdvdXRwdXQgb25lLXByaW50YWJsZS1wYWdlJylcbiAgLmFjdGlvbihhc3luYyAoY21kKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNldHRpbmcgPSBjbWQuc2V0dGluZyB8fCBkZWZhdWx0U2V0dGluZ0ZpbGVcbiAgICAgIGNvbnN0IGNvbmZpZyA9IG1ha2VDb25maWcoc2V0dGluZylcbiAgICAgIGNvbnN0IHByb2plY3QgPSBhd2FpdCBtYWtlUHJvamVjdChjb25maWcpXG4gICAgICBpZiAoY21kLmluaXQpIHtcbiAgICAgICAgYnVpbGRJbml0KGNvbmZpZywgcHJvamVjdClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjb25zdCBjaGFuZ2VzID0gY2hlY2soY29uZmlnLCBwcm9qZWN0KVxuICAgICAgaWYgKGNoYW5nZXMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIGlmIChjbWQuZml4KSB7XG4gICAgICAgICAgY29uc29sZS5sb2coYGZpeGluZy4uLmApXG4gICAgICAgICAgZml4KGNvbmZpZywgcHJvamVjdClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGB5b3UgbmVlZCB0byBmaXhgKVxuICAgICAgICAgIGV4aXQoMSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coYHBhc3NlZCBjaGVja2luZ2ApXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZygnYnVpbGRpbmcuLi4nKVxuICAgICAgYnVpbGQoY29uZmlnLCBwcm9qZWN0LCBjbWQub25lKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICh0eXBlb2YgZSA9PT0gJ3N0cmluZycpIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgIGVsc2UgdGhyb3cgZVxuICAgIH1cbiAgfSlcblxucHJvZ3JhbVxuICAuY29tbWFuZCgnaW5pdCcpXG4gIC5kZXNjcmlwdGlvbignbWFrZSBjb25maWcgZmlsZScpXG4gIC51c2FnZSgnW29wdGlvbnNdJylcbiAgLm9wdGlvbignLWQsIC0tZGVmYXVsdCcsICd1c2UgZGVmYXVsdCBzZXR0aW5nJylcbiAgLm9wdGlvbignLWYsIC0tZm9yY2UnLCBcIndoZW4gdGhlcmUncyBhbHJlYWR5IGEgc2V0dGluZywgcmVwbGFjZVwiKVxuICAuYWN0aW9uKGFzeW5jIChjbWQpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc2V0dGluZyA9IGNtZC5zZXR0aW5nIHx8IGRlZmF1bHRTZXR0aW5nRmlsZVxuICAgICAgaWYgKGV4aXN0c1N5bmMoc2V0dGluZykgJiYgIWNtZC5mb3JjZSkge1xuICAgICAgICB0aHJvdyBgJHtzZXR0aW5nfSBhbHJlYWR5IGV4aXN0c2BcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNmZ09iaiA9IGNtZC5kZWZhdWx0ID8gZGVmYXVsdENvbmZpZygpIDoge31cbiAgICAgIHdyaXRlRmlsZVN5bmMocmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBzZXR0aW5nKSwgeWFtbC5zYWZlRHVtcChjZmdPYmopKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICh0eXBlb2YgZSA9PT0gJ3N0cmluZycpIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgIGVsc2UgdGhyb3cgZVxuICAgIH1cbiAgfSlcblxucHJvZ3JhbVxuICAuY29tbWFuZCgnY2xlYW4nKVxuICAuZGVzY3JpcHRpb24oJ2RlbGV0ZSB0bXAsIGRpc3QgZGlyJylcbiAgLnVzYWdlKCdbb3B0aW9uc10nKVxuICAuYWN0aW9uKGFzeW5jIChjbWQpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc2V0dGluZyA9IGNtZC5zZXR0aW5nIHx8IGRlZmF1bHRTZXR0aW5nRmlsZVxuICAgICAgY29uc3QgY29uZmlnID0gbWFrZUNvbmZpZyhzZXR0aW5nKVxuICAgICAgY29uc3Qgd29yayA9IHJlc29sdmUocHJvY2Vzcy5jd2QoKSwgY29uZmlnLldvcmtpbmdEaXIpXG4gICAgICBjb25zdCB0bXAgPSByZXNvbHZlKHdvcmssIGNvbmZpZy5UZW1wRGlyKVxuICAgICAgY29uc3QgZGlzdCA9IHJlc29sdmUod29yaywgY29uZmlnLkRpc3REaXIpXG4gICAgICBpZiAoZXhpc3RzU3luYyh0bXApKXJlbW92ZVN5bmModG1wKVxuICAgICAgaWYgKGV4aXN0c1N5bmMoZGlzdCkpcmVtb3ZlU3luYyhkaXN0KVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICh0eXBlb2YgZSA9PT0gJ3N0cmluZycpIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgIGVsc2UgdGhyb3cgZVxuICAgIH1cbiAgfSlcblxuLy8gZXJyb3Igb24gdW5rbm93biBjb21tYW5kc1xucHJvZ3JhbS5vbignY29tbWFuZDoqJywgZnVuY3Rpb24gKCkge1xuICBjb25zb2xlLmVycm9yKCdJbnZhbGlkIGNvbW1hbmQ6ICVzXFxuU2VlIC0taGVscCBmb3IgYSBsaXN0IG9mIGF2YWlsYWJsZSBjb21tYW5kcy4nLCBwcm9ncmFtLmFyZ3Muam9pbignICcpKVxufSlcblxucHJvZ3JhbS5wYXJzZShwcm9jZXNzLmFyZ3YpXG5cbmlmICghcHJvY2Vzcy5hcmd2LnNsaWNlKDIpLmxlbmd0aCkge1xuICBwcm9ncmFtLmhlbHAoKVxufVxuIl19