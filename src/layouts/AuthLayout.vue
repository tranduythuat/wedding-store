<template>
  <div class="auth-layout">
    <router-view />
  </div>
</template>

<script setup>
  // Auth layout doesn't need navigation
</script>

<style lang="scss" scoped>
  .auth-layout {
    min-height: 100vh;
  }
</style>
