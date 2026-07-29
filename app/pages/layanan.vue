<template>
  <div class="bg-slate-50 min-h-screen pb-24 font-['Poppins']">
    
    <!-- HERO SECTION -->
    <section class="relative bg-slate-900 pt-32 pb-40 lg:pt-40 lg:pb-48 overflow-hidden">
      <div class="absolute inset-0 bg-[url('/bg-desa.png')] bg-cover bg-center bg-no-repeat"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-50 backdrop-blur-sm"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-emerald-300 text-sm font-medium mb-6 border border-white/20 backdrop-blur-md shadow-sm"
        >
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Layanan Online
        </div>

        <h1 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
          class="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight"
        >
          Layanan Publik <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Digital</span>
        </h1>
        <p 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
          class="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Akses layanan administrasi desa dengan lebih cepat, transparan, dan tanpa antrean. Semua dalam genggaman Anda.
        </p>
      </div>
    </section>

    <!-- DAFTAR LAYANAN -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
      
      <!-- Loading State -->
      <div v-if="pending" class="flex justify-center py-12 bg-white/50 backdrop-blur-md rounded-3xl border border-white">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-600/30 border-t-emerald-600"></div>
      </div>

      <!-- Grid Layanan -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(layanan, index) in layananList" 
          :key="layanan.id"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 500, delay: index * 100 } }"
          class="group bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-slate-200/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full"
          :class="getCardBg(index)"
        >
          <!-- Header Icon & Title -->
          <div class="flex items-start gap-5 mb-6">
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" :class="getIconBg(index)">
              <svg class="w-7 h-7" :class="getIconColor(index)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="layanan.icon || 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'"/>
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold text-gray-900 mb-1 line-clamp-2">{{ layanan.nama }}</h2>
              <p class="text-xs text-gray-500 font-medium uppercase tracking-wider">{{ layanan.deskripsi }}</p>
            </div>
          </div>
          
          <!-- Daftar Item Layanan -->
          <ul class="space-y-3 text-gray-600 text-sm flex-grow mb-8">
            <li 
              v-for="item in layanan.items" 
              :key="item"
              class="flex items-start gap-3 transition-colors"
            >
              <span class="w-2 h-2 rounded-full mt-1.5 shrink-0" :class="getDotColor(index)"></span>
              <span class="leading-relaxed">{{ item }}</span>
            </li>
          </ul>

          <!-- Button Action -->
          <button 
            @click="ajukanLayanan(layanan)" 
            class="w-full py-3 px-4 font-semibold rounded-xl transition-all duration-300 border flex justify-center items-center gap-2"
            :class="getButtonClass(index)"
          >
            Ajukan Surat
            <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!pending && layananList.length === 0" class="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200 shadow-sm p-16 text-center mt-8">
        <div class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Belum ada layanan</h3>
        <p class="text-gray-500">Layanan digital saat ini sedang dalam penyesuaian. Silakan cek kembali nanti.</p>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- CARA KERJA (Steps 1-4)                       -->
    <!-- ============================================ -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-extrabold text-gray-900 mb-4">Bagaimana Cara Kerjanya?</h2>
        <p class="text-gray-500 max-w-2xl mx-auto">Proses pengajuan dokumen dari rumah yang sangat ringkas, transparan, dan dapat dilacak kapan saja.</p>
      </div>

      <div class="relative">
        <div class="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-emerald-200 -z-10"></div>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 text-center">
          <div 
            v-for="(step, index) in steps" 
            :key="index" 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 500, delay: index * 150 } }"
            class="relative group"
          >
            <div class="w-20 h-20 bg-white text-emerald-600 rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-6 border-4 border-emerald-50 shadow-xl shadow-emerald-900/5 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
              {{ index + 1 }}
            </div>
            
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow duration-300">
              <h3 class="text-lg font-bold text-gray-900 mb-3">{{ step.title }}</h3>
              <p class="text-sm text-gray-500 leading-relaxed">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- ⭐ TRACKING LAYANAN (Step 5)                  -->
    <!-- ============================================ -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <div class="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 md:p-12 shadow-2xl shadow-emerald-600/20">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <!-- Kiri: Icon & Teks -->
          <div class="flex items-center gap-5">
            <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
            <div>
              <h3 class="text-white text-2xl font-bold">
                Sudah Mengajukan?
              </h3>
              <p class="text-emerald-100 text-sm md:text-base">
                Cek status pengajuan Anda sekarang juga
              </p>
            </div>
          </div>

          <!-- Kanan: Form Cek Status -->
          <div class="w-full md:w-auto flex-1 max-w-md">
            <div class="flex gap-3">
              <input 
                v-model="trackingNomor" 
                type="text" 
                placeholder="Masukkan nomor pengajuan..."
                class="flex-1 px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white focus:outline-none bg-white/90 backdrop-blur-sm placeholder-gray-400 text-gray-900"
                @keyup.enter="goToTracking"
              >
              <button 
                @click="goToTracking"
                class="px-5 py-3 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition shadow-lg flex items-center gap-2 whitespace-nowrap"
              >
                Cek
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </button>
            </div>
            <p class="text-emerald-100 text-xs mt-2">
              Contoh: P202601290001
            </p>
          </div>
        </div>

        <!-- Info Tambahan -->
        <div class="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-sm text-emerald-100">
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center gap-1">
              <span class="w-2 h-2 bg-emerald-300 rounded-full"></span>
              Menunggu
            </span>
            <span class="inline-flex items-center gap-1 ml-3">
              <span class="w-2 h-2 bg-blue-300 rounded-full"></span>
              Diproses
            </span>
            <span class="inline-flex items-center gap-1 ml-3">
              <span class="w-2 h-2 bg-green-300 rounded-full"></span>
              Selesai
            </span>
            <span class="inline-flex items-center gap-1 ml-3">
              <span class="w-2 h-2 bg-red-300 rounded-full"></span>
              Ditolak
            </span>
          </div>
          <NuxtLink to="/tracking" class="text-white font-medium hover:underline flex items-center gap-1">
            Lihat semua status
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>
    
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const router = useRouter()

