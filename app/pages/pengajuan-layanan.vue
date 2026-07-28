<template>
  <div class="bg-slate-50 min-h-screen pb-24 font-['Poppins']">
    <!-- Header -->
    <section class="bg-slate-900 text-white pt-32 pb-16 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-emerald-900 to-slate-900 opacity-90"></div>
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="flex items-center gap-4 mb-4">
          <NuxtLink to="/layanan" class="text-white/70 hover:text-white transition-colors flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Kembali
          </NuxtLink>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold mb-4">
          {{ layananNama }}
        </h1>
        <p class="text-slate-300 text-lg max-w-2xl">
          Isi formulir pengajuan dengan data yang benar dan lengkap
        </p>
      </div>
    </section>

    <!-- Form -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
      <div class="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 lg:p-10">
        
        <!-- Success State -->
        <div v-if="success" class="text-center py-8">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-4">
            <svg class="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Pengajuan Berhasil!</h2>
          <p class="text-gray-600 mb-2">Nomor Pengajuan: <strong class="text-emerald-600">{{ nomorPengajuan }}</strong></p>
          <p class="text-gray-500 text-sm mb-6">Silakan simpan nomor pengajuan untuk melacak status</p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <NuxtLink to="/layanan" class="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition">
              Kembali ke Layanan
            </NuxtLink>
            <button @click="printPengajuan" class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition">
              Cetak / Simpan PDF
            </button>
          </div>
        </div>

        <!-- Form -->
        <form v-else @submit.prevent="submitPengajuan" class="space-y-6">
          <!-- Progress Bar -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-2 text-sm">
              <span class="font-medium text-gray-700">Progress</span>
              <span class="text-emerald-600 font-medium">{{ progress }}%</span>
            </div>
            <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                class="h-full bg-emerald-600 rounded-full transition-all duration-500"
                :style="{ width: progress + '%' }"
              ></div>
            </div>
          </div>

          <!-- Informasi Layanan -->
          <div class="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-900">{{ layananNama }}</p>
                <p class="text-xs text-gray-600 mt-0.5">Jenis layanan yang Anda pilih</p>
              </div>
            </div>
          </div>

          <!-- Data Diri -->
          <div class="border-b border-gray-200 pb-6">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Data Diri</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap <span class="text-red-500">*</span></label>
                <input 
                  v-model="form.nama_lengkap" 
                  type="text" 
                  required
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Nama lengkap sesuai KTP"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">NIK <span class="text-red-500">*</span></label>
                <input 
                  v-model="form.nik" 
                  type="text" 
                  required
                  maxlength="16"
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="16 digit NIK"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Tempat Lahir</label>
                <input 
                  v-model="form.tempat_lahir" 
                  type="text" 
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Kota tempat lahir"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Lahir</label>
                <input 
                  v-model="form.tanggal_lahir" 
                  type="date" 
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Jenis Kelamin</label>
                <select 
                  v-model="form.jenis_kelamin" 
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
                >
                  <option value="">Pilih...</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Pekerjaan</label>
                <input 
                  v-model="form.pekerjaan" 
                  type="text" 
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Pekerjaan saat ini"
                >
              </div>
            </div>
          </div>

          <!-- Alamat -->
          <div class="border-b border-gray-200 pb-6">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Alamat</h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap <span class="text-red-500">*</span></label>
                <textarea 
                  v-model="form.alamat" 
                  required
                  rows="2"
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Alamat lengkap sesuai KTP"
                ></textarea>
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">RT</label>
                  <input 
                    v-model="form.rt" 
                    type="text" 
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    placeholder="RT"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">RW</label>
                  <input 
                    v-model="form.rw" 
                    type="text" 
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    placeholder="RW"
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Kontak -->
          <div class="border-b border-gray-200 pb-6">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Kontak</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nomor HP / WA <span class="text-red-500">*</span></label>
                <input 
                  v-model="form.no_hp" 
                  type="tel" 
                  required
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="08xx-xxxx-xxxx"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  v-model="form.email" 
                  type="email" 
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="email@example.com"
                >
              </div>
            </div>
          </div>

          <!-- Data Pengajuan -->
          <div class="border-b border-gray-200 pb-6">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Data Pengajuan</h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Keperluan</label>
                <textarea 
                  v-model="form.keperluan" 
                  rows="3"
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Jelaskan keperluan pengajuan Anda"
                ></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Catatan Tambahan</label>
                <textarea 
                  v-model="form.catatan" 
                  rows="2"
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Catatan tambahan (opsional)"
                ></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Upload Dokumen Pendukung</label>
                <div class="flex items-center justify-center w-full">
                  <label class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg class="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                      </svg>
                      <p class="mb-2 text-sm text-gray-500 font-semibold">Klik untuk upload dokumen</p>
                      <p class="text-xs text-gray-400">PDF, JPG, PNG (Maks. 5MB)</p>
                    </div>
                    <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" class="hidden" @change="handleFileUpload" />
                  </label>
                </div>
                <div v-if="uploadedFiles.length > 0" class="mt-3">
                  <p class="text-sm text-gray-600 font-medium">Dokumen terupload:</p>
                  <div class="flex flex-wrap gap-2 mt-2">
                    <span 
                      v-for="(file, index) in uploadedFiles" 
                      :key="index"
                      class="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm"
                    >
                      📄 {{ file.name }}
                      <button type="button" @click="removeFile(index)" class="text-red-500 hover:text-red-700">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tombol Submit -->
          <div class="flex gap-3 pt-4">
            <NuxtLink to="/layanan" class="flex-1 px-4 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all text-center">
              Batal
            </NuxtLink>
            <button 
              type="submit" 
              :disabled="loading"
              class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 transition-all disabled:opacity-70 flex justify-center items-center gap-2"
            >
              <span v-if="loading" class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              {{ loading ? 'Memproses...' : 'Ajukan Sekarang' }}
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const route = useRoute()
const router = useRouter()

