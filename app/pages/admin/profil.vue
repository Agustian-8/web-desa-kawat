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
        <h1 class="text-2xl font-bold text-gray-900">Kelola Profil Desa</h1>
        <p class="text-sm text-gray-500">Update informasi profil desa dan perangkat desa</p>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex gap-2 mb-6 border-b border-gray-200">
      <button 
        @click="activeTab = 'profil'"
        class="px-6 py-3 font-medium transition-all duration-200 border-b-2"
        :class="activeTab === 'profil' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'"
      >
        Profil Desa
      </button>
      <button 
        @click="activeTab = 'perangkat'"
        class="px-6 py-3 font-medium transition-all duration-200 border-b-2"
        :class="activeTab === 'perangkat' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'"
      >
        Perangkat Desa
      </button>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="flex justify-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-600/30 border-t-emerald-600"></div>
    </div>

    <!-- ============================================ -->
    <!-- TAB PROFIL DESA -->
    <!-- ============================================ -->
    <div v-else-if="activeTab === 'profil'" class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
      <form @submit.prevent="updateProfil" class="space-y-6">
        <!-- Nama Desa -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Nama Desa <span class="text-red-500">*</span></label>
          <input 
            v-model="profilForm.nama_desa" 
            type="text" 
            required
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            placeholder="Contoh: Desa Kawat"
          >
          <p class="text-xs text-gray-400 mt-1">Nama desa yang akan ditampilkan di halaman profil</p>
        </div>

        <!-- Sejarah -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Sejarah Desa</label>
          <textarea 
            v-model="profilForm.sejarah" 
            rows="6"
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            placeholder="Tuliskan sejarah singkat desa..."
          ></textarea>
          <p class="text-xs text-gray-400 mt-1">Cerita tentang asal-usul dan perkembangan desa</p>
        </div>

        <!-- Visi -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Visi Desa</label>
          <textarea 
            v-model="profilForm.visi" 
            rows="2"
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            placeholder="Tuliskan visi desa..."
          ></textarea>
          <p class="text-xs text-gray-400 mt-1">Visi adalah gambaran masa depan yang ingin dicapai</p>
        </div>

        <!-- Misi -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Misi Desa</label>
          <textarea 
            v-model="misiText" 
            rows="4"
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            placeholder="Tulis misi, pisahkan dengan titik koma (contoh: Misi 1; Misi 2; Misi 3)"
          ></textarea>
          <p class="text-xs text-gray-400 mt-1">Pisahkan setiap misi dengan tanda titik koma ( ; )</p>
        </div>

        <!-- Tombol Submit -->
        <div class="flex gap-3 pt-4 border-t border-gray-200">
          <button 
            type="submit" 
            :disabled="loading"
            class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl shadow-md transition-all disabled:opacity-70 flex items-center justify-center gap-2"
          >
            <span v-if="loading" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
            Simpan Profil
          </button>
        </div>

        <!-- Preview Data -->
        <div class="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Preview Data</p>
          <div class="text-sm text-gray-600 space-y-1">
            <p><span class="font-medium">Nama Desa:</span> {{ profilForm.nama_desa || '-' }}</p>
            <p><span class="font-medium">Sejarah:</span> {{ (profilForm.sejarah || '').substring(0, 100) }}{{ (profilForm.sejarah || '').length > 100 ? '...' : '' }}</p>
            <p><span class="font-medium">Visi:</span> {{ profilForm.visi || '-' }}</p>
            <p><span class="font-medium">Misi:</span> {{ misiText || '-' }}</p>
          </div>
        </div>
      </form>
    </div>

    <!-- ============================================ -->
    <!-- TAB PERANGKAT DESA -->
    <!-- ============================================ -->
    <div v-else-if="activeTab === 'perangkat'" class="space-y-6">
      <!-- Tombol Tambah -->
      <div class="flex justify-end">
        <button 
          @click="openModalTambah"
          class="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Tambah Perangkat
        </button>
      </div>

      <!-- Daftar Perangkat -->
      <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm border-collapse">
            <thead>
              <tr class="bg-slate-50 text-gray-600 font-semibold uppercase text-[11px] tracking-wider border-b border-gray-200">
                <th class="p-4 w-12">No</th>
                <th class="p-4 w-16">Foto</th>
                <th class="p-4">Nama</th>
                <th class="p-4">Jabatan</th>
                <th class="p-4">NIP</th>
                <th class="p-4 w-24 text-center">Urutan</th>
                <th class="p-4 w-28 text-center">Status</th>
                <th class="p-4 w-36 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-gray-700">
              <tr v-for="(item, index) in perangkatList" :key="item.id" class="hover:bg-slate-50/80 transition-colors">
                <td class="p-4 text-gray-400 text-center">{{ index + 1 }}</td>
                <td class="p-4">
                  <div class="w-10 h-10 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center">
                    <img 
                      v-if="item.foto_url" 
                      :src="item.foto_url" 
                      :alt="item.nama"
                      class="w-full h-full object-cover"
                    />
                    <svg v-else class="w-6 h-6 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
                    </svg>
                  </div>
                </td>
                <td class="p-4 font-semibold text-gray-900">{{ item.nama }}</td>
                <td class="p-4">{{ item.jabatan }}</td>
                <td class="p-4 text-gray-500 text-xs">{{ item.nip || '-' }}</td>
                <td class="p-4 text-center text-gray-500">{{ item.urutan || 0 }}</td>
                <td class="p-4 text-center">
                  <span :class="item.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'" class="px-2.5 py-1 text-xs font-semibold rounded-full">
                    {{ item.is_active ? 'Aktif' : 'Nonaktif' }}
                  </span>
                </td>
                <td class="p-4 text-center space-x-2">
                  <button @click="editPerangkat(item)" class="text-blue-600 hover:text-blue-800 font-medium transition-colors text-sm">
                    Edit
                  </button>
                  <button @click="togglePerangkat(item)" class="text-amber-600 hover:text-amber-800 font-medium transition-colors text-sm">
                    {{ item.is_active ? 'Nonaktif' : 'Aktif' }}
                  </button>
                  <button @click="hapusPerangkat(item.id)" class="text-red-600 hover:text-red-800 font-medium transition-colors text-sm">
                    Hapus
                  </button>
                </td>
              </tr>
              <tr v-if="perangkatList.length === 0">
                <td colspan="8" class="p-8 text-center text-gray-400">
                  <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <p class="font-medium">Belum ada data perangkat desa</p>
                  <p class="text-sm mt-1">Klik tombol "Tambah Perangkat" untuk menambahkan</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Info -->
      <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <p class="text-xs text-gray-500">
          <span class="font-semibold">💡 Tips:</span> 
          Urutan menentukan posisi tampil di halaman profil warga. Semakin kecil angka, semakin atas posisinya.
          Status "Aktif" berarti perangkat akan ditampilkan di website warga.
        </p>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- MODAL TAMBAH/EDIT PERANGKAT -->
    <!-- ============================================ -->
    <div v-if="showModalPerangkat" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        <h3 class="text-lg font-bold text-gray-900 mb-4">
          {{ editModePerangkat ? 'Edit Perangkat' : 'Tambah Perangkat' }}
        </h3>
        
        <form @submit.prevent="simpanPerangkat" class="space-y-4">
          <!-- Upload Foto -->
          <div class="flex flex-col items-center">
            <div class="relative">
              <div class="w-24 h-24 rounded-full bg-slate-100 overflow-hidden border-4 border-white shadow-md flex items-center justify-center">
                <img 
                  v-if="previewFoto || perangkatForm.foto_url" 
                  :src="previewFoto || perangkatForm.foto_url" 
                  alt="Foto"
                  class="w-full h-full object-cover"
                />
                <svg v-else class="w-12 h-12 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              </div>
              <label class="absolute bottom-0 right-0 bg-emerald-600 hover:bg-emerald-700 text-white p-1.5 rounded-full cursor-pointer shadow-lg transition">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <input type="file" accept="image/*" class="hidden" @change="handleFotoUpload" />
              </label>
            </div>
            <p class="text-xs text-gray-400 mt-2">Klik icon kamera untuk upload foto</p>
            <p class="text-[10px] text-gray-400">Maks. 2MB (JPG, PNG, WEBP)</p>
          </div>

          <!-- Nama -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nama <span class="text-red-500">*</span></label>
            <input 
              v-model="perangkatForm.nama" 
              type="text" 
              required
              class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              placeholder="Nama lengkap"
            >
          </div>
          
          <!-- Jabatan -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Jabatan <span class="text-red-500">*</span></label>
            <input 
              v-model="perangkatForm.jabatan" 
              type="text" 
              required
              class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              placeholder="Contoh: Kepala Desa"
            >
          </div>
          
          <!-- NIP -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">NIP</label>
            <input 
              v-model="perangkatForm.nip" 
              type="text" 
              class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              placeholder="Nomor Induk Pegawai"
            >
          </div>
          
          <!-- Urutan -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Urutan Tampil</label>
            <input 
              v-model.number="perangkatForm.urutan" 
              type="number" 
              min="0"
              class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              placeholder="0"
            >
            <p class="text-xs text-gray-400 mt-1">Angka terkecil akan tampil di paling atas</p>
          </div>

          <!-- Status Aktif -->
          <div class="flex items-center gap-3">
            <input 
              v-model="perangkatForm.is_active" 
              type="checkbox" 
              id="is_active"
              class="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
            <label for="is_active" class="text-sm font-medium text-gray-700">Aktif (ditampilkan di website)</label>
          </div>

          <!-- Tombol -->
          <div class="flex gap-3 pt-4 border-t border-gray-200">
            <button 
              type="button" 
              @click="closeModalPerangkat"
              class="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition"
            >
              Batal
            </button>
            <button 
              type="submit" 
              :disabled="loadingPerangkat"
              class="flex-1 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition disabled:opacity-70 flex items-center justify-center gap-2"
            >
              <span v-if="loadingPerangkat" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              {{ editModePerangkat ? 'Update' : 'Simpan' }}
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

