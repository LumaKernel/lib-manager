"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.quoteEscape = exports.mdEscape = void 0;

require("source-map-support/register");

const mdEscape = code => code.replace(/\{\{/g, '{{"{{"}}');

exports.mdEscape = mdEscape;

const quoteEscape = str => str.replace(/\\/, '\\\\').replace(/"/, '\\"');

exports.quoteEscape = quoteEscape;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2VzY2FwZS5qcyJdLCJuYW1lcyI6WyJtZEVzY2FwZSIsImNvZGUiLCJyZXBsYWNlIiwicXVvdGVFc2NhcGUiLCJzdHIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFPLE1BQU1BLFFBQVEsR0FBR0MsSUFBSSxJQUFJQSxJQUFJLENBQUNDLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLFVBQXRCLENBQXpCOzs7O0FBQ0EsTUFBTUMsV0FBVyxHQUFHQyxHQUFHLElBQUlBLEdBQUcsQ0FBQ0YsT0FBSixDQUFZLElBQVosRUFBa0IsTUFBbEIsRUFBMEJBLE9BQTFCLENBQWtDLEdBQWxDLEVBQXVDLEtBQXZDLENBQTNCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IG1kRXNjYXBlID0gY29kZSA9PiBjb2RlLnJlcGxhY2UoL1xce1xcey9nLCAne3tcInt7XCJ9fScpXG5leHBvcnQgY29uc3QgcXVvdGVFc2NhcGUgPSBzdHIgPT4gc3RyLnJlcGxhY2UoL1xcXFwvLCAnXFxcXFxcXFwnKS5yZXBsYWNlKC9cIi8sICdcXFxcXCInKVxuIl19