const { API_KEY } = process.env;

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  server: {
    host: '0.0.0.0',
    port: 54
  },

  router: {
    base: '/54-novel/'
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: '54-novel',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: '『54字の物語』重版記念！54字詰めの原稿用紙で物語をつくりましょう！' },
      { hid: 'keywords', name: 'keywords', content: '54字の物語,#54字の文学賞,氏田雄介' },
      { hid: 'author', name: 'author', content: '氏田雄介' },
      { hid: 'generator', name: 'generator', content: 'microCMS' },
      { hid: 'og:title', property: 'og:title', content: '54字の物語ジェネレーター #54字の物語' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://ujiqn.github.io/54-novel/' },
      { hid: 'og:image', property: 'og:image', content: 'https://ujiqn.github.io/54-novel/ogp.png' },
      { hid: 'og:image:width', property: 'og:image:width', content: '1200' },
      { hid: 'og:image:height', property: 'og:image:height', content: '630' },
      { hid: 'og:site_name', property: 'og:site_name', content: '54字の物語ジェネレーター #54字の物語' },
      { hid: 'og:description', property: 'og:description', content: '『54字の物語』重版記念！54字詰めの原稿用紙で物語をつくりましょう！' },
      { hid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:title', property: 'twitter:title', content: '54字の物語ジェネレーター #54字の物語' },
      { hid: 'twitter:description', name: 'twitter:description', content: '『54字の物語』重版記念！54字詰めの原稿用紙で物語をつくりましょう！' },
      { hid: 'twitter:image:src', property: 'twitter:image:src', content: 'https://ujiqn.github.io/54-novel/ogp.png' },
      { hid: 'format-detection', property: 'format-detection', content: 'telephone=no' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/css/common.scss'
  ],

  styleResources: {
   scss: [
      '~/assets/css/variable.scss',
      '~/assets/css/extend.scss',
      '~/assets/css/mixin.scss',
      '~/assets/css/keyframe.scss'
    ]
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/style-resources',
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  privateRuntimeConfig: {
    apiKey: API_KEY
  },

  publicRuntimeConfig: {
    apiKey: process.env.NODE_ENV !== 'production' ? API_KEY : undefined
  },
}
