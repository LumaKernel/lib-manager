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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWtlcnMvbWFrZUxpYnJhcmllcy5qcyJdLCJuYW1lcyI6WyJuZXdSZWdFeHAiLCJtYWtlTGlicmFyaWVzIiwiY29uZmlnIiwibWFpbiIsImxpYnMiLCJmaWxlcyIsImxpYkZpbGVzIiwiZmlsdGVyIiwiZWwiLCJtYXRjaCIsImZvckVhY2hBc3luYyIsIm5hbWVzcGFjZUxpc3QiLCJmaWxlbmFtZSIsIm5hbWVzcGFjZSIsImpvaW4iLCJwYXRoIiwicHJvY2VzcyIsImN3ZCIsIldvcmtpbmdEaXIiLCJTcmNEaXIiLCJyYXciLCJ0b1N0cmluZyIsInJlcGxhY2UiLCJvbGRzIiwic3BsaXQiLCJmaWxlIiwiZGF0YSIsIm9sZCIsIm5hbWUiLCJwdXNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU1BLFNBQVMsR0FBRyx5QkFBbEI7O0FBRWUsZUFBZUMsYUFBZixDQUE4QkMsTUFBOUIsRUFBc0M7QUFDbkQsUUFBTTtBQUFDQyxJQUFBQTtBQUFELE1BQVMsK0JBQWlCRCxNQUFqQixDQUFmO0FBQ0EsUUFBTUUsSUFBSSxHQUFHLEVBQWI7QUFDQSxRQUFNQyxLQUFLLEdBQUcsRUFBZCxDQUhtRCxDQUluRDs7QUFDQSxRQUFNQyxRQUFRLEdBQUdILElBQUksQ0FBQ0ksTUFBTCxDQUFZQyxFQUFFLElBQUksQ0FBQ0EsRUFBRSxDQUFDLENBQUQsQ0FBRixDQUFNQyxLQUFOLENBQVksTUFBWixDQUFuQixDQUFqQixDQUxtRCxDQU1uRDs7QUFDQSxRQUFNSCxRQUFRLENBQUNJLFlBQVQsQ0FBc0IsT0FBTyxDQUFDQyxhQUFELEVBQWdCQyxRQUFoQixDQUFQLEtBQXFDO0FBQy9ELFVBQU1DLFNBQVMsR0FBR0YsYUFBYSxDQUFDRyxJQUFkLENBQW1CLEdBQW5CLENBQWxCO0FBQ0EsVUFBTUMsSUFBSSxHQUFHLG1CQUFRQyxPQUFPLENBQUNDLEdBQVIsRUFBUixFQUNYZixNQUFNLENBQUNnQixVQURJLEVBQ1FoQixNQUFNLENBQUNpQixNQURmLEVBQ3VCTixTQUR2QixFQUNrQ0QsUUFEbEMsQ0FBYjtBQUVBLFVBQU1RLEdBQUcsR0FBRywyQkFBYUwsSUFBYixFQUFtQk0sUUFBbkIsR0FBOEJDLE9BQTlCLENBQXNDLFFBQXRDLEVBQWdELElBQWhELENBQVo7QUFDQSxVQUFNQyxJQUFJLEdBQUdILEdBQUcsQ0FBQ0ksS0FBSixDQUFVeEIsU0FBVixDQUFiO0FBQ0EsVUFBTXlCLElBQUksR0FBRztBQUFDWixNQUFBQSxTQUFEO0FBQVlELE1BQUFBLFFBQVo7QUFBc0JjLE1BQUFBLElBQUksRUFBRTtBQUE1QixLQUFiO0FBQ0EsVUFBTUgsSUFBSSxDQUFDYixZQUFMLENBQWtCLE1BQU1pQixHQUFOLElBQWE7QUFDbkMsWUFBTTtBQUFDQyxRQUFBQSxJQUFEO0FBQU9GLFFBQUFBO0FBQVAsVUFBZSxNQUFNLHNCQUFRQyxHQUFSLEVBQWFkLFNBQWIsRUFBd0JELFFBQXhCLEVBQWtDVixNQUFsQyxDQUEzQjtBQUNBLFVBQUlFLElBQUksQ0FBQ3dCLElBQUQsQ0FBUixFQUFnQixNQUFPLFNBQVFBLElBQUssY0FBcEI7QUFDaEJ4QixNQUFBQSxJQUFJLENBQUN3QixJQUFELENBQUosR0FBYUYsSUFBYjtBQUNBRCxNQUFBQSxJQUFJLENBQUNDLElBQUwsQ0FBVUcsSUFBVixDQUFlRCxJQUFmO0FBQ0QsS0FMSyxDQUFOO0FBTUF2QixJQUFBQSxLQUFLLENBQUN3QixJQUFOLENBQVdKLElBQVg7QUFDRCxHQWRLLENBQU47QUFlQSxTQUFPO0FBQ0xyQixJQUFBQSxJQURLO0FBQ0NDLElBQUFBO0FBREQsR0FBUDtBQUdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdhcnJheS1mb3JlYWNoLWFzeW5jJ1xyXG5pbXBvcnQgeyByZWFkRmlsZVN5bmMgfSBmcm9tICdmcy1leHRyYSdcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXHJcbmltcG9ydCBnZXRGaWxlU3RydWN0dXJlIGZyb20gJy4vZ2V0RmlsZVN0cnVjdHVyZSdcclxuaW1wb3J0IHsgbWFrZUxpYiB9IGZyb20gJy4vbWFrZUxpYidcclxuXHJcbmNvbnN0IG5ld1JlZ0V4cCA9IC9cXG4oPz1cXC9cXC8gQG5ldyg/OiAuKyk/KS9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIG1ha2VMaWJyYXJpZXMgKGNvbmZpZykge1xyXG4gIGNvbnN0IHttYWlufSA9IGdldEZpbGVTdHJ1Y3R1cmUoY29uZmlnKVxyXG4gIGNvbnN0IGxpYnMgPSB7fVxyXG4gIGNvbnN0IGZpbGVzID0gW11cclxuICAvL1xyXG4gIGNvbnN0IGxpYkZpbGVzID0gbWFpbi5maWx0ZXIoZWwgPT4gIWVsWzFdLm1hdGNoKC9fLiokLykpXHJcbiAgLy8gbGlicmFyeSBmaWxlc1xyXG4gIGF3YWl0IGxpYkZpbGVzLmZvckVhY2hBc3luYyhhc3luYyAoW25hbWVzcGFjZUxpc3QsIGZpbGVuYW1lXSkgPT4ge1xyXG4gICAgY29uc3QgbmFtZXNwYWNlID0gbmFtZXNwYWNlTGlzdC5qb2luKCcvJylcclxuICAgIGNvbnN0IHBhdGggPSByZXNvbHZlKHByb2Nlc3MuY3dkKCksXHJcbiAgICAgIGNvbmZpZy5Xb3JraW5nRGlyLCBjb25maWcuU3JjRGlyLCBuYW1lc3BhY2UsIGZpbGVuYW1lKVxyXG4gICAgY29uc3QgcmF3ID0gcmVhZEZpbGVTeW5jKHBhdGgpLnRvU3RyaW5nKCkucmVwbGFjZSgvXFxyXFxuPy9nLCAnXFxuJylcclxuICAgIGNvbnN0IG9sZHMgPSByYXcuc3BsaXQobmV3UmVnRXhwKVxyXG4gICAgY29uc3QgZmlsZSA9IHtuYW1lc3BhY2UsIGZpbGVuYW1lLCBkYXRhOiBbXX1cclxuICAgIGF3YWl0IG9sZHMuZm9yRWFjaEFzeW5jKGFzeW5jIG9sZCA9PiB7XHJcbiAgICAgIGNvbnN0IHtuYW1lLCBkYXRhfSA9IGF3YWl0IG1ha2VMaWIob2xkLCBuYW1lc3BhY2UsIGZpbGVuYW1lLCBjb25maWcpXHJcbiAgICAgIGlmIChsaWJzW25hbWVdKSB0aHJvdyBgbmFtZSBcIiR7bmFtZX1cIiBkdXBsaWNhdGVzYFxyXG4gICAgICBsaWJzW25hbWVdID0gZGF0YVxyXG4gICAgICBmaWxlLmRhdGEucHVzaChuYW1lKVxyXG4gICAgfSlcclxuICAgIGZpbGVzLnB1c2goZmlsZSlcclxuICB9KVxyXG4gIHJldHVybiB7XHJcbiAgICBsaWJzLCBmaWxlc1xyXG4gIH1cclxufVxyXG4iXX0=