#/bin/sh
mkdir app
mkdir swagger
mv assets components layouts pages static store app/
yarn add cookie-universal-nuxt @nuxtjs/moment @nuxtjs/dotenv cross-env vee-validate@^3.0 vuedraggable vue-infinite-loading

# optional
# yarn add @fortawesome/fontawesome-pro