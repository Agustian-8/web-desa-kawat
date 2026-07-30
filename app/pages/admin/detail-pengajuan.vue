<template>
  <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-4 border-emerald-600/30 border-t-emerald-600"></div>
    </div>

    <!-- Detail -->
    <div v-else-if="pengajuan">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Detail Pengajuan</h1>
          <p class="text-sm text-gray-500">{{ pengajuan.nomor_pengajuan }}</p>
        </div>
        <div class="flex gap-2">
          <!-- Tombol Kirim WA -->
          <button 
            @click="bukaWA"
            class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            </svg>
            Kirim WA
          </button>
          <NuxtLink to="/admin/pengajuan" class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition">
            Kembali
          </NuxtLink>
        </div>
      </div>

      <!-- Status -->
      <div class="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
        <span class="text-sm font-medium text-gray-700">Status:</span>
        <span 
          class="px-3 py-1 rounded-full text-sm font-medium"
          :class="statusBadgeClass(pengajuan.status)"
        >
          {{ statusLabel(pengajuan.status) }}
        </span>
        <span class="text-sm text-gray-400">|</span>
        <span class="text-sm text-gray-500">Diperbarui: {{ formatDate(pengajuan.updated_at) }}</span>
      </div>

      <!-- Grid Data -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Kolom Kiri: Data Diri -->
        <div class="space-y-4">
          <h3 class="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Data Diri</h3>
          
          <div>
            <label class="text-xs text-gray-500 uppercase tracking-wider">Nama Lengkap</label>
            <p class="font-semibold text-gray-900">{{ pengajuan.nama_lengkap }}</p>
          </div>
          
          <div>
            <label class="text-xs text-gray-500 uppercase tracking-wider">NIK</label>
            <p class="font-semibold text-gray-900">{{ pengajuan.nik }}</p>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs text-gray-500 uppercase tracking-wider">Tempat Lahir</label>
              <p class="font-semibold text-gray-900">{{ pengajuan.tempat_lahir || '-' }}</p>
            </div>
            <div>
              <label class="text-xs text-gray-500 uppercase tracking-wider">Tanggal Lahir</label>
              <p class="font-semibold text-gray-900">{{ pengajuan.tanggal_lahir ? formatDate(pengajuan.tanggal_lahir) : '-' }}</p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs text-gray-500 uppercase tracking-wider">Jenis Kelamin</label>
              <p class="font-semibold text-gray-900">{{ pengajuan.jenis_kelamin || '-' }}</p>
            </div>
            <div>
              <label class="text-xs text-gray-500 uppercase tracking-wider">Pekerjaan</label>
              <p class="font-semibold text-gray-900">{{ pengajuan.pekerjaan || '-' }}</p>
            </div>
          </div>
        </div>

        <!-- Kolom Kanan: Kontak & Alamat -->
        <div class="space-y-4">
          <h3 class="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Kontak & Alamat</h3>
          
          <div>
            <label class="text-xs text-gray-500 uppercase tracking-wider">Nomor HP / WA</label>
            <p class="font-semibold text-gray-900">{{ pengajuan.no_hp }}</p>
          </div>
          
          <div>
            <label class="text-xs text-gray-500 uppercase tracking-wider">Email</label>
            <p class="font-semibold text-gray-900">{{ pengajuan.email || '-' }}</p>
          </div>
          
          <div>
            <label class="text-xs text-gray-500 uppercase tracking-wider">Alamat</label>
            <p class="font-semibold text-gray-900">{{ pengajuan.alamat }}</p>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs text-gray-500 uppercase tracking-wider">RT</label>
              <p class="font-semibold text-gray-900">{{ pengajuan.rt || '-' }}</p>
            </div>
            <div>
              <label class="text-xs text-gray-500 uppercase tracking-wider">RW</label>
              <p class="font-semibold text-gray-900">{{ pengajuan.rw || '-' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Data Pengajuan -->
      <div class="mt-8 pt-6 border-t border-gray-200">
        <h3 class="text-lg font-bold text-gray-900 mb-4">Data Pengajuan</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="text-xs text-gray-500 uppercase tracking-wider">Layanan</label>
            <p class="font-semibold text-gray-900">{{ pengajuan.layanan_nama }}</p>
          </div>
          <div>
            <label class="text-xs text-gray-500 uppercase tracking-wider">Tanggal Pengajuan</label>
            <p class="font-semibold text-gray-900">{{ formatDate(pengajuan.created_at) }}</p>
          </div>
        </div>
        
        <div class="mt-4">
          <label class="text-xs text-gray-500 uppercase tracking-wider">Keperluan</label>
          <p class="text-gray-700 bg-gray-50 p-3 rounded-xl mt-1">{{ pengajuan.keperluan || '-' }}</p>
        </div>
        
        <div class="mt-4">
          <label class="text-xs text-gray-500 uppercase tracking-wider">Catatan Tambahan</label>
          <p class="text-gray-700 bg-gray-50 p-3 rounded-xl mt-1">{{ pengajuan.catatan || '-' }}</p>
        </div>
        
        <!-- Lampiran -->
        <div v-if="pengajuan.lampiran && pengajuan.lampiran.length > 0" class="mt-4">
          <label class="text-xs text-gray-500 uppercase tracking-wider">Dokumen Pendukung</label>
          <div class="flex flex-wrap gap-2 mt-2">
            <a 
              v-for="(file, index) in pengajuan.lampiran" 
              :key="index"
              :href="file" 
              target="_blank"
              class="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm hover:bg-blue-100 transition"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
              Lihat Dokumen {{ index + 1 }}
            </a>
          </div>
        </div>
      </div>

      <!-- Catatan Admin -->
      <div class="mt-8 pt-6 border-t border-gray-200">
        <h3 class="text-lg font-bold text-gray-900 mb-4">Catatan Admin</h3>
        
        <div class="flex gap-3">
          <input 
            v-model="catatanAdmin"
            type="text"
            placeholder="Tambahkan catatan untuk warga..."
            class="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            @keyup.enter="simpanCatatan"
          >
          <button 
            @click="simpanCatatan"
            :disabled="savingCatatan"
            class="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition disabled:opacity-70 flex items-center gap-2"
          >
            <span v-if="savingCatatan" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
            Simpan
          </button>
        </div>
        
        <div v-if="pengajuan.catatan_admin" class="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p class="text-sm font-semibold text-amber-800 mb-1">📝 Catatan Admin</p>
          <p class="text-sm text-amber-700">{{ pengajuan.catatan_admin }}</p>
        </div>
      </div>

      <!-- Update Status -->
      <div class="mt-8 pt-6 border-t border-gray-200">
        <h3 class="text-lg font-bold text-gray-900 mb-4">Update Status</h3>
        
        <div class="flex gap-3">
          <select 
            v-model="selectedStatus"
            class="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
          >
            <option value="menunggu">⏳ Menunggu</option>
            <option value="diproses">🔄 Diproses</option>
            <option value="selesai">✅ Selesai</option>
            <option value="ditolak">❌ Ditolak</option>
          </select>
          <button 
            @click="updateStatus"
            :disabled="updatingStatus"
            class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition disabled:opacity-70 flex items-center gap-2"
          >
            <span v-if="updatingStatus" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
            Update Status
          </button>
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="text-center py-12">
      <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <h3 class="text-lg font-bold text-gray-900 mb-2">Pengajuan Tidak Ditemukan</h3>
      <p class="text-gray-500">Pengajuan yang Anda cari tidak ada.</p>
      <NuxtLink to="/admin/pengajuan" class="mt-4 inline-block text-emerald-600 hover:text-emerald-700 font-medium">
        Kembali ke Daftar Pengajuan
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// ✅ PASTIKAN MENGGUNAKAN LAYOUT ADMIN
definePageMeta({ layout: 'admin' })

const supabase = useSupabaseClient()
const route = useRoute()
const user = useSupabaseUser()

// Auth check
if (!user.value) {
  navigateTo('/login')
}

// Import utility WA
import { generateWALink, getStatusMessage } from '~/utils/waNotification'

// State
const loading = ref(true)
const savingCatatan = ref(false)
const updatingStatus = ref(false)
const pengajuan = ref(null)
const catatanAdmin = ref('')
const selectedStatus = ref('')

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
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Load detail pengajuan
const loadPengajuan = async () => {
  loading.value = true
  
  try {
    const id = route.query.id
    
    if (!id) {
      throw new Error('ID pengajuan tidak ditemukan')
    }
    
    const { data, error } = await supabase
      .from('pengajuan')
      .select('*')
      .eq('id', parseInt(id))
      .single()
    
    if (error) throw error
    
    pengajuan.value = data
    catatanAdmin.value = data.catatan_admin || ''
    selectedStatus.value = data.status || 'menunggu'
    
  } catch (error) {
    console.error('Error loading pengajuan:', error)
    alert('Gagal memuat detail pengajuan: ' + error.message)
  } finally {
    loading.value = false
  }
}

// Simpan catatan admin
const simpanCatatan = async () => {
  if (!pengajuan.value) return
  
  savingCatatan.value = true
  
  try {
    const { error } = await supabase
      .from('pengajuan')
      .update({ 
        catatan_admin: catatanAdmin.value,
        updated_at: new Date().toISOString()
      })
      .eq('id', pengajuan.value.id)
    
    if (error) throw error
    
    // Update local data
    pengajuan.value.catatan_admin = catatanAdmin.value
    
    alert('✅ Catatan berhasil disimpan!')
    
  } catch (error) {
    console.error('Error saving catatan:', error)
    alert('❌ Gagal menyimpan catatan: ' + error.message)
  } finally {
    savingCatatan.value = false
  }
}

// Update status
const updateStatus = async () => {
  if (!pengajuan.value) return
  
  updatingStatus.value = true
  
  try {
    const { error } = await supabase
      .from('pengajuan')
      .update({ 
        status: selectedStatus.value,
        updated_at: new Date().toISOString()
      })
      .eq('id', pengajuan.value.id)
    
    if (error) throw error
    
    // Update local data
    pengajuan.value.status = selectedStatus.value
    pengajuan.value.updated_at = new Date().toISOString()
    
    alert(`✅ Status berhasil diupdate menjadi: ${statusLabel(selectedStatus.value)}`)
    
  } catch (error) {
    console.error('Error updating status:', error)
    alert('❌ Gagal update status: ' + error.message)
  } finally {
    updatingStatus.value = false
  }
}

// ============= FITUR WA =============
const bukaWA = () => {
  if (!pengajuan.value) return
  
  const item = pengajuan.value
  
  // Siapkan pesan berdasarkan status
  const pesan = getStatusMessage(
    item.nama_lengkap,
    item.layanan_nama,
    item.status,
    item.nomor_pengajuan,
    item.catatan_admin
  )
  
  // Generate link WA
  const waLink = generateWALink(item.no_hp, pesan)
  
  // Buka WhatsApp di tab baru
  window.open(waLink, '_blank')
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