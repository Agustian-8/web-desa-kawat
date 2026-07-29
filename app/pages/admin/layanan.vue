<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Kelola Layanan</h1>
        <p class="text-sm text-gray-500">Atur layanan publik yang tersedia untuk warga</p>
      </div>
      <button 
        @click="showModal = true" 
        class="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Tambah Layanan
      </button>
    </div>

    <!-- Daftar Layanan -->
    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <!-- Loading -->
      <div v-if="pending" class="flex justify-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-600/30 border-t-emerald-600"></div>
      </div>

      <!-- Grid Layanan -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="(layanan, index) in layananList" 
          :key="layanan.id"
          class="p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          :class="getBgColor(index)"
        >
          <!-- Icon -->
          <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4" :class="getIconBg(index)">
            <svg class="w-6 h-6" :class="getIconColor(index)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="layanan.icon || 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'"/>
            </svg>
          </div>

          <!-- Info -->
          <div class="flex items-start justify-between">
            <div>
              <h3 class="font-bold text-gray-900 text-lg">{{ layanan.nama }}</h3>
              <p class="text-sm text-gray-500 mt-1 line-clamp-2">{{ layanan.deskripsi }}</p>
              <div class="flex flex-wrap gap-2 mt-3">
                <span 
                  v-for="item in layanan.items" 
                  :key="item"
                  class="text-xs bg-gray-50 text-gray-600 px-2.5 py-1 rounded-full border border-gray-200"
                >
                  {{ item }}
                </span>
              </div>
            </div>
          </div>

          <!-- Aksi -->
          <div class="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
            <button 
              @click="editLayanan(layanan.id)" 
              class="flex-1 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-50"
            >
              Edit
            </button>
            <button 
              @click="hapusLayanan(layanan.id)" 
              class="flex-1 text-sm text-red-600 hover:text-red-800 font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!pending && layananList.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        <p class="text-gray-400 font-medium">Belum ada layanan</p>
        <p class="text-sm text-gray-400 mt-1">Tambahkan layanan publik untuk warga desa</p>
        <button @click="showModal = true" class="mt-4 text-emerald-600 hover:text-emerald-700 font-medium">
          + Tambah Layanan Pertama
        </button>
      </div>
    </div>

    <!-- Modal Tambah/Edit Layanan -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <h3 class="text-lg font-bold text-gray-900 mb-4">
          {{ editMode ? 'Edit Layanan' : 'Tambah Layanan Baru' }}
        </h3>
        
        <form @submit.prevent="simpanLayanan" class="space-y-4">
          <!-- Nama Layanan -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nama Layanan <span class="text-red-500">*</span></label>
            <input 
              v-model="form.nama" 
              type="text" 
              required
              class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              placeholder="Contoh: Administrasi Warga"
            >
          </div>

          <!-- Deskripsi -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Deskripsi <span class="text-red-500">*</span></label>
            <textarea 
              v-model="form.deskripsi" 
              required
              rows="3"
              class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              placeholder="Deskripsi singkat tentang layanan ini"
            ></textarea>
          </div>

          <!-- Items -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Item Layanan</label>
            <div class="flex gap-2 mb-2">
              <input 
                v-model="itemBaru" 
                type="text" 
                class="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                placeholder="Contoh: Pengantar KTP"
                @keyup.enter="tambahItem"
              >
              <button 
                type="button"
                @click="tambahItem"
                class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition"
              >
                Tambah
              </button>
            </div>
            
            <div class="flex flex-wrap gap-2 mt-2">
              <span 
                v-for="(item, index) in form.items" 
                :key="index"
                class="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm"
              >
                {{ item }}
                <button 
                  type="button"
                  @click="hapusItem(index)"
                  class="text-red-500 hover:text-red-700"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </span>
            </div>
          </div>

          <!-- Warna -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Warna Tema</label>
            <div class="flex gap-3">
              <button 
                v-for="warna in warnaOptions" 
                :key="warna.value"
                type="button"
                @click="form.warna = warna.value"
                class="w-10 h-10 rounded-full border-2 transition-all"
                :class="[
                  warna.bg,
                  form.warna === warna.value ? 'border-emerald-600 scale-110' : 'border-transparent'
                ]"
              ></button>
            </div>
          </div>

          <!-- Tombol -->
          <div class="flex gap-3 pt-4 border-t border-gray-100">
            <button 
              type="button" 
              @click="closeModal"
              class="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition"
            >
              Batal
            </button>
            <button 
              type="submit" 
              :disabled="loading"
              class="flex-1 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition disabled:opacity-70 flex items-center justify-center gap-2"
            >
              <span v-if="loading" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              {{ editMode ? 'Update' : 'Simpan' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })

const supabase = useSupabaseClient()
const user = useSupabaseUser()

// Auth check
if (!user.value) {
  navigateTo('/login')
}

// State
const showModal = ref(false)
const editMode = ref(false)
const loading = ref(false)
const pending = ref(true)
const itemBaru = ref('')
const layananList = ref([])

// Warna options
const warnaOptions = [
  { value: 'blue', bg: 'bg-blue-50 hover:bg-blue-100' },
  { value: 'emerald', bg: 'bg-emerald-50 hover:bg-emerald-100' },
  { value: 'amber', bg: 'bg-amber-50 hover:bg-amber-100' },
  { value: 'rose', bg: 'bg-rose-50 hover:bg-rose-100' },
  { value: 'purple', bg: 'bg-purple-50 hover:bg-purple-100' },
  { value: 'teal', bg: 'bg-teal-50 hover:bg-teal-100' }
]

// Form
const form = ref({
  id: null,
  nama: '',
  deskripsi: '',
  items: [],
  warna: 'blue',
  icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
})

// Color mapping
const colorMap = {
  blue: { bg: 'bg-blue-50', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', cardBg: 'hover:border-blue-200' },
  emerald: { bg: 'bg-emerald-50', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600', cardBg: 'hover:border-emerald-200' },
  amber: { bg: 'bg-amber-50', iconBg: 'bg-amber-100', iconColor: 'text-amber-600', cardBg: 'hover:border-amber-200' },
  rose: { bg: 'bg-rose-50', iconBg: 'bg-rose-100', iconColor: 'text-rose-600', cardBg: 'hover:border-rose-200' },
  purple: { bg: 'bg-purple-50', iconBg: 'bg-purple-100', iconColor: 'text-purple-600', cardBg: 'hover:border-purple-200' },
  teal: { bg: 'bg-teal-50', iconBg: 'bg-teal-100', iconColor: 'text-teal-600', cardBg: 'hover:border-teal-200' }
}

// Get colors
const getBgColor = (index) => {
  const warna = layananList.value[index]?.warna || 'blue'
  return colorMap[warna]?.bg || 'bg-gray-50'
}

const getIconBg = (index) => {
  const warna = layananList.value[index]?.warna || 'blue'
  return colorMap[warna]?.iconBg || 'bg-gray-100'
}

const getIconColor = (index) => {
  const warna = layananList.value[index]?.warna || 'blue'
  return colorMap[warna]?.iconColor || 'text-gray-600'
}

// Load layanan dari Supabase
const loadLayanan = async () => {
  pending.value = true
  try {
    const { data, error } = await supabase
      .from('layanan')
      .select('*')
      .order('id', { ascending: true })

    if (error) throw error

    if (data && data.length > 0) {
      layananList.value = data
      // Simpan ke localStorage sebagai cache
      if (process.client) {
        localStorage.setItem('layanan_desa', JSON.stringify(data))
      }
    } else {
      // Jika kosong, coba dari localStorage
      if (process.client) {
        const saved = localStorage.getItem('layanan_desa')
        if (saved) {
          try {
            layananList.value = JSON.parse(saved)
          } catch (e) {
            console.error('Gagal load dari localStorage:', e)
            await setDefaultLayanan()
          }
        } else {
          await setDefaultLayanan()
        }
      }
    }
  } catch (error) {
    console.error('Error loading layanan:', error)
    // Fallback ke localStorage
    if (process.client) {
      const saved = localStorage.getItem('layanan_desa')
      if (saved) {
        try {
          layananList.value = JSON.parse(saved)
        } catch (e) {
          console.error('Gagal load dari localStorage:', e)
          await setDefaultLayanan()
        }
      } else {
        await setDefaultLayanan()
      }
    }
  }
  pending.value = false
}

// Set default layanan ke Supabase
const setDefaultLayanan = async () => {
  const defaultData = [
    {
      nama: 'Administrasi Warga',
      deskripsi: 'Layanan administrasi kependudukan untuk warga desa',
      items: ['Pengantar KTP / KK', 'Pengantar Akta Kelahiran', 'Surat Keterangan Domisili'],
      warna: 'blue',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    },
    {
      nama: 'Perizinan & Usaha',
      deskripsi: 'Layanan perizinan untuk usaha mikro dan kegiatan',
      items: ['Surat Izin Usaha Mikro (IUMK)', 'Izin Keramaian', 'Keterangan Tidak Mampu (SKTM)'],
      warna: 'amber',
      icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    },
    {
      nama: 'Pusat Pelaporan',
      deskripsi: 'Laporan dan aduan masyarakat untuk perbaikan desa',
      items: ['Lapor Fasilitas Rusak', 'Aduan Keamanan & Ketertiban', 'Kotak Saran Kepala Desa'],
      warna: 'rose',
      icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z'
    }
  ]

  // Insert ke Supabase
  for (const item of defaultData) {
    const { error } = await supabase
      .from('layanan')
      .insert([item])
    
    if (error) {
      console.error('Error inserting default data:', error)
    }
  }

  // Reload data
  await loadLayanan()
}

// Tambah item
const tambahItem = () => {
  const item = itemBaru.value.trim()
  if (!item) return
  if (form.value.items.includes(item)) {
    alert('Item sudah ada!')
    return
  }
  form.value.items.push(item)
  itemBaru.value = ''
}

// Hapus item
const hapusItem = (index) => {
  form.value.items.splice(index, 1)
}

// Reset form
const resetForm = () => {
  form.value = {
    id: null,
    nama: '',
    deskripsi: '',
    items: [],
    warna: 'blue',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
  }
  itemBaru.value = ''
  editMode.value = false
}

// Edit layanan
const editLayanan = (id) => {
  const layanan = layananList.value.find(l => l.id === id)
  if (!layanan) return
  
  form.value = { ...layanan }
  editMode.value = true
  showModal.value = true
}

// Close modal
const closeModal = () => {
  showModal.value = false
  resetForm()
}

// Simpan layanan ke Supabase
const simpanLayanan = async () => {
  if (!form.value.nama.trim() || !form.value.deskripsi.trim()) {
    alert('Mohon lengkapi semua field yang wajib!')
    return
  }
  
  if (form.value.items.length === 0) {
    alert('Tambahkan minimal 1 item layanan!')
    return
  }
  
  loading.value = true

  try {
    if (editMode.value) {
      // UPDATE ke Supabase
      const { id, ...updateData } = form.value
      const { error } = await supabase
        .from('layanan')
        .update(updateData)
        .eq('id', id)

      if (error) throw error

      // Update local state
      const index = layananList.value.findIndex(l => l.id === id)
      if (index !== -1) {
        layananList.value[index] = { ...form.value }
      }

    } else {
      // INSERT ke Supabase
      const { nama, deskripsi, items, warna, icon } = form.value
      const { data, error } = await supabase
        .from('layanan')
        .insert([{ nama, deskripsi, items, warna, icon }])
        .select()

      if (error) throw error

      // Tambahkan ke local state
      if (data && data.length > 0) {
        layananList.value.push(data[0])
      }
    }

    // Update cache
    if (process.client) {
      localStorage.setItem('layanan_desa', JSON.stringify(layananList.value))
    }

    loading.value = false
    closeModal()
    alert(editMode.value ? '✅ Layanan berhasil diupdate!' : '✅ Layanan berhasil ditambahkan!')
    
  } catch (error) {
    console.error('Error saving layanan:', error)
    loading.value = false
    alert('❌ Gagal menyimpan: ' + error.message)
  }
}

// Hapus layanan dari Supabase
const hapusLayanan = async (id) => {
  const layanan = layananList.value.find(l => l.id === id)
  if (!layanan) return
  
  const konfirmasi = confirm(`Apakah Anda yakin ingin menghapus layanan "${layanan.nama}"?`)
  if (!konfirmasi) return
  
  loading.value = true

  try {
    const { error } = await supabase
      .from('layanan')
      .delete()
      .eq('id', id)

    if (error) throw error

    // Update local state
    layananList.value = layananList.value.filter(l => l.id !== id)
    
    // Update cache
    if (process.client) {
      localStorage.setItem('layanan_desa', JSON.stringify(layananList.value))
    }

    loading.value = false
    alert('✅ Layanan berhasil dihapus!')
    
  } catch (error) {
    console.error('Error deleting layanan:', error)
    loading.value = false
    alert('❌ Gagal menghapus: ' + error.message)
  }
}

// Load data
onMounted(() => {
  loadLayanan()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 0.8s linear infinite;
}
</style>