// ============================================
// STATE
// ============================================
const pending = ref(true)
const layananList = ref([])
const trackingNomor = ref('')

// ============================================
// STEPS DATA
// ============================================
const steps = [
  { title: "Pilih Layanan", desc: "Temukan jenis surat atau dokumen yang ingin Anda urus dari daftar layanan di atas." },
  { title: "Isi Formulir", desc: "Lengkapi data diri dan unggah foto/dokumen pendukung (KTP/KK) secara online." },
  { title: "Verifikasi", desc: "Perangkat desa akan memeriksa dan memverifikasi pengajuan Anda dalam 1x24 jam." },
  { title: "Selesai", desc: "Surat telah ditandatangani digital dan siap diunduh atau diambil di balai desa." }
]

// ============================================
// ESTETIKA WARNA
// ============================================
const colorMap = {
  blue: {
    bg: 'hover:border-blue-200',
    iconBg: 'bg-blue-50 text-blue-600',
    iconColor: '',
    dot: 'bg-blue-500',
    button: 'bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-600 hover:text-white hover:border-blue-600'
  },
  emerald: {
    bg: 'hover:border-emerald-200',
    iconBg: 'bg-emerald-50 text-emerald-600',
    iconColor: '',
    dot: 'bg-emerald-500',
    button: 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-600 hover:text-white hover:border-emerald-600'
  },
  amber: {
    bg: 'hover:border-amber-200',
    iconBg: 'bg-amber-50 text-amber-600',
    iconColor: '',
    dot: 'bg-amber-500',
    button: 'bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-500 hover:text-white hover:border-amber-500'
  },
  rose: {
    bg: 'hover:border-rose-200',
    iconBg: 'bg-rose-50 text-rose-600',
    iconColor: '',
    dot: 'bg-rose-500',
    button: 'bg-rose-50 text-rose-700 border-rose-100 hover:bg-rose-600 hover:text-white hover:border-rose-600'
  },
  purple: {
    bg: 'hover:border-purple-200',
    iconBg: 'bg-purple-50 text-purple-600',
    iconColor: '',
    dot: 'bg-purple-500',
    button: 'bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-600 hover:text-white hover:border-purple-600'
  },
  teal: {
    bg: 'hover:border-teal-200',
    iconBg: 'bg-teal-50 text-teal-600',
    iconColor: '',
    dot: 'bg-teal-500',
    button: 'bg-teal-50 text-teal-700 border-teal-100 hover:bg-teal-600 hover:text-white hover:border-teal-600'
  }
}

