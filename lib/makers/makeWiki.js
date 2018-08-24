"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeWiki;

require("source-map-support/register");

var _fsExtra = require("fs-extra");

var _jsYaml = _interopRequireDefault(require("js-yaml"));

var _path = require("path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeWiki(config, nowdir = null, path = '') {
  if (nowdir === null) nowdir = (0, _path.resolve)(process.cwd(), config.WorkingDir, config.SrcDir);
  const wiki = {};
  const wikiYAML = (0, _path.resolve)(nowdir, 'wiki.yml');
  if (!(0, _fsExtra.existsSync)(wikiYAML)) return false;
  const wikiData = {
    type: 'dir',
    order: [],
    ..._jsYaml.default.safeLoad((0, _fsExtra.readFileSync)(wikiYAML).toString())
  };
  wiki.type = wikiData.type;
  if (wikiData.title) wiki.title = wikiData.title;
  if (wikiData.permalink) wiki.permalink = wikiData.permalink;
  wiki.path = path;
  if (Array.isArray(typeof wikiData.orde)) throw `${nowdir} : order must be array`;
  const wikipage = (0, _path.resolve)(nowdir, 'wiki.md');
  if ((0, _fsExtra.existsSync)(wikipage)) wiki.wiki = (0, _fsExtra.readFileSync)(wikipage).toString();
  const child = [];
  wikiData.order.forEach(el => {
    const mdfile = (0, _path.resolve)(nowdir, el + '.md');
    const newdir = (0, _path.resolve)(nowdir, el);

    if ((0, _fsExtra.existsSync)(mdfile)) {
      child.push({
        path: el,
        type: 'lib',
        wiki: (0, _fsExtra.readFileSync)(mdfile).toString()
      });
    } else if ((0, _fsExtra.existsSync)(newdir)) {
      const d = makeWiki(config, newdir, el);
      if (d) child.push(d);
    } else {
      throw `${nowdir} : not found ${mdfile} and ${newdir}/`;
    }
  });
  wiki.child = child;
  return wiki;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWtlcnMvbWFrZVdpa2kuanMiXSwibmFtZXMiOlsibWFrZVdpa2kiLCJjb25maWciLCJub3dkaXIiLCJwYXRoIiwicHJvY2VzcyIsImN3ZCIsIldvcmtpbmdEaXIiLCJTcmNEaXIiLCJ3aWtpIiwid2lraVlBTUwiLCJ3aWtpRGF0YSIsInR5cGUiLCJvcmRlciIsInlhbWwiLCJzYWZlTG9hZCIsInRvU3RyaW5nIiwidGl0bGUiLCJwZXJtYWxpbmsiLCJBcnJheSIsImlzQXJyYXkiLCJvcmRlIiwid2lraXBhZ2UiLCJjaGlsZCIsImZvckVhY2giLCJlbCIsIm1kZmlsZSIsIm5ld2RpciIsInB1c2giLCJkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7OztBQUVlLFNBQVNBLFFBQVQsQ0FBbUJDLE1BQW5CLEVBQTJCQyxNQUFNLEdBQUcsSUFBcEMsRUFBMENDLElBQUksR0FBRyxFQUFqRCxFQUFxRDtBQUNsRSxNQUFJRCxNQUFNLEtBQUssSUFBZixFQUFxQkEsTUFBTSxHQUFHLG1CQUFRRSxPQUFPLENBQUNDLEdBQVIsRUFBUixFQUF1QkosTUFBTSxDQUFDSyxVQUE5QixFQUEwQ0wsTUFBTSxDQUFDTSxNQUFqRCxDQUFUO0FBQ3JCLFFBQU1DLElBQUksR0FBRyxFQUFiO0FBQ0EsUUFBTUMsUUFBUSxHQUFHLG1CQUFRUCxNQUFSLEVBQWdCLFVBQWhCLENBQWpCO0FBQ0EsTUFBSSxDQUFDLHlCQUFXTyxRQUFYLENBQUwsRUFBMkIsT0FBTyxLQUFQO0FBQzNCLFFBQU1DLFFBQVEsR0FBRztBQUNmQyxJQUFBQSxJQUFJLEVBQUUsS0FEUztBQUVmQyxJQUFBQSxLQUFLLEVBQUUsRUFGUTtBQUdmLE9BQUdDLGdCQUFLQyxRQUFMLENBQWMsMkJBQWFMLFFBQWIsRUFBdUJNLFFBQXZCLEVBQWQ7QUFIWSxHQUFqQjtBQUtBUCxFQUFBQSxJQUFJLENBQUNHLElBQUwsR0FBWUQsUUFBUSxDQUFDQyxJQUFyQjtBQUNBLE1BQUlELFFBQVEsQ0FBQ00sS0FBYixFQUFvQlIsSUFBSSxDQUFDUSxLQUFMLEdBQWFOLFFBQVEsQ0FBQ00sS0FBdEI7QUFDcEIsTUFBSU4sUUFBUSxDQUFDTyxTQUFiLEVBQXdCVCxJQUFJLENBQUNTLFNBQUwsR0FBaUJQLFFBQVEsQ0FBQ08sU0FBMUI7QUFDeEJULEVBQUFBLElBQUksQ0FBQ0wsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsTUFBSWUsS0FBSyxDQUFDQyxPQUFOLENBQWMsT0FBT1QsUUFBUSxDQUFDVSxJQUE5QixDQUFKLEVBQXlDLE1BQU8sR0FBRWxCLE1BQU8sd0JBQWhCO0FBQ3pDLFFBQU1tQixRQUFRLEdBQUcsbUJBQVFuQixNQUFSLEVBQWdCLFNBQWhCLENBQWpCO0FBQ0EsTUFBSSx5QkFBV21CLFFBQVgsQ0FBSixFQUEwQmIsSUFBSSxDQUFDQSxJQUFMLEdBQVksMkJBQWFhLFFBQWIsRUFBdUJOLFFBQXZCLEVBQVo7QUFDMUIsUUFBTU8sS0FBSyxHQUFHLEVBQWQ7QUFDQVosRUFBQUEsUUFBUSxDQUFDRSxLQUFULENBQWVXLE9BQWYsQ0FBdUJDLEVBQUUsSUFBSTtBQUMzQixVQUFNQyxNQUFNLEdBQUcsbUJBQVF2QixNQUFSLEVBQWdCc0IsRUFBRSxHQUFHLEtBQXJCLENBQWY7QUFDQSxVQUFNRSxNQUFNLEdBQUcsbUJBQVF4QixNQUFSLEVBQWdCc0IsRUFBaEIsQ0FBZjs7QUFDQSxRQUFJLHlCQUFXQyxNQUFYLENBQUosRUFBd0I7QUFDdEJILE1BQUFBLEtBQUssQ0FBQ0ssSUFBTixDQUFXO0FBQ1R4QixRQUFBQSxJQUFJLEVBQUVxQixFQURHO0FBRVRiLFFBQUFBLElBQUksRUFBRSxLQUZHO0FBR1RILFFBQUFBLElBQUksRUFBRSwyQkFBYWlCLE1BQWIsRUFBcUJWLFFBQXJCO0FBSEcsT0FBWDtBQUtELEtBTkQsTUFNTyxJQUFJLHlCQUFXVyxNQUFYLENBQUosRUFBd0I7QUFDN0IsWUFBTUUsQ0FBQyxHQUFHNUIsUUFBUSxDQUFDQyxNQUFELEVBQVN5QixNQUFULEVBQWlCRixFQUFqQixDQUFsQjtBQUNBLFVBQUlJLENBQUosRUFBT04sS0FBSyxDQUFDSyxJQUFOLENBQVdDLENBQVg7QUFDUixLQUhNLE1BR0E7QUFDTCxZQUFPLEdBQUUxQixNQUFPLGdCQUFldUIsTUFBTyxRQUFPQyxNQUFPLEdBQXBEO0FBQ0Q7QUFDRixHQWZEO0FBZ0JBbEIsRUFBQUEsSUFBSSxDQUFDYyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFPZCxJQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleGlzdHNTeW5jLCByZWFkRmlsZVN5bmMgfSBmcm9tICdmcy1leHRyYSdcbmltcG9ydCB5YW1sIGZyb20gJ2pzLXlhbWwnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZVdpa2kgKGNvbmZpZywgbm93ZGlyID0gbnVsbCwgcGF0aCA9ICcnKSB7XG4gIGlmIChub3dkaXIgPT09IG51bGwpIG5vd2RpciA9IHJlc29sdmUocHJvY2Vzcy5jd2QoKSwgY29uZmlnLldvcmtpbmdEaXIsIGNvbmZpZy5TcmNEaXIpXG4gIGNvbnN0IHdpa2kgPSB7fVxuICBjb25zdCB3aWtpWUFNTCA9IHJlc29sdmUobm93ZGlyLCAnd2lraS55bWwnKVxuICBpZiAoIWV4aXN0c1N5bmMod2lraVlBTUwpKSByZXR1cm4gZmFsc2VcbiAgY29uc3Qgd2lraURhdGEgPSB7XG4gICAgdHlwZTogJ2RpcicsXG4gICAgb3JkZXI6IFtdLFxuICAgIC4uLnlhbWwuc2FmZUxvYWQocmVhZEZpbGVTeW5jKHdpa2lZQU1MKS50b1N0cmluZygpKSxcbiAgfVxuICB3aWtpLnR5cGUgPSB3aWtpRGF0YS50eXBlXG4gIGlmICh3aWtpRGF0YS50aXRsZSkgd2lraS50aXRsZSA9IHdpa2lEYXRhLnRpdGxlXG4gIGlmICh3aWtpRGF0YS5wZXJtYWxpbmspIHdpa2kucGVybWFsaW5rID0gd2lraURhdGEucGVybWFsaW5rXG4gIHdpa2kucGF0aCA9IHBhdGhcbiAgaWYgKEFycmF5LmlzQXJyYXkodHlwZW9mIHdpa2lEYXRhLm9yZGUpKSB0aHJvdyBgJHtub3dkaXJ9IDogb3JkZXIgbXVzdCBiZSBhcnJheWBcbiAgY29uc3Qgd2lraXBhZ2UgPSByZXNvbHZlKG5vd2RpciwgJ3dpa2kubWQnKVxuICBpZiAoZXhpc3RzU3luYyh3aWtpcGFnZSkpIHdpa2kud2lraSA9IHJlYWRGaWxlU3luYyh3aWtpcGFnZSkudG9TdHJpbmcoKVxuICBjb25zdCBjaGlsZCA9IFtdXG4gIHdpa2lEYXRhLm9yZGVyLmZvckVhY2goZWwgPT4ge1xuICAgIGNvbnN0IG1kZmlsZSA9IHJlc29sdmUobm93ZGlyLCBlbCArICcubWQnKVxuICAgIGNvbnN0IG5ld2RpciA9IHJlc29sdmUobm93ZGlyLCBlbClcbiAgICBpZiAoZXhpc3RzU3luYyhtZGZpbGUpKSB7XG4gICAgICBjaGlsZC5wdXNoKHtcbiAgICAgICAgcGF0aDogZWwsXG4gICAgICAgIHR5cGU6ICdsaWInLFxuICAgICAgICB3aWtpOiByZWFkRmlsZVN5bmMobWRmaWxlKS50b1N0cmluZygpLFxuICAgICAgfSlcbiAgICB9IGVsc2UgaWYgKGV4aXN0c1N5bmMobmV3ZGlyKSkge1xuICAgICAgY29uc3QgZCA9IG1ha2VXaWtpKGNvbmZpZywgbmV3ZGlyLCBlbClcbiAgICAgIGlmIChkKSBjaGlsZC5wdXNoKGQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGAke25vd2Rpcn0gOiBub3QgZm91bmQgJHttZGZpbGV9IGFuZCAke25ld2Rpcn0vYFxuICAgIH1cbiAgfSlcbiAgd2lraS5jaGlsZCA9IGNoaWxkXG4gIHJldHVybiB3aWtpXG59XG4iXX0=