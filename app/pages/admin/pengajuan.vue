<template>
  <div>
    <!-- Header -->
    <header class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Manajemen Pengajuan</h1>
        <p class="text-sm text-gray-500">Kelola pengajuan layanan dari warga</p>
      </div>
      <div class="flex gap-3">
        <select 
          v-model="filterStatus" 
          class="px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white text-sm"
        >
          <option value="all">Semua Status</option>
          <option value="menunggu">⏳ Menunggu</option>
          <option value="diproses">🔄 Diproses</option>
          <option value="selesai">✅ Selesai</option>
          <option value="ditolak">❌ Ditolak</option>
        </select>
        <button @click="refreshData" class="bg-white hover:bg-gray-50 text-gray-600 px-4 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm border border-gray-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- Statistik -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 text-center">
        <p class="text-2xl font-bold text-gray-900">{{ stats.total }}</p>
        <p class="text-xs text-gray-500">Total</p>
      </div>
      <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 text-center">
        <p class="text-2xl font-bold text-amber-600">{{ stats.menunggu }}</p>
        <p class="text-xs text-gray-500">⏳ Menunggu</p>
      </div>
      <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 text-center">
        <p class="text-2xl font-bold text-blue-600">{{ stats.diproses }}</p>
        <p class="text-xs text-gray-500">🔄 Diproses</p>
      </div>
      <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 text-center">
        <p class="text-2xl font-bold text-emerald-600">{{ stats.selesai }}</p>
        <p class="text-xs text-gray-500">✅ Selesai</p>
      </div>
    </div>

    <!-- Daftar Pengajuan -->
    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <!-- Loading -->
      <div v-if="pending" class="flex justify-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-600/30 border-t-emerald-600"></div>
      </div>

      <!-- Tabel -->
      <div v-else class="overflow-x-auto">
        <table class="w-full text-left text-sm border-collapse">
          <thead>
            <tr class="bg-slate-50 text-gray-600 font-semibold uppercase text-[11px] tracking-wider border-b border-gray-200">
              <th class="p-4 w-40">Nomor</th>
              <th class="p-4">Pemohon</th>
              <th class="p-4">Layanan</th>
              <th class="p-4 w-32">Status</th>
              <th class="p-4 w-40">Tanggal</th>
              <th class="p-4 w-32 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-gray-700">
            <tr v-for="item in pengajuanFiltered" :key="item.id" class="hover:bg-slate-50/80 transition-colors">
              <td class="p-4 font-mono text-xs font-bold text-gray-600">{{ item.nomor_pengajuan }}</td>
              <td class="p-4">
                <div class="font-semibold text-gray-900">{{ item.nama_lengkap }}</div>
                <div class="text-xs text-gray-400">NIK: {{ item.nik }}</div>
              </td>
              <td class="p-4">
                <span class="text-sm">{{ item.layanan_nama }}</span>
              </td>
              <td class="p-4">
                <span :class="statusClass(item.status)">
                  {{ statusLabel(item.status) }}
                </span>
              </td>
              <td class="p-4 text-gray-500 text-xs">{{ formatDate(item.created_at) }}</td>
              <td class="p-4 text-center">
                <NuxtLink 
                  :to="'/admin/detail-pengajuan?id=' + item.id" 
                  class="text-emerald-600 hover:text-emerald-800 font-medium transition-colors text-sm"
                >
                  Detail
                </NuxtLink>
              </td>
            </tr>
            <tr v-if="pengajuanFiltered.length === 0">
              <td colspan="6" class="p-8 text-center text-gray-400">
                <p>Belum ada pengajuan</p>
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

if (!user.value) {
  navigateTo('/login')
}

// State
const pending = ref(true)
const pengajuanList = ref([])
const filterStatus = ref('all')

// Load pengajuan
const loadPengajuan = async () => {
  pending.value = true
  const { data, error } = await supabase
    .from('pengajuan')
    .select('*')
    .order('created_at', { ascending: false })

  if (!error) {
    pengajuanList.value = data || []
  }
  pending.value = false}

await loadPengajuan()

// Filter
const pengajuanFiltered = computed(() => {
  if (filterStatus.value === 'all') {
    return pengajuanList.value
  }
  return pengajuanList.value.filter(item => item.status === filterStatus.value)
})

// Statistik
const stats = computed(() => {
  const list = pengajuanList.value
  return {
    total: list.length,
    menunggu: list.filter(i => i.status === 'menunggu').length,
    diproses: list.filter(i => i.status === 'diproses').length,
    selesai: list.filter(i => i.status === 'selesai').length,
    ditolak: list.filter(i => i.status === 'ditolak').length
  }
})

// Status helper
const statusClass = (status) => {
  const classes = {
    menunggu: 'px-2.5 py-1 text-xs font-semibold bg-amber-100 text-amber-700 rounded-full',
    diproses: 'px-2.5 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full',
    selesai: 'px-2.5 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-full',
    ditolak: 'px-2.5 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded-full'
  }
  return classes[status] || classes.menunggu
}

const statusLabel = (status) => {
  const labels = {
    menunggu: '⏳ Menunggu',
    diproses: '🔄 Diproses',
    selesai: '✅ Selesai',
    ditolak: '❌ Ditolak'
  }
  return labels[status] || status
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Intl.DateTimeFormat('id-ID', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(dateString))
}

const refreshData = () => {
  loadPengajuan()
}
</script>