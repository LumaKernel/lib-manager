import { mdEscape } from '../helpers/escape'

export default function buildPrintable (printlist, printed, libs) {
  if (!Array.isArray(printlist)) throw 'printlist must be array'
  const printRaw = []
  printlist.forEach(name => {
    const libEnt = Object.entries(libs)
      .filter(([key, value]) => key === name)[0]
    if (libEnt) {
      printed[name] = libEnt[1].code
      printRaw.push(`<span class="lib-title">${name}</span>\n\n${'```'}\n${mdEscape(libEnt[1].code)}\n${'```'}`)
    }
  })
  return {
    printed,
    printable: printRaw.join('\n\n')
  }
}
