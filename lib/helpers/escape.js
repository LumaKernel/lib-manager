'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.quoteEscape = exports.mdEscape = undefined;

require('source-map-support/register');

const mdEscape = exports.mdEscape = code => code.replace(/\{\{/g, '{{"{{"}}');
const quoteEscape = exports.quoteEscape = str => str.replace(/\\/, '\\\\').replace(/"/, '\\"');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2VzY2FwZS5qcyJdLCJuYW1lcyI6WyJtZEVzY2FwZSIsImNvZGUiLCJyZXBsYWNlIiwicXVvdGVFc2NhcGUiLCJzdHIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFPLE1BQU1BLDhCQUFXQyxRQUFRQSxLQUFLQyxPQUFMLENBQWEsT0FBYixFQUFzQixVQUF0QixDQUF6QjtBQUNBLE1BQU1DLG9DQUFjQyxPQUFPQSxJQUFJRixPQUFKLENBQVksSUFBWixFQUFrQixNQUFsQixFQUEwQkEsT0FBMUIsQ0FBa0MsR0FBbEMsRUFBdUMsS0FBdkMsQ0FBM0IiLCJmaWxlIjoiZXNjYXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IG1kRXNjYXBlID0gY29kZSA9PiBjb2RlLnJlcGxhY2UoL1xce1xcey9nLCAne3tcInt7XCJ9fScpXG5leHBvcnQgY29uc3QgcXVvdGVFc2NhcGUgPSBzdHIgPT4gc3RyLnJlcGxhY2UoL1xcXFwvLCAnXFxcXFxcXFwnKS5yZXBsYWNlKC9cIi8sICdcXFxcXCInKVxuIl19