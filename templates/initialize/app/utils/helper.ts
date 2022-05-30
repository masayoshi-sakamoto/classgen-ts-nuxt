export function textColor(hexcolor: string) {
  if (hexcolor === '') {
    return undefined
  }
  const color = hexcolor.replace('#', '').replace(' ', '')
  const r = parseInt(color.substring(1, 3), 16)
  const g = parseInt(color.substring(3, 5), 16)
  const b = parseInt(color.substring(5, 7), 16)

  return (r * 299 + g * 587 + b * 114) / 1000 < 128 ? 'white--text' : 'black--text'
}
