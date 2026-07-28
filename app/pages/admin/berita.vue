<template>
  <div>
    <!-- Header -->
    <header class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Kelola Berita</h1>
        <p class="text-sm text-gray-500">Manajemen konten berita desa</p>
      </div>
      <div class="flex gap-3 w-full sm:w-auto">
        <NuxtLink 
          to="/admin/tambah-berita" 
          class="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm flex items-center justify-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Tambah Berita
        </NuxtLink>
        <button 
          @click="refreshData" 
          class="flex-1 sm:flex-none bg-white hover:bg-gray-50 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm border border-gray-200 flex items-center justify-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- Filter & Pencarian -->
    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-6">
      <div class="flex flex-col sm:flex-row gap-3">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Cari berita..." 
          class="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
        >
        <select 
          v-model="filterKategori" 
          class="px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
        >
          <option value="all">Semua Kategori</option>
          <option v-for="kategori in kategoriOptions" :key="kategori" :value="kategori">
            {{ kategori }}
          </option>
        </select>
        <select 
          v-model="filterTanggal" 
          class="px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
        >
          <option value="all">Semua Waktu</option>
          <option value="today">Hari Ini</option>
          <option value="week">Minggu Ini</option>
          <option value="month">Bulan Ini</option>
        </select>
      </div>
    </div>

    <!-- Daftar Berita -->
    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <!-- Loading -->
      <div v-if="pending" class="flex justify-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-600/30 border-t-emerald-600"></div>
      </div>

      <!-- Data Table -->
      <div v-else class="overflow-x-auto">
        <table class="w-full text-left text-sm border-collapse">
          <thead>
            <tr class="bg-slate-50 text-gray-600 font-semibold uppercase text-[11px] tracking-wider border-b border-gray-200">
              <th class="p-4 w-16">No</th>
              <th class="p-4">Judul Berita</th>
              <th class="p-4 w-32">Kategori</th>
              <th class="p-4 w-40">Tanggal</th>
              <th class="p-4 w-36 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-gray-700">
            <tr v-for="(item, index) in beritaFiltered" :key="item.id" class="hover:bg-slate-50/80 transition-colors">
              <td class="p-4 text-gray-400 text-center">{{ index + 1 }}</td>
              <td class="p-4 font-semibold text-gray-900 max-w-xs truncate">{{ item.title }}</td>
              <td class="p-4">
                <span class="px-2.5 py-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 rounded-md uppercase tracking-wide border border-emerald-100">
                  {{ item.category || 'Umum' }}
                </span>
              </td>
              <td class="p-4 text-gray-500">{{ formatDate(item.created_at) }}</td>
              <td class="p-4 text-center space-x-3">
                <NuxtLink 
                  :to="'/admin/edit/' + item.id" 
                  class="text-blue-600 hover:text-blue-800 font-medium transition-colors text-sm"
                >
                  Edit
                </NuxtLink>
                <button 
                  @click="hapusBerita(item.id, item.image_url)" 
                  class="text-red-600 hover:text-red-800 font-medium transition-colors text-sm"
                >
                  Hapus
                </button>
              </td>
            </tr>
            <tr v-if="beritaFiltered.length === 0">
              <td colspan="5" class="p-8 text-center text-gray-400">
                <p>Tidak ada berita yang ditemukan</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })

const supabase = useSupabaseClient()
const router = useRouter()
const user = useSupabaseUser()

// Proteksi
if (!user.value) {
  navigateTo('/login')
}

// State
const searchQuery = ref('')
const filterKategori = ref('all')
const filterTanggal = ref('all')
const beritaList = ref([])
const pending = ref(true)

// Load berita
const loadBerita = async () => {
  pending.value = true
  const { data, error } = await supabase
    .from('berita')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (!error) {
    beritaList.value = data || []
  }
  pending.value = false
}

await loadBerita()

// Filter berita
const beritaFiltered = computed(() => {
  let result = beritaList.value
  
  if (filterKategori.value !== 'all') {
    result = result.filter(item => (item.category || 'Umum') === filterKategori.value)
  }
  
  if (filterTanggal.value !== 'all') {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    if (filterTanggal.value === 'today') {
      result = result.filter(item => new Date(item.created_at) >= today)
    } else if (filterTanggal.value === 'week') {
      const weekAgo = new Date(today)
      weekAgo.setDate(weekAgo.getDate() - 7)
      result = result.filter(item => new Date(item.created_at) >= weekAgo)
    } else if (filterTanggal.value === 'month') {
      result = result.filter(item => {
        const date = new Date(item.created_at)
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
      })
    }
  }
  
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(item => 
      item.title.toLowerCase().includes(query) ||
      (item.content || '').toLowerCase().includes(query)
    )
  }
  
  return result
})

// Opsi kategori
const kategoriOptions = computed(() => {
  const kategori = new Set()
  beritaList.value.forEach(item => {
    kategori.add(item.category || 'Umum')
  })
  return Array.from(kategori)
})

// Format tanggal
const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Intl.DateTimeFormat('id-ID', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  }).format(new Date(dateString))
}

// Hapus berita
const hapusBerita = async (id, imageUrl) => {
  const konfirmasi = confirm('Apakah Anda yakin ingin menghapus berita ini?')
  if (!konfirmasi) return
  
  try {
    if (imageUrl) {
      const fileName = imageUrl.split('/').pop()
      if (fileName) {
        await supabase.storage.from('berita-images').remove([fileName])
      }
    }
    
    const { error } = await supabase.from('berita').delete().eq('id', id)
    if (error) throw error
    
    alert('✅ Berita berhasil dihapus!')
    await loadBerita()
  } catch (error) {
    alert('❌ Gagal menghapus berita')
    console.error(error)
  }
}

const refreshData = () => {
  loadBerita()
}
</script>