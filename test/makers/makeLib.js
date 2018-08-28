import test from 'ava'
import { makeLib } from '../../src/makers/makeLib'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

test(async t => {
  t.plan(1)
  const old = ''
  try { // TODO : use thorwsAsync
    await makeLib(old, '', 'x.cpp', t.context.config)
  } catch (error) {
    if (typeof error === 'string') {
      t.is(error, ' / x.cpp : no name')
    } else {
      throw error
    }
  }
})

test(async t => {
  t.plan(1)
  const old = `
// @name test LIB
/// {{{ ///
/// }}}--- ///
`
  try { // TODO : use thorwsAsync
    await makeLib(old, 'abc', 'y.cpp', t.context.config)
  } catch (error) {
    if (typeof error === 'string') {
      t.is(error, 'abc / y.cpp : test LIB : cannot include unit lib END "/// }}}--- ///')
    } else {
      throw error
    }
  }
})

test(async t => {
  t.plan(1)
  const old = `
// @name TEST my LIB
/// --- TEST my LIB {{{ ///
a;
/// }}}--- ///
/// --- NOT my LIB {{{ ///
b;
/// }}}--- ///
/// --- TEST my LIB {{{ ///
/// }}}--- ///
`
  try { // TODO : use thorwsAsync
    await makeLib(old, 'c', 'z.cpp', t.context.config)
  } catch (error) {
    if (typeof error === 'string') {
      t.is(error, 'c / z.cpp : TEST my LIB : cannot handle 2 or more enclosures "/// ---..."')
    } else {
      throw error
    }
  }
})
