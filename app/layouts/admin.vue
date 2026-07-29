<template>
  <div class="min-h-screen bg-slate-100 flex font-['Poppins']">
    <!-- Sidebar -->
    <AdminSidebar />
    
    <!-- Main Content -->
    <!-- TAMBAHAN: pt-24 (khusus HP) agar konten tidak tertutup header mobile -->
    <main class="flex-grow p-6 pt-24 md:pt-10 md:p-10 ml-0 md:ml-[260px]">
      <slot />
    </main>
  </div>
</template>

<script setup>
import AdminSidebar from '~/components/AdminSidebar.vue'

// Proteksi semua halaman admin
const user = useSupabaseUser()
const router = useRouter()

onMounted(() => {
  if (!user.value) {
    router.push('/login')
  }
})
</script>