// Ambil parameter dari URL
const layananId = route.query.layanan_id
const layananNama = route.query.layanan || 'Layanan'

// State
const loading = ref(false)
const success = ref(false)
const nomorPengajuan = ref('')
const uploadedFiles = ref([])
const progress = ref(0)

// Form data
const form = ref({
  layanan_id: parseInt(layananId) || null,
  layanan_nama: layananNama,
  nama_lengkap: '',
  nik: '',
  tempat_lahir: '',
  tanggal_lahir: '',
  jenis_kelamin: '',
  pekerjaan: '',
  alamat: '',
  rt: '',
  rw: '',
  no_hp: '',
  email: '',
  keperluan: '',
  catatan: '',
  lampiran: []
})

// Handle file upload
const handleFileUpload = (event) => {
  const files = event.target.files
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (file.size > 5 * 1024 * 1024) {
      alert(`File ${file.name} terlalu besar! Maksimal 5MB.`)
      continue
    }
    uploadedFiles.value.push(file)
  }
  event.target.value = ''
}

// Remove file
const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1)
}

// Submit pengajuan
const submitPengajuan = async () => {
  // Validasi
  if (!form.value.nama_lengkap || !form.value.nik || !form.value.alamat || !form.value.no_hp) {
    alert('Mohon lengkapi data yang wajib diisi!')
    return
  }

  loading.value = true
  progress.value = 30

  try {
    // Upload files jika ada
    const fileUrls = []
    for (const file of uploadedFiles.value) {
      progress.value = 50
      const fileExt = file.name.split('.').pop()
      const fileName = `pengajuan/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('pengajuan-dokumen')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage
        .from('pengajuan-dokumen')
        .getPublicUrl(fileName)

      fileUrls.push(urlData.publicUrl)
    }

    progress.value = 70

    // Simpan ke database
    const { data, error } = await supabase
      .from('pengajuan')
      .insert([
        {
          ...form.value,
          lampiran: fileUrls
        }
      ])
      .select()
      .single()

    if (error) throw error

    progress.value = 100
    nomorPengajuan.value = data.nomor_pengajuan
    success.value = true

  } catch (error) {
    console.error('Error:', error)
    alert('❌ Gagal mengirim pengajuan: ' + error.message)
  } finally {
    loading.value = false
  }
}

// Print / Save PDF
const printPengajuan = () => {
  window.print()
}

// Cek login untuk redirect
const user = useSupabaseUser()
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
}
</style>