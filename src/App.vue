<script setup>
  import { computed } from "vue";
  import { useRoute } from "vue-router";
  import Navbar from "./components/layout/Navbar.vue";

  const route = useRoute();

  const showNavbar = computed(() => {
    return !["login", "register"].includes(route.name);
  });
</script>

<template>
  <div id="app">
    <Navbar v-if="showNavbar" />
    <main class="main-content" :class="{ 'no-navbar': !showNavbar }">
      <router-view />
    </main>
  </div>
</template>

<style lang="scss" scoped>
  #app {
    min-height: 100vh;
    font-family: "Arial", sans-serif;
  }

  .main-content {
    padding-top: 80px;

    &.no-navbar {
      padding-top: 0;
    }
  }
</style>
