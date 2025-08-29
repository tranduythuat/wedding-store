<template>
  <div class="main-layout">
    <Navbar />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
  import Navbar from "@/components/layout/Navbar.vue";
  import Footer from "@/components/layout/Footer.vue";
</script>

<style lang="scss" scoped>
  .main-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .main-content {
    flex: 1;
    padding-top: 80px; // Account for fixed navbar
  }
</style>
