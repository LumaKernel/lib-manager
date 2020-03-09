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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pZC5qcyJdLCJuYW1lcyI6WyJtYWtlSURNYWtlciIsImkiLCJoYXNoIiwiaWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBRU8sVUFBV0EsV0FBWCxHQUEwQjtBQUMvQixNQUFJQyxDQUFDLEdBQUcsQ0FBUjs7QUFDQSxTQUFPLENBQVAsRUFBVSxNQUFNQSxDQUFDLEVBQVA7QUFDWDs7QUFFTSxTQUFTQyxJQUFULENBQWVDLEVBQWYsRUFBbUI7QUFDeEIsU0FBUSxNQUFLQSxFQUFHLEtBQWhCO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8vIG1ha2VJRE1ha2Vy44GoaGFzaOOBp+OBsuOBqOOBj+OBv1xuLy8gTk9URSA6IOOBn+OBoOOBl+OCgeOCk+OBqeOBhOOBruOBpyMjI3tudW1iZXJ9IyMj44KS44Gk44GL44KP44Gq44GE44GT44Go44KS5YmN5o+Q44Go44GZ44KLXG5cbmV4cG9ydCBmdW5jdGlvbiAqIG1ha2VJRE1ha2VyICgpIHtcbiAgbGV0IGkgPSAxXG4gIHdoaWxlICgxKSB5aWVsZCBpKytcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc2ggKGlkKSB7XG4gIHJldHVybiBgIyMjJHtpZH0jIyNgXG59XG4iXX0=