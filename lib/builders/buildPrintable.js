"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildPrintable;

require("source-map-support/register");

var _jsYaml = _interopRequireDefault(require("js-yaml"));

var _escape = require("../helpers/escape");

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
    printable: '---\n' + _jsYaml.default.safeDump(printableYAML) + '\n---\n\n' + printRaw.join('\n\n')
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9idWlsZGVycy9idWlsZFByaW50YWJsZS5qcyJdLCJuYW1lcyI6WyJidWlsZFByaW50YWJsZSIsInByaW50YWJsZVlBTUwiLCJwcmludGxpc3QiLCJwcmludGVkIiwibGlicyIsIkFycmF5IiwiaXNBcnJheSIsInByaW50UmF3IiwiZm9yRWFjaCIsIm5hbWUiLCJsaWJFbnQiLCJPYmplY3QiLCJlbnRyaWVzIiwiZmlsdGVyIiwia2V5IiwidmFsdWUiLCJjb2RlIiwicHVzaCIsInByaW50YWJsZSIsInlhbWwiLCJzYWZlRHVtcCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRWUsU0FBU0EsY0FBVCxDQUF5QkMsYUFBekIsRUFBd0NDLFNBQXhDLEVBQW1EQyxPQUFuRCxFQUE0REMsSUFBNUQsRUFBa0U7QUFDL0UsTUFBSSxDQUFDQyxLQUFLLENBQUNDLE9BQU4sQ0FBY0osU0FBZCxDQUFMLEVBQStCLE1BQU0seUJBQU47QUFDL0IsUUFBTUssUUFBUSxHQUFHLEVBQWpCO0FBQ0FMLEVBQUFBLFNBQVMsQ0FBQ00sT0FBVixDQUFrQkMsSUFBSSxJQUFJO0FBQ3hCLFVBQU1DLE1BQU0sR0FBR0MsTUFBTSxDQUFDQyxPQUFQLENBQWVSLElBQWYsRUFDWlMsTUFEWSxDQUNMLENBQUMsQ0FBQ0MsR0FBRCxFQUFNQyxLQUFOLENBQUQsS0FBa0JELEdBQUcsS0FBS0wsSUFEckIsRUFDMkIsQ0FEM0IsQ0FBZjs7QUFFQSxRQUFJQyxNQUFKLEVBQVk7QUFDVlAsTUFBQUEsT0FBTyxDQUFDTSxJQUFELENBQVAsR0FBZ0JDLE1BQU0sQ0FBQyxDQUFELENBQU4sQ0FBVU0sSUFBMUI7QUFDQVQsTUFBQUEsUUFBUSxDQUFDVSxJQUFULENBQWUsMkJBQTBCUixJQUFLLGNBQWEsS0FBTSxLQUFJLHNCQUFTQyxNQUFNLENBQUMsQ0FBRCxDQUFOLENBQVVNLElBQW5CLENBQXlCLEtBQUksS0FBTSxFQUF4RztBQUNEO0FBQ0YsR0FQRDtBQVFBLFNBQU87QUFDTGIsSUFBQUEsT0FESztBQUVMZSxJQUFBQSxTQUFTLEVBQUUsVUFBVUMsZ0JBQUtDLFFBQUwsQ0FBY25CLGFBQWQsQ0FBVixHQUF5QyxXQUF6QyxHQUF1RE0sUUFBUSxDQUFDYyxJQUFULENBQWMsTUFBZDtBQUY3RCxHQUFQO0FBSUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeWFtbCBmcm9tICdqcy15YW1sJ1xyXG5pbXBvcnQgeyBtZEVzY2FwZSB9IGZyb20gJy4uL2hlbHBlcnMvZXNjYXBlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRQcmludGFibGUgKHByaW50YWJsZVlBTUwsIHByaW50bGlzdCwgcHJpbnRlZCwgbGlicykge1xyXG4gIGlmICghQXJyYXkuaXNBcnJheShwcmludGxpc3QpKSB0aHJvdyAncHJpbnRsaXN0IG11c3QgYmUgYXJyYXknXHJcbiAgY29uc3QgcHJpbnRSYXcgPSBbXVxyXG4gIHByaW50bGlzdC5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgY29uc3QgbGliRW50ID0gT2JqZWN0LmVudHJpZXMobGlicylcclxuICAgICAgLmZpbHRlcigoW2tleSwgdmFsdWVdKSA9PiBrZXkgPT09IG5hbWUpWzBdXHJcbiAgICBpZiAobGliRW50KSB7XHJcbiAgICAgIHByaW50ZWRbbmFtZV0gPSBsaWJFbnRbMV0uY29kZVxyXG4gICAgICBwcmludFJhdy5wdXNoKGA8c3BhbiBjbGFzcz1cImxpYi10aXRsZVwiPiR7bmFtZX08L3NwYW4+XFxuXFxuJHsnYGBgJ31cXG4ke21kRXNjYXBlKGxpYkVudFsxXS5jb2RlKX1cXG4keydgYGAnfWApXHJcbiAgICB9XHJcbiAgfSlcclxuICByZXR1cm4ge1xyXG4gICAgcHJpbnRlZCxcclxuICAgIHByaW50YWJsZTogJy0tLVxcbicgKyB5YW1sLnNhZmVEdW1wKHByaW50YWJsZVlBTUwpICsgJ1xcbi0tLVxcblxcbicgKyBwcmludFJhdy5qb2luKCdcXG5cXG4nKVxyXG4gIH1cclxufVxyXG4iXX0=