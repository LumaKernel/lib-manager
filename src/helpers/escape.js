export const mdEscape = code => code.replace(/\{\{/g, '{{"{{"}}')
export const quoteEscape = str => str.replace(/\\/, '\\\\').replace(/"/, '\\"')
