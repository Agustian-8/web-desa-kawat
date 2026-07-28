<template>
  <div class="bg-slate-50 min-h-screen pb-24 font-['Poppins']">
    
    <!-- HERO SECTION (Konsisten dengan gambar Beranda) -->
    <section class="relative bg-slate-900 pt-32 pb-40 lg:pt-40 lg:pb-48 overflow-hidden">
      <div class="absolute inset-0 bg-[url('/bg-desa.png')] bg-cover bg-center bg-no-repeat"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/75 to-slate-50 backdrop-blur-[2px]"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <!-- Badge Animasi -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-emerald-300 text-sm font-medium mb-6 border border-white/20 backdrop-blur-md shadow-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2"></path></svg>
          Pusat Informasi
        </div>

        <h1 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
          class="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight"
        >
          Kabar Desa <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Kawat</span>
        </h1>
        <p 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
          class="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Informasi terkini, pengumuman resmi, dan liputan kegiatan seputar masyarakat desa.
        </p>
      </div>
    </section>

    <!-- FILTER & SEARCH (Modern UI) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
      <div class="bg-white/95 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-white/40">
        <div class="flex flex-col md:flex-row gap-5">
          
          <!-- Search -->
          <div class="flex-1">
            <div class="relative group">
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Cari berita atau pengumuman..." 
                class="w-full px-5 py-3.5 pl-12 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-300 text-gray-700 placeholder-gray-400"
                @input="filterBerita"
              />
              <svg class="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 group-focus-within:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>

          <!-- Filter Kategori -->
          <div class="w-full md:w-56">
            <div class="relative">
              <select 
                v-model="selectedCategory"
                class="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-300 text-gray-700 appearance-none cursor-pointer"
                @change="filterBerita"
              >
                <option value="">Semua Kategori</option>
                <option value="Pengumuman">Pengumuman</option>
                <option value="Kegiatan">Kegiatan Desa</option>
                <option value="Pembangunan">Pembangunan</option>
              </select>
              <!-- Custom Arrow Dropdown -->
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <!-- Reset Filter -->
          <button 
            v-if="searchQuery || selectedCategory"
            @click="resetFilter"
            class="px-6 py-3.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-2xl transition-colors font-semibold whitespace-nowrap flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            Reset
          </button>
        </div>
      </div>
    </section>

    <!-- GRID BERITA -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <div class="flex justify-between items-end mb-10">
        <div>
          <h3 class="text-3xl font-extrabold text-gray-900">Berita Terbaru</h3>
          <p v-if="filteredBerita.length > 0" class="text-sm text-gray-500 mt-2 font-medium">
            Menampilkan {{ filteredBerita.length }} berita
          </p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="flex justify-center items-center py-24 bg-white/50 backdrop-blur-sm rounded-3xl border border-white">
        <div class="animate-spin rounded-full h-14 w-14 border-4 border-emerald-600/20 border-t-emerald-600"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 text-red-600 p-8 rounded-3xl text-center border border-red-100 shadow-sm">
        <svg class="w-14 h-14 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
        <p class="font-bold text-lg">Gagal memuat berita</p>
        <p class="text-sm mt-2 text-red-500/80">Terjadi kesalahan saat terhubung ke server.</p>
        <button @click="refresh" class="mt-6 px-8 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors shadow-lg shadow-red-600/30">
          Coba Muat Ulang
        </button>
      </div>

      <!-- Hasil Pencarian Kosong -->
      <div v-else-if="filteredBerita.length === 0" class="bg-white text-gray-500 p-16 rounded-3xl text-center border border-gray-100 shadow-sm">
        <div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">Pencarian Tidak Ditemukan</h3>
        <p class="text-sm text-gray-400 max-w-md mx-auto">Kami tidak menemukan berita yang cocok dengan kata kunci atau kategori yang Anda pilih.</p>
        <button @click="resetFilter" class="mt-6 px-8 py-3 bg-slate-100 text-slate-700 font-semibold rounded-full hover:bg-slate-200 transition-colors">
          Hapus Filter
        </button>
      </div>

      <!-- Tampilan Data Berita -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(item, index) in filteredBerita" 
          :key="item.id"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 500, delay: index * 100 } }"
          class="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-900/5 hover:-translate-y-2 transition-all duration-300 group flex flex-col"
        >
          <!-- Gambar Berita -->
          <NuxtLink :to="'/berita-detail?id=' + item.id" class="block h-56 bg-slate-100 relative overflow-hidden">
            <img 
              v-if="item.image_url" 
              :src="item.image_url" 
              :alt="item.title"
              class="w-full h-full object-cover group-hover:scale-105 group-hover:rotate-1 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div v-else class="absolute inset-0 bg-emerald-50 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
              <svg class="w-16 h-16 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            
            <!-- Glassmorphism Badge Kategori -->
            <div class="absolute top-4 left-4">
              <span class="px-4 py-1.5 bg-white/90 backdrop-blur-md text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                {{ item.category || 'Umum' }}
              </span>
            </div>
          </NuxtLink>
          
          <!-- Konten Teks -->
          <div class="p-8 flex flex-col flex-grow">
            <!-- Tanggal -->
            <div class="flex items-center gap-2 text-xs font-medium text-gray-400 mb-4">
              <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>{{ formatDate(item.created_at) }}</span>
            </div>

            <!-- Judul -->
            <NuxtLink :to="'/berita-detail?id=' + item.id" class="block mb-3">
              <h4 class="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors leading-snug line-clamp-2">
                {{ item.title }}
              </h4>
            </NuxtLink>

            <!-- Preview -->
            <p class="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3 flex-grow">
              {{ item.content }}
            </p>

            <!-- Footer Card -->
            <div class="flex items-center justify-between mt-auto pt-5 border-t border-gray-100/60">
              <NuxtLink :to="'/berita-detail?id=' + item.id" class="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors inline-flex items-center gap-1.5 group-hover:gap-2.5">
                Baca Artikel
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </NuxtLink>
              
              <!-- Share Button -->
              <button 
                @click.stop="shareBerita(item)" 
                class="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-emerald-600 rounded-full hover:bg-emerald-50 transition-colors"
                title="Bagikan berita"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div v-if="filteredBerita.length > 0 && filteredBerita.length < (beritaList?.length || 0)" class="text-center mt-16">
        <button 
          @click="loadMore" 
          class="inline-flex items-center gap-2 px-8 py-3.5 bg-white border-2 border-emerald-600 text-emerald-600 font-bold rounded-full hover:bg-emerald-600 hover:text-white hover:shadow-lg hover:shadow-emerald-600/30 hover:-translate-y-1 transition-all duration-300"
        >
          Muat Lebih Banyak
          <svg class="w-5 h-5 animate-bounce mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()

