<template>
  <div class="min-h-screen flex flex-col font-['Poppins'] bg-slate-50">
    <!-- Panggil Komponen Navbar -->
    <Navbar />

    <!-- KONTEN HALAMAN DINAMIS AKAN MUNCUL DI SINI -->
    <main class="flex-grow pt-20">
      <slot />
    </main>

    <!-- Panggil Komponen Footer -->
    <Footer />
  </div>
</template>