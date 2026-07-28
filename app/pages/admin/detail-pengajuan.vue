<template>
  <div>
    <!-- Header -->
    <div class="flex items-center gap-4 mb-8">
      <NuxtLink to="/admin/pengajuan" class="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Detail Pengajuan</h1>
        <p class="text-sm text-gray-500">Lihat dan kelola pengajuan layanan warga</p>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="flex justify-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-600/30 border-t-emerald-600"></div>
    </div>

    <!-- Detail -->
    <div v-else-if="pengajuan" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Informasi Pengajuan -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Status Card -->
        <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500">Nomor Pengajuan</p>
              <p class="text-xl font-bold text-gray-900 font-mono">{{ pengajuan.nomor_pengajuan }}</p>
            </div>
            <span :class="statusClass(pengajuan.status)" class="px-4 py-2 text-sm font-semibold rounded-full">
              {{ statusLabel(pengajuan.status) }}
            </span>
          </div>
          <div class="mt-4 flex items-center gap-3 text-sm text-gray-500">
            <span>📅 {{ formatDate(pengajuan.created_at) }}</span>
            <span>•</span>
            <span>📋 {{ pengajuan.layanan_nama }}</span>
          </div>
        </div>

        <!-- Data Pemohon -->
        <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h3 class="font-bold text-gray-900 mb-4">Data Pemohon</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><span class="text-gray-500">Nama Lengkap</span><br><span class="font-medium">{{ pengajuan.nama_lengkap }}</span></div>
            <div><span class="text-gray-500">NIK</span><br><span class="font-medium">{{ pengajuan.nik }}</span></div>
            <div><span class="text-gray-500">Tempat, Tanggal Lahir</span><br><span class="font-medium">{{ pengajuan.tempat_lahir || '-' }}, {{ pengajuan.tanggal_lahir || '-' }}</span></div>
            <div><span class="text-gray-500">Jenis Kelamin</span><br><span class="font-medium">{{ pengajuan.jenis_kelamin || '-' }}</span></div>
            <div><span class="text-gray-500">Pekerjaan</span><br><span class="font-medium">{{ pengajuan.pekerjaan || '-' }}</span></div>
            <div><span class="text-gray-500">No HP / WA</span><br><span class="font-medium">{{ pengajuan.no_hp }}</span></div>
            <div class="md:col-span-2"><span class="text-gray-500">Email</span><br><span class="font-medium">{{ pengajuan.email || '-' }}</span></div>
            <div class="md:col-span-2"><span class="text-gray-500">Alamat</span><br><span class="font-medium">{{ pengajuan.alamat }}</span></div>
            <div><span class="text-gray-500">RT</span><br><span class="font-medium">{{ pengajuan.rt || '-' }}</span></div>
            <div><span class="text-gray-500">RW</span><br><span class="font-medium">{{ pengajuan.rw || '-' }}</span></div>
          </div>
        </div>

        <!-- Data Pengajuan -->
        <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h3 class="font-bold text-gray-900 mb-4">Data Pengajuan</h3>
          <div class="space-y-4 text-sm">
            <div>
              <span class="text-gray-500">Keperluan</span>
              <p class="mt-1 text-gray-700">{{ pengajuan.keperluan || '-' }}</p>
            </div>
            <div>
              <span class="text-gray-500">Catatan</span>
              <p class="mt-1 text-gray-700">{{ pengajuan.catatan || '-' }}</p>
            </div>
            <div>
              <span class="text-gray-500">Dokumen Pendukung</span>
              <div v-if="pengajuan.lampiran && pengajuan.lampiran.length > 0" class="mt-2 flex flex-wrap gap-2">
                <a 
                  v-for="(doc, index) in pengajuan.lampiran" 
                  :key="index"
                  :href="doc" 
                  target="_blank"
                  class="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-sm hover:bg-emerald-100 transition"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  Dokumen {{ index + 1 }}
                </a>
              </div>
              <p v-else class="text-gray-400">Tidak ada dokumen</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar - Action -->
      <div class="space-y-6">
        <!-- Update Status -->
        <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-6">
          <h3 class="font-bold text-gray-900 mb-4">Update Status</h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status Pengajuan</label>
              <select 
                v-model="statusBaru" 
                class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
              >
                <option value="menunggu">⏳ Menunggu</option>
                <option value="diproses">🔄 Diproses</option>
                <option value="selesai">✅ Selesai</option>
                <option value="ditolak">❌ Ditolak</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Catatan Admin</label>
              <textarea 
                v-model="catatanAdmin" 
                rows="3"
                class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="Tambahkan catatan untuk pemohon..."
              ></textarea>
            </div>

            <button 
              @click="updateStatus" 
              :disabled="loading"
              class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all disabled:opacity-70 flex items-center justify-center gap-2"
            >
              <span v-if="loading" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              Update Status
            </button>

            <button 
              v-if="pengajuan.status === 'selesai'"
              @click="printPengajuan" 
              class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
              </svg>
              Cetak Surat
            </button>
          </div>
        </div>

        <!-- Timeline -->
        <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h3 class="font-bold text-gray-900 mb-4">Timeline</h3>
          <div class="space-y-4 text-sm">
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 mt-2 rounded-full bg-emerald-500"></div>
              <div>
                <p class="text-gray-700">Pengajuan dibuat</p>
                <p class="text-xs text-gray-400">{{ formatDate(pengajuan.created_at) }}</p>
              </div>
            </div>
            <div v-if="pengajuan.processed_at" class="flex items-start gap-3">
              <div class="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
              <div>
                <p class="text-gray-700">Mulai diproses</p>
                <p class="text-xs text-gray-400">{{ formatDate(pengajuan.processed_at) }}</p>
              </div>
            </div>
            <div v-if="pengajuan.completed_at" class="flex items-start gap-3">
              <div class="w-2 h-2 mt-2 rounded-full bg-emerald-500"></div>
              <div>
                <p class="text-gray-700">Selesai</p>
                <p class="text-xs text-gray-400">{{ formatDate(pengajuan.completed_at) }}</p>
              </div>
            </div>
            <div v-if="pengajuan.rejected_at" class="flex items-start gap-3">
              <div class="w-2 h-2 mt-2 rounded-full bg-red-500"></div>
              <div>
                <p class="text-gray-700">Ditolak</p>
                <p class="text-xs text-gray-400">{{ formatDate(pengajuan.rejected_at) }}</p>
              </div>
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
const route = useRoute()
const router = useRouter()
const user = useSupabaseUser()

