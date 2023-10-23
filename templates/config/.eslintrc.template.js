module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier'
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-eval': 'off',
    'no-useless-constructor': 'off',
    'no-use-before-define': 'off',
    'vue/multi-word-component-names': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/namespace': 'off',
    'vue/no-v-html': 'off',
    'no-control-regex': 'off',
    'vue/no-reserved-component-names': 'off'
  }
}
