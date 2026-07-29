<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Kelola Pengajuan</h1>
        <p class="text-sm text-gray-500">Kelola semua pengajuan layanan dari warga</p>
      </div>
      <button @click="refreshData" class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium transition">
        🔄 Refresh
      </button>
    </div>

    <!-- Filter Status -->
    <div class="flex gap-2 mb-6 flex-wrap">
      <button 
        v-for="status in statusFilters" 
        :key="status.value"
        @click="filterStatus = status.value"
        class="px-4 py-2 rounded-xl text-sm font-medium transition"
        :class="filterStatus === status.value ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'"
      >
        {{ status.label }}
        <span class="ml-1 text-xs" :class="filterStatus === status.value ? 'text-emerald-200' : 'text-gray-400'">
          ({{ getCountByStatus(status.value) }})
        </span>
      </button>
    </div>

    <!-- List Pengajuan -->
    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-4 border-emerald-600/30 border-t-emerald-600"></div>
      </div>

      <div v-else-if="filteredPengajuan.length === 0" class="text-center py-12">
        <p class="text-gray-400">Belum ada pengajuan</p>
      </div>

      <div v-else class="divide-y divide-gray-100">
        <div 
          v-for="item in filteredPengajuan" 
          :key="item.id"
          class="p-4 hover:bg-gray-50 transition"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-1 flex-wrap">
                <span class="font-semibold text-gray-900">{{ item.nama_lengkap }}</span>
                <span 
                  class="px-2 py-0.5 rounded-full text-xs font-medium"
                  :class="statusBadgeClass(item.status)"
                >
                  {{ statusLabel(item.status) }}
                </span>
                <span class="text-xs text-gray-400">{{ item.nomor_pengajuan }}</span>
              </div>
              <p class="text-sm text-gray-600">{{ item.layanan_nama }}</p>
              <p class="text-xs text-gray-400">{{ formatDate(item.created_at) }}</p>
              <p v-if="item.catatan_admin" class="text-sm text-amber-600 mt-1">📝 {{ item.catatan_admin }}</p>
              
              <!-- Informasi Kontak -->
              <div class="flex gap-4 mt-2 text-sm">
                <span class="text-gray-500">📱 {{ item.no_hp }}</span>
                <span v-if="item.email" class="text-gray-500">✉️ {{ item.email }}</span>
              </div>
            </div>
            
            <div class="flex gap-2 ml-4 flex-wrap">
              <!-- Tombol Update Status -->
              <select 
                v-model="item.status"
                @change="updateStatus(item.id, item.status, item)"
                class="px-3 py-1.5 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="menunggu">⏳ Menunggu</option>
                <option value="diproses">🔄 Diproses</option>
                <option value="selesai">✅ Selesai</option>
                <option value="ditolak">❌ Ditolak</option>
              </select>

              <!-- Tombol Kirim WA -->
              <button 
                @click="bukaWA(item)"
                class="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-medium transition flex items-center gap-1"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
                WA
              </button>

              <!-- Tombol Detail -->
              <NuxtLink 
                :to="`/admin/detail-pengajuan?id=${item.id}`"
                class="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-sm font-medium transition"
              >
                Detail
              </NuxtLink>
            </div>
          </div>

          <!-- Input Catatan Admin -->
          <div class="mt-2 flex gap-2">
            <input 
              v-model="item.catatan_admin_temp"
              type="text"
              placeholder="Tambahkan catatan untuk warga..."
              class="flex-1 px-3 py-1.5 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none"
              @keyup.enter="saveCatatan(item.id, item.catatan_admin_temp, item)"
            >
            <button 
              @click="saveCatatan(item.id, item.catatan_admin_temp, item)"
              class="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm transition"
            >
              Simpan
            </button>
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

import { generateWALink, getStatusMessage } from '~/utils/waNotification'

// State
const loading = ref(true)
const pengajuanList = ref([])
const filterStatus = ref('semua')

const statusFilters = [
  { value: 'semua', label: 'Semua' },
  { value: 'menunggu', label: '⏳ Menunggu' },
  { value: 'diproses', label: '🔄 Diproses' },
  { value: 'selesai', label: '✅ Selesai' },
  { value: 'ditolak', label: '❌ Ditolak' }
]

// Filtered pengajuan
const filteredPengajuan = computed(() => {
  if (filterStatus.value === 'semua') return pengajuanList.value
  return pengajuanList.value.filter(p => p.status === filterStatus.value)
})

// Status helpers
const statusBadgeClass = (status) => {
  const classes = {
    'menunggu': 'bg-yellow-100 text-yellow-700',
    'diproses': 'bg-blue-100 text-blue-700',
    'selesai': 'bg-green-100 text-green-700',
    'ditolak': 'bg-red-100 text-red-700'
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

const statusLabel = (status) => {
  const labels = {
    'menunggu': '⏳ Menunggu',
    'diproses': '🔄 Diproses',
    'selesai': '✅ Selesai',
    'ditolak': '❌ Ditolak'
  }
  return labels[status] || status
}

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getCountByStatus = (status) => {
  if (status === 'semua') return pengajuanList.value.length
  return pengajuanList.value.filter(p => p.status === status).length
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

    alert(`✅ Status berhasil diupdate!`)
    await loadPengajuan()
  } catch (error) {
    console.error('Error updating status:', error)
    alert('❌ Gagal update status: ' + error.message)
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

    alert('✅ Catatan berhasil disimpan!')
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
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 0.8s linear infinite;
}
</style>