// ============================================
// STATE
// ============================================
const pending = ref(true)
const loading = ref(false)
const loadingPerangkat = ref(false)
const activeTab = ref('profil')
const showModalPerangkat = ref(false)
const editModePerangkat = ref(false)
const selectedFile = ref(null)
const previewFoto = ref(null)

// Profil Form (Hanya field yang ada di database)
const profilForm = ref({
  id: null,
  nama_desa: '',
  sejarah: '',
  visi: '',
  misi: []
})
const misiText = ref('')

// Perangkat Form
const perangkatForm = ref({
  id: null,
  nama: '',
  jabatan: '',
  nip: '',
  urutan: 0,
  is_active: true,
  foto_url: ''
})
const perangkatList = ref([])

// ============================================
// LOAD DATA
// ============================================
const loadProfil = async () => {
  const { data, error } = await supabase
    .from('profil_desa')
    .select('*')
    .limit(1)
    .single()

  if (!error && data) {
    profilForm.value = data
    misiText.value = data.misi ? data.misi.join('; ') : ''
  }
}

const loadPerangkat = async () => {
  const { data, error } = await supabase
    .from('perangkat_desa')
    .select('*')
    .order('urutan', { ascending: true })

  if (!error && data) {
    perangkatList.value = data
  }
}

const loadData = async () => {
  pending.value = true
  await Promise.all([loadProfil(), loadPerangkat()])
  pending.value = false
}

