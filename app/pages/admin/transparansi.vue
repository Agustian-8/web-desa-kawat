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
        <h1 class="text-2xl font-bold text-gray-900">Kelola Transparansi</h1>
        <p class="text-sm text-gray-500">Atur data transparansi dana desa</p>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex gap-2 mb-6 border-b border-gray-200">
      <button 
        v-for="tab in tabs" 
        :key="tab.key"
        @click="activeTab = tab.key"
        class="px-6 py-3 font-medium transition-all duration-200 border-b-2"
        :class="activeTab === tab.key ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="flex justify-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-600/30 border-t-emerald-600"></div>
    </div>

    <!-- ============================================ -->
    <!-- TAB ANGGARAN -->
    <!-- ============================================ -->
    <div v-else-if="activeTab === 'anggaran'" class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
      <form @submit.prevent="simpanAnggaran" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Total Pendapatan</label>
          <input 
            v-model.number="anggaranForm.total_pendapatan" 
            type="number" 
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            placeholder="1250000000"
          >
          <p class="text-xs text-gray-400 mt-1">Masukkan angka tanpa titik atau koma (contoh: 1250000000)</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Total Belanja</label>
          <input 
            v-model.number="anggaranForm.total_belanja" 
            type="number" 
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            placeholder="1180000000"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Estimasi SILPA</label>
          <input 
            v-model.number="anggaranForm.estimasi_silpa" 
            type="number" 
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            placeholder="70000000"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Tahun</label>
          <input 
            v-model="anggaranForm.tahun" 
            type="text" 
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            placeholder="2026"
          >
        </div>

        <div class="flex gap-3 pt-4">
          <button 
            type="submit" 
            :disabled="loading"
            class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl shadow-md transition-all disabled:opacity-70 flex items-center justify-center gap-2"
          >
            <span v-if="loading" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
            Simpan Anggaran
          </button>
        </div>
      </form>
    </div>

    <!-- ============================================ -->
    <!-- TAB ALOKASI -->
    <!-- ============================================ -->
    <div v-else-if="activeTab === 'alokasi'" class="space-y-6">
      <div class="flex justify-end">
        <button 
          @click="openModalAlokasi()"
          class="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Tambah Alokasi
        </button>
      </div>

      <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm border-collapse">
            <thead>
              <tr class="bg-slate-50 text-gray-600 font-semibold uppercase text-[11px] tracking-wider border-b border-gray-200">
                <th class="p-4 w-12">No</th>
                <th class="p-4">Nama</th>
                <th class="p-4">Deskripsi</th>
                <th class="p-4 text-right">Nominal</th>
                <th class="p-4 text-center">Persentase</th>
                <th class="p-4 text-center">Warna</th>
                <th class="p-4 text-center w-32">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-gray-700">
              <tr v-for="(item, index) in alokasiList" :key="item.id" class="hover:bg-slate-50/80 transition-colors">
                <td class="p-4 text-gray-400 text-center">{{ index + 1 }}</td>
                <td class="p-4 font-semibold text-gray-900">{{ item.nama }}</td>
                <td class="p-4 text-gray-500">{{ item.deskripsi || '-' }}</td>
                <td class="p-4 text-right font-medium">{{ formatRupiah(item.nominal) }}</td>
                <td class="p-4 text-center font-medium">{{ item.persentase }}%</td>
                <td class="p-4 text-center">
                  <span class="inline-block w-6 h-6 rounded-full border border-gray-200" :style="{ backgroundColor: item.warna }"></span>
                </td>
                <td class="p-4 text-center space-x-2">
                  <button @click="openModalAlokasi(item)" class="text-blue-600 hover:text-blue-800 font-medium transition-colors text-sm">Edit</button>
                  <button @click="hapusAlokasi(item.id)" class="text-red-600 hover:text-red-800 font-medium transition-colors text-sm">Hapus</button>
                </td>
              </tr>
              <tr v-if="alokasiList.length === 0">
                <td colspan="7" class="p-8 text-center text-gray-400">Belum ada data alokasi</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- TAB PROGRES -->
    <!-- ============================================ -->
    <div v-else-if="activeTab === 'progres'" class="space-y-6">
      <div class="flex justify-end">
        <button 
          @click="openModalProgres()"
          class="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Tambah Progres
        </button>
      </div>

      <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm border-collapse">
            <thead>
              <tr class="bg-slate-50 text-gray-600 font-semibold uppercase text-[11px] tracking-wider border-b border-gray-200">
                <th class="p-4 w-12">No</th>
                <th class="p-4">Judul</th>
                <th class="p-4">Lokasi</th>
                <th class="p-4">Anggaran</th>
                <th class="p-4 text-center">Progress</th>
                <th class="p-4 text-center">Status</th>
                <th class="p-4 text-center w-32">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-gray-700">
              <tr v-for="(item, index) in progresList" :key="item.id" class="hover:bg-slate-50/80 transition-colors">
                <td class="p-4 text-gray-400 text-center">{{ index + 1 }}</td>
                <td class="p-4 font-semibold text-gray-900">{{ item.judul }}</td>
                <td class="p-4 text-gray-500">{{ item.lokasi || '-' }}</td>
                <td class="p-4 font-medium">{{ item.anggaran || '-' }}</td>
                <td class="p-4 text-center">
                  <div class="flex items-center gap-2">
                    <div class="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div class="h-full bg-emerald-500 rounded-full" :style="{ width: item.progress + '%' }"></div>
                    </div>
                    <span class="text-xs font-medium">{{ item.progress }}%</span>
                  </div>
                </td>
                <td class="p-4 text-center">
                  <span :class="statusBadge(item.status)" class="px-2.5 py-1 text-xs font-semibold rounded-full">
                    {{ item.status }}
                  </span>
                </td>
                <td class="p-4 text-center space-x-2">
                  <button @click="openModalProgres(item)" class="text-blue-600 hover:text-blue-800 font-medium transition-colors text-sm">Edit</button>
                  <button @click="hapusProgres(item.id)" class="text-red-600 hover:text-red-800 font-medium transition-colors text-sm">Hapus</button>
                </td>
              </tr>
              <tr v-if="progresList.length === 0">
                <td colspan="7" class="p-8 text-center text-gray-400">Belum ada data progres</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- MODAL ALOKASI -->
    <!-- ============================================ -->
    <div v-if="showModalAlokasi" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
        <h3 class="text-lg font-bold text-gray-900 mb-4">
          {{ editModeAlokasi ? 'Edit Alokasi' : 'Tambah Alokasi' }}
        </h3>
        <form @submit.prevent="simpanAlokasi" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nama <span class="text-red-500">*</span></label>
            <input v-model="alokasiForm.nama" type="text" required class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
            <textarea v-model="alokasiForm.deskripsi" rows="2" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nominal <span class="text-red-500">*</span></label>
            <input v-model.number="alokasiForm.nominal" type="number" required class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Persentase (%)</label>
            <input v-model.number="alokasiForm.persentase" type="number" step="0.1" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Warna</label>
            <div class="flex gap-3">
              <button v-for="warna in warnaOptions" :key="warna" type="button" @click="alokasiForm.warna = warna" class="w-10 h-10 rounded-full border-2 transition-all" :class="[alokasiForm.warna === warna ? 'border-emerald-600 scale-110' : 'border-transparent']" :style="{ backgroundColor: warna }"></button>
            </div>
          </div>
          <div class="flex gap-3 pt-4">
            <button type="button" @click="showModalAlokasi = false" class="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition">Batal</button>
            <button type="submit" :disabled="loading" class="flex-1 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition disabled:opacity-70 flex items-center justify-center gap-2">
              <span v-if="loading" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              {{ editModeAlokasi ? 'Update' : 'Simpan' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- MODAL PROGRES -->
    <!-- ============================================ -->
    <div v-if="showModalProgres" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
        <h3 class="text-lg font-bold text-gray-900 mb-4">
          {{ editModeProgres ? 'Edit Progres' : 'Tambah Progres' }}
        </h3>
        <form @submit.prevent="simpanProgres" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Judul <span class="text-red-500">*</span></label>
            <input v-model="progresForm.judul" type="text" required class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lokasi</label>
            <input v-model="progresForm.lokasi" type="text" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Anggaran</label>
            <input v-model="progresForm.anggaran" type="text" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="Rp 150.000.000">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Progress (%)</label>
            <input v-model.number="progresForm.progress" type="number" min="0" max="100" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select v-model="progresForm.status" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white">
              <option value="Persiapan">Persiapan</option>
              <option value="Dalam Pengerjaan">Dalam Pengerjaan</option>
              <option value="Selesai">Selesai</option>
              <option value="Ditunda">Ditunda</option>
            </select>
          </div>
          <div class="flex gap-3 pt-4">
            <button type="button" @click="showModalProgres = false" class="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition">Batal</button>
            <button type="submit" :disabled="loading" class="flex-1 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition disabled:opacity-70 flex items-center justify-center gap-2">
              <span v-if="loading" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              {{ editModeProgres ? 'Update' : 'Simpan' }}
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
const router = useRouter()
const user = useSupabaseUser()

if (!user.value) {
  navigateTo('/login')
}

// State
const pending = ref(true)
const loading = ref(false)
const activeTab = ref('anggaran')

// Tabs
const tabs = [
  { key: 'anggaran', label: 'Anggaran' },
  { key: 'alokasi', label: 'Alokasi Belanja' },
  { key: 'progres', label: 'Progres Pembangunan' }
]

// Data
const anggaranForm = ref({
  id: null,
  total_pendapatan: 0,
  total_belanja: 0,
  estimasi_silpa: 0,
  tahun: '2026'
})

const alokasiList = ref([])
const alokasiForm = ref({
  id: null,
  nama: '',
  deskripsi: '',
  nominal: 0,
  persentase: 0,
  warna: '#3B82F6'
})

const progresList = ref([])
const progresForm = ref({
  id: null,
  judul: '',
  lokasi: '',
  anggaran: '',
  progress: 0,
  status: 'Dalam Pengerjaan'
})

// Modal states
const showModalAlokasi = ref(false)
const showModalProgres = ref(false)
const editModeAlokasi = ref(false)
const editModeProgres = ref(false)

// Warna options
const warnaOptions = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444']

// Format Rupiah
const formatRupiah = (value) => {
  if (!value) return 'Rp 0'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

// Status badge
const statusBadge = (status) => {
  const classes = {
    'Selesai': 'bg-emerald-100 text-emerald-700',
    'Dalam Pengerjaan': 'bg-amber-100 text-amber-700',
    'Persiapan': 'bg-blue-100 text-blue-700',
    'Ditunda': 'bg-red-100 text-red-700'
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

// Load data
const loadData = async () => {
  pending.value = true

  try {
    // Load anggaran
    const { data: anggaranData } = await supabase
      .from('transparansi_anggaran')
      .select('*')
      .limit(1)
      .single()

    if (anggaranData) {
      anggaranForm.value = anggaranData
    }

    // Load alokasi
    const { data: alokasiData } = await supabase
      .from('transparansi_alokasi')
      .select('*')
      .order('id', { ascending: true })

    if (alokasiData) {
      alokasiList.value = alokasiData
    }

    // Load progres
    const { data: progresData } = await supabase
      .from('transparansi_progres')
      .select('*')
      .order('id', { ascending: true })

    if (progresData) {
      progresList.value = progresData
    }

  } catch (error) {
    console.error('Error loading data:', error)
  }

  pending.value = false
}

await loadData()

// ============================================
// CRUD ANGGARAN
// ============================================
const simpanAnggaran = async () => {
  loading.value = true

  try {
    const data = {
      total_pendapatan: anggaranForm.value.total_pendapatan,
      total_belanja: anggaranForm.value.total_belanja,
      estimasi_silpa: anggaranForm.value.estimasi_silpa,
      tahun: anggaranForm.value.tahun
    }

    if (anggaranForm.value.id) {
      const { error } = await supabase
        .from('transparansi_anggaran')
        .update(data)
        .eq('id', anggaranForm.value.id)

      if (error) throw error
    } else {
      const { error } = await supabase
        .from('transparansi_anggaran')
        .insert([data])

      if (error) throw error
    }

    alert('✅ Anggaran berhasil disimpan!')
    await loadData()

  } catch (error) {
    alert('❌ Gagal menyimpan anggaran: ' + error.message)
  } finally {
    loading.value = false
  }
}

// ============================================
// CRUD ALOKASI
// ============================================
const openModalAlokasi = (item = null) => {
  if (item) {
    alokasiForm.value = { ...item }
    editModeAlokasi.value = true
  } else {
    alokasiForm.value = {
      id: null,
      nama: '',
      deskripsi: '',
      nominal: 0,
      persentase: 0,
      warna: '#3B82F6'
    }
    editModeAlokasi.value = false
  }
  showModalAlokasi.value = true
}

const simpanAlokasi = async () => {
  loading.value = true

  try {
    const data = {
      nama: alokasiForm.value.nama,
      deskripsi: alokasiForm.value.deskripsi,
      nominal: alokasiForm.value.nominal,
      persentase: alokasiForm.value.persentase,
      warna: alokasiForm.value.warna
    }

    if (editModeAlokasi.value) {
      const { error } = await supabase
        .from('transparansi_alokasi')
        .update(data)
        .eq('id', alokasiForm.value.id)

      if (error) throw error
    } else {
      const { error } = await supabase
        .from('transparansi_alokasi')
        .insert([data])

      if (error) throw error
    }

    alert('✅ Alokasi berhasil disimpan!')
    showModalAlokasi.value = false
    await loadData()

  } catch (error) {
    alert('❌ Gagal menyimpan alokasi: ' + error.message)
  } finally {
    loading.value = false
  }
}

const hapusAlokasi = async (id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) return

  try {
    const { error } = await supabase
      .from('transparansi_alokasi')
      .delete()
      .eq('id', id)

    if (error) throw error

    alert('✅ Data berhasil dihapus!')
    await loadData()
  } catch (error) {
    alert('❌ Gagal menghapus data: ' + error.message)
  }
}

// ============================================
// CRUD PROGRES
// ============================================
const openModalProgres = (item = null) => {
  if (item) {
    progresForm.value = { ...item }
    editModeProgres.value = true
  } else {
    progresForm.value = {
      id: null,
      judul: '',
      lokasi: '',
      anggaran: '',
      progress: 0,
      status: 'Dalam Pengerjaan'
    }
    editModeProgres.value = false
  }
  showModalProgres.value = true
}

const simpanProgres = async () => {
  loading.value = true

  try {
    const data = {
      judul: progresForm.value.judul,
      lokasi: progresForm.value.lokasi,
      anggaran: progresForm.value.anggaran,
      progress: progresForm.value.progress,
      status: progresForm.value.status
    }

    if (editModeProgres.value) {
      const { error } = await supabase
        .from('transparansi_progres')
        .update(data)
        .eq('id', progresForm.value.id)

      if (error) throw error
    } else {
      const { error } = await supabase
        .from('transparansi_progres')
        .insert([data])

      if (error) throw error
    }

    alert('✅ Progres berhasil disimpan!')
    showModalProgres.value = false
    await loadData()

  } catch (error) {
    alert('❌ Gagal menyimpan progres: ' + error.message)
  } finally {
    loading.value = false
  }
}

const hapusProgres = async (id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) return

  try {
    const { error } = await supabase
      .from('transparansi_progres')
      .delete()
      .eq('id', id)

    if (error) throw error

    alert('✅ Data berhasil dihapus!')
    await loadData()
  } catch (error) {
    alert('❌ Gagal menghapus data: ' + error.message)
  }
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