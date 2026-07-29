<template>
  <div>
    <!-- Header -->
    <div class="flex items-center gap-4 mb-8">
      <NuxtLink to="/admin" class="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Pengaturan Website</h1>
        <p class="text-sm text-gray-500">Atur konfigurasi dasar website desa</p>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="flex justify-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-600/30 border-t-emerald-600"></div>
    </div>

    <!-- Form -->
    <div v-else class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 max-w-4xl">
      <form @submit.prevent="simpanPengaturan" class="space-y-6">
        
        <!-- ========================================== -->
        <!-- TAB NAVIGASI (SEBELAHAN)                   -->
        <!-- ========================================== -->
        <div class="flex border-b border-gray-200">
          <button 
            @click="activeTab = 'data_desa'"
            class="px-6 py-3 font-medium transition-all duration-200 border-b-2"
            :class="activeTab === 'data_desa' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'"
          >
          Data Desa
          </button>
          <button 
            @click="activeTab = 'statistik'"
            class="px-6 py-3 font-medium transition-all duration-200 border-b-2"
            :class="activeTab === 'statistik' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'"
          >
          Statistik Beranda
          </button>
        </div>

        <!-- ========================================== -->
        <!-- TAB 1: DATA DESA                          -->
        <!-- ========================================== -->
        <div v-show="activeTab === 'data_desa'" class="pt-4">
          <p class="text-sm text-gray-500 mb-4">Informasi dasar desa yang tampil di website</p>
          
          <!-- Nama Desa -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Nama Desa <span class="text-red-500">*</span></label>
            <input 
              v-model="form.nama_desa" 
              type="text" 
              required
              class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="Desa Kawat"
            >
            <p class="text-xs text-gray-400 mt-1">Nama desa yang akan tampil di header website</p>
          </div>

          <!-- Deskripsi -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Deskripsi Website</label>
            <textarea 
              v-model="form.deskripsi" 
              rows="3"
              class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="Deskripsi singkat tentang website desa"
            ></textarea>
            <p class="text-xs text-gray-400 mt-1">Deskripsi yang akan tampil di footer</p>
          </div>

          <!-- Email -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Email Kontak</label>
            <input 
              v-model="form.email" 
              type="email" 
              class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="pemdes@kawat.desa.id"
            >
            <p class="text-xs text-gray-400 mt-1">Email yang akan tampil di footer</p>
          </div>

          <!-- Telepon -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
            <input 
              v-model="form.telepon" 
              type="text" 
              class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="+62 822-5244-4924"
            >
            <p class="text-xs text-gray-400 mt-1">Nomor telepon yang akan tampil di footer</p>
          </div>

          <!-- Alamat -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
            <textarea 
              v-model="form.alamat" 
              rows="2"
              class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="Kec. Tayan Hilir, Kab. Sanggau, Kalimantan Barat"
            ></textarea>
            <p class="text-xs text-gray-400 mt-1">Alamat yang akan tampil di footer</p>
          </div>

          <!-- Footer Text -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Teks Footer</label>
            <input 
              v-model="form.footer_text" 
              type="text" 
              class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="© 2026 Pemerintah Desa Kawat. All Rights Reserved."
            >
            <p class="text-xs text-gray-400 mt-1">Teks hak cipta yang akan tampil di bagian bawah footer</p>
          </div>

          <!-- Preview Data Desa -->
          <div class="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Preview Data Desa</p>
            <div class="text-sm text-slate-600 space-y-1">
              <p><span class="font-medium">Nama Desa:</span> {{ form.nama_desa || '-' }}</p>
              <p><span class="font-medium">Deskripsi:</span> {{ (form.deskripsi || '').substring(0, 80) }}{{ (form.deskripsi || '').length > 80 ? '...' : '' }}</p>
              <p><span class="font-medium">Email:</span> {{ form.email || '-' }}</p>
              <p><span class="font-medium">Telepon:</span> {{ form.telepon || '-' }}</p>
              <p><span class="font-medium">Alamat:</span> {{ form.alamat || '-' }}</p>
              <p><span class="font-medium">Footer:</span> {{ form.footer_text || '-' }}</p>
            </div>
          </div>
        </div>

        <!-- ========================================== -->
        <!-- TAB 2: STATISTIK BERANDA                  -->
        <!-- ========================================== -->
        <div v-show="activeTab === 'statistik'" class="pt-4">
          <p class="text-sm text-gray-500 mb-4">Data statistik yang tampil di halaman beranda website</p>

          <!-- Total Penduduk -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Total Penduduk <span class="text-red-500">*</span></label>
            <div class="flex gap-4 items-center">
              <input 
                v-model="formStatistik.total_penduduk" 
                type="text" 
                required
                class="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="Contoh: 2.450"
              >
              <span class="text-sm text-gray-400 whitespace-nowrap">Gunakan titik untuk ribuan</span>
            </div>
            <p class="text-xs text-gray-400 mt-1">Tampil di halaman beranda sebagai "Total Penduduk"</p>
          </div>

          <!-- Total Dusun -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Total Dusun <span class="text-red-500">*</span></label>
            <div class="flex gap-4 items-center">
              <input 
                v-model="formStatistik.total_dusun" 
                type="text" 
                required
                class="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="Contoh: 4"
              >
              <span class="text-sm text-gray-400 whitespace-nowrap">Jumlah dusun di desa</span>
            </div>
            <p class="text-xs text-gray-400 mt-1">Tampil di halaman beranda sebagai "Dusun Terintegrasi"</p>
          </div>

          <!-- Total Layanan -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Total Layanan Digital <span class="text-red-500">*</span></label>
            <div class="flex gap-4 items-center">
              <input 
                v-model="formStatistik.total_layanan" 
                type="text" 
                required
                class="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="Contoh: 9"
              >
              <span class="text-sm text-gray-400 whitespace-nowrap">Jumlah layanan digital tersedia</span>
            </div>
            <p class="text-xs text-gray-400 mt-1">Tampil di halaman beranda sebagai "Layanan Digital"</p>
          </div>

          <!-- Preview Statistik -->
          <div class="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Preview Statistik di Beranda</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                <p class="text-2xl font-bold text-gray-900">{{ formStatistik.total_penduduk || '2.450' }}</p>
                <p class="text-xs text-gray-500">Total Penduduk</p>
              </div>
              <div class="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                <p class="text-2xl font-bold text-gray-900">{{ formStatistik.total_dusun || '4' }}</p>
                <p class="text-xs text-gray-500">Dusun Terintegrasi</p>
              </div>
              <div class="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                <p class="text-2xl font-bold text-gray-900">{{ formStatistik.total_layanan || '9' }}</p>
                <p class="text-xs text-gray-500">Layanan Digital</p>
              </div>
            </div>
          </div>
        </div>

        <!-- ========================================== -->
        <!-- TOMBOL AKSI                               -->
        <!-- ========================================== -->
        <div class="flex gap-3 pt-4 border-t border-gray-200">
          <button 
            type="button" 
            @click="resetPengaturan"
            class="flex-1 px-4 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all"
          >
            Reset ke Default
          </button>
          <button 
            type="submit" 
            :disabled="loading"
            class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl shadow-md transition-all disabled:opacity-70 flex items-center justify-center gap-2"
          >
            <span v-if="loading" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
          Simpan
          </button>
        </div>

        <!-- Pesan Sukses -->
        <div v-if="successMessage" class="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-700 text-sm">
          ✅ {{ successMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })

