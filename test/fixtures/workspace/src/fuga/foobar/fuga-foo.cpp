// @ FugaFoo
// @title Fuga(Foo)
// NOTE : nothing
/// --- Baz Lib {{{ ///
struct Ex {
};

/// }}}--- ///

// and some more

// @new FugaFoo-utility
// @snippet foofoo
// WARN : utility
int func(int x) {
  return x + x;
}

// @new
// @ FugaFoo-expanded
// @snippet abc
int abc(int x) {
  return x * x;
}