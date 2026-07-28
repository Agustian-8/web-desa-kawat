<template>
  <div>
    <!-- HERO SECTION (Dengan Background Gambar) -->
    <section class="relative bg-slate-900 overflow-hidden pt-32 pb-40 lg:pt-40 lg:pb-52">
      <!-- Gambar Latar Belakang -->
      <div class="absolute inset-0 bg-[url('/bg-desa.png')] bg-cover bg-center bg-no-repeat"></div>
      
      <!-- Overlay Gelap (Sedikit dikurangi dari 70 ke 60 agar gambar lebih terlihat) -->
      <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto">
          
          <!-- Tagline -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-emerald-300 text-sm font-medium mb-8 border border-white/20 backdrop-blur-md shadow-sm"
          >
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Portal Informasi Resmi
          </div>

          <!-- Judul Utama -->
          <h1 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 100 } }"
            class="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Membangun Desa, <br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Merajut Harmoni
            </span>
          </h1>

          <!-- Deskripsi -->
          <p 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
            class="text-lg text-slate-200 mb-10 leading-relaxed"
          >
            Selamat datang di website resmi Desa Kawat. Kami hadir untuk memberikan pelayanan publik yang transparan, inovatif, dan mudah diakses oleh seluruh masyarakat.
          </p>

          <!-- Tombol Aksi (Efek Hover Dinamis) -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 300 } }"
            class="flex flex-col sm:flex-row justify-center gap-4 group/buttons"
          >
            <NuxtLink to="/profil" class="bg-emerald-600 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-emerald-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 text-center flex items-center justify-center gap-2">
              Eksplorasi Desa
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </NuxtLink>
            <NuxtLink to="/layanan" class="bg-white/10 text-white border border-white/30 px-8 py-3.5 rounded-full font-semibold hover:bg-white hover:text-emerald-700 hover:-translate-y-1 hover:shadow-xl hover:shadow-white/20 transition-all duration-300 backdrop-blur-md text-center">
              Layanan Mandiri
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <!-- Gradasi transisi BAWAH diperkecil (h-12) agar tidak memakan gambar -->
      <div class="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-50 to-transparent z-10 pointer-events-none"></div>
    </section>

    <!-- SECTION STATISTIK (Desain Kartu Terpisah Modern & Aesthetic) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-16">
      <div 
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        class="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <!-- Card Statistik 1 -->
        <div class="bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-xl shadow-slate-200/50 flex flex-col items-center justify-center text-center group hover:-translate-y-2 transition-transform duration-300">
          <div class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </div>
          <h3 class="text-4xl font-extrabold text-slate-800 mb-1">2.450</h3>
          <p class="text-xs font-semibold text-slate-400 tracking-widest uppercase mt-1">Total Penduduk</p>
        </div>

        <!-- Card Statistik 2 -->
        <div class="bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-xl shadow-slate-200/50 flex flex-col items-center justify-center text-center group hover:-translate-y-2 transition-transform duration-300">
          <div class="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          </div>
          <h3 class="text-4xl font-extrabold text-slate-800 mb-1">4</h3>
          <p class="text-xs font-semibold text-slate-400 tracking-widest uppercase mt-1">Dusun Terintegrasi</p>
        </div>

        <!-- Card Statistik 3 -->
        <div class="bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-xl shadow-slate-200/50 flex flex-col items-center justify-center text-center group hover:-translate-y-2 transition-transform duration-300">
          <div class="w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          </div>
          <h3 class="text-4xl font-extrabold text-slate-800 mb-1">9</h3>
          <p class="text-xs font-semibold text-slate-400 tracking-widest uppercase mt-1">Layanan Digital</p>
        </div>
      </div>
    </section>

    <!-- SECTION LAYANAN -->
    <section class="bg-slate-50 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Layanan Administrasi</h2>
          <p class="text-gray-500">Urus dokumen kependudukan lebih cepat dan mudah langsung dari rumah Anda.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Card Layanan 1 -->
          <NuxtLink to="/layanan"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
            class="block bg-white p-8 rounded-3xl border border-gray-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 group cursor-pointer"
          >
            <div class="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:-translate-y-1 transition-all duration-300">
              <svg class="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path></svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Surat Pengantar</h3>
            <p class="text-gray-500 text-sm leading-relaxed mb-6">Ajukan pembuatan surat pengantar RT/RW untuk berbagai keperluan administrasi.</p>
            <span class="text-emerald-600 text-sm font-semibold group-hover:underline inline-flex items-center gap-1">Ajukan Sekarang <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></span>
          </NuxtLink>

          <!-- Card Layanan 2 -->
          <NuxtLink to="/layanan"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
            class="block bg-white p-8 rounded-3xl border border-gray-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 group cursor-pointer"
          >
            <div class="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:-translate-y-1 transition-all duration-300">
                <svg class="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Data Penduduk</h3>
            <p class="text-gray-500 text-sm leading-relaxed mb-6">Pembaruan data Kartu Keluarga, mutasi masuk, atau laporan mutasi keluar.</p>
            <span class="text-emerald-600 text-sm font-semibold group-hover:underline inline-flex items-center gap-1">Ajukan Sekarang <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></span>
          </NuxtLink>

          <!-- Card Layanan 3 -->
          <NuxtLink to="/layanan"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 300 } }"
            class="block bg-white p-8 rounded-3xl border border-gray-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 group cursor-pointer"
          >
            <div class="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:-translate-y-1 transition-all duration-300">
              <svg class="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Lapor Desa</h3>
            <p class="text-gray-500 text-sm leading-relaxed mb-6">Kirim aduan, aspirasi, atau laporan masalah infrastruktur langsung ke perangkat desa.</p>
            <span class="text-emerald-600 text-sm font-semibold group-hover:underline inline-flex items-center gap-1">Buat Laporan <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></span>
          </NuxtLink>
        </div>

        <!-- TOMBOL LIHAT SEMUA LAYANAN -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 400 } }"
          class="text-center mt-12"
        >
          <NuxtLink to="/layanan" class="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-emerald-600 text-emerald-600 font-bold rounded-full hover:bg-emerald-600 hover:text-white hover:shadow-lg hover:shadow-emerald-600/30 hover:-translate-y-1 transition-all duration-300">
            Lihat Semua Layanan
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </NuxtLink>
        </div>

      </div>
    </section>
    <!-- SECTION LOKASI & PETA DESA -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20">
      <div 
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        class="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/40 border border-gray-100 flex flex-col lg:flex-row gap-10 lg:gap-16 items-center"
      >
        
        <!-- Informasi Teks & Alamat -->
        <div class="w-full lg:w-1/3">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-sm font-bold mb-6 border border-emerald-100">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            Lokasi Kami
          </div>
          
          <h2 class="text-3xl font-extrabold text-gray-900 mb-4">Peta Wilayah <br/>Desa Kawat</h2>
          <p class="text-gray-500 leading-relaxed mb-8">
            Kunjungi pusat pemerintahan desa kami. Kami siap melayani kebutuhan administrasi dan menampung aspirasi Anda pada jam kerja operasional.
          </p>
          
          <div class="space-y-6">
            <!-- Ikon Kantor -->
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0 text-emerald-600 border border-emerald-100">
                 <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              </div>
              <div>
                <h4 class="font-bold text-gray-900">Kantor Kepala Desa</h4>
                <p class="text-sm text-gray-500 mt-1 leading-relaxed">Kec. Tayan Hilir, Kab. Sanggau<br/>Kalimantan Barat, Indonesia</p>
              </div>
            </div>
            
            <!-- Ikon Jam Kerja -->
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0 text-emerald-600 border border-emerald-100">
                 <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <h4 class="font-bold text-gray-900">Jam Operasional</h4>
                <p class="text-sm text-gray-500 mt-1 leading-relaxed">Senin - Jumat<br/>08.00 - 15.00 WIB</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Google Maps Iframe (Aesthetic Container) -->
        <div class="w-full lg:w-2/3 h-[400px] rounded-3xl overflow-hidden shadow-inner border border-gray-100 bg-slate-100 relative group">
           <!-- Placeholder Skeleton saat map masih meload -->
           <div class="absolute inset-0 bg-slate-200 animate-pulse -z-10"></div>
           
           <!-- Link embed Google Maps mengarah ke Desa Kawat, Tayan Hilir -->
           <iframe 
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.041180087307!2d110.04239127496453!3d-0.07015309992915265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e029d1e2c3b6f45%3A0xcbb8ef9e122fc054!2sKantor%20Desa%20Kawat!5e1!3m2!1sen!2sid!4v1784885868814!5m2!1sen!2sid"
             width="100%" 
             height="100%" 
             style="border:0;" 
             allowfullscreen="true" 
             loading="lazy" 
             referrerpolicy="no-referrer-when-downgrade"
             class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out cursor-pointer"
           ></iframe>
        </div>
      </div>
    </section>
  </div>
</template>