await loadData()

// ============================================
// HANDLE FOTO
// ============================================
const handleFotoUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  if (file.size > 2 * 1024 * 1024) {
    alert('Ukuran foto terlalu besar! Maksimal 2MB.')
    return
  }

  const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
  if (!validTypes.includes(file.type)) {
    alert('Format file tidak didukung! Gunakan JPG, PNG, atau WEBP.')
    return
  }

  selectedFile.value = file
  previewFoto.value = URL.createObjectURL(file)
}

const uploadFoto = async (file) => {
  if (!file) return null

  const fileExt = file.name.split('.').pop()
  const fileName = `perangkat_${Date.now()}.${fileExt}`
  const filePath = `perangkat/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('foto-perangkat')
    .upload(filePath, file)

  if (uploadError) throw uploadError

  const { data: urlData } = supabase.storage
    .from('foto-perangkat')
    .getPublicUrl(filePath)

  return urlData.publicUrl
}

// ============================================
// CRUD PROFIL
// ============================================
const updateProfil = async () => {
  loading.value = true
  
  // Split misi menggunakan titik koma (;) bukan koma (,)
  const misiArray = misiText.value.split(';').map(item => item.trim()).filter(item => item)
  
  const updateData = {
    nama_desa: profilForm.value.nama_desa,
    sejarah: profilForm.value.sejarah,
    visi: profilForm.value.visi,
    misi: misiArray
  }

  try {
    const { error } = await supabase
      .from('profil_desa')
      .update(updateData)
      .eq('id', profilForm.value.id)

    if (error) throw error

    alert('✅ Profil berhasil diupdate!')
    await loadProfil()
  } catch (error) {
    alert('❌ Gagal update profil: ' + error.message)
  } finally {
    loading.value = false
  }
}

// ============================================
// CRUD PERANGKAT
// ============================================
const openModalTambah = () => {
  editModePerangkat.value = false
  perangkatForm.value = {
    id: null,
    nama: '',
    jabatan: '',
    nip: '',
    urutan: perangkatList.value.length + 1,
    is_active: true,
    foto_url: ''
  }
  previewFoto.value = null
  selectedFile.value = null
  showModalPerangkat.value = true
}

const editPerangkat = (item) => {
  perangkatForm.value = { ...item }
  previewFoto.value = item.foto_url || null
  editModePerangkat.value = true
  showModalPerangkat.value = true
}

const simpanPerangkat = async () => {
  loadingPerangkat.value = true

  try {
    let fotoUrl = perangkatForm.value.foto_url || ''

    if (selectedFile.value) {
      if (perangkatForm.value.foto_url) {
        const oldFileName = perangkatForm.value.foto_url.split('/').pop()
        if (oldFileName) {
          await supabase.storage
            .from('foto-perangkat')
            .remove([`perangkat/${oldFileName}`])
        }
      }
      fotoUrl = await uploadFoto(selectedFile.value)
    }

    const dataPerangkat = {
      nama: perangkatForm.value.nama,
      jabatan: perangkatForm.value.jabatan,
      nip: perangkatForm.value.nip || null,
      urutan: perangkatForm.value.urutan || 0,
      is_active: perangkatForm.value.is_active,
      foto_url: fotoUrl
    }

    if (editModePerangkat.value) {
      const { error } = await supabase
        .from('perangkat_desa')
        .update(dataPerangkat)
        .eq('id', perangkatForm.value.id)

      if (error) throw error
      alert('✅ Perangkat berhasil diupdate!')
    } else {
      const { error } = await supabase
        .from('perangkat_desa')
        .insert([dataPerangkat])

      if (error) throw error
      alert('✅ Perangkat berhasil ditambahkan!')
    }

    closeModalPerangkat()
    await loadPerangkat()
  } catch (error) {
    alert('❌ Gagal simpan perangkat: ' + error.message)
  } finally {
    loadingPerangkat.value = false
  }
}

const togglePerangkat = async (item) => {
  const newStatus = !item.is_active
  const confirmMsg = newStatus ? 'Aktifkan' : 'Nonaktifkan'
  
  if (!confirm(`Apakah Anda yakin ingin ${confirmMsg} perangkat ini?`)) return

  try {
    const { error } = await supabase
      .from('perangkat_desa')
      .update({ is_active: newStatus })
      .eq('id', item.id)

    if (error) throw error
    await loadPerangkat()
  } catch (error) {
    alert('❌ Gagal update status: ' + error.message)
  }
}

const hapusPerangkat = async (id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus perangkat ini?')) return

  try {
    const item = perangkatList.value.find(p => p.id === id)
    
    if (item?.foto_url) {
      const fileName = item.foto_url.split('/').pop()
      if (fileName) {
        await supabase.storage
          .from('foto-perangkat')
          .remove([`perangkat/${fileName}`])
      }
    }

    const { error } = await supabase
      .from('perangkat_desa')
      .delete()
      .eq('id', id)

    if (error) throw error
    alert('✅ Perangkat berhasil dihapus!')
    await loadPerangkat()
  } catch (error) {
    alert('❌ Gagal hapus perangkat: ' + error.message)
  }
}

const closeModalPerangkat = () => {
  showModalPerangkat.value = false
  editModePerangkat.value = false
  selectedFile.value = null
  previewFoto.value = null
  perangkatForm.value = {
    id: null,
    nama: '',
    jabatan: '',
    nip: '',
    urutan: 0,
    is_active: true,
    foto_url: ''
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