const supabase = useSupabaseClient()
const router = useRouter()
const user = useSupabaseUser()

if (!user.value) {
  navigateTo('/login')
}

// ============================================
// STATE
// ============================================
const pending = ref(true)
const loading = ref(false)
const successMessage = ref('')
const activeTab = ref('data_desa') // 'data_desa' | 'statistik'

// Form Data Desa
const form = ref({
  id: null,
  nama_desa: '',
  deskripsi: '',
  email: '',
  telepon: '',
  alamat: '',
  footer_text: ''
})

// Form Statistik
const formStatistik = ref({
  total_penduduk: '2.450',
  total_dusun: '4',
  total_layanan: '9'
})

// Default values
const defaultValues = {
  nama_desa: 'Desa Kawat',
  deskripsi: 'Website resmi Pemerintah Desa Kawat. Berkomitmen mewujudkan pelayanan publik yang transparan, responsif, dan inovatif untuk kesejahteraan masyarakat.',
  email: 'pemdes@kawat.desa.id',
  telepon: '+62 822-5244-4924',
  alamat: 'Kec. Tayan Hilir, Kab. Sanggau, Kalimantan Barat',
  footer_text: '© 2026 Pemerintah Desa Kawat. All Rights Reserved.'
}

const defaultStatistik = {
  total_penduduk: '2.450',
  total_dusun: '4',
  total_layanan: '9'
}

