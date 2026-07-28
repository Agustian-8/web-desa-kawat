<template>
  <!-- Sidebar Admin - navigasi utama panel admin -->
  <aside 
    class="w-[260px] bg-[#0B1120] text-slate-200 flex flex-col justify-between p-5 hidden md:flex min-h-screen fixed left-0 top-0 border-r border-slate-800/50 shadow-2xl"
  >
    <div>
      <!-- Logo & Branding -->
      <div class="flex items-center gap-3 mb-8 pb-6 border-b border-slate-800/60 pt-2 px-2">
        <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1.5 shadow-lg shadow-emerald-900/20">
          <img src="/Logo_Sanggau.png" alt="Logo Sanggau" class="w-full h-full object-contain" />
        </div>
        <div>
          <h2 class="font-extrabold text-base text-white tracking-wide">Desa Kawat</h2>
          <div class="flex items-center gap-1.5 mt-0.5">
            <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span class="text-[11px] text-emerald-400/90 font-semibold tracking-wider uppercase">Panel Admin</span>
          </div>
        </div>
      </div>
      
      <!-- Navigasi -->
      <nav class="space-y-1.5">
        <div class="px-3 mb-2">
          <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Menu Utama</p>
        </div>

        <!-- Dashboard -->
        <NuxtLink 
          to="/admin" 
          class="group flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-300 font-medium"
          :class="isActive('/admin', true) ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' : 'text-slate-400 hover:bg-slate-800/50 hover:text-emerald-400 hover:translate-x-1'"
        >
          <svg class="w-5 h-5 transition-transform duration-300 group-hover:scale-110" :class="isActive('/admin', true) ? 'text-white' : 'text-slate-500 group-hover:text-emerald-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
          </svg>
          <span class="text-sm">Dashboard</span>
        </NuxtLink>

        <!-- Kelola Berita -->
        <NuxtLink 
          to="/admin/berita" 
          class="group flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-300 font-medium"
          :class="isActive('/admin/berita') ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' : 'text-slate-400 hover:bg-slate-800/50 hover:text-emerald-400 hover:translate-x-1'"
        >
          <svg class="w-5 h-5 transition-transform duration-300 group-hover:scale-110" :class="isActive('/admin/berita') ? 'text-white' : 'text-slate-500 group-hover:text-emerald-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6m4 0h.01"/>
          </svg>
          <span class="text-sm">Kelola Berita</span>
        </NuxtLink>

        <!-- Kelola Layanan -->
        <NuxtLink 
          to="/admin/layanan" 
          class="group flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-300 font-medium"
          :class="isActive('/admin/layanan') ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' : 'text-slate-400 hover:bg-slate-800/50 hover:text-emerald-400 hover:translate-x-1'"
        >
          <svg class="w-5 h-5 transition-transform duration-300 group-hover:scale-110" :class="isActive('/admin/layanan') ? 'text-white' : 'text-slate-500 group-hover:text-emerald-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <span class="text-sm">Kelola Layanan</span>
        </NuxtLink>

        <!-- Pengajuan (dengan Badge Notifikasi) -->
        <NuxtLink 
          to="/admin/pengajuan" 
          class="group flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-300 font-medium"
          :class="isActive('/admin/pengajuan') ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' : 'text-slate-400 hover:bg-slate-800/50 hover:text-emerald-400 hover:translate-x-1'"
        >
          <svg class="w-5 h-5 transition-transform duration-300 group-hover:scale-110" :class="isActive('/admin/pengajuan') ? 'text-white' : 'text-slate-500 group-hover:text-emerald-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
          </svg>
          <span class="text-sm flex-1">Pengajuan</span>
          <!-- Badge jumlah pengajuan baru -->
          <div 
            v-if="totalPengajuanBaru > 0" 
            class="flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-rose-500 text-white text-[10px] font-bold rounded-full shadow-md shadow-rose-500/40"
            title="Pengajuan baru menunggu diproses"
          >
            {{ totalPengajuanBaru }}
          </div>
        </NuxtLink>

        <!-- Separator -->
        <div class="px-3 mt-6 mb-2 pt-4 border-t border-slate-800/60">
          <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Konfigurasi</p>
        </div>

        <!-- Profil Desa -->
        <NuxtLink 
          to="/admin/profil" 
          class="group flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-300 font-medium"
          :class="isActive('/admin/profil') ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' : 'text-slate-400 hover:bg-slate-800/50 hover:text-emerald-400 hover:translate-x-1'"
        >
          <svg class="w-5 h-5 transition-transform duration-300 group-hover:scale-110" :class="isActive('/admin/profil') ? 'text-white' : 'text-slate-500 group-hover:text-emerald-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2m8-10a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
          <span class="text-sm">Profil Desa</span>
        </NuxtLink>

        <!-- Transparansi -->
        <NuxtLink 
          to="/admin/transparansi" 
          class="group flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-300 font-medium"
          :class="isActive('/admin/transparansi') ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' : 'text-slate-400 hover:bg-slate-800/50 hover:text-emerald-400 hover:translate-x-1'"
        >
          <svg class="w-5 h-5 transition-transform duration-300 group-hover:scale-110" :class="isActive('/admin/transparansi') ? 'text-white' : 'text-slate-500 group-hover:text-emerald-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <span class="text-sm">Transparansi</span>
        </NuxtLink>

        <!-- Pengaturan -->
        <NuxtLink 
          to="/admin/pengaturan" 
          class="group flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-300 font-medium"
          :class="isActive('/admin/pengaturan') ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' : 'text-slate-400 hover:bg-slate-800/50 hover:text-emerald-400 hover:translate-x-1'"
        >
          <svg class="w-5 h-5 transition-transform duration-300 group-hover:scale-110" :class="isActive('/admin/pengaturan') ? 'text-white' : 'text-slate-500 group-hover:text-emerald-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span class="text-sm">Pengaturan</span>
        </NuxtLink>
      </nav>
    </div>

    <!-- Bagian Bawah: Link & Logout -->
    <div>
      <!-- Lihat Web Warga -->
      <NuxtLink 
        to="/" 
        target="_blank"
        class="group flex items-center gap-3 px-3.5 py-3 mb-2 rounded-xl text-slate-400 hover:bg-slate-800/50 hover:text-white transition-all duration-300 font-medium"
      >
        <svg class="w-5 h-5 text-slate-500 group-hover:text-white transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
        <span class="text-sm">Lihat Web Warga</span>
      </NuxtLink>

      <!-- Logout -->
      <button 
        @click="handleLogout" 
        class="group flex items-center gap-3 px-3.5 py-3 rounded-xl text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all duration-300 w-full text-left font-medium border border-transparent hover:border-rose-500/20"
      >
        <svg class="w-5 h-5 text-slate-500 group-hover:text-rose-400 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
        </svg>
        <span class="text-sm">Keluar Sistem</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const supabase = useSupabaseClient()

// State: jumlah pengajuan baru untuk badge
const totalPengajuanBaru = ref(0)

// Cek active menu
const isActive = (path, exact = false) => {
  if (exact) {
    return route.path === path || route.path === path + '/'
  }
  return route.path === path || route.path.startsWith(path + '/')
}

// Logout
const handleLogout = async () => {
  if (confirm('Apakah Anda yakin ingin keluar dari panel admin?')) {
    await supabase.auth.signOut()
    router.push('/login')
  }
}

// Load jumlah pengajuan baru
const loadPengajuanBaru = async () => {
  if (!process.client) return
  
  try {
    const { count, error } = await supabase
      .from('pengajuan')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'menunggu')

    if (!error) {
      totalPengajuanBaru.value = count || 0
    }
  } catch (error) {
    console.error('Error loading pengajuan count:', error)
  }
}

// Lifecycle
onMounted(() => {
  loadPengajuanBaru()
  // Refresh badge setiap 30 detik
  const interval = setInterval(loadPengajuanBaru, 30000)
  onUnmounted(() => clearInterval(interval))
})
</script>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}
</style>