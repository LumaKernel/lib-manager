"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.quoteEscape = exports.mdEscape = void 0;

require("source-map-support/register");

// ```が含まれているときにどうしようもない
const mdEscape = code => code.replace(/\{\{/g, '{{"{{"}}');

exports.mdEscape = mdEscape;

const quoteEscape = str => str.replace(/\\/, '\\\\').replace(/"/, '\\"');

exports.quoteEscape = quoteEscape;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2VzY2FwZS5qcyJdLCJuYW1lcyI6WyJtZEVzY2FwZSIsImNvZGUiLCJyZXBsYWNlIiwicXVvdGVFc2NhcGUiLCJzdHIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ08sTUFBTUEsUUFBUSxHQUFHQyxJQUFJLElBQUlBLElBQUksQ0FBQ0MsT0FBTCxDQUFhLE9BQWIsRUFBc0IsVUFBdEIsQ0FBekI7Ozs7QUFDQSxNQUFNQyxXQUFXLEdBQUdDLEdBQUcsSUFBSUEsR0FBRyxDQUFDRixPQUFKLENBQVksSUFBWixFQUFrQixNQUFsQixFQUEwQkEsT0FBMUIsQ0FBa0MsR0FBbEMsRUFBdUMsS0FBdkMsQ0FBM0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBgYGDjgYzlkKvjgb7jgozjgabjgYTjgovjgajjgY3jgavjganjgYbjgZfjgojjgYbjgoLjgarjgYRcbmV4cG9ydCBjb25zdCBtZEVzY2FwZSA9IGNvZGUgPT4gY29kZS5yZXBsYWNlKC9cXHtcXHsvZywgJ3t7XCJ7e1wifX0nKVxuZXhwb3J0IGNvbnN0IHF1b3RlRXNjYXBlID0gc3RyID0+IHN0ci5yZXBsYWNlKC9cXFxcLywgJ1xcXFxcXFxcJykucmVwbGFjZSgvXCIvLCAnXFxcXFwiJylcbiJdfQ==