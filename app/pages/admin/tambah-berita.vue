<template>
  <div>
    <!-- Header -->
    <div class="flex items-center gap-4 mb-8">
      <NuxtLink to="/admin/berita" class="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Tulis Berita Baru</h1>
        <p class="text-sm text-gray-500">Informasi dan gambar akan disimpan di cloud server</p>
      </div>
    </div>

    <!-- Form -->
    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
      <form @submit.prevent="simpanBerita" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Judul Berita <span class="text-red-500">*</span></label>
          <input 
            v-model="form.title" 
            type="text" 
            required 
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            placeholder="Contoh: Penyaluran BLT Dana Desa Tahap 2"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Kategori <span class="text-red-500">*</span></label>
          <select 
            v-model="form.category" 
            required 
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
          >
            <option value="" disabled>Pilih Kategori...</option>
            <option value="Pengumuman">Pengumuman</option>
            <option value="Kegiatan">Kegiatan Desa</option>
            <option value="Pembangunan">Pembangunan</option>
            <option value="Informasi">Informasi</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Isi Berita <span class="text-red-500">*</span></label>
          <textarea 
            v-model="form.content" 
            required 
            rows="8" 
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            placeholder="Ketik isi berita secara lengkap di sini..."
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Unggah Gambar <span class="text-gray-400 text-xs">(Opsional)</span></label>
          <div class="flex items-center justify-center w-full">
            <label class="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors relative overflow-hidden">
              <div v-if="!previewUrl" class="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                <svg class="w-10 h-10 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                </svg>
                <p class="mb-2 text-sm text-gray-500 font-semibold">Klik untuk memilih gambar</p>
                <p class="text-xs text-gray-400">PNG, JPG, atau JPEG (Maks. 2MB)</p>
              </div>
              <img v-else :src="previewUrl" alt="Preview" class="w-full h-full object-contain p-4" />
              <input type="file" accept="image/png, image/jpeg, image/jpg" class="hidden" @change="handleFileChange" />
            </label>
          </div>
          <div v-if="previewUrl" class="mt-2 text-right">
            <button type="button" @click="hapusPilihanGambar" class="text-xs font-medium text-red-600 hover:underline">
              Hapus Gambar
            </button>
          </div>
        </div>

        <div class="flex gap-3 pt-4">
          <NuxtLink to="/admin/berita" class="flex-1 px-4 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all text-center">
            Batal
          </NuxtLink>
          <button 
            type="submit" 
            :disabled="loading" 
            class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl shadow-md transition-all disabled:opacity-70 flex justify-center items-center gap-2"
          >
            <span v-if="loading" class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            {{ loading ? 'Memproses...' : 'Publikasikan Berita' }}
          </button>
        </div>
      </form>
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

const loading = ref(false)
const selectedFile = ref(null)
const previewUrl = ref('')

const form = ref({
  title: '',
  category: '',
  content: ''
})

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran berkas terlalu besar! Maksimal 2MB.')
      return
    }
    selectedFile.value = file
    previewUrl.value = URL.createObjectURL(file)
  }
}

const hapusPilihanGambar = () => {
  selectedFile.value = null
  previewUrl.value = ''
}

const simpanBerita = async () => {
  loading.value = true
  let finalImageUrl = null

  try {
    if (selectedFile.value) {
      const file = selectedFile.value
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('berita-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage
        .from('berita-images')
        .getPublicUrl(filePath)

      finalImageUrl = urlData.publicUrl
    }

    const { error: insertError } = await supabase
      .from('berita')
      .insert([
        { 
          title: form.value.title, 
          category: form.value.category, 
          content: form.value.content, 
          image_url: finalImageUrl
        }
      ])

    if (insertError) throw insertError

    alert('✅ Berita berhasil dipublikasikan!')
    router.push('/admin/berita')

  } catch (error) {
    alert('❌ Gagal memproses unggahan berita: ' + error.message)
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>