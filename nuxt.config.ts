import vuetify from 'vite-plugin-vuetify'
// PWA Config
const title = 'qtim'
const shortTitle = 'Marketplace'

export default defineNuxtConfig({
  pages: true,
  // Enable takeover mode for better DX
  typescript: { shim: false },

  build: { transpile: ['vuetify', 'pinia-plugin-persistedstate', '@pinia/nuxt'] },
  // disable sourcemap so the terminal warnings go away
  sourcemap: {
    client: false,
    server: false,
  },
  // import styles
  css: ['vuetify/styles', '@/assets/main.scss'],
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@kevinmarrec/nuxt-pwa',
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) =>
        // @ts-ignore
        config.plugins.push(
          vuetify({
            styles: { configFile: 'assets/variables.scss' },
          })
        )
      )
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
