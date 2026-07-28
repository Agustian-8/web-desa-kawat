<template>
  <div class="min-h-screen bg-slate-100 flex font-['Poppins']">
    <!-- Sidebar -->
    <AdminSidebar />
    
    <!-- Main Content -->
    <main class="flex-grow p-6 md:p-10 ml-0 md:ml-64">
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