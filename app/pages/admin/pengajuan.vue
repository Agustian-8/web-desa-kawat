<template>
  <div class="max-w-7xl mx-auto pb-12">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight">Kelola Pengajuan</h1>
        <p class="text-sm text-gray-500 mt-1">Pantau dan kelola semua permintaan layanan dari warga</p>
      </div>
      <button 
        @click="refreshData" 
        :disabled="loading"
        class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 rounded-xl text-sm font-semibold transition-all shadow-sm active:scale-95 disabled:opacity-50"
      >
        <svg 
          class="w-4 h-4 transition-transform duration-500" 
          :class="{ 'animate-spin': loading }" 
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Refresh Data
      </button>
    </div>

    <!-- Search & Filter Status -->
    <div class="space-y-4 mb-6">
      <!-- Search Bar -->
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari berdasarkan nama, nomor pengajuan, atau layanan..."
          class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
        />
        <button 
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <svg class="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Filter Status -->
      <div class="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar">
        <button 
          v-for="status in statusFilters" 
          :key="status.value"
          @click="filterStatus = status.value"
          class="whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border"
          :class="filterStatus === status.value 
            ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/20' 
            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'"
        >
          {{ status.label }}
          <span 
            class="ml-1.5 px-2 py-0.5 rounded-md text-[11px]" 
            :class="filterStatus === status.value ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'"
          >
            {{ getCountByStatus(status.value) }}
          </span>
        </button>
      </div>
    </div>

    <!-- List Pengajuan Container -->
    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      
      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="animate-spin rounded-full h-10 w-10 border-4 border-gray-100 border-t-emerald-600 mb-4"></div>
        <p class="text-gray-500 text-sm font-medium">Memuat data pengajuan...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredPengajuan.length === 0" class="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-1">Tidak ada hasil</h3>
        <p class="text-gray-500 text-sm">Tidak ada pengajuan yang sesuai dengan pencarian Anda.</p>
        <button 
          @click="searchQuery = ''; filterStatus = 'semua'"
          class="mt-4 text-emerald-600 hover:text-emerald-700 text-sm font-semibold"
        >
          Reset filter
        </button>
      </div>

      <!-- Data List -->
      <div v-else class="divide-y divide-gray-100">
        <div 
          v-for="item in filteredPengajuan" 
          :key="item.id"
          class="p-5 md:p-6 hover:bg-slate-50/50 transition-colors duration-200 flex flex-col lg:flex-row gap-6 items-start"
        >
          <!-- Bagian Kiri: Informasi Warga -->
          <div class="flex-1 w-full space-y-4">
            
            <!-- Header Info -->
            <div>
              <div class="flex items-center gap-3 mb-1.5 flex-wrap">
                <h3 class="text-lg font-bold text-gray-900 leading-none">{{ item.nama_lengkap }}</h3>
                <span 
                  class="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider"
                  :class="statusBadgeClass(item.status)"
                >
                  {{ statusLabel(item.status) }}
                </span>
              </div>
              <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                <p class="font-medium text-emerald-700">{{ item.layanan_nama }}</p>
                <span class="text-gray-300 hidden md:block">•</span>
                <p class="text-gray-500 font-mono text-xs">{{ item.nomor_pengajuan }}</p>
                <span class="text-gray-300 hidden md:block">•</span>
                <p class="text-gray-500 text-xs flex items-center gap-1">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {{ formatDate(item.created_at) }}
                </p>
              </div>
            </div>
            
            <!-- Informasi Kontak -->
            <div class="flex flex-wrap gap-4 text-sm bg-gray-50/80 p-3 rounded-xl border border-gray-100 w-fit">
              <div class="flex items-center gap-2 text-gray-600">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span class="font-medium">{{ item.no_hp }}</span>
              </div>
              <div v-if="item.email" class="flex items-center gap-2 text-gray-600">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>{{ item.email }}</span>
              </div>
            </div>

            <!-- Area Catatan Admin -->
            <div class="bg-amber-50/50 border border-amber-100/60 p-3.5 rounded-xl">
              <label class="block text-xs font-bold text-amber-800 uppercase tracking-wide mb-2">Catatan Untuk Warga</label>
              <div class="flex flex-col sm:flex-row gap-2">
                <input 
                  v-model="item.catatan_admin_temp"
                  type="text"
                  placeholder="Ketik catatan di sini..."
                  class="flex-1 px-3.5 py-2 text-sm bg-white rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-shadow"
                  @keyup.enter="saveCatatan(item.id, item.catatan_admin_temp, item)"
                >
                <button 
                  @click="saveCatatan(item.id, item.catatan_admin_temp, item)"
                  class="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap"
                >
                  Simpan Catatan
                </button>
              </div>
              <p v-if="item.catatan_admin" class="text-xs text-amber-600 mt-2 flex items-start gap-1.5">
                <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Tersimpan: {{ item.catatan_admin }}
              </p>
            </div>
          </div>
          
          <!-- Bagian Kanan: Aksi Cepat -->
          <div class="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-2.5 pt-1">
            <!-- Ubah Status -->
            <div class="relative w-full sm:w-48 lg:w-40">
              <select 
                v-model="item.status"
                @change="updateStatus(item.id, item.status, item)"
                class="w-full appearance-none pl-3.5 pr-8 py-2.5 bg-white text-sm font-medium rounded-xl border border-gray-200 hover:border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all cursor-pointer shadow-sm"
              >
                <option value="menunggu">⏳ Menunggu</option>
                <option value="diproses">🔄 Diproses</option>
                <option value="selesai">✅ Selesai</option>
                <option value="ditolak">❌ Ditolak</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>

            <div class="flex gap-2.5 w-full sm:w-auto">
              <!-- Tombol Detail -->
              <NuxtLink 
                :to="`/admin/detail-pengajuan?id=${item.id}`"
                class="flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white rounded-xl text-sm font-semibold transition-colors border border-blue-100 hover:border-blue-600"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                Detail
              </NuxtLink>

              <!-- Tombol Kirim WA -->
              <button 
                @click="bukaWA(item)"
                class="flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-[#25D366]/20"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
                WA
              </button>
            </div>
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

