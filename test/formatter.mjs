import test from 'ava'
import { format } from '../formatter'
import { prepareWorkSpace } from './helpers/prepareWorkSpace'

prepareWorkSpace(test)

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
