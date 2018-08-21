'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildPrintable;

require('source-map-support/register');

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _escape = require('../helpers/escape');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildPrintable(printableYAML, printlist, printed, libs) {
  if (!Array.isArray(printlist)) throw 'printlist must be array';
  const printRaw = [];
  printlist.forEach(name => {
    const libEnt = Object.entries(libs).filter(([key, value]) => key === name)[0];
    if (libEnt) {
      printed[name] = libEnt[1].code;
      printRaw.push(`<span class="lib-title">${name}</span>\n\n${'```'}\n${(0, _escape.mdEscape)(libEnt[1].code)}\n${'```'}`);
    }
  });
  return {
    printed,
    printable: '---\n' + _jsYaml2.default.safeDump(printableYAML) + '\n---\n\n' + printRaw.join('\n\n')
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9idWlsZGVycy9idWlsZFByaW50YWJsZS5qcyJdLCJuYW1lcyI6WyJidWlsZFByaW50YWJsZSIsInByaW50YWJsZVlBTUwiLCJwcmludGxpc3QiLCJwcmludGVkIiwibGlicyIsIkFycmF5IiwiaXNBcnJheSIsInByaW50UmF3IiwiZm9yRWFjaCIsIm5hbWUiLCJsaWJFbnQiLCJPYmplY3QiLCJlbnRyaWVzIiwiZmlsdGVyIiwia2V5IiwidmFsdWUiLCJjb2RlIiwicHVzaCIsInByaW50YWJsZSIsInlhbWwiLCJzYWZlRHVtcCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7O2tCQUd3QkEsYzs7OztBQUh4Qjs7OztBQUNBOzs7O0FBRWUsU0FBU0EsY0FBVCxDQUF5QkMsYUFBekIsRUFBd0NDLFNBQXhDLEVBQW1EQyxPQUFuRCxFQUE0REMsSUFBNUQsRUFBa0U7QUFDL0UsTUFBSSxDQUFDQyxNQUFNQyxPQUFOLENBQWNKLFNBQWQsQ0FBTCxFQUErQixNQUFNLHlCQUFOO0FBQy9CLFFBQU1LLFdBQVcsRUFBakI7QUFDQUwsWUFBVU0sT0FBVixDQUFrQkMsUUFBUTtBQUN4QixVQUFNQyxTQUFTQyxPQUFPQyxPQUFQLENBQWVSLElBQWYsRUFDWlMsTUFEWSxDQUNMLENBQUMsQ0FBQ0MsR0FBRCxFQUFNQyxLQUFOLENBQUQsS0FBa0JELFFBQVFMLElBRHJCLEVBQzJCLENBRDNCLENBQWY7QUFFQSxRQUFJQyxNQUFKLEVBQVk7QUFDVlAsY0FBUU0sSUFBUixJQUFnQkMsT0FBTyxDQUFQLEVBQVVNLElBQTFCO0FBQ0FULGVBQVNVLElBQVQsQ0FBZSwyQkFBMEJSLElBQUssY0FBYSxLQUFNLEtBQUksc0JBQVNDLE9BQU8sQ0FBUCxFQUFVTSxJQUFuQixDQUF5QixLQUFJLEtBQU0sRUFBeEc7QUFDRDtBQUNGLEdBUEQ7QUFRQSxTQUFPO0FBQ0xiLFdBREs7QUFFTGUsZUFBVyxVQUFVQyxpQkFBS0MsUUFBTCxDQUFjbkIsYUFBZCxDQUFWLEdBQXlDLFdBQXpDLEdBQXVETSxTQUFTYyxJQUFULENBQWMsTUFBZDtBQUY3RCxHQUFQO0FBSUQiLCJmaWxlIjoiYnVpbGRQcmludGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeWFtbCBmcm9tICdqcy15YW1sJ1xuaW1wb3J0IHsgbWRFc2NhcGUgfSBmcm9tICcuLi9oZWxwZXJzL2VzY2FwZSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRQcmludGFibGUgKHByaW50YWJsZVlBTUwsIHByaW50bGlzdCwgcHJpbnRlZCwgbGlicykge1xuICBpZiAoIUFycmF5LmlzQXJyYXkocHJpbnRsaXN0KSkgdGhyb3cgJ3ByaW50bGlzdCBtdXN0IGJlIGFycmF5J1xuICBjb25zdCBwcmludFJhdyA9IFtdXG4gIHByaW50bGlzdC5mb3JFYWNoKG5hbWUgPT4ge1xuICAgIGNvbnN0IGxpYkVudCA9IE9iamVjdC5lbnRyaWVzKGxpYnMpXG4gICAgICAuZmlsdGVyKChba2V5LCB2YWx1ZV0pID0+IGtleSA9PT0gbmFtZSlbMF1cbiAgICBpZiAobGliRW50KSB7XG4gICAgICBwcmludGVkW25hbWVdID0gbGliRW50WzFdLmNvZGVcbiAgICAgIHByaW50UmF3LnB1c2goYDxzcGFuIGNsYXNzPVwibGliLXRpdGxlXCI+JHtuYW1lfTwvc3Bhbj5cXG5cXG4keydgYGAnfVxcbiR7bWRFc2NhcGUobGliRW50WzFdLmNvZGUpfVxcbiR7J2BgYCd9YClcbiAgICB9XG4gIH0pXG4gIHJldHVybiB7XG4gICAgcHJpbnRlZCxcbiAgICBwcmludGFibGU6ICctLS1cXG4nICsgeWFtbC5zYWZlRHVtcChwcmludGFibGVZQU1MKSArICdcXG4tLS1cXG5cXG4nICsgcHJpbnRSYXcuam9pbignXFxuXFxuJylcbiAgfVxufVxuIl19