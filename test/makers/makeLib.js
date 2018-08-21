import test from 'ava'
import { makeLib } from '../../src/makers/makeLib'
import { prepareWorkSpace } from '../helpers/prepareWorkSpace'

prepareWorkSpace(test)

test(async t => {
  t.plan(1)
  const old = ''
  try { // TODO : use thorwsAsync
    await makeLib(old, '', 'test.cpp', t.context.config)
  } catch (error) {
    t.is(error, './test.cpp : no name')
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
    await makeLib(old, '', 'test.cpp', t.context.config)
  } catch (error) {
    t.is(error, 'test LIB : cannot include unit lib end')
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
    await makeLib(old, '', 'test.cpp', t.context.config)
  } catch (error) {
    t.is(error, 'TEST my LIB : cannot handle 2 or more encsolures "/// ---..."')
  }
})
