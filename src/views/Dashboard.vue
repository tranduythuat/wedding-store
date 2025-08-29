<template>
  <div class="dashboard">
    <div class="container">
      <!-- Welcome Section -->
      <div class="dashboard-header">
        <div class="welcome-section">
          <h1>Chào mừng, {{ authStore.user?.name }}! 👋</h1>
          <p>Quản lý và tạo những tấm thiệp cưới đẹp cho ngày trọng đại</p>
        </div>
        <div class="quick-actions">
          <router-link to="/templates" class="btn btn-primary">
            ➕ Tạo thiệp mới
          </router-link>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📄</div>
          <div class="stat-content">
            <h3>{{ userTemplates.length }}</h3>
            <p>Thiệp đã tạo</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">👀</div>
          <div class="stat-content">
            <h3>{{ totalViews }}</h3>
            <p>Lượt xem</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">❤️</div>
          <div class="stat-content">
            <h3>{{ totalLikes }}</h3>
            <p>Lượt thích</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">📤</div>
          <div class="stat-content">
            <h3>{{ totalShares }}</h3>
            <p>Lượt chia sẻ</p>
          </div>
        </div>
      </div>

      <!-- Recent Templates -->
      <div class="dashboard-section">
        <div class="section-header">
          <h2>Thiệp gần đây</h2>
          <router-link to="/my-templates" class="btn btn-outline btn-sm">
            Xem tất cả
          </router-link>
        </div>

        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Đang tải thiệp...</p>
        </div>

        <div v-else-if="recentTemplates.length === 0" class="empty-state">
          <div class="empty-icon">📝</div>
          <h3>Chưa có thiệp nào</h3>
          <p>Hãy tạo thiệp đầu tiên của bạn</p>
          <router-link to="/templates" class="btn btn-primary">
            Bắt đầu tạo thiệp
          </router-link>
        </div>

        <div v-else class="templates-grid">
          <div
            v-for="template in recentTemplates"
            :key="template.id"
            class="template-card"
          >
            <div class="template-preview">
              <img
                :src="template.preview_image || '/placeholder-template.jpg'"
                :alt="template.name"
              />
              <div class="template-overlay">
                <div class="template-actions">
                  <router-link
                    :to="`/templates/${template.id}/preview`"
                    class="btn btn-sm btn-outline"
                  >
                    Xem
                  </router-link>
                  <router-link
                    :to="`/templates/${template.id}/edit`"
                    class="btn btn-sm btn-primary"
                  >
                    Chỉnh sửa
                  </router-link>
                </div>
              </div>
            </div>

            <div class="template-info">
              <h4>{{ template.name || "Thiệp cưới" }}</h4>
              <p class="template-meta">
                <span>{{ formatDate(template.updated_at) }}</span>
                <span class="status" :class="template.status">
                  {{ getStatusText(template.status) }}
                </span>
              </p>

              <div class="template-stats">
                <span class="stat"> 👀 {{ template.views || 0 }} </span>
                <span class="stat"> ❤️ {{ template.likes || 0 }} </span>
                <span class="stat"> 📤 {{ template.shares || 0 }} </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Tips -->
      <div class="dashboard-section">
        <h2>Mẹo hữu ích</h2>
        <div class="tips-grid">
          <div class="tip-card">
            <div class="tip-icon">💡</div>
            <div class="tip-content">
              <h4>Tùy chỉnh màu sắc</h4>
              <p>Thay đổi màu sắc để phù hợp với tone màu đám cưới của bạn</p>
            </div>
          </div>

          <div class="tip-card">
            <div class="tip-icon">📸</div>
            <div class="tip-content">
              <h4>Thêm ảnh cá nhân</h4>
              <p>Upload ảnh cưới để thiệp trở nên độc đáo và ý nghĩa hơn</p>
            </div>
          </div>

          <div class="tip-card">
            <div class="tip-icon">✨</div>
            <div class="tip-content">
              <h4>Preview trước khi xuất</h4>
              <p>Luôn xem trước thiệp trên nhiều thiết bị trước khi chia sẻ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useAuthStore } from "@/stores/auth";
  import { useTemplateStore } from "@/stores/template";

  const authStore = useAuthStore();
  const templateStore = useTemplateStore();

  const loading = ref(true);

  const userTemplates = computed(() => templateStore.userTemplates);
  const recentTemplates = computed(() =>
    userTemplates.value
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, 6)
  );

  const totalViews = computed(() =>
    userTemplates.value.reduce((sum, t) => sum + (t.views || 0), 0)
  );

  const totalLikes = computed(() =>
    userTemplates.value.reduce((sum, t) => sum + (t.likes || 0), 0)
  );

  const totalShares = computed(() =>
    userTemplates.value.reduce((sum, t) => sum + (t.shares || 0), 0)
  );

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  const getStatusText = (status) => {
    const statusMap = {
      draft: "Bản nháp",
      published: "Đã xuất bản",
      archived: "Đã lưu trữ",
    };
    return statusMap[status] || "Không xác định";
  };

  const loadDashboard = async () => {
    loading.value = true;
    try {
      await templateStore.fetchUserTemplates();
    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    loadDashboard();
  });
