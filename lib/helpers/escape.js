'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const mdEscape = exports.mdEscape = code => code.replace(/\{\{/g, '{{"{{"}}');
const quoteEscape = exports.quoteEscape = str => str.replace(/\\/, '\\\\').replace(/"/, '\\"');