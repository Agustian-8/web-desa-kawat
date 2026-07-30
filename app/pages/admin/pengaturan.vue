<template>
  <div>
    <!-- Header -->
    <header class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Pengaturan Website</h1>
        <p class="text-sm text-gray-500">Kelola konfigurasi dan tampilan website desa</p>
      </div>
    </header>

    <!-- Tabs -->
    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div class="border-b border-gray-200 bg-gray-50/50 px-6 pt-4">
        <div class="flex gap-6">
          <button
            @click="activeTab = 'data_desa'"
            class="px-1 py-3 text-sm font-medium transition-all duration-200 border-b-2"
            :class="activeTab === 'data_desa' 
              ? 'border-emerald-600 text-emerald-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700'"
          >
            Data Desa
          </button>
          <button
            @click="activeTab = 'statistik'"
            class="px-1 py-3 text-sm font-medium transition-all duration-200 border-b-2"
            :class="activeTab === 'statistik' 
              ? 'border-emerald-600 text-emerald-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700'"
          >
            Statistik Beranda
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="pending" class="flex justify-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-600/30 border-t-emerald-600"></div>
      </div>

      <!-- Tab Content -->
      <div v-else class="p-6">
        <!-- Tab 1: Data Desa -->
        <div v-show="activeTab === 'data_desa'" class="space-y-5">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <!-- Nama Desa -->
            <div class="lg:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">
                Nama Desa <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.nama_desa"
                type="text"
                required
                class="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="Masukkan nama desa"
              >
            </div>

            <!-- Deskripsi -->
            <div class="lg:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi Website</label>
              <textarea
                v-model="form.deskripsi"
                rows="3"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                placeholder="Tuliskan deskripsi singkat tentang website desa..."
              ></textarea>
              <p class="text-xs text-gray-400 mt-1">Deskripsi yang tampil di footer</p>
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Email Kontak</label>
              <input
                v-model="form.email"
                type="email"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="email@desa.id"
              >
            </div>

            <!-- Telepon -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Nomor Telepon</label>
              <input
                v-model="form.telepon"
                type="text"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="+62 812-3456-7890"
              >
            </div>

            <!-- Alamat -->
            <div class="lg:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Alamat</label>
              <textarea
                v-model="form.alamat"
                rows="2"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                placeholder="Alamat lengkap desa"
              ></textarea>
            </div>

            <!-- Footer Text -->
            <div class="lg:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Teks Footer</label>
              <input
                v-model="form.footer_text"
                type="text"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="© 2026 Pemerintah Desa. All Rights Reserved."
              >
            </div>
          </div>
        </div>

        <!-- Tab 2: Statistik -->
        <div v-show="activeTab === 'statistik'" class="space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <!-- Total Penduduk -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">
                Total Penduduk <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formStatistik.total_penduduk"
                type="text"
                required
                class="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="2.450"
              >
              <p class="text-xs text-gray-400 mt-1">Gunakan titik untuk pemisah ribuan</p>
            </div>

            <!-- Total Dusun -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">
                Total Dusun <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formStatistik.total_dusun"
                type="text"
                required
                class="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="4"
              >
            </div>

            <!-- Total Layanan -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">
                Total Layanan Digital <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formStatistik.total_layanan"
                type="text"
                required
                class="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="9"
              >
            </div>
          </div>
        </div>

        <!-- Action Buttons - Bottom -->
        <div class="mt-8 pt-6 border-t border-gray-200">
          <div class="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              @click="resetPengaturan"
              class="flex-1 sm:flex-none px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Reset ke Default
            </button>
            <button
              type="submit"
              @click="simpanPengaturan"
              :disabled="loading"
              class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2 shadow-sm"
            >
              <span v-if="loading" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              Simpan
            </button>
          </div>

          <!-- Success Message -->
          <div v-if="successMessage" class="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm flex items-center gap-3">
            <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>{{ successMessage }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })

const supabase = useSupabaseClient()
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
const activeTab = ref('data_desa')

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

    if (process.client) {
      localStorage.setItem('pengaturan_desa', JSON.stringify(form.value))
      localStorage.setItem('pengaturan_statistik', JSON.stringify(formStatistik.value))
    }

    successMessage.value = '✅ Semua pengaturan berhasil disimpan!'
    
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