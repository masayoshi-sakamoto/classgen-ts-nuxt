import colors from 'vuetify/es5/util/colors'

export default {
  theme: {
    light: true,
    themes: {
      light: {
        primary: colors.lightBlue.darken1,
        secondary: '#879094',
        positive: '#485fc7',
        accent: '#334242',
        background: '#FCFAF9',
        grey: colors.grey.base,
        error: '#F32F35'
      }
    },
    options: {
      customProperties: true
    }
  }
}