if (!user.value) {
  navigateTo('/login')
}

const pengajuanId = route.query.id
const pending = ref(true)
const loading = ref(false)
const pengajuan = ref(null)
const statusBaru = ref('')
const catatanAdmin = ref('')

// Load detail pengajuan
const loadDetail = async () => {
  if (!pengajuanId) {
    router.push('/admin/pengajuan')
    return
  }

  const { data, error } = await supabase
    .from('pengajuan')
    .select('*')
    .eq('id', pengajuanId)
    .single()

  if (!error && data) {
    pengajuan.value = data
    statusBaru.value = data.status
    catatanAdmin.value = data.catatan_admin || ''
  }
  pending.value = false
}

await loadDetail()

// Update status
const updateStatus = async () => {
  loading.value = true

  const updateData = {
    status: statusBaru.value,
    catatan_admin: catatanAdmin.value
  }

  if (statusBaru.value === 'diproses') {
    updateData.processed_at = new Date().toISOString()
  } else if (statusBaru.value === 'selesai') {
    updateData.completed_at = new Date().toISOString()
  } else if (statusBaru.value === 'ditolak') {
    updateData.rejected_at = new Date().toISOString()
  }

  try {
    const { error } = await supabase
      .from('pengajuan')
      .update(updateData)
      .eq('id', pengajuanId)

    if (error) throw error

    alert('✅ Status berhasil diperbarui!')
    await loadDetail()
  } catch (error) {
    alert('❌ Gagal update status: ' + error.message)
  } finally {
    loading.value = false
  }
}

// Status helper
const statusClass = (status) => {
  const classes = {
    menunggu: 'bg-amber-100 text-amber-700',
    diproses: 'bg-blue-100 text-blue-700',
    selesai: 'bg-emerald-100 text-emerald-700',
    ditolak: 'bg-red-100 text-red-700'
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

const printPengajuan = () => {
  window.print()
}
</script>