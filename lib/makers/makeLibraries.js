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
    const raw = (0, _fsExtra.readFileSync)(path).toString();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWtlcnMvbWFrZUxpYnJhcmllcy5qcyJdLCJuYW1lcyI6WyJuZXdSZWdFeHAiLCJtYWtlTGlicmFyaWVzIiwiY29uZmlnIiwibWFpbiIsImxpYnMiLCJmaWxlcyIsImxpYkZpbGVzIiwiZmlsdGVyIiwiZWwiLCJtYXRjaCIsImZvckVhY2hBc3luYyIsIm5hbWVzcGFjZUxpc3QiLCJmaWxlbmFtZSIsIm5hbWVzcGFjZSIsImpvaW4iLCJwYXRoIiwicHJvY2VzcyIsImN3ZCIsIldvcmtpbmdEaXIiLCJTcmNEaXIiLCJyYXciLCJ0b1N0cmluZyIsIm9sZHMiLCJzcGxpdCIsImZpbGUiLCJkYXRhIiwib2xkIiwibmFtZSIsInB1c2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTUEsU0FBUyxHQUFHLHlCQUFsQjs7QUFFZSxlQUFlQyxhQUFmLENBQThCQyxNQUE5QixFQUFzQztBQUNuRCxRQUFNO0FBQUNDLElBQUFBO0FBQUQsTUFBUywrQkFBaUJELE1BQWpCLENBQWY7QUFDQSxRQUFNRSxJQUFJLEdBQUcsRUFBYjtBQUNBLFFBQU1DLEtBQUssR0FBRyxFQUFkLENBSG1ELENBSW5EOztBQUNBLFFBQU1DLFFBQVEsR0FBR0gsSUFBSSxDQUFDSSxNQUFMLENBQVlDLEVBQUUsSUFBSSxDQUFDQSxFQUFFLENBQUMsQ0FBRCxDQUFGLENBQU1DLEtBQU4sQ0FBWSxNQUFaLENBQW5CLENBQWpCLENBTG1ELENBTW5EOztBQUNBLFFBQU1ILFFBQVEsQ0FBQ0ksWUFBVCxDQUFzQixPQUFPLENBQUNDLGFBQUQsRUFBZ0JDLFFBQWhCLENBQVAsS0FBcUM7QUFDL0QsVUFBTUMsU0FBUyxHQUFHRixhQUFhLENBQUNHLElBQWQsQ0FBbUIsR0FBbkIsQ0FBbEI7QUFDQSxVQUFNQyxJQUFJLEdBQUcsbUJBQVFDLE9BQU8sQ0FBQ0MsR0FBUixFQUFSLEVBQ1hmLE1BQU0sQ0FBQ2dCLFVBREksRUFDUWhCLE1BQU0sQ0FBQ2lCLE1BRGYsRUFDdUJOLFNBRHZCLEVBQ2tDRCxRQURsQyxDQUFiO0FBRUEsVUFBTVEsR0FBRyxHQUFHLDJCQUFhTCxJQUFiLEVBQW1CTSxRQUFuQixFQUFaO0FBQ0EsVUFBTUMsSUFBSSxHQUFHRixHQUFHLENBQUNHLEtBQUosQ0FBVXZCLFNBQVYsQ0FBYjtBQUNBLFVBQU13QixJQUFJLEdBQUc7QUFBQ1gsTUFBQUEsU0FBRDtBQUFZRCxNQUFBQSxRQUFaO0FBQXNCYSxNQUFBQSxJQUFJLEVBQUU7QUFBNUIsS0FBYjtBQUNBLFVBQU1ILElBQUksQ0FBQ1osWUFBTCxDQUFrQixNQUFNZ0IsR0FBTixJQUFhO0FBQ25DLFlBQU07QUFBQ0MsUUFBQUEsSUFBRDtBQUFPRixRQUFBQTtBQUFQLFVBQWUsTUFBTSxzQkFBUUMsR0FBUixFQUFhYixTQUFiLEVBQXdCRCxRQUF4QixFQUFrQ1YsTUFBbEMsQ0FBM0I7QUFDQSxVQUFJRSxJQUFJLENBQUN1QixJQUFELENBQVIsRUFBZ0IsTUFBTyxTQUFRQSxJQUFLLGNBQXBCO0FBQ2hCdkIsTUFBQUEsSUFBSSxDQUFDdUIsSUFBRCxDQUFKLEdBQWFGLElBQWI7QUFDQUQsTUFBQUEsSUFBSSxDQUFDQyxJQUFMLENBQVVHLElBQVYsQ0FBZUQsSUFBZjtBQUNELEtBTEssQ0FBTjtBQU1BdEIsSUFBQUEsS0FBSyxDQUFDdUIsSUFBTixDQUFXSixJQUFYO0FBQ0QsR0FkSyxDQUFOO0FBZUEsU0FBTztBQUNMcEIsSUFBQUEsSUFESztBQUNDQyxJQUFBQTtBQURELEdBQVA7QUFHRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnYXJyYXktZm9yZWFjaC1hc3luYydcbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gJ2ZzLWV4dHJhJ1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgZ2V0RmlsZVN0cnVjdHVyZSBmcm9tICcuL2dldEZpbGVTdHJ1Y3R1cmUnXG5pbXBvcnQgeyBtYWtlTGliIH0gZnJvbSAnLi9tYWtlTGliJ1xuXG5jb25zdCBuZXdSZWdFeHAgPSAvXFxuKD89XFwvXFwvIEBuZXcoPzogLispPykvXG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIG1ha2VMaWJyYXJpZXMgKGNvbmZpZykge1xuICBjb25zdCB7bWFpbn0gPSBnZXRGaWxlU3RydWN0dXJlKGNvbmZpZylcbiAgY29uc3QgbGlicyA9IHt9XG4gIGNvbnN0IGZpbGVzID0gW11cbiAgLy9cbiAgY29uc3QgbGliRmlsZXMgPSBtYWluLmZpbHRlcihlbCA9PiAhZWxbMV0ubWF0Y2goL18uKiQvKSlcbiAgLy8gbGlicmFyeSBmaWxlc1xuICBhd2FpdCBsaWJGaWxlcy5mb3JFYWNoQXN5bmMoYXN5bmMgKFtuYW1lc3BhY2VMaXN0LCBmaWxlbmFtZV0pID0+IHtcbiAgICBjb25zdCBuYW1lc3BhY2UgPSBuYW1lc3BhY2VMaXN0LmpvaW4oJy8nKVxuICAgIGNvbnN0IHBhdGggPSByZXNvbHZlKHByb2Nlc3MuY3dkKCksXG4gICAgICBjb25maWcuV29ya2luZ0RpciwgY29uZmlnLlNyY0RpciwgbmFtZXNwYWNlLCBmaWxlbmFtZSlcbiAgICBjb25zdCByYXcgPSByZWFkRmlsZVN5bmMocGF0aCkudG9TdHJpbmcoKVxuICAgIGNvbnN0IG9sZHMgPSByYXcuc3BsaXQobmV3UmVnRXhwKVxuICAgIGNvbnN0IGZpbGUgPSB7bmFtZXNwYWNlLCBmaWxlbmFtZSwgZGF0YTogW119XG4gICAgYXdhaXQgb2xkcy5mb3JFYWNoQXN5bmMoYXN5bmMgb2xkID0+IHtcbiAgICAgIGNvbnN0IHtuYW1lLCBkYXRhfSA9IGF3YWl0IG1ha2VMaWIob2xkLCBuYW1lc3BhY2UsIGZpbGVuYW1lLCBjb25maWcpXG4gICAgICBpZiAobGlic1tuYW1lXSkgdGhyb3cgYG5hbWUgXCIke25hbWV9XCIgZHVwbGljYXRlc2BcbiAgICAgIGxpYnNbbmFtZV0gPSBkYXRhXG4gICAgICBmaWxlLmRhdGEucHVzaChuYW1lKVxuICAgIH0pXG4gICAgZmlsZXMucHVzaChmaWxlKVxuICB9KVxuICByZXR1cm4ge1xuICAgIGxpYnMsIGZpbGVzXG4gIH1cbn1cbiJdfQ==