<template>
  <div class="max-w-7xl mx-auto pb-12">
    <!-- Header Section -->
    <header class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-10">
      <div>
        <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight">Dashboard Admin</h1>
        <p class="text-sm text-gray-500 mt-1">Pantau statistik dan kelola informasi publik Desa Kawat.</p>
      </div>
      
      <!-- Profil User Ringkas -->
      <div class="flex items-center gap-3.5 bg-white px-4 py-2.5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div class="text-right hidden sm:block">
          <h4 class="font-bold text-sm text-gray-900 leading-none">Irfan Maftuh</h4>
          <span class="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Administrator</span>
        </div>
        <div class="w-10 h-10 bg-gradient-to-tr from-slate-800 to-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md shadow-slate-900/20 ring-2 ring-emerald-500/30 ring-offset-2">
          IM
        </div>
      </div>
    </header>

    <!-- Loading State Global -->
    <div v-if="pending" class="flex flex-col items-center justify-center py-20">
      <div class="animate-spin rounded-full h-10 w-10 border-4 border-gray-100 border-t-emerald-600 mb-4"></div>
      <p class="text-gray-500 text-sm font-medium animate-pulse">Menyiapkan ruang kerja Anda...</p>
    </div>

    <div v-else>
      <!-- Statistik Ringkas (4 Kolom) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        
        <!-- Card 1: Total Berita -->
        <div class="group bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300">
          <div class="flex justify-between items-start mb-4">
            <div class="w-12 h-12 flex items-center justify-center bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6m4 0h.01"></path>
              </svg>
            </div>
            <span class="text-[10px] font-bold text-blue-500 bg-blue-50 px-2.5 py-1 rounded-lg uppercase tracking-wider">Publikasi</span>
          </div>
          <div>
            <p class="text-3xl font-extrabold text-gray-900">{{ statistik.totalBerita }}</p>
            <p class="text-sm font-medium text-gray-500 mt-1">Total Berita Desa</p>
          </div>
        </div>

        <!-- Card 2: Layanan -->
        <div class="group bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-xl hover:border-emerald-100 hover:-translate-y-1 transition-all duration-300">
          <div class="flex justify-between items-start mb-4">
            <div class="w-12 h-12 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-2xl group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <span class="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-lg uppercase tracking-wider">Sistem</span>
          </div>
          <div>
            <p class="text-3xl font-extrabold text-gray-900">{{ totalLayanan }}</p>
            <p class="text-sm font-medium text-gray-500 mt-1">Layanan Aktif</p>
          </div>
        </div>

        <!-- Card 3: Berita Bulan Ini -->
        <div class="group bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-xl hover:border-amber-100 hover:-translate-y-1 transition-all duration-300">
          <div class="flex justify-between items-start mb-4">
            <div class="w-12 h-12 flex items-center justify-center bg-amber-50 text-amber-500 rounded-2xl group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <span class="text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg uppercase tracking-wider">{{ bulanSekarang }}</span>
          </div>
          <div>
            <p class="text-3xl font-extrabold text-gray-900">{{ statistik.beritaBulanIni }}</p>
            <p class="text-sm font-medium text-gray-500 mt-1">Postingan Bulan Ini</p>
          </div>
        </div>

        <!-- Card 4: Berita Minggu Ini -->
        <div class="group bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-xl hover:border-purple-100 hover:-translate-y-1 transition-all duration-300">
          <div class="flex justify-between items-start mb-4">
            <div class="w-12 h-12 flex items-center justify-center bg-purple-50 text-purple-600 rounded-2xl group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <span class="text-[10px] font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg uppercase tracking-wider">Terbaru</span>
          </div>
          <div>
            <p class="text-3xl font-extrabold text-gray-900">{{ statistik.beritaMingguIni }}</p>
            <p class="text-sm font-medium text-gray-500 mt-1">7 Hari Terakhir</p>
          </div>
        </div>

      </div>

      <!-- Area Bawah: Grafik & Aktivitas -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        <!-- Grafik Kategori (Porsi Kiri) -->
        <div class="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
          <div class="flex justify-between items-end mb-6">
            <div>
              <h3 class="text-lg font-extrabold text-gray-900">Distribusi Kategori</h3>
              <p class="text-sm text-gray-500 mt-1">Proporsi berita berdasarkan kategori</p>
            </div>
          </div>
          
          <div v-if="kategoriStats.length === 0" class="text-center py-10 text-gray-400 text-sm">
            Belum ada data kategori.
          </div>

          <div v-else class="space-y-5">
            <div v-for="(item, index) in kategoriStats" :key="item.nama" class="flex items-center gap-4">
              <span class="text-sm font-semibold text-gray-700 w-28 md:w-36 truncate">{{ item.nama }}</span>
              <div class="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden relative">
                <div 
                  class="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
                  :class="warnaKategori[index % warnaKategori.length]"
                  :style="{ width: item.persentase + '%' }"
                ></div>
              </div>
              <div class="w-16 text-right">
                <span class="text-sm font-bold text-gray-900">{{ item.jumlah }}</span>
                <span class="text-[10px] font-medium text-gray-400 ml-1">({{ item.persentase }}%)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Aktivitas Terbaru (Porsi Kanan) -->
        <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col">
          <div class="flex justify-between items-end mb-6">
            <div>
              <h3 class="text-lg font-extrabold text-gray-900">Berita Terbaru</h3>
              <p class="text-sm text-gray-500 mt-1">Publikasi terakhir</p>
            </div>
          </div>

          <div v-if="beritaTerbaru.length === 0" class="flex-1 flex items-center justify-center text-gray-400 text-sm">
            Belum ada berita.
          </div>

          <div v-else class="space-y-4 flex-1">
            <div v-for="(berita, index) in beritaTerbaru" :key="berita.id" class="flex items-start gap-3.5 group">
              <div class="relative mt-1.5 flex flex-col items-center">
                <div class="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50 group-hover:ring-emerald-100 transition-all"></div>
                <!-- Garis penghubung vertikal -->
                <div v-if="index !== beritaTerbaru.length - 1" class="w-px h-10 bg-gray-100 absolute top-3"></div>
              </div>
              <div class="pb-3 w-full">
                <NuxtLink :to="`/admin/berita`" class="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug group-hover:text-emerald-600 transition-colors">
                  {{ berita.title }}
                </NuxtLink>
                <div class="flex items-center gap-2 mt-1.5">
                  <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase">{{ berita.category || 'Umum' }}</span>
                  <span class="text-[11px] font-medium text-gray-400">{{ formatDate(berita.created_at) }}</span>
                </div>
              </div>
            </div>
          </div>

          <NuxtLink to="/admin/berita" class="mt-4 pt-4 border-t border-gray-100 w-full text-center text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
            Lihat Semua Berita &rarr;
          </NuxtLink>
        </div>
      </div>

      <!-- Quick Actions (Aksi Cepat) -->
      <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
        <h3 class="text-lg font-extrabold text-gray-900 mb-6">Akses Cepat</h3>
        
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Action 1 -->
          <NuxtLink to="/admin/tambah-berita" class="group flex flex-col lg:flex-row items-center lg:items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/50 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300 text-center lg:text-left">
            <div class="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            </div>
            <div>
              <h4 class="text-sm font-bold text-gray-900 group-hover:text-emerald-700">Tulis Berita</h4>
              <p class="text-xs text-gray-500 mt-0.5 hidden lg:block">Buat artikel baru</p>
            </div>
          </NuxtLink>
          
          <!-- Action 2 -->
          <NuxtLink to="/admin/berita" class="group flex flex-col lg:flex-row items-center lg:items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 text-center lg:text-left">
            <div class="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6m4 0h.01"></path></svg>
            </div>
            <div>
              <h4 class="text-sm font-bold text-gray-900 group-hover:text-blue-700">Kelola Berita</h4>
              <p class="text-xs text-gray-500 mt-0.5 hidden lg:block">Edit & hapus artikel</p>
            </div>
          </NuxtLink>
          
          <!-- Action 3 -->
          <NuxtLink to="/admin/pengajuan" class="group flex flex-col lg:flex-row items-center lg:items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-amber-200 hover:bg-amber-50/50 hover:shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1 transition-all duration-300 text-center lg:text-left">
            <div class="p-3 bg-amber-50 text-amber-600 rounded-xl group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
            </div>
            <div>
              <h4 class="text-sm font-bold text-gray-900 group-hover:text-amber-700">Pengajuan</h4>
              <p class="text-xs text-gray-500 mt-0.5 hidden lg:block">Cek request warga</p>
            </div>
          </NuxtLink>
          
          <!-- Action 4 -->
          <NuxtLink to="/admin/pengaturan" class="group flex flex-col lg:flex-row items-center lg:items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-slate-300 hover:bg-slate-50/50 hover:shadow-lg hover:shadow-slate-500/10 hover:-translate-y-1 transition-all duration-300 text-center lg:text-left">
            <div class="p-3 bg-slate-100 text-slate-700 rounded-xl group-hover:bg-slate-700 group-hover:text-white transition-colors duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div>
              <h4 class="text-sm font-bold text-gray-900 group-hover:text-slate-800">Pengaturan</h4>
              <p class="text-xs text-gray-500 mt-0.5 hidden lg:block">Konfigurasi web desa</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ 
  layout: 'admin' 
})

