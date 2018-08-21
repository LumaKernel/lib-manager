'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.check = check;

var _fix = require('./fix');

function check(config, project) {
  return [...(0, _fix.applyLibraries)(config, project.libs, false), ...(0, _fix.applyTemplates)(config, project.templates, false)];
}