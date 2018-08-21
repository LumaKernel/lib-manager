"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeIDMaker = makeIDMaker;
exports.hash = hash;

// makeIDMakerとhashでひとくみ
// NOTE : ただしめんどいので###{number}###をつかわないことを前提とする

function* makeIDMaker() {
  let i = 1;
  while (1) yield i++;
}

function hash(id) {
  return `###${id}###`;
}