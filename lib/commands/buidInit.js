"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildInit;

require("source-map-support/register");

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  resolve
} = _path.default;
const {
  existsSync,
  writeFileSync,
  readFileSync
} = _fsExtra.default;

function buildInit(config, project) {
  const src = resolve(process.cwd(), config.WorkingDir, config.SrcDir);
  const printlistPath = resolve(src, 'printlist.json');
  const printedPath = resolve(src, 'printed.json');
  if (existsSync(printlistPath)) throw '"printlist.json" already exists';

  if (!existsSync(printedPath)) {
    writeFileSync(printedPath, '{}');
  }

  const printed = JSON.parse(readFileSync(printedPath).toString());
  const printlist = [];
  Object.entries(project.libs).forEach(([key, value]) => {
    if (printed[key] === value.code) return;
    printlist.push(key);
  });
  writeFileSync(printlistPath, JSON.stringify(printlist));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9idWlkSW5pdC5qcyJdLCJuYW1lcyI6WyJyZXNvbHZlIiwicGF0aCIsImV4aXN0c1N5bmMiLCJ3cml0ZUZpbGVTeW5jIiwicmVhZEZpbGVTeW5jIiwiZnMiLCJidWlsZEluaXQiLCJjb25maWciLCJwcm9qZWN0Iiwic3JjIiwicHJvY2VzcyIsImN3ZCIsIldvcmtpbmdEaXIiLCJTcmNEaXIiLCJwcmludGxpc3RQYXRoIiwicHJpbnRlZFBhdGgiLCJwcmludGVkIiwiSlNPTiIsInBhcnNlIiwidG9TdHJpbmciLCJwcmludGxpc3QiLCJPYmplY3QiLCJlbnRyaWVzIiwibGlicyIsImZvckVhY2giLCJrZXkiLCJ2YWx1ZSIsImNvZGUiLCJwdXNoIiwic3RyaW5naWZ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBLE1BQU07QUFBRUEsRUFBQUE7QUFBRixJQUFjQyxhQUFwQjtBQUNBLE1BQU07QUFBRUMsRUFBQUEsVUFBRjtBQUFjQyxFQUFBQSxhQUFkO0FBQTZCQyxFQUFBQTtBQUE3QixJQUE4Q0MsZ0JBQXBEOztBQUVlLFNBQVNDLFNBQVQsQ0FBb0JDLE1BQXBCLEVBQTRCQyxPQUE1QixFQUFxQztBQUNsRCxRQUFNQyxHQUFHLEdBQUdULE9BQU8sQ0FBQ1UsT0FBTyxDQUFDQyxHQUFSLEVBQUQsRUFBZ0JKLE1BQU0sQ0FBQ0ssVUFBdkIsRUFBbUNMLE1BQU0sQ0FBQ00sTUFBMUMsQ0FBbkI7QUFDQSxRQUFNQyxhQUFhLEdBQUdkLE9BQU8sQ0FBQ1MsR0FBRCxFQUFNLGdCQUFOLENBQTdCO0FBQ0EsUUFBTU0sV0FBVyxHQUFHZixPQUFPLENBQUNTLEdBQUQsRUFBTSxjQUFOLENBQTNCO0FBQ0EsTUFBSVAsVUFBVSxDQUFDWSxhQUFELENBQWQsRUFBK0IsTUFBTSxpQ0FBTjs7QUFDL0IsTUFBSSxDQUFDWixVQUFVLENBQUNhLFdBQUQsQ0FBZixFQUE4QjtBQUM1QlosSUFBQUEsYUFBYSxDQUFDWSxXQUFELEVBQWMsSUFBZCxDQUFiO0FBQ0Q7O0FBQ0QsUUFBTUMsT0FBTyxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV2QsWUFBWSxDQUFDVyxXQUFELENBQVosQ0FBMEJJLFFBQTFCLEVBQVgsQ0FBaEI7QUFDQSxRQUFNQyxTQUFTLEdBQUcsRUFBbEI7QUFDQUMsRUFBQUEsTUFBTSxDQUFDQyxPQUFQLENBQWVkLE9BQU8sQ0FBQ2UsSUFBdkIsRUFBNkJDLE9BQTdCLENBQXFDLENBQUMsQ0FBQ0MsR0FBRCxFQUFNQyxLQUFOLENBQUQsS0FBa0I7QUFDckQsUUFBSVYsT0FBTyxDQUFDUyxHQUFELENBQVAsS0FBaUJDLEtBQUssQ0FBQ0MsSUFBM0IsRUFBaUM7QUFDakNQLElBQUFBLFNBQVMsQ0FBQ1EsSUFBVixDQUFlSCxHQUFmO0FBQ0QsR0FIRDtBQUlBdEIsRUFBQUEsYUFBYSxDQUFDVyxhQUFELEVBQWdCRyxJQUFJLENBQUNZLFNBQUwsQ0FBZVQsU0FBZixDQUFoQixDQUFiO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuY29uc3QgeyByZXNvbHZlIH0gPSBwYXRoXG5jb25zdCB7IGV4aXN0c1N5bmMsIHdyaXRlRmlsZVN5bmMsIHJlYWRGaWxlU3luYyB9ID0gZnNcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRJbml0IChjb25maWcsIHByb2plY3QpIHtcbiAgY29uc3Qgc3JjID0gcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBjb25maWcuV29ya2luZ0RpciwgY29uZmlnLlNyY0RpcilcbiAgY29uc3QgcHJpbnRsaXN0UGF0aCA9IHJlc29sdmUoc3JjLCAncHJpbnRsaXN0Lmpzb24nKVxuICBjb25zdCBwcmludGVkUGF0aCA9IHJlc29sdmUoc3JjLCAncHJpbnRlZC5qc29uJylcbiAgaWYgKGV4aXN0c1N5bmMocHJpbnRsaXN0UGF0aCkpIHRocm93ICdcInByaW50bGlzdC5qc29uXCIgYWxyZWFkeSBleGlzdHMnXG4gIGlmICghZXhpc3RzU3luYyhwcmludGVkUGF0aCkpIHtcbiAgICB3cml0ZUZpbGVTeW5jKHByaW50ZWRQYXRoLCAne30nKVxuICB9XG4gIGNvbnN0IHByaW50ZWQgPSBKU09OLnBhcnNlKHJlYWRGaWxlU3luYyhwcmludGVkUGF0aCkudG9TdHJpbmcoKSlcbiAgY29uc3QgcHJpbnRsaXN0ID0gW11cbiAgT2JqZWN0LmVudHJpZXMocHJvamVjdC5saWJzKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICBpZiAocHJpbnRlZFtrZXldID09PSB2YWx1ZS5jb2RlKSByZXR1cm5cbiAgICBwcmludGxpc3QucHVzaChrZXkpXG4gIH0pXG4gIHdyaXRlRmlsZVN5bmMocHJpbnRsaXN0UGF0aCwgSlNPTi5zdHJpbmdpZnkocHJpbnRsaXN0KSlcbn1cbiJdfQ==