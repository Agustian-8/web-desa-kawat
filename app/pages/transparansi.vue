<template>
  <div class="bg-slate-50 min-h-screen pb-24 font-['Poppins']">
    
    <!-- HERO SECTION -->
    <section class="relative bg-slate-900 pt-32 pb-40 lg:pt-40 lg:pb-48 overflow-hidden">
      <div class="absolute inset-0 bg-[url('/bg-desa.png')] bg-cover bg-center bg-no-repeat"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/75 to-slate-50 backdrop-blur-[2px]"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-emerald-300 text-sm font-medium mb-6 border border-white/20 backdrop-blur-md shadow-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Data Terbuka {{ tahunSekarang }}
        </div>

        <h1 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
          class="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight"
        >
          Transparansi <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Dana Desa</span>
        </h1>
        <p 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
          class="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Komitmen kami untuk menyajikan informasi pengelolaan anggaran secara terbuka, akuntabel, dan dapat diakses oleh seluruh masyarakat.
        </p>
      </div>
    </section>

    <!-- Loading -->
    <div v-if="pending" class="flex justify-center py-20">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-600/30 border-t-emerald-600"></div>
    </div>

    <!-- Content -->
    <template v-else>
      <!-- RINGKASAN ANGGARAN -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <!-- Kartu Pendapatan -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 500 } }"
            class="bg-white/95 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="text-gray-500 text-sm font-bold uppercase tracking-wider">Total Pendapatan</div>
              <div class="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
            </div>
            <div class="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
              {{ formatRupiah(anggaran.total_pendapatan) }}
            </div>
            <div class="flex items-center text-sm font-semibold text-emerald-600 bg-emerald-50 w-max px-3 py-1 rounded-full">
              <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              Telah Diterima 100%
            </div>
          </div>

          <!-- Kartu Belanja -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 500, delay: 100 } }"
            class="bg-white/95 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="text-gray-500 text-sm font-bold uppercase tracking-wider">Total Belanja</div>
              <div class="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </div>
            </div>
            <div class="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
              {{ formatRupiah(anggaran.total_belanja) }}
            </div>
            <div class="flex items-center text-sm font-semibold text-amber-600 bg-amber-50 w-max px-3 py-1 rounded-full">
              <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Terserap {{ persentaseSerap }}%
            </div>
          </div>

          <!-- Kartu SILPA -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200 } }"
            class="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 rounded-3xl border border-emerald-400 shadow-xl shadow-emerald-900/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group text-white"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="text-emerald-100 text-sm font-bold uppercase tracking-wider">Estimasi SILPA</div>
              <div class="w-10 h-10 bg-white/20 backdrop-blur-sm text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
              </div>
            </div>
            <div class="text-4xl font-extrabold mb-4 tracking-tight">
              {{ formatRupiah(anggaran.estimasi_silpa) }}
            </div>
            <div class="text-xs text-emerald-100 font-medium bg-black/10 w-max px-3 py-1.5 rounded-full">
              *Sisa Lebih Perhitungan Anggaran
            </div>
          </div>

        </div>
      </section>

      <!-- RINCIAN ALOKASI -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div class="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/40 border border-slate-100">
          <h2 class="text-3xl font-extrabold text-gray-900 mb-10 flex items-center gap-3">
            <span class="w-2 h-8 bg-emerald-500 rounded-full block"></span> 
            Rincian Alokasi Belanja
          </h2>
          
          <div class="space-y-10">
            <div 
              v-for="(item, index) in alokasiList" 
              :key="item.id"
              v-motion 
              :initial="{ opacity: 0, x: -20 }" 
              :visible="{ opacity: 1, x: 0, transition: { duration: 500, delay: index * 100 } }" 
              class="group"
            >
              <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-3 gap-2">
                <div>
                  <h3 class="text-lg font-bold text-gray-800">{{ item.nama }}</h3>
                  <p class="text-sm text-gray-500 mt-1">{{ item.deskripsi || '-' }}</p>
                </div>
                <div class="text-left sm:text-right">
                  <span class="font-extrabold text-gray-900 text-xl">{{ formatRupiah(item.nominal) }}</span>
                  <span class="text-sm font-bold block" :class="warnaText(item.warna)">{{ item.persentase }}%</span>
                </div>
              </div>
              <div class="w-full bg-slate-100 rounded-full h-4 overflow-hidden relative">
                <div 
                  class="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out group-hover:opacity-90" 
                  :class="warnaBar(item.warna)"
                  :style="{ width: item.persentase + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- PROGRES PEMBANGUNAN -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-extrabold text-gray-900 mb-4">Progres Pembangunan Fisik</h2>
          <p class="text-gray-500 max-w-2xl mx-auto">Pantau status terkini pengerjaan proyek infrastruktur di wilayah desa.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div 
            v-for="(project, index) in progresList" 
            :key="project.id"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 500, delay: index * 100 } }"
            class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/5 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group"
          >
            <div class="absolute -right-10 -top-10 w-32 h-32 bg-slate-50 rounded-full blur-2xl group-hover:bg-emerald-50 transition-colors z-0 pointer-events-none"></div>

            <div class="relative z-10">
              <div class="flex flex-wrap justify-between items-start gap-4 mb-6">
                <h3 class="font-bold text-gray-900 text-lg max-w-[70%] leading-snug">{{ project.judul }}</h3>
                <span 
                  class="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border shadow-sm"
                  :class="statusClass(project.status)"
                >
                  {{ project.status }}
                </span>
              </div>
              
              <div class="space-y-3 mb-8">
                <div class="flex items-center gap-3 text-sm text-gray-600 font-medium">
                  <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  {{ project.lokasi || '-' }}
                </div>
                <div class="flex items-center gap-3 text-sm text-gray-600 font-medium">
                  <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  {{ project.anggaran || '-' }}
                </div>
              </div>
              
              <div>
                <div class="flex justify-between items-end mb-2">
                  <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Progres Pengerjaan</span>
                  <span 
                    class="font-extrabold text-lg"
                    :class="progresColor(project.status)"
                  >
                    {{ project.progress }}%
                  </span>
                </div>
                <div class="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div 
                    class="h-2.5 rounded-full transition-all duration-1000 ease-out" 
                    :class="progresBar(project.status)"
                    :style="`width: ${project.progress}%`"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()

