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
    <div v-else class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 max-w-3xl">
      <form @submit.prevent="simpanPengaturan" class="space-y-6">
        <!-- Nama Desa -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Nama Desa <span class="text-red-500">*</span></label>
          <input 
            v-model="form.nama_desa" 
            type="text" 
            required
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            placeholder="Desa Kawat"
          >
          <p class="text-xs text-gray-400 mt-1">Nama desa yang akan tampil di footer</p>
        </div>

        <!-- Deskripsi -->
        <div>
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
        <div>
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
        <div>
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
        <div>
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

        <!-- Preview -->
        <div class="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Preview Footer</p>
          <div class="text-sm text-slate-600 space-y-1">
            <p><span class="font-medium">Nama Desa:</span> {{ form.nama_desa || '-' }}</p>
            <p><span class="font-medium">Deskripsi:</span> {{ (form.deskripsi || '').substring(0, 80) }}{{ (form.deskripsi || '').length > 80 ? '...' : '' }}</p>
            <p><span class="font-medium">Email:</span> {{ form.email || '-' }}</p>
            <p><span class="font-medium">Telepon:</span> {{ form.telepon || '-' }}</p>
            <p><span class="font-medium">Alamat:</span> {{ form.alamat || '-' }}</p>
            <p><span class="font-medium">Footer:</span> {{ form.footer_text || '-' }}</p>
          </div>
        </div>

        <!-- Tombol -->
        <div class="flex gap-3 pt-4">
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
            Simpan Pengaturan
          </button>
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

// State
const pending = ref(true)
const loading = ref(false)
const form = ref({
  id: null,
  nama_desa: '',
  deskripsi: '',
  email: '',
  telepon: '',
  alamat: '',
  footer_text: ''
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

// Load data dari database
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
      // Jika belum ada data, gunakan default
      form.value = { ...defaultValues }
    }
  } catch (error) {
    console.error('Error loading pengaturan:', error)
    form.value = { ...defaultValues }
  }
  pending.value = false
}

await loadPengaturan()

// Simpan pengaturan ke database
const simpanPengaturan = async () => {
  loading.value = true

  try {
    const dataToSave = {
      nama_desa: form.value.nama_desa,
      deskripsi: form.value.deskripsi,
      email: form.value.email,
      telepon: form.value.telepon,
      alamat: form.value.alamat,
      footer_text: form.value.footer_text
    }

    if (form.value.id) {
      // Update data yang sudah ada
      const { error } = await supabase
        .from('pengaturan_website')
        .update(dataToSave)
        .eq('id', form.value.id)

      if (error) throw error
    } else {
      // Insert data baru
      const { error } = await supabase
        .from('pengaturan_website')
        .insert([dataToSave])

      if (error) throw error
    }

    alert('✅ Pengaturan berhasil disimpan!')
    await loadPengaturan() // Reload data

  } catch (error) {
    alert('❌ Gagal menyimpan pengaturan: ' + error.message)
  } finally {
    loading.value = false
  }
}

// Reset ke default
const resetPengaturan = () => {
  const konfirmasi = confirm('Reset ke pengaturan default?')
  if (!konfirmasi) return

  form.value = { ...defaultValues }
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