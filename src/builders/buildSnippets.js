export function makeSnippet (config, libs) {
  return Object.keys(libs)
    .filter(key => {
      const el = libs[key]
      const snippet = el.data.filter(el => el[0] === 'snippet') || []
      return snippet.length
    }).map(key => {
      const el = libs[key]
      const settings = {};
      ['snippet', 'option'].forEach(opt => {
        const data = el.data.filter(el => el[0] === opt)[0]
        if (data) settings[opt] = data[1]
      })
      const alias = []

      let code = el.code.split('\n')
      code.push('${0}') // eslint-disable-line no-template-curly-in-string
      code = code.map(el => '  ' + el).join('\n') // indent

      const aliasData = el.data.filter(el => el[0] === 'alias') || []
      aliasData.forEach(el => { alias.push(...el[1].split(' ')) })
      if (alias.length) settings.alias = alias.join(' ')
      return (
        Object.entries(settings)
          .map(([key, value]) => key + ' ' + value)
          .join('\n')
      ) + '\n' + code
    }).join('\n\n')
}
