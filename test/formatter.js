import test from 'ava'
import { cp } from 'shelljs'
import defaultConfig from '../constants/defaultConfig'
import { format } from '../formatter'

test.beforeEach(t => {
  const work = './tmp/' + Math.random().toString(36).slice(-8)
  t.context.work = work
  cp('-R', './test/fixtures/workspace', work)
  t.context.config = {
    ...defaultConfig(),
    WorkingDir: work
  }
})

test.afterEach(t => {
  // よく動かない
  // rm(t.context.work)
})

test('clangformat', async t => {
  const code = 'int abc;\n\n\nint def;'
  const res = await format(code, t.context.config)
  const exp = 'int abc;\n\nint def;'
  t.is(res, exp)
})

test('my format', async t => {
  const code = `struct Ex {
};

struct heLLo { };
struct heLLo {
  void dont() {}
};

int a() {
  struct MEEE {
  };
  throw MEEE;
}`
  const res = await format(code, t.context.config)
  const exp = `struct Ex {};

struct heLLo {};
struct heLLo {
  void dont() {}
};

int a() {
  struct MEEE {};
  throw MEEE;
}`
  t.is(res, exp)
})
