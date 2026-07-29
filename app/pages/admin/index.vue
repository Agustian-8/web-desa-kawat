<template>
  <div>
    <header class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
      <div>
        <h1 class="text-3xl font-extrabold text-gray-900">Dashboard Admin</h1>
        <p class="text-sm text-gray-500 mt-1">Kelola konten dan informasi publik Desa Kawat.</p>
      </div>
      <div class="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
        <div class="text-right hidden sm:block">
          <h4 class="font-bold text-sm text-gray-800 leading-tight">Irfan Maftuh</h4>
          <span class="text-[11px] text-emerald-600 font-bold uppercase tracking-wider">Administrator</span>
        </div>
        <div class="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-emerald-500 shadow-sm">
          AD
        </div>
      </div>
    </header>

    <!-- Statistik Ringkas -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-semibold text-gray-500 mb-1">Total Berita</p>
            <p class="text-3xl font-extrabold text-gray-900">{{ statistik.totalBerita }}</p>
          </div>
          <div class="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-2xl text-blue-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6m4 0h.01"></path>
            </svg>
          </div>
        </div>
        <div class="mt-4 text-[11px] font-medium text-gray-400 uppercase tracking-wider">Semua Data Berita</div>
      </div>

      <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-semibold text-gray-500 mb-1">Layanan</p>
            <p class="text-3xl font-extrabold text-gray-900">{{ totalLayanan }}</p>
          </div>
          <div class="w-12 h-12 flex items-center justify-center bg-emerald-50 rounded-2xl text-emerald-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
        </div>
        <div class="mt-4 text-[11px] font-medium text-gray-400 uppercase tracking-wider">Layanan Aktif</div>
      </div>

      <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-semibold text-gray-500 mb-1">Bulan Ini</p>
            <p class="text-3xl font-extrabold text-gray-900">{{ statistik.beritaBulanIni }}</p>
          </div>
          <div class="w-12 h-12 flex items-center justify-center bg-amber-50 rounded-2xl text-amber-500">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
        <div class="mt-4 text-[11px] font-medium text-gray-400 uppercase tracking-wider">Berita {{ bulanSekarang }}</div>
      </div>

      <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 transition-all hover:shadow-xl hover:-translate-y-1">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-semibold text-gray-500 mb-1">Minggu Ini</p>
            <p class="text-3xl font-extrabold text-gray-900">{{ statistik.beritaMingguIni }}</p>
          </div>
          <div class="w-12 h-12 flex items-center justify-center bg-purple-50 rounded-2xl text-purple-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
        </div>
        <div class="mt-4 text-[11px] font-medium text-gray-400 uppercase tracking-wider">7 Hari Terakhir</div>
      </div>
    </div>

    <!-- Grafik Sederhana -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Grafik Kategori -->
      <div class="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
        <h3 class="font-extrabold text-gray-900 mb-6">Distribusi Kategori Berita</h3>
        <div class="space-y-4">
          <div v-for="(item, index) in kategoriStats" :key="item.nama" class="flex items-center gap-4">
            <span class="text-sm font-bold text-gray-600 w-32 truncate">{{ item.nama }}</span>
            <div class="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden relative">
              <div 
                class="absolute inset-y-0 left-0 rounded-full transition-all duration-1000"
                :class="warnaKategori[index % warnaKategori.length]"
                :style="{ width: item.persentase + '%' }"
              ></div>
            </div>
            <span class="text-sm font-bold text-gray-400 w-12 text-right">{{ item.jumlah }}</span>
          </div>
        </div>
      </div>

      <!-- Aktivitas Terbaru -->
      <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
        <h3 class="font-extrabold text-gray-900 mb-6">Berita Terbaru</h3>
        <div class="space-y-4">
          <div v-for="berita in beritaTerbaru" :key="berita.id" class="flex items-start gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
            <div class="w-2.5 h-2.5 mt-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50 shrink-0"></div>
            <div>
              <p class="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug hover:text-emerald-600 cursor-pointer transition-colors">{{ berita.title }}</p>
              <p class="text-[11px] font-medium text-gray-400 mt-1 uppercase tracking-wider">{{ formatDate(berita.created_at) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
      <h3 class="font-extrabold text-gray-900 mb-6">Aksi Cepat</h3>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <NuxtLink to="/admin/tambah-berita" class="group flex flex-col items-center gap-3 p-5 bg-emerald-50 rounded-2xl hover:bg-emerald-500 transition-all duration-300 border border-emerald-100 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-1">
          <div class="p-3 bg-emerald-600 rounded-2xl text-white group-hover:bg-white group-hover:text-emerald-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </div>
          <span class="text-sm font-bold text-emerald-800 group-hover:text-white transition-colors">Tambah Berita</span>
        </NuxtLink>
        
        <NuxtLink to="/admin/berita" class="group flex flex-col items-center gap-3 p-5 bg-blue-50 rounded-2xl hover:bg-blue-500 transition-all duration-300 border border-blue-100 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1">
          <div class="p-3 bg-blue-600 rounded-2xl text-white group-hover:bg-white group-hover:text-blue-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6m4 0h.01"></path>
            </svg>
          </div>
          <span class="text-sm font-bold text-blue-800 group-hover:text-white transition-colors">Lihat Berita</span>
        </NuxtLink>
        
        <NuxtLink to="/admin/layanan" class="group flex flex-col items-center gap-3 p-5 bg-purple-50 rounded-2xl hover:bg-purple-500 transition-all duration-300 border border-purple-100 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1">
          <div class="p-3 bg-purple-600 rounded-2xl text-white group-hover:bg-white group-hover:text-purple-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <span class="text-sm font-bold text-purple-800 group-hover:text-white transition-colors">Kelola Layanan</span>
        </NuxtLink>
        
        <NuxtLink to="/admin/pengaturan" class="group flex flex-col items-center gap-3 p-5 bg-slate-50 rounded-2xl hover:bg-slate-700 transition-all duration-300 border border-slate-200 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/20 hover:-translate-y-1">
          <div class="p-3 bg-slate-700 rounded-2xl text-white group-hover:bg-white group-hover:text-slate-700 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <span class="text-sm font-bold text-slate-700 group-hover:text-white transition-colors">Pengaturan</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// INI BAGIAN TERPENTING: Memberitahu Nuxt untuk menggunakan layout 'admin'
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

// Ambil data berita
const { data: beritaList, pending, refresh } = await useAsyncData('admin-dashboard', async () => {
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

// Hitung total layanan dari localStorage
const totalLayanan = computed(() => {
  try {
    const saved = localStorage.getItem('layanan_desa')
    if (saved) {
      const layanan = JSON.parse(saved)
      return layanan.length || 0
    }
  } catch (e) {}
  return 0
})

// Statistik berita
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

// Statistik kategori
const kategoriStats = computed(() => {
  const list = beritaList.value || []
  const total = list.length || 1
  
  const kategoriMap = {}
  list.forEach(item => {
    const cat = item.category || 'Umum'
    kategoriMap[cat] = (kategoriMap[cat] || 0) + 1
  })
  
  return Object.entries(kategoriMap).map(([nama, jumlah]) => ({
    nama,
    jumlah,
    persentase: Math.round((jumlah / total) * 100)
  }))
})

const warnaKategori = ['bg-emerald-500', 'bg-blue-500', 'bg-amber-500', 'bg-purple-500', 'bg-rose-500']
const beritaTerbaru = computed(() => (beritaList.value || []).slice(0, 3))

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

// Catatan: Fungsi handleLogout dihapus dari sini karena sudah ditangani oleh AdminSidebar.vue
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>