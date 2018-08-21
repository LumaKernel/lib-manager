"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeIDMaker = makeIDMaker;
exports.hash = hash;

require("source-map-support/register");

// makeIDMakerとhashでひとくみ
// NOTE : ただしめんどいので###{number}###をつかわないことを前提とする

function* makeIDMaker() {
  let i = 1;
  while (1) yield i++;
}

function hash(id) {
  return `###${id}###`;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pZC5qcyJdLCJuYW1lcyI6WyJtYWtlSURNYWtlciIsImhhc2giLCJpIiwiaWQiXSwibWFwcGluZ3MiOiI7Ozs7O1FBSWtCQSxXLEdBQUFBLFc7UUFLRkMsSSxHQUFBQSxJOzs7O0FBUmhCO0FBQ0E7O0FBRU8sVUFBV0QsV0FBWCxHQUEwQjtBQUMvQixNQUFJRSxJQUFJLENBQVI7QUFDQSxTQUFPLENBQVAsRUFBVSxNQUFNQSxHQUFOO0FBQ1g7O0FBRU0sU0FBU0QsSUFBVCxDQUFlRSxFQUFmLEVBQW1CO0FBQ3hCLFNBQVEsTUFBS0EsRUFBRyxLQUFoQjtBQUNEIiwiZmlsZSI6ImlkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vLyBtYWtlSURNYWtlcuOBqGhhc2jjgafjgbLjgajjgY/jgb9cbi8vIE5PVEUgOiDjgZ/jgaDjgZfjgoHjgpPjganjgYTjga7jgacjIyN7bnVtYmVyfSMjI+OCkuOBpOOBi+OCj+OBquOBhOOBk+OBqOOCkuWJjeaPkOOBqOOBmeOCi1xuXG5leHBvcnQgZnVuY3Rpb24gKiBtYWtlSURNYWtlciAoKSB7XG4gIGxldCBpID0gMVxuICB3aGlsZSAoMSkgeWllbGQgaSsrXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNoIChpZCkge1xuICByZXR1cm4gYCMjIyR7aWR9IyMjYFxufVxuIl19