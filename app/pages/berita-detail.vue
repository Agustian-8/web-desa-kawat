<template>
  <div class="bg-slate-50 min-h-screen font-['Poppins']">
    
    <!-- ===== HERO SECTION ===== -->
    <section class="relative pt-32 pb-16 overflow-hidden">
      <!-- Background gradasi sederhana -->
      <div class="absolute inset-0 bg-gradient-to-br from-emerald-800 to-emerald-950"></div>
      
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <!-- Loading State -->
        <div v-if="pending" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white/30 border-t-white"></div>
          <p class="mt-4 text-emerald-100">Memuat berita...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error || !berita" class="text-center py-12">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-4">
            <svg class="w-10 h-10 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-2">Berita Tidak Ditemukan</h3>
          <p class="text-emerald-100/70 mb-6">Maaf, berita yang Anda cari tidak tersedia atau telah dihapus.</p>
          <NuxtLink to="/berita" class="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition border border-white/20">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Berita
          </NuxtLink>
        </div>

        <!-- Content -->
        <div v-else>
          <!-- Kategori Badge -->
          <div class="mb-4">
            <span class="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-emerald-200 text-xs font-semibold rounded-full border border-white/20">
              <span class="w-2 h-2 bg-emerald-400 rounded-full"></span>
              {{ berita.category || 'Informasi' }}
            </span>
          </div>

          <!-- Judul -->
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            {{ berita.title }}
          </h1>

          <!-- Meta Info -->
          <div class="flex flex-wrap items-center gap-4 text-sm text-emerald-100/70">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{{ formatDate(berita.created_at) }}</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Admin Desa</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== KONTEN UTAMA ===== -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
      <!-- Card Utama -->
      <div class="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        
        <!-- Gambar Berita -->
        <div v-if="berita?.image_url" class="relative w-full bg-slate-100">
          <img 
            :src="berita.image_url" 
            :alt="berita.title"
            class="w-full h-auto max-h-[500px] object-cover"
          />
        </div>
        
        <!-- Body -->
        <div class="p-6 sm:p-8 md:p-10 lg:p-12">
          
          <!-- Konten -->
          <div class="prose prose-lg max-w-none prose-emerald">
            <div class="text-gray-700 leading-relaxed whitespace-pre-wrap text-base sm:text-lg">
              {{ berita?.content }}
            </div>
          </div>

          <!-- ===== DIVIDER ===== -->
          <div class="relative my-10">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center">
              <span class="px-4 bg-white text-gray-400 text-sm">✦ ✦ ✦</span>
            </div>
          </div>

          <!-- ===== FOOTER ===== -->
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <!-- Info Kategori & Tanggal -->
            <div class="flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200">
                <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {{ berita?.category || 'Umum' }}
              </span>
              <span class="text-gray-300 hidden sm:inline">|</span>
              <span class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ formatDate(berita?.created_at) }}
              </span>
            </div>

            <!-- Tombol Aksi -->
            <div class="flex items-center gap-2 w-full sm:w-auto">
              <!-- Tombol Share -->
              <button 
                @click="shareBerita"
                class="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm text-gray-600 font-medium transition-all duration-200"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span class="hidden sm:inline">Bagikan</span>
              </button>

              <!-- Tombol Kembali -->
              <NuxtLink 
                to="/berita"
                class="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-medium transition-all duration-200 shadow-lg shadow-emerald-600/30"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Berita Lainnya</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- ===== TOMBOL KEMBALI KE ATAS ===== -->
      <button 
        v-if="showScrollTop"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 z-50 p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg shadow-emerald-600/40 transition-all duration-300 hover:scale-110"
        aria-label="Kembali ke atas"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </section>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const route = useRoute()

// State untuk scroll
const showScrollTop = ref(false)

// Ambil ID dari query parameter
const beritaId = route.query.id

console.log('📝 ID dari query:', beritaId)

// Ambil data berita
const { data: berita, pending, error } = await useAsyncData(
  `detail-${beritaId}`,
  async () => {
    if (!beritaId) {
      console.warn('⚠️ ID tidak ditemukan di query')
      return null
    }
    
    console.log('📡 Fetching berita dengan ID:', beritaId)
    
    const { data, error } = await supabase
      .from('berita')
      .select('*')
      .eq('id', beritaId)
      .single()
    
    if (error) {
      console.error('❌ Error:', error)
      return null
    }
    
    console.log('✅ Data ditemukan:', data)
    return data
  },
  { 
    lazy: false, 
    server: false, 
    default: () => null 
  }
)

// Format tanggal
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('id-ID', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric'
  }).format(date)
}

// Fungsi share berita
const shareBerita = async () => {
  if (!berita.value) return
  
  const url = window.location.href
  const text = `${berita.value.title}\n\nBaca selengkapnya di: ${url}`
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: berita.value.title,
        text: text,
        url: url
      })
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Error sharing:', err)
        copyToClipboard(url)
      }
    }
  } else {
    copyToClipboard(url)
  }
}

// Copy ke clipboard
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    alert('✅ Link berita berhasil disalin ke clipboard!')
  } catch (err) {
    console.error('Gagal menyalin:', err)
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    alert('✅ Link berita berhasil disalin!')
  }
}

// Scroll ke atas
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Detect scroll untuk tombol kembali ke atas
onMounted(() => {
  window.addEventListener('scroll', () => {
    showScrollTop.value = window.scrollY > 300
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', () => {})
})

// SEO / Meta Tags
useHead({
  title: berita.value?.title || 'Detail Berita - Desa Kawat',
  meta: [
    { name: 'description', content: berita.value?.content?.slice(0, 160) || 'Detail berita Desa Kawat' },
    { property: 'og:title', content: berita.value?.title || 'Detail Berita' },
    { property: 'og:description', content: berita.value?.content?.slice(0, 160) || 'Detail berita Desa Kawat' },
    { property: 'og:image', content: berita.value?.image_url || '/Logo_Sanggau.png' },
    { property: 'og:type', content: 'article' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ]
})
</script>

<style scoped>
/* ===== ANIMASI ===== */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 0.8s linear infinite;
}

/* ===== PROSE STYLING ===== */
.prose {
  color: #374151;
  font-size: 1.125rem;
  line-height: 1.8;
}

.prose p {
  margin-bottom: 1.25rem;
}

.prose h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #111827;
}

.prose h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: #111827;
}

.prose ul, .prose ol {
  margin-top: 0.75rem;
  margin-bottom: 1.25rem;
  padding-left: 1.5rem;
}

.prose li {
  margin-bottom: 0.5rem;
}

.prose strong {
  color: #111827;
  font-weight: 600;
}

.prose a {
  color: #059669;
  text-decoration: underline;
}
.prose a:hover {
  color: #047857;
}

.prose blockquote {
  border-left: 4px solid #10b981;
  padding-left: 1rem;
  font-style: italic;
  color: #4b5563;
  margin: 1.5rem 0;
}

.prose img {
  border-radius: 0.75rem;
  margin: 1.5rem 0;
  max-width: 100%;
  height: auto;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 640px) {
  .prose {
    font-size: 1rem;
  }
}

/* ===== SCROLLBAR ===== */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #10b981;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #059669;
}
</style>