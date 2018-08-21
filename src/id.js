
// makeIDMakerとhashでひとくみ
// NOTE : ただしめんどいので###{number}###をつかわないことを前提とする

export function * makeIDMaker () {
  let i = 1
  while (1) yield i++
}

export function hash (id) {
  return `###${id}###`
}