const getCardBg = (index) => {
  const warna = layananList.value[index]?.warna || 'blue'
  return colorMap[warna]?.bg || 'hover:border-gray-200'
}

const getIconBg = (index) => {
  const warna = layananList.value[index]?.warna || 'blue'
  return colorMap[warna]?.iconBg || 'bg-gray-50 text-gray-600'
}

const getIconColor = (index) => {
  return ''
}

const getDotColor = (index) => {
  const warna = layananList.value[index]?.warna || 'blue'
  return colorMap[warna]?.dot || 'bg-gray-400'
}

const getButtonClass = (index) => {
  const warna = layananList.value[index]?.warna || 'blue'
  return colorMap[warna]?.button || 'bg-gray-50 text-gray-700 border-gray-100 hover:bg-gray-600 hover:text-white'
}

// ============================================
// FUNGSI KE TRACKING
// ============================================
const goToTracking = () => {
  if (trackingNomor.value.trim()) {
    router.push(`/tracking?nomor=${trackingNomor.value.trim()}`)
  } else {
    router.push('/tracking')
  }
}

// ============================================
// LOAD LAYANAN
// ============================================
const loadLayanan = async () => {
  pending.value = true
  try {
    const { data, error } = await supabase
      .from('layanan')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.error('Error fetching layanan from Supabase:', error)
      loadFromLocalStorage()
      pending.value = false
      return
    }

    if (data && data.length > 0) {
      layananList.value = data
      if (process.client) {
        localStorage.setItem('layanan_desa', JSON.stringify(data))
      }
    } else {
      loadFromLocalStorage()
    }
  } catch (error) {
    console.error('Error:', error)
    loadFromLocalStorage()
  }
  pending.value = false
}

const loadFromLocalStorage = () => {
  if (process.client) {
    const saved = localStorage.getItem('layanan_desa')
    if (saved) {
      try {
        layananList.value = JSON.parse(saved)
        return
      } catch (e) {
        console.error('Gagal load layanan dari localStorage:', e)
      }
    }
  }
  setDefaultLayanan()
}

const setDefaultLayanan = () => {
  layananList.value = [
    {
      id: 1,
      nama: 'Administrasi Warga',
      deskripsi: 'Layanan administrasi kependudukan untuk warga desa',
      items: ['Pengantar KTP / KK', 'Pengantar Akta Kelahiran', 'Surat Keterangan Domisili'],
      warna: 'blue',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    },
    {
      id: 2,
      nama: 'Perizinan & Usaha',
      deskripsi: 'Layanan perizinan untuk usaha mikro dan kegiatan',
      items: ['Surat Izin Usaha Mikro (IUMK)', 'Izin Keramaian', 'Keterangan Tidak Mampu (SKTM)'],
      warna: 'amber',
      icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    },
    {
      id: 3,
      nama: 'Pusat Pelaporan',
      deskripsi: 'Laporan dan aduan masyarakat untuk perbaikan desa',
      items: ['Lapor Fasilitas Rusak', 'Aduan Keamanan & Ketertiban', 'Kotak Saran Kepala Desa'],
      warna: 'rose',
      icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z'
    }
  ]
}

const ajukanLayanan = (layanan) => {
  router.push({
    path: '/pengajuan-layanan',
    query: {
      layanan_id: layanan.id,
      layanan: layanan.nama
    }
  })
}

// ============================================
// LOAD DATA
// ============================================
await loadLayanan()
</script>

<style scoped>
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 0.8s linear infinite;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>