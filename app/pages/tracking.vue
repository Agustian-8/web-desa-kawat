<template>
  <div class="min-h-screen bg-slate-50 py-12 px-4 font-['Poppins']">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Cek Status Pengajuan</h1>
        <p class="text-gray-500">Masukkan nomor pengajuan Anda untuk melihat status terbaru</p>
      </div>

      <!-- Form Cek Status -->
      <div class="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div class="flex gap-3">
          <input 
            v-model="nomorPengajuan" 
            type="text" 
            placeholder="Contoh: P202601290001"
            class="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            @keyup.enter="cekStatus"
          >
          <button 
            @click="cekStatus" 
            :disabled="loading"
            class="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition disabled:opacity-70 flex items-center gap-2"
          >
            <span v-if="loading" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
            Cek
          </button>
        </div>

        <!-- Hasil Tracking -->
        <div v-if="pengajuan" class="mt-8 pt-8 border-t border-gray-100">
          <!-- Status Badge -->
          <div class="flex items-center justify-between mb-6">
            <div>
              <span class="text-sm text-gray-500">Nomor Pengajuan</span>
              <p class="text-lg font-bold text-gray-900">{{ pengajuan.nomor_pengajuan }}</p>
            </div>
            <span 
              class="px-4 py-2 rounded-full text-sm font-semibold"
              :class="statusBadgeClass(pengajuan.status)"
            >
              {{ statusLabel(pengajuan.status) }}
            </span>
          </div>

          <!-- Informasi Pengajuan -->
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span class="text-sm text-gray-500">Nama</span>
              <p class="font-semibold text-gray-900">{{ pengajuan.nama_lengkap }}</p>
            </div>
            <div>
              <span class="text-sm text-gray-500">Layanan</span>
              <p class="font-semibold text-gray-900">{{ pengajuan.layanan_nama }}</p>
            </div>
            <div>
              <span class="text-sm text-gray-500">Tanggal Pengajuan</span>
              <p class="font-semibold text-gray-900">{{ formatDate(pengajuan.created_at) }}</p>
            </div>
            <div>
              <span class="text-sm text-gray-500">Status Terakhir</span>
              <p class="font-semibold text-gray-900">{{ formatDate(pengajuan.updated_at) }}</p>
            </div>
          </div>

          <!-- Timeline Status -->
          <div class="bg-slate-50 rounded-xl p-4 mb-6">
            <h4 class="text-sm font-semibold text-gray-700 mb-3">Timeline</h4>
            <div class="space-y-3">
              <div v-for="(item, index) in statusHistory" :key="index" class="flex items-start gap-3">
                <div class="relative">
                  <div class="w-3 h-3 rounded-full mt-1" :class="item.active ? 'bg-emerald-500' : 'bg-gray-300'"></div>
                  <div v-if="index < statusHistory.length - 1" class="absolute top-4 left-1.5 w-0.5 h-8 bg-gray-300"></div>
                </div>
                <div>
                  <p class="font-medium text-gray-900 text-sm">{{ item.label }}</p>
                  <p class="text-xs text-gray-500">{{ item.time }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Catatan Admin -->
          <div v-if="pengajuan.catatan_admin" class="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p class="text-sm font-semibold text-amber-800 mb-1">📝 Catatan Admin</p>
            <p class="text-sm text-amber-700">{{ pengajuan.catatan_admin }}</p>
          </div>

          <!-- Tombol -->
          <div class="flex gap-3 mt-6">
            <button @click="shareWA" class="flex-1 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              </svg>
              Tanya via WhatsApp
            </button>
            <button @click="printStatus" class="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
              </svg>
              Cetak
            </button>
          </div>
        </div>

        <!-- Not Found -->
        <div v-if="notFound" class="mt-8 pt-8 border-t border-gray-100 text-center">
          <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Pengajuan Tidak Ditemukan</h3>
          <p class="text-gray-500">Pastikan nomor pengajuan yang Anda masukkan benar.</p>
        </div>
      </div>

      <!-- Info -->
      <div class="mt-6 text-center text-sm text-gray-400">
        <p>Butuh bantuan? Hubungi admin desa.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const route = useRoute()

const nomorPengajuan = ref(route.query.nomor || '')
const loading = ref(false)
const pengajuan = ref(null)
const notFound = ref(false)

// Status badge class
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

// Status history
const statusHistory = computed(() => {
  if (!pengajuan.value) return []
  const statuses = []
  const order = ['menunggu', 'diproses', 'selesai', 'ditolak']
  const labels = {
    'menunggu': 'Pengajuan Dikirim',
    'diproses': 'Sedang Diproses',
    'selesai': 'Selesai',
    'ditolak': 'Ditolak'
  }
  
  const currentStatus = pengajuan.value.status
  const currentIndex = order.indexOf(currentStatus)
  
  for (let i = 0; i <= currentIndex; i++) {
    const status = order[i]
    statuses.push({
      label: labels[status],
      time: status === currentStatus ? formatDate(pengajuan.value.updated_at) : '-',
      active: status === currentStatus
    })
  }
  
  if (currentStatus === 'ditolak') {
    statuses.push({
      label: 'Ditolak',
      time: formatDate(pengajuan.value.updated_at),
      active: true
    })
  }
  
  return statuses
})

// Cek status
const cekStatus = async () => {
  if (!nomorPengajuan.value.trim()) {
    alert('Masukkan nomor pengajuan!')
    return
  }

  loading.value = true
  notFound.value = false
  pengajuan.value = null

  try {
    const { data, error } = await supabase
      .from('pengajuan')
      .select('*')
      .eq('nomor_pengajuan', nomorPengajuan.value.trim())
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        notFound.value = true
      } else {
        console.error('Error:', error)
        alert('Terjadi kesalahan. Silakan coba lagi.')
      }
      return
    }

    if (data) {
      pengajuan.value = data
    } else {
      notFound.value = true
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Terjadi kesalahan. Silakan coba lagi.')
  } finally {
    loading.value = false
  }
}

// Share via WhatsApp
const shareWA = () => {
  if (!pengajuan.value) return
  
  const { nama_lengkap, nomor_pengajuan, status, layanan_nama } = pengajuan.value
  const pesan = `Halo, saya ingin menanyakan status pengajuan saya:%0A%0A` +
    `Nama: ${nama_lengkap}%0A` +
    `Nomor Pengajuan: ${nomor_pengajuan}%0A` +
    `Layanan: ${layanan_nama}%0A` +
    `Status: ${statusLabel(status)}%0A%0A` +
    `Terima kasih.`
  
  window.open(`https://wa.me/6289514215508?text=${pesan}`, '_blank')
}

// Print
const printStatus = () => {
  window.print()
}

// Auto cek jika ada nomor di URL
onMounted(() => {
  if (route.query.nomor) {
    cekStatus()
  }
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

@media print {
  .no-print {
    display: none !important;
  }
  body {
    background: white !important;
  }
}
</style>