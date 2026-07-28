<template>
  <nav class="bg-white/80 backdrop-blur-md border-b border-gray-100 fixed top-0 w-full z-50 transition-all">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative flex justify-between h-20 items-center">
        
        <!-- BAGIAN KIRI: Logo & Nama Desa -->
        <NuxtLink to="/" class="flex items-center gap-3 cursor-pointer relative z-10">
          <img src="/Logo_Sanggau.png" alt="Logo Sanggau" class="h-10 w-auto object-contain" />
          <div class="text-left">
            <span class="block font-bold text-gray-900 text-base leading-tight">Desa Kawat</span>
            <span class="block text-[10px] text-gray-500 font-medium tracking-wide uppercase">Kabupaten Sanggau</span>
          </div>
        </NuxtLink>

        <!-- BAGIAN TENGAH: Menu Navigasi -->
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

        <!-- BAGIAN KANAN: Tombol Hubungi Kami -->
        <div class="hidden md:flex items-center gap-2 relative z-10">
          <a href="https://wa.me/6282252444924" target="_blank" rel="noopener noreferrer" class="px-5 py-2 text-sm font-semibold text-emerald-600 border border-emerald-200 rounded-full hover:bg-emerald-50 transition-colors">
            Hubungi Kami
          </a>
          <a href="https://wa.me/6282252444924" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center w-10 h-10 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors shadow-sm hover:shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        </div>

      </div>
    </div>
  </nav>
</template>