// ============================================
// LOAD DATA
// ============================================
const loadPengaturan = async () => {
  pending.value = true
  try {
    // 1. Load data desa
    const { data, error } = await supabase
      .from('pengaturan_website')
      .select('*')
      .limit(1)
      .single()

    if (!error && data) {
      form.value = data
    } else {
      form.value = { ...defaultValues }
    }

    // 2. Load data statistik
    const { data: statData, error: statError } = await supabase
      .from('pengaturan')
      .select('*')

    if (!statError && statData && statData.length > 0) {
      statData.forEach(item => {
        if (item.key === 'total_penduduk') formStatistik.value.total_penduduk = item.value
        if (item.key === 'total_dusun') formStatistik.value.total_dusun = item.value
        if (item.key === 'total_layanan') formStatistik.value.total_layanan = item.value
      })
    } else {
      formStatistik.value = { ...defaultStatistik }
    }

  } catch (error) {
    console.error('Error loading pengaturan:', error)
    form.value = { ...defaultValues }
    formStatistik.value = { ...defaultStatistik }
  }
  pending.value = false
}

await loadPengaturan()

// ============================================
// SIMPAN PENGAWATURAN
// ============================================
const simpanPengaturan = async () => {
  loading.value = true
  successMessage.value = ''

  try {
    // 1. Simpan data desa
    const dataDesa = {
      nama_desa: form.value.nama_desa,
      deskripsi: form.value.deskripsi,
      email: form.value.email,
      telepon: form.value.telepon,
      alamat: form.value.alamat,
      footer_text: form.value.footer_text
    }

    if (form.value.id) {
      const { error } = await supabase
        .from('pengaturan_website')
        .update(dataDesa)
        .eq('id', form.value.id)
      if (error) throw error
    } else {
      const { error } = await supabase
        .from('pengaturan_website')
        .insert([dataDesa])
      if (error) throw error
    }

    // 2. Simpan data statistik
    const updates = [
      { key: 'total_penduduk', value: formStatistik.value.total_penduduk },
      { key: 'total_dusun', value: formStatistik.value.total_dusun },
      { key: 'total_layanan', value: formStatistik.value.total_layanan }
    ]

    for (const item of updates) {
      const { error } = await supabase
        .from('pengaturan')
        .update({ value: item.value, updated_at: new Date().toISOString() })
        .eq('key', item.key)

      if (error && error.code === 'PGRST116') {
        const { error: insertError } = await supabase
          .from('pengaturan')
          .insert([{ key: item.key, value: item.value }])
        if (insertError) throw insertError
      } else if (error) {
        throw error
      }
    }

    // 3. Simpan ke localStorage
    if (process.client) {
      localStorage.setItem('pengaturan_desa', JSON.stringify(form.value))
      localStorage.setItem('pengaturan_statistik', JSON.stringify(formStatistik.value))
    }

    successMessage.value = 'Semua pengaturan berhasil disimpan!'
    
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)

  } catch (error) {
    console.error('Error saving pengaturan:', error)
    alert('❌ Gagal menyimpan pengaturan: ' + error.message)
  } finally {
    loading.value = false
  }
}

// ============================================
// RESET KE DEFAULT
// ============================================
const resetPengaturan = () => {
  const konfirmasi = confirm('Reset ke pengaturan default?')
  if (!konfirmasi) return

  form.value = { ...defaultValues }
  formStatistik.value = { ...defaultStatistik }
  
  if (process.client) {
    localStorage.setItem('pengaturan_desa', JSON.stringify(form.value))
    localStorage.setItem('pengaturan_statistik', JSON.stringify(formStatistik.value))
  }
  
  alert('✅ Pengaturan direset ke default!')
}
</script>

<style scoped>
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 0.8s linear infinite;
}
</style>