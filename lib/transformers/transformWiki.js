'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = transformWiki;

require('source-map-support/register');

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _escape = require('../helpers/escape');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const libRegExp = name => new RegExp(String.raw`(?<=^|\n)// @ ${name}(?=\n|$)`, 'g');

// dfs
/**
 * 破壊する
 */
function transformWiki(wikiYAML, wikis, libs, paths = []) {
  const namespace = paths.filter(e => e).join('/');
  const lib = Object.values(libs).filter(el => el.namespace === namespace && el.filename === `${wikis.path}.cpp`)[0];
  paths = [...paths, wikis.path];
  const permalink = wikis.permalink || paths.filter(e => e).join('/');
  if (wikis.wiki) {
    Object.entries(libs).forEach(([key, value]) => {
      wikis.wiki = wikis.wiki.replace(libRegExp(key), `${'```cpp'}\n${(0, _escape.mdEscape)(value.code)}\n${'```'}`);
    });
  }
  if (!wikis.title && lib) {
    const title = lib.data.filter(el => el[1] === 'title')[0];
    if (title) wikis.title = title;
  }
  wikis.title = wikis.title || wikis.path;
  wikis.permalink = permalink;
  const data = _extends({}, wikiYAML, {
    permalink,
    title: wikis.title
  });
  if (wikis.wiki) wikis.wiki = `---\n${_jsYaml2.default.safeDump(data)}\n---\n\n${wikis.wiki}`;

  if (wikis.child) {
    wikis.child.forEach(child => {
      transformWiki(wikiYAML, child, libs, paths);
    });
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmFuc2Zvcm1lcnMvdHJhbnNmb3JtV2lraS5qcyJdLCJuYW1lcyI6WyJ0cmFuc2Zvcm1XaWtpIiwibGliUmVnRXhwIiwibmFtZSIsIlJlZ0V4cCIsIlN0cmluZyIsInJhdyIsIndpa2lZQU1MIiwid2lraXMiLCJsaWJzIiwicGF0aHMiLCJuYW1lc3BhY2UiLCJmaWx0ZXIiLCJlIiwiam9pbiIsImxpYiIsIk9iamVjdCIsInZhbHVlcyIsImVsIiwiZmlsZW5hbWUiLCJwYXRoIiwicGVybWFsaW5rIiwid2lraSIsImVudHJpZXMiLCJmb3JFYWNoIiwia2V5IiwidmFsdWUiLCJyZXBsYWNlIiwiY29kZSIsInRpdGxlIiwiZGF0YSIsInlhbWwiLCJzYWZlRHVtcCIsImNoaWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztrQkFVd0JBLGE7Ozs7QUFWeEI7Ozs7QUFDQTs7OztBQUVBLE1BQU1DLFlBQVlDLFFBQVEsSUFBSUMsTUFBSixDQUN4QkMsT0FBT0MsR0FBSSxpQkFBZ0JILElBQUssVUFEUixFQUNtQixHQURuQixDQUExQjs7QUFHQTtBQUNBOzs7QUFHZSxTQUFTRixhQUFULENBQXdCTSxRQUF4QixFQUFrQ0MsS0FBbEMsRUFBeUNDLElBQXpDLEVBQStDQyxRQUFRLEVBQXZELEVBQTJEO0FBQ3hFLFFBQU1DLFlBQVlELE1BQU1FLE1BQU4sQ0FBYUMsS0FBS0EsQ0FBbEIsRUFBcUJDLElBQXJCLENBQTBCLEdBQTFCLENBQWxCO0FBQ0EsUUFBTUMsTUFBTUMsT0FBT0MsTUFBUCxDQUFjUixJQUFkLEVBQ1RHLE1BRFMsQ0FDRk0sTUFBTUEsR0FBR1AsU0FBSCxLQUFpQkEsU0FBakIsSUFDZE8sR0FBR0MsUUFBSCxLQUFpQixHQUFFWCxNQUFNWSxJQUFLLE1BRnBCLEVBRTJCLENBRjNCLENBQVo7QUFHQVYsVUFBUSxDQUFDLEdBQUdBLEtBQUosRUFBV0YsTUFBTVksSUFBakIsQ0FBUjtBQUNBLFFBQU1DLFlBQVliLE1BQU1hLFNBQU4sSUFBbUJYLE1BQU1FLE1BQU4sQ0FBYUMsS0FBS0EsQ0FBbEIsRUFBcUJDLElBQXJCLENBQTBCLEdBQTFCLENBQXJDO0FBQ0EsTUFBSU4sTUFBTWMsSUFBVixFQUFnQjtBQUNkTixXQUFPTyxPQUFQLENBQWVkLElBQWYsRUFBcUJlLE9BQXJCLENBQTZCLENBQUMsQ0FBQ0MsR0FBRCxFQUFNQyxLQUFOLENBQUQsS0FBa0I7QUFDN0NsQixZQUFNYyxJQUFOLEdBQWFkLE1BQU1jLElBQU4sQ0FDVkssT0FEVSxDQUNGekIsVUFBVXVCLEdBQVYsQ0FERSxFQUVSLEdBQUUsUUFBUyxLQUFJLHNCQUFTQyxNQUFNRSxJQUFmLENBQXFCLEtBQUksS0FBTSxFQUZ0QyxDQUFiO0FBR0QsS0FKRDtBQUtEO0FBQ0QsTUFBSSxDQUFDcEIsTUFBTXFCLEtBQVAsSUFBZ0JkLEdBQXBCLEVBQXlCO0FBQ3ZCLFVBQU1jLFFBQVFkLElBQUllLElBQUosQ0FBU2xCLE1BQVQsQ0FBZ0JNLE1BQU1BLEdBQUcsQ0FBSCxNQUFVLE9BQWhDLEVBQXlDLENBQXpDLENBQWQ7QUFDQSxRQUFJVyxLQUFKLEVBQVdyQixNQUFNcUIsS0FBTixHQUFjQSxLQUFkO0FBQ1o7QUFDRHJCLFFBQU1xQixLQUFOLEdBQWNyQixNQUFNcUIsS0FBTixJQUFlckIsTUFBTVksSUFBbkM7QUFDQVosUUFBTWEsU0FBTixHQUFrQkEsU0FBbEI7QUFDQSxRQUFNUyxvQkFDRHZCLFFBREM7QUFFSmMsYUFGSTtBQUdKUSxXQUFPckIsTUFBTXFCO0FBSFQsSUFBTjtBQUtBLE1BQUlyQixNQUFNYyxJQUFWLEVBQWdCZCxNQUFNYyxJQUFOLEdBQWMsUUFBT1MsaUJBQUtDLFFBQUwsQ0FBY0YsSUFBZCxDQUFvQixZQUFXdEIsTUFBTWMsSUFBSyxFQUEvRDs7QUFFaEIsTUFBSWQsTUFBTXlCLEtBQVYsRUFBaUI7QUFDZnpCLFVBQU15QixLQUFOLENBQVlULE9BQVosQ0FBb0JTLFNBQVM7QUFDM0JoQyxvQkFBY00sUUFBZCxFQUF3QjBCLEtBQXhCLEVBQStCeEIsSUFBL0IsRUFBcUNDLEtBQXJDO0FBQ0QsS0FGRDtBQUdEO0FBQ0YiLCJmaWxlIjoidHJhbnNmb3JtV2lraS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB5YW1sIGZyb20gJ2pzLXlhbWwnXG5pbXBvcnQgeyBtZEVzY2FwZSB9IGZyb20gJy4uL2hlbHBlcnMvZXNjYXBlJ1xuXG5jb25zdCBsaWJSZWdFeHAgPSBuYW1lID0+IG5ldyBSZWdFeHAoXG4gIFN0cmluZy5yYXdgKD88PV58XFxuKS8vIEAgJHtuYW1lfSg/PVxcbnwkKWAsICdnJylcblxuLy8gZGZzXG4vKipcbiAqIOegtOWjiuOBmeOCi1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2Zvcm1XaWtpICh3aWtpWUFNTCwgd2lraXMsIGxpYnMsIHBhdGhzID0gW10pIHtcbiAgY29uc3QgbmFtZXNwYWNlID0gcGF0aHMuZmlsdGVyKGUgPT4gZSkuam9pbignLycpXG4gIGNvbnN0IGxpYiA9IE9iamVjdC52YWx1ZXMobGlicylcbiAgICAuZmlsdGVyKGVsID0+IGVsLm5hbWVzcGFjZSA9PT0gbmFtZXNwYWNlICYmXG4gICAgZWwuZmlsZW5hbWUgPT09IGAke3dpa2lzLnBhdGh9LmNwcGApWzBdXG4gIHBhdGhzID0gWy4uLnBhdGhzLCB3aWtpcy5wYXRoXVxuICBjb25zdCBwZXJtYWxpbmsgPSB3aWtpcy5wZXJtYWxpbmsgfHwgcGF0aHMuZmlsdGVyKGUgPT4gZSkuam9pbignLycpXG4gIGlmICh3aWtpcy53aWtpKSB7XG4gICAgT2JqZWN0LmVudHJpZXMobGlicykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICB3aWtpcy53aWtpID0gd2lraXMud2lraVxuICAgICAgICAucmVwbGFjZShsaWJSZWdFeHAoa2V5KSxcbiAgICAgICAgICBgJHsnYGBgY3BwJ31cXG4ke21kRXNjYXBlKHZhbHVlLmNvZGUpfVxcbiR7J2BgYCd9YClcbiAgICB9KVxuICB9XG4gIGlmICghd2lraXMudGl0bGUgJiYgbGliKSB7XG4gICAgY29uc3QgdGl0bGUgPSBsaWIuZGF0YS5maWx0ZXIoZWwgPT4gZWxbMV0gPT09ICd0aXRsZScpWzBdXG4gICAgaWYgKHRpdGxlKSB3aWtpcy50aXRsZSA9IHRpdGxlXG4gIH1cbiAgd2lraXMudGl0bGUgPSB3aWtpcy50aXRsZSB8fCB3aWtpcy5wYXRoXG4gIHdpa2lzLnBlcm1hbGluayA9IHBlcm1hbGlua1xuICBjb25zdCBkYXRhID0ge1xuICAgIC4uLndpa2lZQU1MLFxuICAgIHBlcm1hbGluayxcbiAgICB0aXRsZTogd2lraXMudGl0bGVcbiAgfVxuICBpZiAod2lraXMud2lraSkgd2lraXMud2lraSA9IGAtLS1cXG4ke3lhbWwuc2FmZUR1bXAoZGF0YSl9XFxuLS0tXFxuXFxuJHt3aWtpcy53aWtpfWBcblxuICBpZiAod2lraXMuY2hpbGQpIHtcbiAgICB3aWtpcy5jaGlsZC5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgIHRyYW5zZm9ybVdpa2kod2lraVlBTUwsIGNoaWxkLCBsaWJzLCBwYXRocylcbiAgICB9KVxuICB9XG59XG4iXX0=