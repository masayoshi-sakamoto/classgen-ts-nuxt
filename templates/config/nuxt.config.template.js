export default {
  srcDir: 'app',
  server: {
    port: xxx20
  },
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.APPLICATION_NAME,
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
  plugins: [
    '@/plugins/injector',
    { src: '@/plugins/veeValidate', ssr: true },
    '@/plugins/vuetify'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    { path: '@/components/atoms', extensions: ['vue'], pathPrefix: false }
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/style-resources'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    ['@nuxtjs/dotenv', { path: './' }],
    ['cookie-universal-nuxt', { parseJSON: false }],
    'portal-vue/nuxt',
    '@nuxtjs/sentry'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['@/assets/variables.scss'],
    optionsPath: '@/plugins/vuetify.options.ts',
    treeShake: true
  },

  styleResources: {
    scss: ['vuetify/src/styles/settings/_variables.scss']
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
