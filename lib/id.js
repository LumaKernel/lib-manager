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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pZC5qcyJdLCJuYW1lcyI6WyJtYWtlSURNYWtlciIsImkiLCJoYXNoIiwiaWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBRU8sVUFBV0EsV0FBWCxHQUEwQjtBQUMvQixNQUFJQyxDQUFDLEdBQUcsQ0FBUjs7QUFDQSxTQUFPLENBQVAsRUFBVSxNQUFNQSxDQUFDLEVBQVA7QUFDWDs7QUFFTSxTQUFTQyxJQUFULENBQWVDLEVBQWYsRUFBbUI7QUFDeEIsU0FBUSxNQUFLQSxFQUFHLEtBQWhCO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLy8gbWFrZUlETWFrZXLjgahoYXNo44Gn44Gy44Go44GP44G/XHJcbi8vIE5PVEUgOiDjgZ/jgaDjgZfjgoHjgpPjganjgYTjga7jgacjIyN7bnVtYmVyfSMjI+OCkuOBpOOBi+OCj+OBquOBhOOBk+OBqOOCkuWJjeaPkOOBqOOBmeOCi1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uICogbWFrZUlETWFrZXIgKCkge1xyXG4gIGxldCBpID0gMVxyXG4gIHdoaWxlICgxKSB5aWVsZCBpKytcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhc2ggKGlkKSB7XHJcbiAgcmV0dXJuIGAjIyMke2lkfSMjI2BcclxufVxyXG4iXX0=