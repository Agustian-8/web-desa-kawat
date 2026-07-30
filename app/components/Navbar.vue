<template>
  <!-- Navbar Induk dengan Efek Scroll Dinamis -->
  <nav 
    class="fixed top-0 w-full z-50 transition-all duration-300"
    :class="isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-white border-b border-transparent'"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20 gap-4">
        
        <!-- BAGIAN KIRI: Logo & Nama Desa -->
        <NuxtLink to="/" class="flex items-center gap-3 cursor-pointer flex-shrink-0 z-20 group">
          <div class="w-10 h-10 overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <img src="/Logo_Sanggau.png" alt="Logo Sanggau" class="w-full h-full object-contain" />
          </div>
          <div class="text-left flex flex-col justify-center">
            <span class="block font-extrabold text-gray-900 text-base leading-tight tracking-tight group-hover:text-emerald-700 transition-colors">Desa Kawat</span>
            <span class="block text-[10px] text-gray-500 font-semibold tracking-wider uppercase mt-0.5">Kab. Sanggau</span>
          </div>
        </NuxtLink>

        <!-- BAGIAN TENGAH: Menu Navigasi (Desktop) -->
        <!-- Menggunakan flex-1 agar otomatis berada di tengah tanpa bertabrakan -->
        <div class="hidden md:flex flex-1 items-center justify-center gap-7">
          <NuxtLink 
            v-for="(menu, index) in menuList" 
            :key="index"
            :to="menu.path" 
            class="group relative text-sm font-semibold py-2 transition-colors duration-300" 
            :class="$route.path === menu.path ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-600'"
          >
            {{ menu.name }}
            <!-- Efek Garis Bawah (Underline Animation) -->
            <span 
              class="absolute bottom-1 left-0 h-[3px] bg-emerald-600 rounded-full transition-all duration-300 ease-out" 
              :class="$route.path === menu.path ? 'w-full' : 'w-0 group-hover:w-full'"
            ></span>
          </NuxtLink>
        </div>

        <!-- BAGIAN KANAN: Tombol Aksi -->
        <div class="flex items-center gap-2.5 flex-shrink-0 z-20">
          
          <!-- ⭐ MENU TRACKING (Desktop) -->
          <NuxtLink 
            to="/tracking" 
            class="hidden md:flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold hover:bg-emerald-600 hover:text-white transition-all duration-300 border border-emerald-100 hover:border-emerald-600 shadow-sm"
            :class="$route.path === '/tracking' ? 'bg-emerald-600 text-white border-emerald-600' : ''"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
            Tracking
          </NuxtLink>
          
          <!-- ⭐ ICON HUBUNGI KAMI (Desktop) - Clean Look -->
          <a 
            href="https://wa.me/6282252444924" 
            target="_blank" 
            rel="noopener noreferrer" 
            title="Hubungi Admin via WhatsApp"
            class="hidden md:flex items-center justify-center w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-600 hover:text-white transition-all duration-300 shadow-sm border border-emerald-100 hover:border-emerald-600 group"
          >
            <svg class="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            </svg>
          </a>

          <!-- TOMBOL HAMBURGER (HP) -->
          <button @click="toggleMenu" class="md:hidden p-2 rounded-xl text-gray-600 hover:bg-slate-50 focus:outline-none transition-colors">
            <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

        </div>
      </div>
    </div>

    <!-- OVERLAY GELAP UNTUK HP (Menutup menu jika diklik di luar) -->
    <div 
      v-if="isMenuOpen" 
      @click="isMenuOpen = false" 
      class="md:hidden fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30"
    ></div>

    <!-- MENU DROPDOWN HP -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-4 opacity-0"
    >
      <div v-show="isMenuOpen" class="md:hidden absolute top-20 left-0 w-full bg-white shadow-2xl pb-6 px-4 pt-4 flex flex-col gap-2 z-40 rounded-b-2xl border-t border-gray-100">
        
        <NuxtLink 
          v-for="(menu, index) in menuList" 
          :key="index"
          :to="menu.path" 
          @click="isMenuOpen = false" 
          class="px-4 py-3.5 rounded-xl font-bold text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/80 transition-colors" 
          :class="$route.path === menu.path ? 'bg-emerald-50 text-emerald-700' : ''"
        >
          {{ menu.name }}
        </NuxtLink>
        
        <div class="h-px bg-gray-100 w-full my-2"></div>
        
        <!-- ⭐ MENU TRACKING DI HP -->
        <NuxtLink 
          to="/tracking" 
          @click="isMenuOpen = false" 
          class="px-4 py-3.5 rounded-xl font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2 border border-emerald-100" 
          :class="$route.path === '/tracking' ? 'bg-emerald-600 text-white' : ''"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
          Tracking Pengajuan
        </NuxtLink>
        
        <!-- ⭐ TOMBOL HUBUNGI KAMI DI HP -->
        <a 
          href="https://wa.me/6282252444924" 
          target="_blank" 
          class="flex items-center justify-center gap-2 bg-emerald-600 text-white py-3.5 mt-1 rounded-xl font-bold shadow-md shadow-emerald-600/20 hover:bg-emerald-700 active:scale-[0.98] transition-all"
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
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isMenuOpen = ref(false)
const isScrolled = ref(false)

// Data menu dibuat array agar kode HTML lebih DRY (Don't Repeat Yourself) & rapi
const menuList = [
  { name: 'Beranda', path: '/' },
  { name: 'Profil', path: '/profil' },
  { name: 'Layanan', path: '/layanan' },
  { name: 'Berita', path: '/berita' },
  { name: 'Transparansi', path: '/transparansi' },
]

// Fungsi untuk buka/tutup menu di mobile
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// Menutup menu otomatis jika terjadi perpindahan halaman (rute berubah)
watch(() => route.path, () => {
  isMenuOpen.value = false
})

// Fungsi deteksi scroll untuk mengubah style navbar
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>