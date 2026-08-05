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

          <!-- Button Action (Memicu Modal) -->
          <button 
            @click="openModal(layanan)" 
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

    <!-- ============================================ -->
    <!-- MODAL PILIH JENIS SURAT (INTERAKTIF)         -->
    <!-- ============================================ -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" @click="closeModal"></div>
      
      <div 
        v-motion
        :initial="{ opacity: 0, scale: 0.95, y: 20 }"
        :enter="{ opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } }"
        class="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
      >
        <!-- Modal Header -->
        <div class="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 class="text-lg font-bold text-gray-900">Pilih Jenis Surat</h3>
            <p class="text-sm text-gray-500">{{ selectedLayanan?.nama }}</p>
          </div>
          <button @click="closeModal" class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- Modal Body (Radio List) -->
        <div class="p-6 overflow-y-auto">
          <p class="text-sm text-gray-600 mb-4">Silakan pilih spesifik dokumen atau surat yang ingin Anda urus:</p>
          <div class="space-y-3">
            <label 
              v-for="(item, idx) in selectedLayanan?.items" 
              :key="idx"
              class="flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200"
              :class="selectedJenis === item ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500 shadow-sm' : 'border-gray-200 hover:border-emerald-300 hover:bg-slate-50'"
            >
              <input type="radio" :value="item" v-model="selectedJenis" class="hidden" />
              <div class="flex-1">
                <span class="block text-sm font-semibold" :class="selectedJenis === item ? 'text-emerald-900' : 'text-gray-900'">{{ item }}</span>
              </div>
              <div 
                class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ml-3"
                :class="selectedJenis === item ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'"
              >
                <svg v-if="selectedJenis === item" class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </label>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="p-6 border-t border-gray-100 bg-slate-50 flex gap-3">
          <button @click="closeModal" class="flex-1 px-4 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors">
            Batal
          </button>
          <button 
            @click="lanjutkanPengajuan" 
            :disabled="!selectedJenis"
            class="flex-1 px-4 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            Lanjut Isi Form
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
    
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

// STATE MODAL
const showModal = ref(false)
const selectedLayanan = ref(null)
const selectedJenis = ref('')

// ============================================
// STEPS DATA (Untuk Bagian Cara Kerja)
// ============================================
const steps = [
  { title: "Pilih Layanan", desc: "Temukan jenis surat atau dokumen yang ingin Anda urus dari daftar layanan di atas." },
  { title: "Isi Formulir", desc: "Lengkapi data diri dan unggah foto/dokumen pendukung (KTP/KK) secara online." },
  { title: "Verifikasi", desc: "Perangkat desa akan memeriksa dan memverifikasi pengajuan Anda dalam 1x24 jam." },
  { title: "Selesai", desc: "Surat telah ditandatangani digital dan siap diunduh atau diambil di balai desa." }
]

// ============================================
// MODAL LOGIC
// ============================================
const openModal = (layanan) => {
  selectedLayanan.value = layanan
  // Default pilih item pertama agar lebih user-friendly
  selectedJenis.value = layanan.items.length > 0 ? layanan.items[0] : ''
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  // Beri jeda animasi sebelum menghapus data
  setTimeout(() => {
    selectedLayanan.value = null
    selectedJenis.value = ''
  }, 300)
}

const lanjutkanPengajuan = () => {
  if (!selectedJenis.value) return
  
  router.push({
    path: '/pengajuan-layanan',
    query: {
      layanan_id: selectedLayanan.value.id,
      layanan: selectedLayanan.value.nama,
      jenis: selectedJenis.value // MENGIRIM JENIS SURAT KE FORM
    }
  })
  
  closeModal()
}

// ============================================
// ESTETIKA WARNA & LAINNYA
// ============================================
const colorMap = {
  blue: { bg: 'hover:border-blue-200', iconBg: 'bg-blue-50 text-blue-600', dot: 'bg-blue-500', button: 'bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-600 hover:text-white hover:border-blue-600' },
  emerald: { bg: 'hover:border-emerald-200', iconBg: 'bg-emerald-50 text-emerald-600', dot: 'bg-emerald-500', button: 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-600 hover:text-white hover:border-emerald-600' },
  amber: { bg: 'hover:border-amber-200', iconBg: 'bg-amber-50 text-amber-600', dot: 'bg-amber-500', button: 'bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-500 hover:text-white hover:border-amber-500' },
  rose: { bg: 'hover:border-rose-200', iconBg: 'bg-rose-50 text-rose-600', dot: 'bg-rose-500', button: 'bg-rose-50 text-rose-700 border-rose-100 hover:bg-rose-600 hover:text-white hover:border-rose-600' },
  purple: { bg: 'hover:border-purple-200', iconBg: 'bg-purple-50 text-purple-600', dot: 'bg-purple-500', button: 'bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-600 hover:text-white hover:border-purple-600' },
  teal: { bg: 'hover:border-teal-200', iconBg: 'bg-teal-50 text-teal-600', dot: 'bg-teal-500', button: 'bg-teal-50 text-teal-700 border-teal-100 hover:bg-teal-600 hover:text-white hover:border-teal-600' }
}

const getCardBg = (index) => colorMap[layananList.value[index]?.warna || 'blue']?.bg
const getIconBg = (index) => colorMap[layananList.value[index]?.warna || 'blue']?.iconBg
const getIconColor = (index) => ''
const getDotColor = (index) => colorMap[layananList.value[index]?.warna || 'blue']?.dot
const getButtonClass = (index) => colorMap[layananList.value[index]?.warna || 'blue']?.button

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
    const { data, error } = await supabase.from('layanan').select('*').order('id', { ascending: true })
    if (error) throw error
    if (data && data.length > 0) {
      layananList.value = data
      if (process.client) localStorage.setItem('layanan_desa', JSON.stringify(data))
    }
  } catch (error) {
    if (process.client) {
      const saved = localStorage.getItem('layanan_desa')
      if (saved) layananList.value = JSON.parse(saved)
    }
  } finally {
    pending.value = false
  }
}

await loadLayanan()
</script>

<style scoped>
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.animate-spin { animation: spin 0.8s linear infinite; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
</style>