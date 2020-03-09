"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeLibraries;

require("source-map-support/register");

require("array-foreach-async");

var _fsExtra = require("fs-extra");

var _path = require("path");

var _getFileStructure = _interopRequireDefault(require("./getFileStructure"));

var _makeLib = require("./makeLib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const newRegExp = /\n(?=\/\/ @new(?: .+)?)/;

async function makeLibraries(config) {
  const {
    main
  } = (0, _getFileStructure.default)(config);
  const libs = {};
  const files = []; //

  const libFiles = main.filter(el => !el[1].match(/_.*$/)); // library files

  await libFiles.forEachAsync(async ([namespaceList, filename]) => {
    const namespace = namespaceList.join('/');
    const path = (0, _path.resolve)(process.cwd(), config.WorkingDir, config.SrcDir, namespace, filename);
    const raw = (0, _fsExtra.readFileSync)(path).toString().replace(/\r\n?/g, '\n');
    const olds = raw.split(newRegExp);
    const file = {
      namespace,
      filename,
      data: []
    };
    await olds.forEachAsync(async old => {
      const {
        name,
        data
      } = await (0, _makeLib.makeLib)(old, namespace, filename, config);
      if (libs[name]) throw `name "${name}" duplicates`;
      libs[name] = data;
      file.data.push(name);
    });
    files.push(file);
  });
  return {
    libs,
    files
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWtlcnMvbWFrZUxpYnJhcmllcy5qcyJdLCJuYW1lcyI6WyJuZXdSZWdFeHAiLCJtYWtlTGlicmFyaWVzIiwiY29uZmlnIiwibWFpbiIsImxpYnMiLCJmaWxlcyIsImxpYkZpbGVzIiwiZmlsdGVyIiwiZWwiLCJtYXRjaCIsImZvckVhY2hBc3luYyIsIm5hbWVzcGFjZUxpc3QiLCJmaWxlbmFtZSIsIm5hbWVzcGFjZSIsImpvaW4iLCJwYXRoIiwicHJvY2VzcyIsImN3ZCIsIldvcmtpbmdEaXIiLCJTcmNEaXIiLCJyYXciLCJ0b1N0cmluZyIsInJlcGxhY2UiLCJvbGRzIiwic3BsaXQiLCJmaWxlIiwiZGF0YSIsIm9sZCIsIm5hbWUiLCJwdXNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU1BLFNBQVMsR0FBRyx5QkFBbEI7O0FBRWUsZUFBZUMsYUFBZixDQUE4QkMsTUFBOUIsRUFBc0M7QUFDbkQsUUFBTTtBQUFDQyxJQUFBQTtBQUFELE1BQVMsK0JBQWlCRCxNQUFqQixDQUFmO0FBQ0EsUUFBTUUsSUFBSSxHQUFHLEVBQWI7QUFDQSxRQUFNQyxLQUFLLEdBQUcsRUFBZCxDQUhtRCxDQUluRDs7QUFDQSxRQUFNQyxRQUFRLEdBQUdILElBQUksQ0FBQ0ksTUFBTCxDQUFZQyxFQUFFLElBQUksQ0FBQ0EsRUFBRSxDQUFDLENBQUQsQ0FBRixDQUFNQyxLQUFOLENBQVksTUFBWixDQUFuQixDQUFqQixDQUxtRCxDQU1uRDs7QUFDQSxRQUFNSCxRQUFRLENBQUNJLFlBQVQsQ0FBc0IsT0FBTyxDQUFDQyxhQUFELEVBQWdCQyxRQUFoQixDQUFQLEtBQXFDO0FBQy9ELFVBQU1DLFNBQVMsR0FBR0YsYUFBYSxDQUFDRyxJQUFkLENBQW1CLEdBQW5CLENBQWxCO0FBQ0EsVUFBTUMsSUFBSSxHQUFHLG1CQUFRQyxPQUFPLENBQUNDLEdBQVIsRUFBUixFQUNYZixNQUFNLENBQUNnQixVQURJLEVBQ1FoQixNQUFNLENBQUNpQixNQURmLEVBQ3VCTixTQUR2QixFQUNrQ0QsUUFEbEMsQ0FBYjtBQUVBLFVBQU1RLEdBQUcsR0FBRywyQkFBYUwsSUFBYixFQUFtQk0sUUFBbkIsR0FBOEJDLE9BQTlCLENBQXNDLFFBQXRDLEVBQWdELElBQWhELENBQVo7QUFDQSxVQUFNQyxJQUFJLEdBQUdILEdBQUcsQ0FBQ0ksS0FBSixDQUFVeEIsU0FBVixDQUFiO0FBQ0EsVUFBTXlCLElBQUksR0FBRztBQUFDWixNQUFBQSxTQUFEO0FBQVlELE1BQUFBLFFBQVo7QUFBc0JjLE1BQUFBLElBQUksRUFBRTtBQUE1QixLQUFiO0FBQ0EsVUFBTUgsSUFBSSxDQUFDYixZQUFMLENBQWtCLE1BQU1pQixHQUFOLElBQWE7QUFDbkMsWUFBTTtBQUFDQyxRQUFBQSxJQUFEO0FBQU9GLFFBQUFBO0FBQVAsVUFBZSxNQUFNLHNCQUFRQyxHQUFSLEVBQWFkLFNBQWIsRUFBd0JELFFBQXhCLEVBQWtDVixNQUFsQyxDQUEzQjtBQUNBLFVBQUlFLElBQUksQ0FBQ3dCLElBQUQsQ0FBUixFQUFnQixNQUFPLFNBQVFBLElBQUssY0FBcEI7QUFDaEJ4QixNQUFBQSxJQUFJLENBQUN3QixJQUFELENBQUosR0FBYUYsSUFBYjtBQUNBRCxNQUFBQSxJQUFJLENBQUNDLElBQUwsQ0FBVUcsSUFBVixDQUFlRCxJQUFmO0FBQ0QsS0FMSyxDQUFOO0FBTUF2QixJQUFBQSxLQUFLLENBQUN3QixJQUFOLENBQVdKLElBQVg7QUFDRCxHQWRLLENBQU47QUFlQSxTQUFPO0FBQ0xyQixJQUFBQSxJQURLO0FBQ0NDLElBQUFBO0FBREQsR0FBUDtBQUdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdhcnJheS1mb3JlYWNoLWFzeW5jJ1xuaW1wb3J0IHsgcmVhZEZpbGVTeW5jIH0gZnJvbSAnZnMtZXh0cmEnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCBnZXRGaWxlU3RydWN0dXJlIGZyb20gJy4vZ2V0RmlsZVN0cnVjdHVyZSdcbmltcG9ydCB7IG1ha2VMaWIgfSBmcm9tICcuL21ha2VMaWInXG5cbmNvbnN0IG5ld1JlZ0V4cCA9IC9cXG4oPz1cXC9cXC8gQG5ldyg/OiAuKyk/KS9cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gbWFrZUxpYnJhcmllcyAoY29uZmlnKSB7XG4gIGNvbnN0IHttYWlufSA9IGdldEZpbGVTdHJ1Y3R1cmUoY29uZmlnKVxuICBjb25zdCBsaWJzID0ge31cbiAgY29uc3QgZmlsZXMgPSBbXVxuICAvL1xuICBjb25zdCBsaWJGaWxlcyA9IG1haW4uZmlsdGVyKGVsID0+ICFlbFsxXS5tYXRjaCgvXy4qJC8pKVxuICAvLyBsaWJyYXJ5IGZpbGVzXG4gIGF3YWl0IGxpYkZpbGVzLmZvckVhY2hBc3luYyhhc3luYyAoW25hbWVzcGFjZUxpc3QsIGZpbGVuYW1lXSkgPT4ge1xuICAgIGNvbnN0IG5hbWVzcGFjZSA9IG5hbWVzcGFjZUxpc3Quam9pbignLycpXG4gICAgY29uc3QgcGF0aCA9IHJlc29sdmUocHJvY2Vzcy5jd2QoKSxcbiAgICAgIGNvbmZpZy5Xb3JraW5nRGlyLCBjb25maWcuU3JjRGlyLCBuYW1lc3BhY2UsIGZpbGVuYW1lKVxuICAgIGNvbnN0IHJhdyA9IHJlYWRGaWxlU3luYyhwYXRoKS50b1N0cmluZygpLnJlcGxhY2UoL1xcclxcbj8vZywgJ1xcbicpXG4gICAgY29uc3Qgb2xkcyA9IHJhdy5zcGxpdChuZXdSZWdFeHApXG4gICAgY29uc3QgZmlsZSA9IHtuYW1lc3BhY2UsIGZpbGVuYW1lLCBkYXRhOiBbXX1cbiAgICBhd2FpdCBvbGRzLmZvckVhY2hBc3luYyhhc3luYyBvbGQgPT4ge1xuICAgICAgY29uc3Qge25hbWUsIGRhdGF9ID0gYXdhaXQgbWFrZUxpYihvbGQsIG5hbWVzcGFjZSwgZmlsZW5hbWUsIGNvbmZpZylcbiAgICAgIGlmIChsaWJzW25hbWVdKSB0aHJvdyBgbmFtZSBcIiR7bmFtZX1cIiBkdXBsaWNhdGVzYFxuICAgICAgbGlic1tuYW1lXSA9IGRhdGFcbiAgICAgIGZpbGUuZGF0YS5wdXNoKG5hbWUpXG4gICAgfSlcbiAgICBmaWxlcy5wdXNoKGZpbGUpXG4gIH0pXG4gIHJldHVybiB7XG4gICAgbGlicywgZmlsZXNcbiAgfVxufVxuIl19