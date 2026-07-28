<template>
  <div class="min-h-screen bg-slate-100 flex font-['Poppins']">
    <!-- Sidebar Admin -->
    <AdminSidebar />
    
    <!-- Main Content -->
    <main class="flex-grow p-6 md:p-10 ml-0 md:ml-64">
      <slot />
    </main>
  </div>
</template>

<script setup>
import AdminSidebar from '~/components/AdminSidebar.vue'

// ✅ PROTEKSI KHUSUS UNTUK HALAMAN ADMIN
const user = useSupabaseUser()
const router = useRouter()

onMounted(() => {
  // Jika user tidak login, redirect ke halaman login
  if (!user.value) {
    router.push('/login')
  }
})
</script>