#/bin/sh

# ディレクトリ構成を変更
rm -f ./layouts/default.vue ./pages/inspire.vue ./components/*  ./static/*
mkdir app
mkdir swagger
mkdir static/assets
mkdir components/atoms components/molecules components/organisms components/templates
mv assets components layouts pages static store app/

# .gitignoreファイルに除外ファイルを追加
echo '\n/*template*\n/*.sql\n' >> .gitignore

# 必要なライブラリを追加
yarn add cookie-universal-nuxt @nuxtjs/moment @nuxtjs/dotenv cross-env vee-validate@^3.0 vuedraggable vue-infinite-loading vue-scrollto portal-vue@^2.0
yarn add -D @nuxtjs/style-resources@^1.2.0 typescript@4.2.4
yarn add @nuxtjs/sentry

# optional
yarn add @fortawesome/fontawesome-pro minify-css-string
