'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = makeWiki;

require('source-map-support/register');

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { cat, test } = _shelljs2.default;
const { resolve } = _path2.default;

function makeWiki(config, nowdir = null, path = '') {
  if (nowdir === null) nowdir = resolve(process.cwd(), config.WorkingDir, config.SrcDir);
  const wiki = {};
  const wikiYAML = resolve(nowdir, 'wiki.yml');
  if (!test('-e', wikiYAML)) return false;
  const wikiData = _extends({
    type: 'dir',
    order: []
  }, _jsYaml2.default.safeLoad(cat(wikiYAML).stdout));
  wiki.type = wikiData.type;
  if (wikiData.title) wiki.title = wikiData.title;
  if (wikiData.permalink) wiki.permalink = wikiData.permalink;
  wiki.path = path;
  if (Array.isArray(typeof wikiData.orde)) throw `${nowdir} : order must be array`;
  const wikipage = resolve(nowdir, 'wiki.md');
  if (test('-e', wikipage)) wiki.wiki = cat(wikipage).stdout;
  const child = [];
  wikiData.order.forEach(el => {
    const mdfile = resolve(nowdir, el + '.md');
    const newdir = resolve(nowdir, el);
    if (test('-e', mdfile)) {
      child.push({
        path: el,
        type: 'lib',
        wiki: cat(mdfile).stdout
      });
    } else if (test('-e', newdir)) {
      const d = makeWiki(config, newdir, el);
      if (d) child.push(d);
    } else {
      throw `${nowdir} : not found ${mdfile} and ${newdir}/`;
    }
  });
  wiki.child = child;
  return wiki;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWtlcnMvbWFrZVdpa2kuanMiXSwibmFtZXMiOlsibWFrZVdpa2kiLCJjYXQiLCJ0ZXN0Iiwic2hlbGxqcyIsInJlc29sdmUiLCJwYXRoIiwiY29uZmlnIiwibm93ZGlyIiwicHJvY2VzcyIsImN3ZCIsIldvcmtpbmdEaXIiLCJTcmNEaXIiLCJ3aWtpIiwid2lraVlBTUwiLCJ3aWtpRGF0YSIsInR5cGUiLCJvcmRlciIsInlhbWwiLCJzYWZlTG9hZCIsInN0ZG91dCIsInRpdGxlIiwicGVybWFsaW5rIiwiQXJyYXkiLCJpc0FycmF5Iiwib3JkZSIsIndpa2lwYWdlIiwiY2hpbGQiLCJmb3JFYWNoIiwiZWwiLCJtZGZpbGUiLCJuZXdkaXIiLCJwdXNoIiwiZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0JBTXdCQSxROzs7O0FBTnhCOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBQ0EsTUFBTSxFQUFDQyxHQUFELEVBQU1DLElBQU4sS0FBY0MsaUJBQXBCO0FBQ0EsTUFBTSxFQUFDQyxPQUFELEtBQVlDLGNBQWxCOztBQUVlLFNBQVNMLFFBQVQsQ0FBbUJNLE1BQW5CLEVBQTJCQyxTQUFTLElBQXBDLEVBQTBDRixPQUFPLEVBQWpELEVBQXFEO0FBQ2xFLE1BQUlFLFdBQVcsSUFBZixFQUFxQkEsU0FBU0gsUUFBUUksUUFBUUMsR0FBUixFQUFSLEVBQXVCSCxPQUFPSSxVQUE5QixFQUEwQ0osT0FBT0ssTUFBakQsQ0FBVDtBQUNyQixRQUFNQyxPQUFPLEVBQWI7QUFDQSxRQUFNQyxXQUFXVCxRQUFRRyxNQUFSLEVBQWdCLFVBQWhCLENBQWpCO0FBQ0EsTUFBSSxDQUFDTCxLQUFLLElBQUwsRUFBV1csUUFBWCxDQUFMLEVBQTJCLE9BQU8sS0FBUDtBQUMzQixRQUFNQztBQUNKQyxVQUFNLEtBREY7QUFFSkMsV0FBTztBQUZILEtBR0RDLGlCQUFLQyxRQUFMLENBQWNqQixJQUFJWSxRQUFKLEVBQWNNLE1BQTVCLENBSEMsQ0FBTjtBQUtBUCxPQUFLRyxJQUFMLEdBQVlELFNBQVNDLElBQXJCO0FBQ0EsTUFBSUQsU0FBU00sS0FBYixFQUFvQlIsS0FBS1EsS0FBTCxHQUFhTixTQUFTTSxLQUF0QjtBQUNwQixNQUFJTixTQUFTTyxTQUFiLEVBQXdCVCxLQUFLUyxTQUFMLEdBQWlCUCxTQUFTTyxTQUExQjtBQUN4QlQsT0FBS1AsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsTUFBSWlCLE1BQU1DLE9BQU4sQ0FBYyxPQUFPVCxTQUFTVSxJQUE5QixDQUFKLEVBQXlDLE1BQU8sR0FBRWpCLE1BQU8sd0JBQWhCO0FBQ3pDLFFBQU1rQixXQUFXckIsUUFBUUcsTUFBUixFQUFnQixTQUFoQixDQUFqQjtBQUNBLE1BQUlMLEtBQUssSUFBTCxFQUFXdUIsUUFBWCxDQUFKLEVBQTBCYixLQUFLQSxJQUFMLEdBQVlYLElBQUl3QixRQUFKLEVBQWNOLE1BQTFCO0FBQzFCLFFBQU1PLFFBQVEsRUFBZDtBQUNBWixXQUFTRSxLQUFULENBQWVXLE9BQWYsQ0FBdUJDLE1BQU07QUFDM0IsVUFBTUMsU0FBU3pCLFFBQVFHLE1BQVIsRUFBZ0JxQixLQUFLLEtBQXJCLENBQWY7QUFDQSxVQUFNRSxTQUFTMUIsUUFBUUcsTUFBUixFQUFnQnFCLEVBQWhCLENBQWY7QUFDQSxRQUFJMUIsS0FBSyxJQUFMLEVBQVcyQixNQUFYLENBQUosRUFBd0I7QUFDdEJILFlBQU1LLElBQU4sQ0FBVztBQUNUMUIsY0FBTXVCLEVBREc7QUFFVGIsY0FBTSxLQUZHO0FBR1RILGNBQU1YLElBQUk0QixNQUFKLEVBQVlWO0FBSFQsT0FBWDtBQUtELEtBTkQsTUFNTyxJQUFJakIsS0FBSyxJQUFMLEVBQVc0QixNQUFYLENBQUosRUFBd0I7QUFDN0IsWUFBTUUsSUFBSWhDLFNBQVNNLE1BQVQsRUFBaUJ3QixNQUFqQixFQUF5QkYsRUFBekIsQ0FBVjtBQUNBLFVBQUlJLENBQUosRUFBT04sTUFBTUssSUFBTixDQUFXQyxDQUFYO0FBQ1IsS0FITSxNQUdBO0FBQ0wsWUFBTyxHQUFFekIsTUFBTyxnQkFBZXNCLE1BQU8sUUFBT0MsTUFBTyxHQUFwRDtBQUNEO0FBQ0YsR0FmRDtBQWdCQWxCLE9BQUtjLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQU9kLElBQVA7QUFDRCIsImZpbGUiOiJtYWtlV2lraS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB5YW1sIGZyb20gJ2pzLXlhbWwnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHNoZWxsanMgZnJvbSAnc2hlbGxqcydcbmNvbnN0IHtjYXQsIHRlc3R9ID0gc2hlbGxqc1xuY29uc3Qge3Jlc29sdmV9ID0gcGF0aFxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWtlV2lraSAoY29uZmlnLCBub3dkaXIgPSBudWxsLCBwYXRoID0gJycpIHtcbiAgaWYgKG5vd2RpciA9PT0gbnVsbCkgbm93ZGlyID0gcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBjb25maWcuV29ya2luZ0RpciwgY29uZmlnLlNyY0RpcilcbiAgY29uc3Qgd2lraSA9IHt9XG4gIGNvbnN0IHdpa2lZQU1MID0gcmVzb2x2ZShub3dkaXIsICd3aWtpLnltbCcpXG4gIGlmICghdGVzdCgnLWUnLCB3aWtpWUFNTCkpIHJldHVybiBmYWxzZVxuICBjb25zdCB3aWtpRGF0YSA9IHtcbiAgICB0eXBlOiAnZGlyJyxcbiAgICBvcmRlcjogW10sXG4gICAgLi4ueWFtbC5zYWZlTG9hZChjYXQod2lraVlBTUwpLnN0ZG91dCksXG4gIH1cbiAgd2lraS50eXBlID0gd2lraURhdGEudHlwZVxuICBpZiAod2lraURhdGEudGl0bGUpIHdpa2kudGl0bGUgPSB3aWtpRGF0YS50aXRsZVxuICBpZiAod2lraURhdGEucGVybWFsaW5rKSB3aWtpLnBlcm1hbGluayA9IHdpa2lEYXRhLnBlcm1hbGlua1xuICB3aWtpLnBhdGggPSBwYXRoXG4gIGlmIChBcnJheS5pc0FycmF5KHR5cGVvZiB3aWtpRGF0YS5vcmRlKSkgdGhyb3cgYCR7bm93ZGlyfSA6IG9yZGVyIG11c3QgYmUgYXJyYXlgXG4gIGNvbnN0IHdpa2lwYWdlID0gcmVzb2x2ZShub3dkaXIsICd3aWtpLm1kJylcbiAgaWYgKHRlc3QoJy1lJywgd2lraXBhZ2UpKSB3aWtpLndpa2kgPSBjYXQod2lraXBhZ2UpLnN0ZG91dFxuICBjb25zdCBjaGlsZCA9IFtdXG4gIHdpa2lEYXRhLm9yZGVyLmZvckVhY2goZWwgPT4ge1xuICAgIGNvbnN0IG1kZmlsZSA9IHJlc29sdmUobm93ZGlyLCBlbCArICcubWQnKVxuICAgIGNvbnN0IG5ld2RpciA9IHJlc29sdmUobm93ZGlyLCBlbClcbiAgICBpZiAodGVzdCgnLWUnLCBtZGZpbGUpKSB7XG4gICAgICBjaGlsZC5wdXNoKHtcbiAgICAgICAgcGF0aDogZWwsXG4gICAgICAgIHR5cGU6ICdsaWInLFxuICAgICAgICB3aWtpOiBjYXQobWRmaWxlKS5zdGRvdXQsXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZiAodGVzdCgnLWUnLCBuZXdkaXIpKSB7XG4gICAgICBjb25zdCBkID0gbWFrZVdpa2koY29uZmlnLCBuZXdkaXIsIGVsKVxuICAgICAgaWYgKGQpIGNoaWxkLnB1c2goZClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgYCR7bm93ZGlyfSA6IG5vdCBmb3VuZCAke21kZmlsZX0gYW5kICR7bmV3ZGlyfS9gXG4gICAgfVxuICB9KVxuICB3aWtpLmNoaWxkID0gY2hpbGRcbiAgcmV0dXJuIHdpa2lcbn1cbiJdfQ==