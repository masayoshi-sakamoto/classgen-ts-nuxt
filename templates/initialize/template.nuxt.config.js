export default {
  srcDir: 'app',
  server: {
    port: 10020
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'your application name',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [{ src: 'https://polyfill.io/v3/polyfill.min.js?features=es6' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/style.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/injector', { src: '@/plugins/veeValidate', ssr: false }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [{ path: '@/components/atoms', extensions: ['vue'] }],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    ['@nuxtjs/dotenv', { path: './' }],
    ['cookie-universal-nuxt', { parseJSON: false }]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
    proxy: true
  },

  proxy: {
    '/admins': {
      target: process.env.APPLICATION_API + '/admins',
      pathRewrite: { '^/admins': '' }
    },
    '/users': {
      target: process.env.APPLICATION_API + '/users',
      pathRewrite: { '^/users': '' }
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['@/assets/variables.scss'],
    optionsPath: '@/plugins/vuetify.options.ts',
    treeShake: true
  },

  // storybool module configuration https://storybook.nuxtjs.org/api/options/
  storybook: {
    port: 10021
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate'],
    terser: {
      terserOptions: {
        compress: { drop_console: true }
      }
    }
  }
}
