<template>
  <footer class="bg-slate-900 relative overflow-hidden w-full mt-auto">
    <!-- Efek Glow -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-32 bg-emerald-500/10 blur-[80px] pointer-events-none"></div>
    <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>

    <!-- Loading State -->
    <div v-if="pending" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
      <div class="flex justify-center py-8">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-600/30 border-t-emerald-600"></div>
      </div>
    </div>

    <!-- Content -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
      
      <!-- Grid Konten Footer -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-8 mb-12">
        <!-- Bagian Kiri: Logo & Deskripsi -->
        <div class="md:col-span-2">
          <div class="flex items-center gap-3 mb-4">
            <img src="/Logo_Sanggau.png" alt="Logo Sanggau" class="h-12 w-auto object-contain filter brightness-110" />
            <div class="text-left">
              <p class="text-white font-bold text-base tracking-wide">{{ pengaturan.nama_desa || 'Desa Kawat' }}</p>
              <p class="text-xs text-emerald-400 font-medium tracking-wider uppercase">Kabupaten Sanggau</p>
            </div>
          </div>
          <p class="text-sm text-slate-400 leading-relaxed max-w-lg mt-4">
            {{ pengaturan.deskripsi || 'Website resmi Pemerintah Desa Kawat. Berkomitmen mewujudkan pelayanan publik yang transparan, responsif, dan inovatif untuk kesejahteraan masyarakat.' }}
          </p>
        </div>

        <!-- Bagian Kanan: Kontak -->
        <div>
          <h3 class="text-white font-semibold mb-5 text-sm tracking-widest uppercase">Kontak</h3>
          <ul class="flex flex-col gap-4">
            <!-- Alamat -->
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-sm text-slate-400 leading-snug">{{ pengaturan.alamat || 'Kec. Tayan Hilir, Kab. Sanggau, Kalimantan Barat' }}</span>
            </li>
            <!-- Email -->
            <li class="flex items-center gap-3">
              <svg class="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span class="text-sm text-slate-400">{{ pengaturan.email || 'pemdes@kawat.desa.id' }}</span>
            </li>
            <!-- Telepon -->
            <li class="flex items-center gap-3">
              <svg class="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span class="text-sm text-slate-400">{{ pengaturan.telepon || '+62 822-5244-4924' }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="pt-6 border-t border-slate-800/80 flex justify-center items-center">
        <p class="text-sm text-slate-500 flex items-center gap-1">
          {{ pengaturan.footer_text || '© 2026 Pemerintah Desa Kawat. All Rights Reserved.' }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const supabase = useSupabaseClient()

// State
const pending = ref(true)
const pengaturan = ref({
  nama_desa: 'Desa Kawat',
  deskripsi: 'Website resmi Pemerintah Desa Kawat. Berkomitmen mewujudkan pelayanan publik yang transparan, responsif, dan inovatif untuk kesejahteraan masyarakat.',
  email: 'pemdes@kawat.desa.id',
  telepon: '+62 822-5244-4924',
  alamat: 'Kec. Tayan Hilir, Kab. Sanggau, Kalimantan Barat',
  footer_text: '© 2026 Pemerintah Desa Kawat. All Rights Reserved.'
})

// Load data dari database
const loadPengaturan = async () => {
  pending.value = true
  try {
    const { data, error } = await supabase
      .from('pengaturan_website')
      .select('*')
      .limit(1)
      .single()

    if (!error && data) {
      pengaturan.value = data
    }
  } catch (error) {
    console.error('Error loading pengaturan:', error)
    // Tetap pakai default jika error
  }
  pending.value = false
}

await loadPengaturan()
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