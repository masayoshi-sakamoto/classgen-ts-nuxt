export function toCamelCase(str: string, first: boolean = true) {
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
