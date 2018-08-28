// ```が含まれているときにどうしようもない
export const mdEscape = str => str.replace(/\{\{/g, '{{"{{"}}')
export const mdTitleEscape = str => mdEscape(
  str
    .replace(/\|/g, '\\|') // kramdown特化 // どうしようもない
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
)
export const quoteEscape = str => str.replace(/\\/, '\\\\').replace(/"/, '\\"')