// State
const pending = ref(true)
const anggaran = ref({
  total_pendapatan: 0,
  total_belanja: 0,
  estimasi_silpa: 0
})
const alokasiList = ref([])
const progresList = ref([])

// Tahun sekarang
const tahunSekarang = ref(new Date().getFullYear())

// Format Rupiah
const formatRupiah = (value) => {
  if (!value) return 'Rp 0'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

// Hitung persentase serap
const persentaseSerap = computed(() => {
  if (anggaran.value.total_pendapatan === 0) return 0
  return Math.round((anggaran.value.total_belanja / anggaran.value.total_pendapatan) * 100)
})

// Warna untuk alokasi
const warnaMap = {
  blue: { bar: 'bg-gradient-to-r from-blue-400 to-blue-500', text: 'text-blue-500' },
  emerald: { bar: 'bg-gradient-to-r from-emerald-400 to-emerald-500', text: 'text-emerald-500' },
  amber: { bar: 'bg-gradient-to-r from-amber-400 to-amber-500', text: 'text-amber-500' },
  purple: { bar: 'bg-gradient-to-r from-purple-400 to-purple-500', text: 'text-purple-500' },
  rose: { bar: 'bg-gradient-to-r from-rose-400 to-rose-500', text: 'text-rose-500' }
}

const warnaBar = (warna) => {
  return warnaMap[warna]?.bar || 'bg-gradient-to-r from-blue-400 to-blue-500'
}

const warnaText = (warna) => {
  return warnaMap[warna]?.text || 'text-blue-500'
}

// Status progres
const statusClass = (status) => {
  const classes = {
    'Selesai': 'bg-emerald-50 text-emerald-600 border-emerald-100',
    'Dalam Pengerjaan': 'bg-amber-50 text-amber-600 border-amber-100',
    'Persiapan': 'bg-blue-50 text-blue-600 border-blue-100',
    'Ditunda': 'bg-red-50 text-red-600 border-red-100'
  }
  return classes[status] || 'bg-gray-50 text-gray-600 border-gray-100'
}

const progresColor = (status) => {
  const colors = {
    'Selesai': 'text-emerald-600',
    'Dalam Pengerjaan': 'text-amber-500',
    'Persiapan': 'text-blue-500',
    'Ditunda': 'text-red-500'
  }
  return colors[status] || 'text-gray-500'
}

const progresBar = (status) => {
  const bars = {
    'Selesai': 'bg-emerald-500',
    'Dalam Pengerjaan': 'bg-amber-400',
    'Persiapan': 'bg-blue-400',
    'Ditunda': 'bg-red-400'
  }
  return bars[status] || 'bg-gray-400'
}

// Load data dari database
const loadData = async () => {
  pending.value = true

  try {
    // 1. Load anggaran
    const { data: anggaranData } = await supabase
      .from('transparansi_anggaran')
      .select('*')
      .limit(1)
      .single()

    if (anggaranData) {
      anggaran.value = anggaranData
    }

    // 2. Load alokasi
    const { data: alokasiData } = await supabase
      .from('transparansi_alokasi')
      .select('*')
      .order('id', { ascending: true })

    if (alokasiData) {
      alokasiList.value = alokasiData
    }

    // 3. Load progres
    const { data: progresData } = await supabase
      .from('transparansi_progres')
      .select('*')
      .order('id', { ascending: true })

    if (progresData) {
      progresList.value = progresData
    }

  } catch (error) {
    console.error('Error loading transparansi data:', error)
  }

  pending.value = false
}

await loadData()
</script>