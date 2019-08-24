import url from 'url'
import bodyParser from 'body-parser'
import session from 'express-session'
import pkg from './package'

export default {
  mode: 'universal',

  env: {
    // baseURL: 'geargame30.eng.cmu.ac.th'
  },

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href: '/logo.png'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Rubik&display=swap'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    'node_modules/handsontable/dist/handsontable.full.css',
    { src: '~/assets/buefy-overrides.scss', lang: 'scss' },
    '~/css/main.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/vue-handsontable', ssr: false }],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    'nuxt-fontawesome'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.baseURL || 'http://localhost:3000'
  },

  buefy: {
    materialDesignIcons: false,
    defaultIconPack: 'fas',
    defaultIconComponent: 'font-awesome-icon'
  },

  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      }
    ]
  },

  serverMiddleware: [
    // body-parser middleware
    bodyParser.json(),
    // parse query in req.query
    (req, res, next) => {
      // eslint-disable-next-line node/no-deprecated-api
      req.query = url.parse(req.url, true).query
      next()
    },
    // session middleware
    session({
      secret: 'super-secret-key',
      resave: false,
      saveUninitialized: false
    }),
    // Api middleware
    // We add /api/login & /api/logout routes
    '~/services'
  ],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['handsontable', 'vue-handsontable']
  }
}
