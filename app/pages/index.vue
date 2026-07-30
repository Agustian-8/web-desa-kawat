<template>
  <div class="antialiased selection:bg-emerald-200 selection:text-emerald-900">
    <!-- ============================================ -->
    <!-- HERO SECTION -->
    <!-- ============================================ -->
    <section class="relative bg-slate-900 overflow-hidden pt-32 pb-48 lg:pt-48 lg:pb-60">
      <!-- Gambar Latar Belakang -->
      <div class="absolute inset-0 bg-[url('/bg-desa.png')] bg-cover bg-center bg-no-repeat opacity-80"></div>
      
      <!-- Overlay Gradasi Gelap -->
      <div class="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90 backdrop-blur-[2px]"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-4xl mx-auto">
          
          <!-- Tagline -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
            class="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/5 text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide mb-8 border border-white/10 backdrop-blur-md"
          >
            <span class="relative flex h-2.5 w-2.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            PORTAL INFORMASI RESMI
          </div>

          <!-- Judul Utama -->
          <h1 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 100, ease: 'easeOut' } }"
            class="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-[1.1]"
          >
            Membangun Desa, <br class="hidden sm:block">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
              Merajut Harmoni
            </span>
          </h1>

          <!-- Deskripsi -->
          <p 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200, ease: 'easeOut' } }"
            class="text-base sm:text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-light max-w-2xl mx-auto"
          >
            Selamat datang di website resmi Desa Kawat. Kami hadir untuk memberikan pelayanan publik yang transparan, inovatif, dan mudah diakses dari mana saja.
          </p>

          <!-- Tombol Aksi -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 300, ease: 'easeOut' } }"
            class="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
          >
            <NuxtLink to="/profil" class="group relative px-8 py-4 bg-emerald-600 text-white rounded-full font-semibold text-sm sm:text-base overflow-hidden shadow-lg shadow-emerald-900/20 hover:shadow-emerald-600/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
              <span class="relative z-10">Eksplorasi Desa</span>
              <svg class="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </NuxtLink>
            <NuxtLink to="/layanan" class="group px-8 py-4 bg-white/5 text-white border border-white/20 rounded-full font-semibold text-sm sm:text-base hover:bg-white hover:text-slate-900 hover border-transparent hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-sm flex items-center justify-center">
              Layanan Mandiri
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <!-- Gradasi transisi BAWAH -->
      <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent z-10 pointer-events-none"></div>
    </section>

    <!-- ============================================ -->
    <!-- SECTION STATISTIK (Glassmorphism overlap)    -->
    <!-- ============================================ -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20 pb-20">
      <div 
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
        class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
      >
        <!-- Card 1 -->
        <div class="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-white shadow-xl shadow-gray-200/50 flex flex-col items-center justify-center text-center group hover:-translate-y-1.5 transition-all duration-300">
          <div class="w-16 h-16 rounded-2xl bg-emerald-100/50 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </div>
          <h3 class="text-4xl md:text-5xl font-extrabold text-slate-800 mb-2 tracking-tight">{{ statistik.total_penduduk }}</h3>
          <p class="text-xs font-bold text-slate-400 tracking-[0.2em] uppercase">Total Penduduk</p>
        </div>

        <!-- Card 2 -->
        <div class="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-white shadow-xl shadow-gray-200/50 flex flex-col items-center justify-center text-center group hover:-translate-y-1.5 transition-all duration-300">
          <div class="w-16 h-16 rounded-2xl bg-teal-100/50 text-teal-600 flex items-center justify-center mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          </div>
          <h3 class="text-4xl md:text-5xl font-extrabold text-slate-800 mb-2 tracking-tight">{{ statistik.total_dusun }}</h3>
          <p class="text-xs font-bold text-slate-400 tracking-[0.2em] uppercase">Dusun Terintegrasi</p>
        </div>

        <!-- Card 3 -->
        <div class="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-white shadow-xl shadow-gray-200/50 flex flex-col items-center justify-center text-center group hover:-translate-y-1.5 transition-all duration-300">
          <div class="w-16 h-16 rounded-2xl bg-cyan-100/50 text-cyan-600 flex items-center justify-center mb-6 group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          </div>
          <h3 class="text-4xl md:text-5xl font-extrabold text-slate-800 mb-2 tracking-tight">{{ statistik.total_layanan }}</h3>
          <p class="text-xs font-bold text-slate-400 tracking-[0.2em] uppercase">Layanan Digital</p>
        </div>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- SECTION LAYANAN -->
    <!-- ============================================ -->
    <section class="bg-gray-50 py-20 lg:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Layanan Administrasi</h2>
          <p class="text-lg text-gray-500 font-light">Urus dokumen kependudukan lebih cepat, aman, dan mudah langsung dari perangkat Anda.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Card Layanan 1 -->
          <NuxtLink to="/layanan"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
            class="block bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group"
          >
            <div class="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:scale-110 transition-all duration-300">
              <svg class="w-7 h-7 text-gray-700 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path></svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">Surat Pengantar</h3>
            <p class="text-gray-500 leading-relaxed mb-8 font-light">Ajukan pembuatan surat pengantar RT/RW untuk berbagai keperluan administrasi dengan mudah.</p>
            <span class="text-emerald-600 text-sm font-bold uppercase tracking-wide inline-flex items-center gap-2">
              Ajukan Sekarang <svg class="w-4 h-4 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </span>
          </NuxtLink>

          <!-- Card Layanan 2 -->
          <NuxtLink to="/layanan"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
            class="block bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group"
          >
            <div class="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:scale-110 transition-all duration-300">
                <svg class="w-7 h-7 text-gray-700 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">Data Penduduk</h3>
            <p class="text-gray-500 leading-relaxed mb-8 font-light">Lakukan pembaruan data Kartu Keluarga, mutasi masuk, atau laporan mutasi keluar.</p>
            <span class="text-emerald-600 text-sm font-bold uppercase tracking-wide inline-flex items-center gap-2">
              Urus Data <svg class="w-4 h-4 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </span>
          </NuxtLink>

          <!-- Card Layanan 3 -->
          <NuxtLink to="/layanan"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 300 } }"
            class="block bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group"
          >
            <div class="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:scale-110 transition-all duration-300">
              <svg class="w-7 h-7 text-gray-700 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">Lapor Desa</h3>
            <p class="text-gray-500 leading-relaxed mb-8 font-light">Kirimkan aduan, aspirasi, atau laporan masalah infrastruktur langsung ke perangkat desa.</p>
            <span class="text-emerald-600 text-sm font-bold uppercase tracking-wide inline-flex items-center gap-2">
              Buat Laporan <svg class="w-4 h-4 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </span>
          </NuxtLink>
        </div>

        <!-- TOMBOL LIHAT SEMUA LAYANAN -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: 400 } }"
          class="text-center mt-16"
        >
          <NuxtLink to="/layanan" class="inline-flex items-center gap-3 px-8 py-4 bg-white border border-gray-200 text-gray-800 font-semibold rounded-full hover:border-emerald-600 hover:text-emerald-600 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-0.5 transition-all duration-300">
            Lihat Semua Layanan
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </NuxtLink>
        </div>

      </div>
    </section>

    <!-- ============================================ -->
    <!-- SECTION LOKASI & PETA DESA -->
    <!-- ============================================ -->
    <section class="bg-white py-20 lg:py-32 relative z-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800 } }"
          class="bg-gray-50 rounded-[2.5rem] p-8 md:p-12 lg:p-16 border border-gray-100 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center"
        >
          <!-- Informasi Teks & Alamat -->
          <div class="w-full lg:w-5/12">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-8 border border-emerald-100">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              Lokasi Kami
            </div>
            
            <h2 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">Pusat Pemerintahan <br/><span class="text-emerald-600">Desa Kawat</span></h2>
            <p class="text-lg text-gray-500 leading-relaxed mb-10 font-light">
              Kami siap melayani kebutuhan administrasi dan menampung aspirasi Anda secara langsung pada jam kerja operasional.
            </p>
            
            <div class="space-y-8">
              <!-- Ikon Kantor -->
              <div class="flex items-start gap-5">
                <div class="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shrink-0 text-emerald-600 shadow-sm border border-gray-100">
                   <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                </div>
                <div>
                  <h4 class="text-lg font-bold text-gray-900 mb-1">Kantor Kepala Desa</h4>
                  <p class="text-gray-500 leading-relaxed font-light">Kec. Tayan Hilir, Kab. Sanggau<br/>Kalimantan Barat, Indonesia</p>
                </div>
              </div>
              
              <!-- Ikon Jam Kerja -->
              <div class="flex items-start gap-5">
                <div class="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shrink-0 text-emerald-600 shadow-sm border border-gray-100">
                   <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <h4 class="text-lg font-bold text-gray-900 mb-1">Jam Operasional</h4>
                  <p class="text-gray-500 leading-relaxed font-light">Senin - Jumat<br/>08.00 - 15.00 WIB</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Google Maps Iframe -->
          <div class="w-full lg:w-7/12 h-[450px] rounded-[2rem] overflow-hidden shadow-lg border border-gray-200/60 bg-gray-100 relative group p-2">
            <div class="w-full h-full rounded-[1.5rem] overflow-hidden relative">
              <div class="absolute inset-0 bg-gray-200 animate-pulse -z-10"></div>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.041180087307!2d110.04239127496453!3d-0.07015309992915265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e029d1e2c3b6f45%3A0xcbb8ef9e122fc054!2sKantor%20Desa%20Kawat!5e1!3m2!1sen!2sid!4v1784885868814!5m2!1sen!2sid"
                width="100%" 
                height="100%" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade"
                class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-1000 ease-out cursor-pointer"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()