// Data berita dari Supabase
const { data: beritaList, pending, error, refresh } = await useAsyncData('berita-desa', async () => {
  const { data, error } = await supabase
    .from('berita')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
})

// State untuk filter
const searchQuery = ref('')
const selectedCategory = ref('')
const filteredBerita = ref([])
const visibleCount = ref(6)

// Fungsi filter
const filterBerita = () => {
  if (!beritaList.value) {
    filteredBerita.value = []
    return
  }

  let result = beritaList.value.filter(item => {
    // Filter kategori
    if (selectedCategory.value && item.category !== selectedCategory.value) {
      return false
    }
    
    // Filter pencarian
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase().trim()
      const title = item.title?.toLowerCase() || ''
      const content = item.content?.toLowerCase() || ''
      if (!title.includes(query) && !content.includes(query)) {
        return false
      }
    }
    
    return true
  })

  // Batasi jumlah tampilan
  filteredBerita.value = result.slice(0, visibleCount.value)
}

// Reset filter
const resetFilter = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  visibleCount.value = 6
  filterBerita()
}

// Load more
const loadMore = () => {
  visibleCount.value += 6
  filterBerita()
}

// Share berita
const shareBerita = async (item) => {
  const url = `${window.location.origin}/berita-detail?id=${item.id}`
  const text = `${item.title}\n\nBaca selengkapnya di: ${url}`
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: item.title,
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
    alert('Link berita berhasil disalin ke clipboard!')
  } catch (err) {
    console.error('Gagal menyalin:', err)
    // Fallback
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    alert('Link berita berhasil disalin!')
  }
}

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

// Watch perubahan
watch(beritaList, () => {
  filterBerita()
}, { immediate: true })

watch([searchQuery, selectedCategory], () => {
  visibleCount.value = 6
})

// SEO
useHead({
  title: 'Kabar Desa Kawat - Informasi Terkini',
  meta: [
    { name: 'description', content: 'Informasi terkini, pengumuman resmi, dan liputan kegiatan masyarakat Desa Kawat, Kabupaten Sanggau.' },
    { name: 'keywords', content: 'berita desa, desa kawat, kabupaten sanggau, informasi desa' }
  ]
})
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>