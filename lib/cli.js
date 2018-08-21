'use strict';

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