// ============================================
// STATE STATISTIK
// ============================================
const statistik = ref({
  total_penduduk: '2.450',
  total_dusun: '4',
  total_layanan: '9'
})

// ============================================
// LOAD STATISTIK DARI DATABASE
// ============================================
const loadStatistik = async () => {
  try {
    const { data, error } = await supabase
      .from('pengaturan')
      .select('*')

    if (!error && data && data.length > 0) {
      data.forEach(item => {
        if (item.key === 'total_penduduk') statistik.value.total_penduduk = item.value
        if (item.key === 'total_dusun') statistik.value.total_dusun = item.value
        if (item.key === 'total_layanan') statistik.value.total_layanan = item.value
      })
      
      if (process.client) {
        localStorage.setItem('pengaturan_statistik', JSON.stringify(statistik.value))
      }
    } else {
      if (process.client) {
        const saved = localStorage.getItem('pengaturan_statistik')
        if (saved) {
          try {
            statistik.value = JSON.parse(saved)
          } catch (e) {
            console.error('Gagal memuat statistik dari localStorage:', e)
          }
        }
      }
    }
  } catch (error) {
    console.error('Error saat memuat statistik:', error)
    if (process.client) {
      const saved = localStorage.getItem('pengaturan_statistik')
      if (saved) {
        try {
          statistik.value = JSON.parse(saved)
        } catch (e) {
          console.error('Gagal memuat statistik dari localStorage:', e)
        }
      }
    }
  }
}

// ============================================
// INISIALISASI DATA
// ============================================
await loadStatistik()
</script>

<style scoped>
/* Transisi halus & Seleksi Teks */
::selection {
  background-color: #a7f3d0; /* emerald-200 */
  color: #064e3b; /* emerald-900 */
}

/* Animasi Ping Halus */
@keyframes ping {
  0% { transform: scale(1); opacity: 1; }
  75%, 100% { transform: scale(2.5); opacity: 0; }
}
.animate-ping {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>