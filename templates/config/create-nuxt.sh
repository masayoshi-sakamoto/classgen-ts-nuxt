#/bin/sh

# ディレクトリ構成を変更
rm -i ./layouts/default.vue ./pages/inspire.vue ./components/NuxtLogo.vue ./components/Tutorial.vue ./components/VuetifyLogo.vue
mkdir app
mkdir swagger
mv assets components layouts pages static store app/

# .gitignoreファイルに除外ファイルを追加
echo '\n/*template*\n' >> .gitignore

# 必要なライブラリを追加
yarn add cookie-universal-nuxt @nuxtjs/moment @nuxtjs/dotenv cross-env vee-validate@^3.0 vuedraggable vue-infinite-loading vue-scrollto portal-vue
yarn add @sentry/vue @sentry/tracing @nuxtjs/sentry

# optional
# yarn add @fortawesome/fontawesome-pro minify-css-string
