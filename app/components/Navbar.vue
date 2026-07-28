<template>
  <nav class="bg-white/90 backdrop-blur-md border-b border-gray-100 fixed top-0 w-full z-50 transition-all">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative flex justify-between h-20 items-center">
        
        <!-- BAGIAN KIRI: Logo & Nama Desa -->
        <NuxtLink to="/" class="flex items-center gap-3 cursor-pointer relative z-20">
          <img src="/Logo_Sanggau.png" alt="Logo Sanggau" class="h-10 w-auto object-contain" />
          <div class="text-left">
            <span class="block font-bold text-gray-900 text-base leading-tight">Desa Kawat</span>
            <span class="block text-[10px] text-gray-500 font-medium tracking-wide uppercase">Kabupaten Sanggau</span>
          </div>
        </NuxtLink>

        <!-- BAGIAN TENGAH: Menu Navigasi (Hanya tampil di Desktop) -->
        <div class="hidden md:flex items-center gap-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
          <NuxtLink to="/" class="group relative text-sm font-medium py-1 transition-colors" :class="$route.path === '/' ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'">
            Beranda
            <span class="absolute -bottom-1 left-0 h-[2px] bg-emerald-600 rounded-full transition-all duration-300" :class="$route.path === '/' ? 'w-full' : 'w-0 group-hover:w-full'"></span>
          </NuxtLink>
          <NuxtLink to="/profil" class="group relative text-sm font-medium py-1 transition-colors" :class="$route.path === '/profil' ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'">
            Profil
            <span class="absolute -bottom-1 left-0 h-[2px] bg-emerald-600 rounded-full transition-all duration-300" :class="$route.path === '/profil' ? 'w-full' : 'w-0 group-hover:w-full'"></span>
          </NuxtLink>
          <NuxtLink to="/layanan" class="group relative text-sm font-medium py-1 transition-colors" :class="$route.path === '/layanan' ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'">
            Layanan
            <span class="absolute -bottom-1 left-0 h-[2px] bg-emerald-600 rounded-full transition-all duration-300" :class="$route.path === '/layanan' ? 'w-full' : 'w-0 group-hover:w-full'"></span>
          </NuxtLink>
          <NuxtLink to="/berita" class="group relative text-sm font-medium py-1 transition-colors" :class="$route.path === '/berita' ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'">
            Berita
            <span class="absolute -bottom-1 left-0 h-[2px] bg-emerald-600 rounded-full transition-all duration-300" :class="$route.path === '/berita' ? 'w-full' : 'w-0 group-hover:w-full'"></span>
          </NuxtLink>
          <NuxtLink to="/transparansi" class="group relative text-sm font-medium py-1 transition-colors" :class="$route.path === '/transparansi' ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'">
            Transparansi
            <span class="absolute -bottom-1 left-0 h-[2px] bg-emerald-600 rounded-full transition-all duration-300" :class="$route.path === '/transparansi' ? 'w-full' : 'w-0 group-hover:w-full'"></span>
          </NuxtLink>
        </div>

        <!-- BAGIAN KANAN: Tombol Aksi & Hamburger -->
        <div class="flex items-center gap-3 relative z-20">
          
          <!-- Tombol Hubungi Kami (Hanya Desktop) -->
          <div class="hidden md:flex items-center gap-2">
            <a href="https://wa.me/6282252444924" target="_blank" rel="noopener noreferrer" class="px-5 py-2 text-sm font-semibold text-emerald-600 border border-emerald-200 rounded-full hover:bg-emerald-50 transition-colors">
              Hubungi Kami
            </a>
            <a href="https://wa.me/6282252444924" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center w-10 h-10 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors shadow-sm hover:shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>
          </div>

          <!-- TOMBOL HAMBURGER (Hanya HP) -->
          <button @click="toggleMenu" class="md:hidden p-2 -mr-2 text-gray-600 hover:text-emerald-600 focus:outline-none transition-colors">
            <svg v-if="!isMenuOpen" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

        </div>
      </div>
    </div>

    <!-- MENU DROPDOWN UNTUK HP -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-4 opacity-0"
    >
      <div v-show="isMenuOpen" class="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl pb-6 px-4 pt-2 flex flex-col gap-2 z-10">
        <NuxtLink to="/" @click="isMenuOpen = false" class="px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors" :class="$route.path === '/' ? 'bg-emerald-50 text-emerald-600' : ''">Beranda</NuxtLink>
        <NuxtLink to="/profil" @click="isMenuOpen = false" class="px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors" :class="$route.path === '/profil' ? 'bg-emerald-50 text-emerald-600' : ''">Profil</NuxtLink>
        <NuxtLink to="/layanan" @click="isMenuOpen = false" class="px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors" :class="$route.path === '/layanan' ? 'bg-emerald-50 text-emerald-600' : ''">Layanan</NuxtLink>
        <NuxtLink to="/berita" @click="isMenuOpen = false" class="px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors" :class="$route.path === '/berita' ? 'bg-emerald-50 text-emerald-600' : ''">Berita</NuxtLink>
        <NuxtLink to="/transparansi" @click="isMenuOpen = false" class="px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors" :class="$route.path === '/transparansi' ? 'bg-emerald-50 text-emerald-600' : ''">Transparansi</NuxtLink>
        
        <div class="border-t border-gray-100 my-2"></div>
        
        <a href="https://wa.me/6282252444924" target="_blank" class="flex items-center justify-center gap-2 bg-emerald-600 text-white py-3.5 rounded-xl font-semibold shadow-md hover:bg-emerald-700 active:scale-95 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
          </svg>
          Hubungi Admin
        </a>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

// State untuk melacak apakah menu HP sedang terbuka atau tertutup
const isMenuOpen = ref(false)

// Fungsi untuk membuka/menutup menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>