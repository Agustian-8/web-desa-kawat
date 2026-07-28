<template>
  <div class="min-h-screen flex flex-col font-['Poppins'] bg-slate-50">
    <!-- Navbar -->
    <Navbar />

    <!-- Konten Halaman -->
    <main class="flex-grow pt-20">
      <slot />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
</script>