</script>

<style lang="scss" scoped>
  .dashboard {
    padding: 2rem 0;
  }

  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
    padding: 2rem;
    background: linear-gradient(135deg, $wedding-blush, $wedding-ivory);
    border-radius: $radius-lg;

    .welcome-section {
      h1 {
        color: $text-primary;
        margin-bottom: 0.5rem;
      }

      p {
        color: $text-secondary;
        font-size: 1.1rem;
      }
    }

    @media (max-width: $breakpoint-md) {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: $radius-md;
      box-shadow: $shadow;
      display: flex;
      align-items: center;
      gap: 1rem;
      transition:
        transform $transition-base,
        box-shadow $transition-base;

      &:hover {
        transform: translateY(-2px);
        box-shadow: $shadow-lg;
      }

      .stat-icon {
        font-size: 2rem;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, $primary-light, $primary);
        border-radius: $radius-full;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .stat-content {
        h3 {
          font-size: 2rem;
          font-weight: $font-weight-bold;
          color: $text-primary;
          margin: 0;
        }

        p {
          color: $text-secondary;
          margin: 0;
          font-size: 0.875rem;
        }
      }
    }
  }

  .dashboard-section {
    margin-bottom: 3rem;

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;

      h2 {
        color: $text-primary;
        margin: 0;
      }
    }
  }

  .loading-state {
    text-align: center;
    padding: 3rem 0;

    .spinner {
      margin-bottom: 1rem;
    }

    p {
      color: $text-secondary;
    }
  }

  .empty-state {
    text-align: center;
    padding: 3rem 2rem;
    background: white;
    border-radius: $radius-lg;
    box-shadow: $shadow;

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    h3 {
      color: $text-primary;
      margin-bottom: 0.5rem;
    }

    p {
      color: $text-secondary;
      margin-bottom: 2rem;
    }
  }

  .templates-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;

    .template-card {
      background: white;
      border-radius: $radius-lg;
      overflow: hidden;
      box-shadow: $shadow;
      transition:
        transform $transition-base,
        box-shadow $transition-base;

      &:hover {
        transform: translateY(-5px);
        box-shadow: $shadow-xl;

        .template-overlay {
          opacity: 1;
        }
      }

      .template-preview {
        position: relative;
        aspect-ratio: 3/4;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform $transition-base;
        }

        &:hover img {
          transform: scale(1.05);
        }

        .template-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity $transition-base;

          .template-actions {
            display: flex;
            gap: 1rem;
          }
        }
      }

      .template-info {
        padding: 1.5rem;

        h4 {
          color: $text-primary;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }

        .template-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          font-size: 0.875rem;
          color: $text-secondary;

          .status {
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: $font-weight-medium;

            &.draft {
              background: rgba($warning, 0.1);
              color: $warning;
            }

            &.published {
              background: rgba($success, 0.1);
              color: $success;
            }

            &.archived {
              background: rgba($text-secondary, 0.1);
              color: $text-secondary;
            }
          }
        }

        .template-stats {
          display: flex;
          gap: 1rem;

          .stat {
            font-size: 0.875rem;
            color: $text-secondary;
          }
        }
      }
    }
  }

  .tips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;

    .tip-card {
      background: white;
      padding: 2rem;
      border-radius: $radius-lg;
      box-shadow: $shadow;
      display: flex;
      gap: 1rem;
      transition: transform $transition-base;

      &:hover {
        transform: translateY(-2px);
      }

      .tip-icon {
        font-size: 2rem;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, $wedding-sage, $wedding-dusty-blue);
        border-radius: $radius-full;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .tip-content {
        h4 {
          color: $text-primary;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }

        p {
          color: $text-secondary;
          margin: 0;
          line-height: 1.5;
        }
      }
    }
  }

  @media (max-width: $breakpoint-md) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .templates-grid {
      grid-template-columns: 1fr;
    }

    .tips-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
