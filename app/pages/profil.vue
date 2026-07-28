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
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Tentang Kami
        </div>

        <h1 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
          class="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight"
        >
          Profil Desa <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">{{ profil.nama_desa || 'Kawat' }}</span>
        </h1>
        <p 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
          class="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Mengenal lebih dekat sejarah, visi misi, dan jajaran perangkat desa yang berdedikasi melayani masyarakat.
        </p>
      </div>
    </section>

    <!-- Loading State -->
    <div v-if="pending" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
      <div class="flex justify-center py-20">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-600/30 border-t-emerald-600"></div>
      </div>
    </div>

    <!-- Content -->
    <template v-else>
      <!-- SECTION SEJARAH & VISI MISI -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <!-- Kartu Sejarah -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
            class="bg-white/95 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-white/40 flex flex-col justify-center"
          >
            <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Sejarah Singkat</h2>
            <p class="text-gray-500 leading-relaxed text-justify">
              {{ profil.sejarah || 'Belum ada sejarah yang ditambahkan oleh admin.' }}
            </p>
          </div>

          <!-- Kartu Visi Misi -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
            class="bg-gradient-to-br from-emerald-50 to-teal-50/30 rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/40 border border-emerald-100/50 flex flex-col justify-center"
          >
            <div class="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-600/30">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Visi & Misi</h2>
            
            <div class="mb-6 relative">
              <h3 class="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">Visi</h3>
              <p class="text-gray-700 italic font-medium leading-relaxed">
                "{{ profil.visi || 'Belum ada visi yang ditambahkan oleh admin.' }}"
              </p>
            </div>
            
            <div>
              <h3 class="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3">Misi</h3>
              <ul class="space-y-3">
                <li 
                  v-for="(item, index) in profil.misi || []" 
                  :key="index"
                  class="flex items-start gap-3 text-gray-600"
                >
                  <svg class="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  <span class="leading-relaxed">{{ item }}</span>
                </li>
                <li v-if="!profil.misi || profil.misi.length === 0" class="text-gray-400 text-sm">
                  Belum ada misi yang ditambahkan oleh admin.
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      <!-- SECTION STRUKTUR ORGANISASI -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div class="text-center mb-24">
          <h2 class="text-3xl font-extrabold text-gray-900 mb-4">Struktur Organisasi</h2>
          <p class="text-gray-500 max-w-2xl mx-auto">Jajaran perangkat desa yang berkomitmen penuh dan berdedikasi tinggi untuk kemajuan bersama.</p>
        </div>

        <!-- Grid Layout -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-20">
          
          <div 
            v-for="(pejabat, index) in perangkatDesa" 
            :key="pejabat.id || index"
            v-motion
            :initial="{ opacity: 0, y: 40 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 500, delay: index * 100 } }"
            class="relative bg-white rounded-3xl p-6 pt-16 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group"
          >
            <!-- Floating Avatar dengan Foto -->
            <div class="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-slate-50 border-4 border-white shadow-md overflow-hidden group-hover:scale-110 group-hover:border-emerald-100 transition-all duration-300 flex items-center justify-center">
              <img 
                v-if="pejabat.foto_url" 
                :src="pejabat.foto_url" 
                :alt="pejabat.nama"
                class="w-full h-full object-cover"
              />
              <svg v-else class="w-12 h-12 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            
            <!-- Informasi Pejabat -->
            <h3 class="text-lg font-bold text-gray-900 mt-2 line-clamp-1">{{ pejabat.nama }}</h3>
            
            <!-- Lencana Jabatan -->
            <div class="mt-3 px-4 py-1.5 bg-emerald-50 text-emerald-600 text-[11px] font-bold uppercase tracking-wider rounded-full border border-emerald-100">
              {{ pejabat.jabatan }}
            </div>
            
            <div class="mt-4 pt-4 border-t border-slate-100 w-full">
              <p class="text-xs text-slate-400 font-medium">NIP. {{ pejabat.nip || '-' }}</p>
            </div>
          </div>

        </div>

        <!-- Empty State -->
        <div v-if="perangkatDesa.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <p class="text-gray-400 font-medium">Belum ada data perangkat desa</p>
          <p class="text-sm text-gray-400 mt-1">Admin akan segera menambahkan</p>
        </div>
      </section>
      
    </template>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()

// State
const pending = ref(true)
const profil = ref({
  nama_desa: 'Desa Kawat',
  sejarah: '',
  visi: '',
  misi: [],
  alamat: '',
  email: '',
  telepon: '',
  website: ''
})
const perangkatDesa = ref([])

// Load data profil desa
const loadProfil = async () => {
  try {
    const { data, error } = await supabase
      .from('profil_desa')
      .select('*')
      .limit(1)
      .single()

    if (!error && data) {
      profil.value = data
    }
  } catch (error) {
    console.error('Error loading profil:', error)
  }
}

// Load data perangkat desa (hanya yang aktif)
const loadPerangkat = async () => {
  try {
    const { data, error } = await supabase
      .from('perangkat_desa')
      .select('*')
      .eq('is_active', true)
      .order('urutan', { ascending: true })

    if (!error && data) {
      perangkatDesa.value = data
    }
  } catch (error) {
    console.error('Error loading perangkat desa:', error)
  }
}

// Load semua data
const loadData = async () => {
  pending.value = true
  await Promise.all([loadProfil(), loadPerangkat()])
  pending.value = false
}

await loadData()
</script>

<style scoped>
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 0.8s linear infinite;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>