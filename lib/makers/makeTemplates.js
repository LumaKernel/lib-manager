"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeTemplates;

require("source-map-support/register");

var _arrayForeachAsync = _interopRequireDefault(require("array-foreach-async"));

var _fsExtra = require("fs-extra");

var _path = _interopRequireDefault(require("path"));

var _formatter = require("../formatter");

var _getFileStructure = _interopRequireDefault(require("./getFileStructure"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  resolve
} = _path.default;
_arrayForeachAsync.default; // eslint-disable-line

async function makeTemplates(config) {
  const {
    main
  } = (0, _getFileStructure.default)(config);
  const templates = {}; // [path-list, name]s

  const templateFiles = main.filter(el => el[1].match(/_.*$/)); // テンプレートファイル

  await templateFiles.forEachAsync(async el => {
    const path = resolve(process.cwd(), config.WorkingDir, config.SrcDir, ...el[0], el[1]);
    const old = (0, _fsExtra.readFileSync)(path).toString();
    const code = await (0, _formatter.format)(old, config);
    const name = el[1].match(/_(.+)\.cpp/)[1];
    templates[name] = {
      old,
      code,
      namespace: el[0].join('/'),
      filename: el[1]
    };
  });
  return templates;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWtlcnMvbWFrZVRlbXBsYXRlcy5qcyJdLCJuYW1lcyI6WyJyZXNvbHZlIiwicGF0aCIsIm5vbmUiLCJtYWtlVGVtcGxhdGVzIiwiY29uZmlnIiwibWFpbiIsInRlbXBsYXRlcyIsInRlbXBsYXRlRmlsZXMiLCJmaWx0ZXIiLCJlbCIsIm1hdGNoIiwiZm9yRWFjaEFzeW5jIiwicHJvY2VzcyIsImN3ZCIsIldvcmtpbmdEaXIiLCJTcmNEaXIiLCJvbGQiLCJ0b1N0cmluZyIsImNvZGUiLCJuYW1lIiwibmFtZXNwYWNlIiwiam9pbiIsImZpbGVuYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBLE1BQU07QUFBRUEsRUFBQUE7QUFBRixJQUFjQyxhQUFwQjtBQUNBQywyQixDQUFNOztBQUVTLGVBQWVDLGFBQWYsQ0FBOEJDLE1BQTlCLEVBQXNDO0FBQ25ELFFBQU07QUFBQ0MsSUFBQUE7QUFBRCxNQUFTLCtCQUFpQkQsTUFBakIsQ0FBZjtBQUNBLFFBQU1FLFNBQVMsR0FBRyxFQUFsQixDQUZtRCxDQUduRDs7QUFDQSxRQUFNQyxhQUFhLEdBQUdGLElBQUksQ0FBQ0csTUFBTCxDQUFZQyxFQUFFLElBQUlBLEVBQUUsQ0FBQyxDQUFELENBQUYsQ0FBTUMsS0FBTixDQUFZLE1BQVosQ0FBbEIsQ0FBdEIsQ0FKbUQsQ0FLbkQ7O0FBQ0EsUUFBTUgsYUFBYSxDQUFDSSxZQUFkLENBQTJCLE1BQU1GLEVBQU4sSUFBWTtBQUMzQyxVQUFNUixJQUFJLEdBQUdELE9BQU8sQ0FBQ1ksT0FBTyxDQUFDQyxHQUFSLEVBQUQsRUFBZ0JULE1BQU0sQ0FBQ1UsVUFBdkIsRUFBbUNWLE1BQU0sQ0FBQ1csTUFBMUMsRUFBa0QsR0FBR04sRUFBRSxDQUFDLENBQUQsQ0FBdkQsRUFBNERBLEVBQUUsQ0FBQyxDQUFELENBQTlELENBQXBCO0FBQ0EsVUFBTU8sR0FBRyxHQUFHLDJCQUFhZixJQUFiLEVBQW1CZ0IsUUFBbkIsRUFBWjtBQUNBLFVBQU1DLElBQUksR0FBRyxNQUFNLHVCQUFPRixHQUFQLEVBQVlaLE1BQVosQ0FBbkI7QUFDQSxVQUFNZSxJQUFJLEdBQUdWLEVBQUUsQ0FBQyxDQUFELENBQUYsQ0FBTUMsS0FBTixDQUFZLFlBQVosRUFBMEIsQ0FBMUIsQ0FBYjtBQUNBSixJQUFBQSxTQUFTLENBQUNhLElBQUQsQ0FBVCxHQUFrQjtBQUFDSCxNQUFBQSxHQUFEO0FBQU1FLE1BQUFBLElBQU47QUFBWUUsTUFBQUEsU0FBUyxFQUFFWCxFQUFFLENBQUMsQ0FBRCxDQUFGLENBQU1ZLElBQU4sQ0FBVyxHQUFYLENBQXZCO0FBQXdDQyxNQUFBQSxRQUFRLEVBQUViLEVBQUUsQ0FBQyxDQUFEO0FBQXBELEtBQWxCO0FBQ0QsR0FOSyxDQUFOO0FBT0EsU0FBT0gsU0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5vbmUgZnJvbSAnYXJyYXktZm9yZWFjaC1hc3luYydcbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gJ2ZzLWV4dHJhJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IGZvcm1hdCB9IGZyb20gJy4uL2Zvcm1hdHRlcidcbmltcG9ydCBnZXRGaWxlU3RydWN0dXJlIGZyb20gJy4vZ2V0RmlsZVN0cnVjdHVyZSdcbmNvbnN0IHsgcmVzb2x2ZSB9ID0gcGF0aFxubm9uZSAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBtYWtlVGVtcGxhdGVzIChjb25maWcpIHtcbiAgY29uc3Qge21haW59ID0gZ2V0RmlsZVN0cnVjdHVyZShjb25maWcpXG4gIGNvbnN0IHRlbXBsYXRlcyA9IHt9XG4gIC8vIFtwYXRoLWxpc3QsIG5hbWVdc1xuICBjb25zdCB0ZW1wbGF0ZUZpbGVzID0gbWFpbi5maWx0ZXIoZWwgPT4gZWxbMV0ubWF0Y2goL18uKiQvKSlcbiAgLy8g44OG44Oz44OX44Os44O844OI44OV44Kh44Kk44OrXG4gIGF3YWl0IHRlbXBsYXRlRmlsZXMuZm9yRWFjaEFzeW5jKGFzeW5jIGVsID0+IHtcbiAgICBjb25zdCBwYXRoID0gcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBjb25maWcuV29ya2luZ0RpciwgY29uZmlnLlNyY0RpciwgLi4uZWxbMF0sIGVsWzFdKVxuICAgIGNvbnN0IG9sZCA9IHJlYWRGaWxlU3luYyhwYXRoKS50b1N0cmluZygpXG4gICAgY29uc3QgY29kZSA9IGF3YWl0IGZvcm1hdChvbGQsIGNvbmZpZylcbiAgICBjb25zdCBuYW1lID0gZWxbMV0ubWF0Y2goL18oLispXFwuY3BwLylbMV1cbiAgICB0ZW1wbGF0ZXNbbmFtZV0gPSB7b2xkLCBjb2RlLCBuYW1lc3BhY2U6IGVsWzBdLmpvaW4oJy8nKSwgZmlsZW5hbWU6IGVsWzFdfVxuICB9KVxuICByZXR1cm4gdGVtcGxhdGVzXG59XG4iXX0=