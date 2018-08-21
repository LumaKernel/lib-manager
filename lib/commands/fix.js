'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fix = fix;
exports.applyLibraries = applyLibraries;
exports.applyTemplates = applyTemplates;

var _fs = require('fs');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _backup = require('../makers/backup');

var _backup2 = _interopRequireDefault(_backup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { resolve } = _path2.default;

function fix(config, project) {
  (0, _backup2.default)(config);
  applyLibraries(config, project.libs, true);
  applyTemplates(config, project.templates, true);
}

/**
 * backup before using
 */
function applyLibraries(config, libs, apply = false) {
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir);
  const changes = [];
  Object.values(libs).forEach(el => {
    if (el.old === el.refactored) return;
    const path = resolve(src, ...el.namespace.split('/'), el.filename);
    changes.push([...el.namespace.split('/'), el.filename].filter(e => e).join('/'));
    if (apply) (0, _fs.writeFileSync)(path, el.refactored);
  });
  return changes;
}

/**
 * backup before using
 */
function applyTemplates(config, templates, apply = false) {
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir);
  const changes = [];
  Object.keys(templates).forEach(key => {
    const el = templates[key];
    if (el.code === el.old) return;
    const path = resolve(src, ...el.namespace.split('/'), el.filename);
    changes.push([...el.namespace.split('/'), el.filename].filter(e => e).join('/'));
    if (apply) (0, _fs.writeFileSync)(path, el.code);
  });
  return changes;
}