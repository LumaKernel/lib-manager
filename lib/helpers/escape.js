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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2VzY2FwZS5qcyJdLCJuYW1lcyI6WyJtZEVzY2FwZSIsInN0ciIsInJlcGxhY2UiLCJtZFRpdGxlRXNjYXBlIiwicXVvdGVFc2NhcGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ08sTUFBTUEsUUFBUSxHQUFHQyxHQUFHLElBQUlBLEdBQUcsQ0FBQ0MsT0FBSixDQUFZLE9BQVosRUFBcUIsVUFBckIsQ0FBeEI7Ozs7QUFDQSxNQUFNQyxhQUFhLEdBQUdGLEdBQUcsSUFBSUQsUUFBUSxDQUMxQ0MsR0FBRyxDQUNBQyxPQURILENBQ1csS0FEWCxFQUNrQixLQURsQixFQUN5QjtBQUR6QixDQUVHQSxPQUZILENBRVcsS0FGWCxFQUVrQixLQUZsQixFQUdHQSxPQUhILENBR1csS0FIWCxFQUdrQixLQUhsQixDQUQwQyxDQUFyQzs7OztBQU1BLE1BQU1FLFdBQVcsR0FBR0gsR0FBRyxJQUFJQSxHQUFHLENBQUNDLE9BQUosQ0FBWSxJQUFaLEVBQWtCLE1BQWxCLEVBQTBCQSxPQUExQixDQUFrQyxHQUFsQyxFQUF1QyxLQUF2QyxDQUEzQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIGBgYOOBjOWQq+OBvuOCjOOBpuOBhOOCi+OBqOOBjeOBq+OBqeOBhuOBl+OCiOOBhuOCguOBquOBhFxyXG5leHBvcnQgY29uc3QgbWRFc2NhcGUgPSBzdHIgPT4gc3RyLnJlcGxhY2UoL1xce1xcey9nLCAne3tcInt7XCJ9fScpXHJcbmV4cG9ydCBjb25zdCBtZFRpdGxlRXNjYXBlID0gc3RyID0+IG1kRXNjYXBlKFxyXG4gIHN0clxyXG4gICAgLnJlcGxhY2UoL1xcfC9nLCAnXFxcXHwnKSAvLyBrcmFtZG93bueJueWMliAvLyDjganjgYbjgZfjgojjgYbjgoLjgarjgYRcclxuICAgIC5yZXBsYWNlKC9cXFsvZywgJ1xcXFxbJylcclxuICAgIC5yZXBsYWNlKC9cXF0vZywgJ1xcXFxdJylcclxuKVxyXG5leHBvcnQgY29uc3QgcXVvdGVFc2NhcGUgPSBzdHIgPT4gc3RyLnJlcGxhY2UoL1xcXFwvLCAnXFxcXFxcXFwnKS5yZXBsYWNlKC9cIi8sICdcXFxcXCInKVxyXG4iXX0=