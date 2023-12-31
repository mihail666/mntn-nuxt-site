import vuetify from 'vite-plugin-vuetify'
// PWA Config
const title = 'qtim'
const shortTitle = 'Marketplace'

export default defineNuxtConfig({
  pages: true,

  typescript: { shim: false },

  build: { transpile: ['vuetify', 'pinia-plugin-persistedstate', '@pinia/nuxt'] },

  sourcemap: {
    client: false,
    server: false,
  },

  css: ['vuetify/styles', '@/assets/main.scss'],
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@kevinmarrec/nuxt-pwa',
    '@invictus.codes/nuxt-vuetify',
    async (options, nuxt) => {
      // @ts-ignore
      nuxt.hooks.hook("vite:extendConfig", (config) => config.plugins.push(vuetify()))
    },
  ],
  // head config
  app: {
    head: {
      title,
      link: [],
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title,
        }
      ],
    },
  },
  pwa: {
    meta: {
      name: shortTitle,
      author: 'Behon Baker',
      theme_color: '#4f46e5'
    },
    manifest: {
      name: shortTitle,
      short_name: shortTitle,
      theme_color: '#4f46e5'
    },
  },
})
