export function toCamelCase(str: string, first: boolean = true) {
  if (typeof str === 'string') {
    const word = str
      .split('_')
      .map(function (word, index) {
        if (index === 0) {
          return word.toLowerCase()
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      })
      .join('')

    return first ? word.charAt(0).toUpperCase() + word.slice(1) : word
  }
  return str
}

export function toUnderscoreCase(str: string, first: boolean = true) {
  if (typeof str === 'string') {
    const word = first ? str.charAt(0).toLowerCase() + str.slice(1) : str
    return word
      .split(/(?=[A-Z])/)
      .join('_')
      .toLowerCase()
  }
  return str
}

export function toKebabCase(str: string, first: boolean = true) {
  if (typeof str === 'string') {
    const word = first ? str.charAt(0).toLowerCase() + str.slice(1) : str
    return word
      .split(/(?=[A-Z])/)
      .join('-')
      .toLowerCase()
  }
  return str
}
