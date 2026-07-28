<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-['Poppins'] select-none">
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
      <div class="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-emerald-50 rounded-full blur-2xl opacity-50 z-0"></div>
      
      <div class="text-center relative z-10">
        <img class="mx-auto h-16 w-auto object-contain mb-4" src="/Logo_Sanggau.png" alt="Logo Sanggau">
        <h2 class="text-3xl font-extrabold text-gray-900">Portal Admin</h2>
        <p class="mt-2 text-sm text-gray-500">Sistem Informasi Desa Kawat</p>
      </div>

      <form class="mt-8 space-y-6 relative z-10" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email Admin</label>
            <input type="email" required v-model="email" class="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors" placeholder="admin@desakawat.id">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Kata Sandi</label>
            <input type="password" required v-model="password" class="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors" placeholder="••••••••">
          </div>
        </div>

        <div v-if="errorMessage" class="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100 text-center flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {{ errorMessage }}
        </div>

        <div>
          <button type="submit" :disabled="loading" class="w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-slate-900 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 shadow-md disabled:opacity-70 disabled:cursor-not-allowed">
            {{ loading ? 'Memeriksa Kredensial...' : 'Masuk ke Dashboard' }}
          </button>
        </div>
      </form>
      
      <div class="text-center mt-8 relative z-20">
         <button @click="kembaliKeBeranda" class="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-all duration-300 font-medium cursor-pointer w-full">
           <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
           Kembali ke Beranda Warga
         </button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: false })

const supabase = useSupabaseClient()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  if (error) {
    errorMessage.value = 'Akses ditolak. Email atau kata sandi tidak valid.'
    loading.value = false
  } else {
    router.push('/admin')
  }
}

const kembaliKeBeranda = () => {
  router.push('/')
}
</script>