import '@fortawesome/fontawesome-pro/css/all.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import minifyTheme from 'minify-css-string'

const LRU = require('lru-cache')
const themeCache = new LRU({
  max: 10,
  ttl: 1000 * 60 * 60 // 1 hour
})

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'fa'
  },
  theme: {
    options: { minifyTheme, themeCache }
  }
})
