<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-content">
        <!-- Logo/Brand -->
        <div class="navbar-brand">
          <router-link to="/" class="brand-link">
            <span class="brand-icon">💍</span>
            <span class="brand-text">Wedding Cards</span>
          </router-link>
        </div>

        <!-- Desktop Menu -->
        <div class="navbar-menu" :class="{ active: mobileMenuOpen }">
          <div class="navbar-nav">
            <router-link to="/dashboard" class="nav-link">
              Dashboard
            </router-link>
            <router-link to="/templates" class="nav-link">
              Mẫu thiệp
            </router-link>
            <div class="nav-dropdown" @click="toggleUserMenu">
              <button class="nav-link dropdown-toggle">
                <div class="user-avatar">
                  <span>{{ userInitials }}</span>
                </div>
                <span>{{ authStore.user?.name || "User" }}</span>
                <i class="dropdown-icon">▾</i>
              </button>

              <div class="dropdown-menu" :class="{ show: userMenuOpen }">
                <router-link to="/profile" class="dropdown-item">
                  <i class="icon">👤</i>
                  Hồ sơ cá nhân
                </router-link>
                <router-link to="/my-templates" class="dropdown-item">
                  <i class="icon">📄</i>
                  Thiệp của tôi
                </router-link>
                <div class="dropdown-divider"></div>
                <button @click="handleLogout" class="dropdown-item logout-btn">
                  <i class="icon">🚪</i>
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="mobile-menu-btn"
          @click="toggleMobileMenu"
          :class="{ active: mobileMenuOpen }"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div
      v-if="mobileMenuOpen"
      class="mobile-overlay"
      @click="closeMobileMenu"
    ></div>
  </nav>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from "vue";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "@/stores/auth";

  const router = useRouter();
  const authStore = useAuthStore();

  const mobileMenuOpen = ref(false);
  const userMenuOpen = ref(false);

  const userInitials = computed(() => {
    const name = authStore.user?.name || "User";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  });

  const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
    if (mobileMenuOpen.value) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const closeMobileMenu = () => {
    mobileMenuOpen.value = false;
    document.body.style.overflow = "";
  };

  const toggleUserMenu = () => {
    userMenuOpen.value = !userMenuOpen.value;
  };

  const handleLogout = async () => {
    await authStore.logout();
    router.push("/auth/login");
    closeMobileMenu();
    userMenuOpen.value = false;
  };

  // Close menus when clicking outside
  const handleClickOutside = (event) => {
    if (!event.target.closest(".nav-dropdown")) {
      userMenuOpen.value = false;
    }
  };

  onMounted(() => {
    document.addEventListener("click", handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
    document.body.style.overflow = "";
  });
</script>

<style lang="scss" scoped>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid $border-color;
    z-index: $z-sticky;
    height: 80px;

    .container {
      height: 100%;
    }

    .navbar-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }
  }

  .navbar-brand {
    .brand-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.5rem;
      font-weight: $font-weight-bold;
      color: $primary;
      text-decoration: none;

      .brand-icon {
        font-size: 2rem;
      }

      .brand-text {
        background: linear-gradient(135deg, $primary, $primary-light);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      &:hover {
        transform: scale(1.05);
        transition: transform $transition-base;
      }
    }
  }

  .navbar-menu {
    display: flex;
    align-items: center;

    .navbar-nav {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0;
      color: $text-primary;
      font-weight: $font-weight-medium;
      text-decoration: none;
      position: relative;
      transition: color $transition-base;

      &:hover {
        color: $primary;
      }

      &.router-link-active {
        color: $primary;

        &::after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 0;
          right: 0;
          height: 2px;
          background: $primary;
          border-radius: 1px;
        }
      }
    }
  }

  .nav-dropdown {
    position: relative;

    .dropdown-toggle {
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      border-radius: $radius;
      transition: background-color $transition-base;

      &:hover {
        background: rgba($primary, 0.1);
      }

      .user-avatar {
        width: 36px;
        height: 36px;
        border-radius: $radius-full;
        background: linear-gradient(135deg, $primary, $primary-light);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: $font-weight-bold;
        font-size: 0.875rem;
      }

      .dropdown-icon {
        font-size: 0.75rem;
        color: $text-secondary;
        transition: transform $transition-base;
      }

      &:hover .dropdown-icon {
        transform: rotate(180deg);
      }
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      right: 0;
      background: white;
      border: 1px solid $border-color;
      border-radius: $radius-md;
      box-shadow: $shadow-lg;
      min-width: 200px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all $transition-base;
      z-index: $z-dropdown;

      &.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .dropdown-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        color: $text-primary;
        text-decoration: none;
        border: none;
        background: none;
        width: 100%;
        text-align: left;
        cursor: pointer;
        transition: background-color $transition-base;

        &:hover {
          background: rgba($primary, 0.1);
          color: $primary;
        }

        .icon {
          font-size: 1rem;
        }

        &.logout-btn {
          color: $error;

          &:hover {
            background: rgba($error, 0.1);
            color: $error;
          }
        }
      }

      .dropdown-divider {
        height: 1px;
        background: $border-color;
        margin: 0.5rem 0;
      }
    }
  }

  .mobile-menu-btn {
    display: none;
    flex-direction: column;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;

    span {
      width: 24px;
      height: 2px;
      background: $text-primary;
      transition: all $transition-base;
    }

    &.active {
      span:nth-child(1) {
        transform: rotate(45deg) translate(6px, 6px);
      }

      span:nth-child(2) {
        opacity: 0;
      }

      span:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px);
      }
    }
  }

  .mobile-overlay {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: $z-modal-backdrop;
  }

  @media (max-width: $breakpoint-lg) {
    .mobile-menu-btn {
      display: flex;
    }

    .navbar-menu {
      position: fixed;
      top: 80px;
      right: 0;
      width: 300px;
      height: calc(100vh - 80px);
      background: white;
      border-left: 1px solid $border-color;
      transform: translateX(100%);
      transition: transform $transition-base;
      z-index: $z-modal;

      &.active {
        transform: translateX(0);
      }

      .navbar-nav {
        flex-direction: column;
        align-items: stretch;
        gap: 0;
        padding: 2rem;
      }

      .nav-link {
        padding: 1rem 0;
        border-bottom: 1px solid rgba($border-color, 0.5);

        &::after {
          display: none;
        }

        &.router-link-active {
          color: $primary;
          background: rgba($primary, 0.1);
          padding-left: 1rem;
          margin-left: -1rem;
          margin-right: -1rem;
          border-radius: $radius;
        }
      }
    }

    .nav-dropdown {
      .dropdown-menu {
        position: static;
        opacity: 1;
        visibility: visible;
        transform: none;
        box-shadow: none;
        border: none;
        border-top: 1px solid $border-color;
        margin-top: 1rem;
        padding-top: 1rem;
      }
    }
  }

  @media (max-width: $breakpoint-sm) {
    .navbar-brand {
      .brand-text {
        display: none;
      }
    }

    .navbar-menu {
      width: 100%;
    }
  }
</style>