const supabase = useSupabaseClient()
const router = useRouter()
const user = useSupabaseUser()

onMounted(() => {
  if (!user.value) {
    router.push('/login')
  }
})

// Menggunakan useAsyncData untuk fetch berita
const { data: beritaList, pending } = await useAsyncData('admin-dashboard', async () => {
  const { data, error } = await supabase
    .from('berita')
    .select('id, title, category, created_at, image_url')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching berita:', error)
    return []
  }
  return data || []
})

// Total layanan dari localStorage
const totalLayanan = computed(() => {
  try {
    if (process.client) { // Cegah error SSR saat akses localStorage
      const saved = localStorage.getItem('layanan_desa')
      if (saved) {
        const layanan = JSON.parse(saved)
        return layanan.length || 0
      }
    }
  } catch (e) {}
  return 0
})

// Kalkulasi statistik berita
const statistik = computed(() => {
  const list = beritaList.value || []
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const weekAgo = new Date(today)
  weekAgo.setDate(weekAgo.getDate() - 7)

  const bulanIni = list.filter(item => {
    const date = new Date(item.created_at)
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  })

  const mingguIni = list.filter(item => {
    const date = new Date(item.created_at)
    return date >= weekAgo && date <= now
  })

  const kategori = new Set(list.map(item => item.category || 'Umum'))

  return {
    totalBerita: list.length,
    totalKategori: kategori.size,
    beritaBulanIni: bulanIni.length,
    beritaMingguIni: mingguIni.length
  }
})

// Statistik kategori untuk progress bar
const kategoriStats = computed(() => {
  const list = beritaList.value || []
  const total = list.length || 1
  
  const kategoriMap = {}
  list.forEach(item => {
    const cat = item.category || 'Umum'
    kategoriMap[cat] = (kategoriMap[cat] || 0) + 1
  })
  
  // Mengurutkan berdasarkan jumlah terbanyak
  return Object.entries(kategoriMap)
    .map(([nama, jumlah]) => ({
      nama,
      jumlah,
      persentase: Math.round((jumlah / total) * 100)
    }))
    .sort((a, b) => b.jumlah - a.jumlah)
})

// Palette warna untuk grafik kategori
const warnaKategori = ['bg-emerald-500', 'bg-blue-500', 'bg-amber-500', 'bg-purple-500', 'bg-rose-500']

// Menampilkan 4 berita terbaru
const beritaTerbaru = computed(() => (beritaList.value || []).slice(0, 4))

const bulanSekarang = computed(() => {
  return new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(new Date())
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Intl.DateTimeFormat('id-ID', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  }).format(new Date(dateString))
}
</script>

<style scoped>
/* Membatasi teks maksimal 2 baris lalu titik-titik (ellipsis) */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>