// Pastikan file utilitas WA Anda sudah diekspor dengan benar
import { generateWALink, getStatusMessage } from '~/utils/waNotification'

// State
const loading = ref(true)
const pengajuanList = ref([])
const filterStatus = ref('semua')
const searchQuery = ref('') // Tambahkan state untuk search

const statusFilters = [
  { value: 'semua', label: 'Semua Data' },
  { value: 'menunggu', label: '⏳ Menunggu' },
  { value: 'diproses', label: '🔄 Diproses' },
  { value: 'selesai', label: '✅ Selesai' },
  { value: 'ditolak', label: '❌ Ditolak' }
]

// Filtered pengajuan dengan search
const filteredPengajuan = computed(() => {
  let result = pengajuanList.value
  
  // Filter by status
  if (filterStatus.value !== 'semua') {
    result = result.filter(p => p.status === filterStatus.value)
  }
  
  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    result = result.filter(p => {
      return p.nama_lengkap?.toLowerCase().includes(query) ||
             p.nomor_pengajuan?.toLowerCase().includes(query) ||
             p.layanan_nama?.toLowerCase().includes(query) ||
             p.no_hp?.includes(query) ||
             p.email?.toLowerCase().includes(query)
    })
  }
  
  return result
})

// Status helpers
const statusBadgeClass = (status) => {
  const classes = {
    'menunggu': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    'diproses': 'bg-blue-100 text-blue-800 border border-blue-200',
    'selesai': 'bg-green-100 text-green-800 border border-green-200',
    'ditolak': 'bg-rose-100 text-rose-800 border border-rose-200'
  }
  return classes[status] || 'bg-gray-100 text-gray-800 border border-gray-200'
}

const statusLabel = (status) => {
  const labels = {
    'menunggu': 'Menunggu',
    'diproses': 'Diproses',
    'selesai': 'Selesai',
    'ditolak': 'Ditolak'
  }
  return labels[status] || status
}

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getCountByStatus = (status) => {
  let result = pengajuanList.value
  
  // Filter by status untuk counter
  if (status !== 'semua') {
    result = result.filter(p => p.status === status)
  }
  
  // Filter by search query untuk counter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    result = result.filter(p => {
      return p.nama_lengkap?.toLowerCase().includes(query) ||
             p.nomor_pengajuan?.toLowerCase().includes(query) ||
             p.layanan_nama?.toLowerCase().includes(query) ||
             p.no_hp?.includes(query) ||
             p.email?.toLowerCase().includes(query)
    })
  }
  
  return result.length
}

// Load pengajuan
const loadPengajuan = async () => {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('pengajuan')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    pengajuanList.value = data.map(item => ({
      ...item,
      catatan_admin_temp: item.catatan_admin || ''
    }))
  } catch (error) {
    console.error('Error loading pengajuan:', error)
    alert('Gagal memuat data pengajuan')
  } finally {
    loading.value = false
  }
}

// Update status
const updateStatus = async (id, newStatus, item) => {
  try {
    const { error } = await supabase
      .from('pengajuan')
      .update({ 
        status: newStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)

    if (error) throw error

    // Pembaruan visual instan di UI
    alert(`✅ Status pengajuan berhasil diperbarui menjadi: ${statusLabel(newStatus)}`)
    await loadPengajuan() // Opsional: Boleh dihapus jika tidak ingin me-refresh seluruh data
  } catch (error) {
    console.error('Error updating status:', error)
    alert('❌ Gagal mengupdate status: ' + error.message)
  }
}

// Save catatan
const saveCatatan = async (id, catatan, item) => {
  try {
    const { error } = await supabase
      .from('pengajuan')
      .update({ catatan_admin: catatan })
      .eq('id', id)

    if (error) throw error

    const index = pengajuanList.value.findIndex(p => p.id === id)
    if (index !== -1) {
      pengajuanList.value[index].catatan_admin = catatan
      pengajuanList.value[index].catatan_admin_temp = catatan
    }

    alert('✅ Catatan untuk warga berhasil disimpan!')
  } catch (error) {
    console.error('Error saving catatan:', error)
    alert('❌ Gagal menyimpan catatan: ' + error.message)
  }
}

// ============= FITUR WA =============
const bukaWA = (item) => {
  const pesan = getStatusMessage(
    item.nama_lengkap,
    item.layanan_nama,
    item.status,
    item.nomor_pengajuan,
    item.catatan_admin
  )
  
  const waLink = generateWALink(item.no_hp, pesan)
  window.open(waLink, '_blank')
}

// Refresh
const refreshData = () => {
  loadPengajuan()
}

// Load data
onMounted(() => {
  loadPengajuan()
})
</script>

<style scoped>
/* Sembunyikan scrollbar pada filter menu di HP (Clean UI) */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>