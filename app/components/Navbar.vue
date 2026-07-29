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

        <!-- BAGIAN TENGAH: Menu Navigasi (Desktop) -->
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

        <!-- BAGIAN KANAN: Tombol Aksi -->
        <div class="flex items-center gap-3 relative z-20">
          
          <!-- ⭐ MENU TRACKING (Desktop) -->
          <NuxtLink 
            to="/tracking" 
            class="hidden md:flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-sm font-medium hover:bg-emerald-100 transition-colors border border-emerald-200"
            :class="$route.path === '/tracking' ? 'bg-emerald-600 text-white border-emerald-600' : ''"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
            Tracking
          </NuxtLink>
          
          <!-- ⭐ TOMBOL HUBUNGI KAMI (GABUNGAN) - Desktop -->
          <a 
            href="https://wa.me/6282252444924" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="hidden md:flex items-center gap-2 px-5 py-2 bg-emerald-600 text-white rounded-full text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm hover:shadow-md"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            </svg>
            Hubungi Kami
          </a>

          <!-- TOMBOL HAMBURGER (HP) -->
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

    <!-- MENU DROPDOWN HP -->
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
        
        <!-- ⭐ MENU TRACKING DI HP -->
        <NuxtLink to="/tracking" @click="isMenuOpen = false" class="px-4 py-3 rounded-xl font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-colors flex items-center gap-2" :class="$route.path === '/tracking' ? 'bg-emerald-600 text-white' : ''">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
          Tracking Pengajuan
        </NuxtLink>
        
        <div class="border-t border-gray-100 my-2"></div>
        
        <!-- ⭐ TOMBOL HUBUNGI KAMI DI HP -->
        <a 
          href="https://wa.me/6282252444924" 
          target="_blank" 
          class="flex items-center justify-center gap-2 bg-emerald-600 text-white py-3.5 rounded-xl font-semibold shadow-md hover:bg-emerald-700 active:scale-95 transition-all"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          </svg>
          Hubungi Admin
        </a>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>