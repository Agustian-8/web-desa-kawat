// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/motion/nuxt',
    '@nuxtjs/supabase'
  ],
  
  // Konfigurasi proteksi rute Supabase
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      // Daftar halaman publik yang dibebaskan dari kewajiban login
      exclude: [
        '/',                  
        '/profil',            
        '/layanan',           
        '/berita',            
        '/berita-detail',     
        '/transparansi',      
        '/pengajuan-layanan'  
      ],
    }
  },

  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap' }
      ]
    }
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
})