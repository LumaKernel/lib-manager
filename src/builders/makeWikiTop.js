import { mdEscape, mdTitleEscape, quoteEscape } from '../helpers/escape'

export default function makeWikiTop (topRaw, wikis, lastUpdate) {
  const wikiList0 = []
  wikis = makeList(wikis, wikiList0)
  const wikiList = [wikiList0[0]]
  for (let i = 1; i < wikiList0.length; i++) {
    if (wikiList0[i - 1].type !== 'dir' && wikiList0[i].type !== 'dir');
    else {
      wikiList.push('line')
    }
    wikiList.push(wikiList0[i])
  }
  const content = wikiList.map(el => {
    if (el === 'line') {
      return ''
    } else {
      const title = el.permalink
        ? `[${mdTitleEscape(el.title)}]({{ "${quoteEscape(el.permalink)}" | relative_url }})`
        : mdEscape(el.title)
      return mark(el.depth, el.type) + ' ' + title
    }
  }).join('\n')
  return topRaw
    .replace(/###content###/g, content)
    .replace(/###last_update###/g, mdEscape(lastUpdate))
}

// dfs
function makeList (wikis, wikiList, depth = 0) {
  if (depth) {
    wikiList.push({
      depth,
      type: wikis.type,
      title: wikis.title,
      permalink: wikis.wiki && wikis.permalink,
    })
  }
  if (wikis.child) {
    wikis.child.forEach(child => {
      makeList(child, wikiList, depth + 1)
    })
  }
}

function mark (depth, type) {
  switch (type) {
    case 'dir':
      return '#'.repeat(depth)
    case 'one':
    case 'lib':
      return '*'
  }
}
