"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.quoteEscape = exports.mdTitleEscape = exports.mdEscape = void 0;

require("source-map-support/register");

// ```が含まれているときにどうしようもない
const mdEscape = str => str.replace(/\{\{/g, '{{"{{"}}');

exports.mdEscape = mdEscape;

const mdTitleEscape = str => mdEscape(str.replace(/\|/g, '\\|') // kramdown特化 // どうしようもない
.replace(/\[/g, '\\[').replace(/\]/g, '\\]'));

exports.mdTitleEscape = mdTitleEscape;

const quoteEscape = str => str.replace(/\\/, '\\\\').replace(/"/, '\\"');

exports.quoteEscape = quoteEscape;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2VzY2FwZS5qcyJdLCJuYW1lcyI6WyJtZEVzY2FwZSIsInN0ciIsInJlcGxhY2UiLCJtZFRpdGxlRXNjYXBlIiwicXVvdGVFc2NhcGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ08sTUFBTUEsUUFBUSxHQUFHQyxHQUFHLElBQUlBLEdBQUcsQ0FBQ0MsT0FBSixDQUFZLE9BQVosRUFBcUIsVUFBckIsQ0FBeEI7Ozs7QUFDQSxNQUFNQyxhQUFhLEdBQUdGLEdBQUcsSUFBSUQsUUFBUSxDQUMxQ0MsR0FBRyxDQUNBQyxPQURILENBQ1csS0FEWCxFQUNrQixLQURsQixFQUN5QjtBQUR6QixDQUVHQSxPQUZILENBRVcsS0FGWCxFQUVrQixLQUZsQixFQUdHQSxPQUhILENBR1csS0FIWCxFQUdrQixLQUhsQixDQUQwQyxDQUFyQzs7OztBQU1BLE1BQU1FLFdBQVcsR0FBR0gsR0FBRyxJQUFJQSxHQUFHLENBQUNDLE9BQUosQ0FBWSxJQUFaLEVBQWtCLE1BQWxCLEVBQTBCQSxPQUExQixDQUFrQyxHQUFsQyxFQUF1QyxLQUF2QyxDQUEzQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIGBgYOOBjOWQq+OBvuOCjOOBpuOBhOOCi+OBqOOBjeOBq+OBqeOBhuOBl+OCiOOBhuOCguOBquOBhFxuZXhwb3J0IGNvbnN0IG1kRXNjYXBlID0gc3RyID0+IHN0ci5yZXBsYWNlKC9cXHtcXHsvZywgJ3t7XCJ7e1wifX0nKVxuZXhwb3J0IGNvbnN0IG1kVGl0bGVFc2NhcGUgPSBzdHIgPT4gbWRFc2NhcGUoXG4gIHN0clxuICAgIC5yZXBsYWNlKC9cXHwvZywgJ1xcXFx8JykgLy8ga3JhbWRvd27nibnljJYgLy8g44Gp44GG44GX44KI44GG44KC44Gq44GEXG4gICAgLnJlcGxhY2UoL1xcWy9nLCAnXFxcXFsnKVxuICAgIC5yZXBsYWNlKC9cXF0vZywgJ1xcXFxdJylcbilcbmV4cG9ydCBjb25zdCBxdW90ZUVzY2FwZSA9IHN0ciA9PiBzdHIucmVwbGFjZSgvXFxcXC8sICdcXFxcXFxcXCcpLnJlcGxhY2UoL1wiLywgJ1xcXFxcIicpXG4iXX0=