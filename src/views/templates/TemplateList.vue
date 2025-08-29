<template>
  <div class="template-list">
    <div class="container">
      <div class="page-header">
        <h1>Chọn mẫu thiệp cưới</h1>
        <p>Khám phá bộ sưu tập thiệp cưới đẹp và độc đáo</p>
      </div>

      <div class="filter-section">
        <div class="search-box">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Tìm kiếm mẫu thiệp..."
            class="search-input"
          />
        </div>
        <div class="category-filters">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="selectedCategory = category.id"
            :class="[
              'filter-btn',
              { active: selectedCategory === category.id },
            ]"
          >
            {{ category.name }}
          </button>
        </div>
      </div>

      <div v-if="templateStore.loading" class="loading">
        <div class="spinner"></div>
        <p>Đang tải mẫu thiệp...</p>
      </div>

      <div v-else-if="filteredTemplates.length === 0" class="empty-state">
        <h3>Không tìm thấy mẫu thiệp nào</h3>
        <p>Thử thay đổi từ khóa tìm kiếm hoặc danh mục</p>
      </div>

      <div v-else class="template-grid">
        <div
          v-for="template in filteredTemplates"
          :key="template.id"
          class="template-card"
        >
          <div class="template-image">
            <img :src="template.preview_image" :alt="template.name" />
            <div class="template-overlay">
              <div class="template-actions">
                <button
                  @click="previewTemplate(template)"
                  class="btn btn-outline"
                >
                  Xem trước
                </button>
                <button
                  @click="selectTemplate(template)"
                  class="btn btn-primary"
                  :disabled="selecting === template.id"
                >
                  {{ selecting === template.id ? "Đang chọn..." : "Chọn mẫu" }}
                </button>
              </div>
            </div>
          </div>
          <div class="template-info">
            <h3>{{ template.name }}</h3>
            <p>{{ template.description }}</p>
            <div class="template-meta">
              <span class="category">{{ template.category_name }}</span>
              <span class="price">{{ formatPrice(template.price) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useTemplateStore } from "@/stores/template";

  const router = useRouter();
  const templateStore = useTemplateStore();

  const searchQuery = ref("");
  const selectedCategory = ref("all");
  const selecting = ref(null);

  const categories = [
    { id: "all", name: "Tất cả" },
    { id: "classic", name: "Cổ điển" },
    { id: "modern", name: "Hiện đại" },
    { id: "romantic", name: "Lãng mạn" },
    { id: "minimal", name: "Tối giản" },
    { id: "luxury", name: "Sang trọng" },
  ];

  const filteredTemplates = computed(() => {
    let templates = templateStore.availableTemplates;

    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      templates = templates.filter(
        (template) =>
          template.name.toLowerCase().includes(query) ||
          template.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory.value !== "all") {
      templates = templates.filter(
        (template) => template.category === selectedCategory.value
      );
    }

    return templates;
  });

  const previewTemplate = (template) => {
    router.push({
      name: "template-preview",
      params: { id: template.id },
    });
  };

  const selectTemplate = async (template) => {
    selecting.value = template.id;

    const result = await templateStore.selectTemplate(template.id);

    if (result.success) {
      router.push({
        name: "template-edit",
        params: { id: result.data.id },
      });
    }

    selecting.value = null;
  };

  const formatPrice = (price) => {
    if (price === 0) return "Miễn phí";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  onMounted(() => {
    templateStore.fetchTemplates();
  });
</script>

<style lang="scss" scoped>
  .template-list {
    padding: 2rem 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .page-header {
    text-align: center;
    margin-bottom: 3rem;

    h1 {
      font-size: 2.5rem;
      color: $text-primary;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.2rem;
      color: $text-secondary;
    }
  }

  .filter-section {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    .search-box {
      flex: 1;
      max-width: 400px;

      .search-input {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 2px solid $border-color;
        border-radius: 8px;
        font-size: 1rem;

        &:focus {
          outline: none;
          border-color: $primary;
        }
      }
    }

    .category-filters {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      .filter-btn {
        padding: 0.5rem 1rem;
        border: 2px solid $border-color;
        background: white;
        color: $text-secondary;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          border-color: $primary;
          color: $primary;
        }

        &.active {
          background: $primary;
          border-color: $primary;
          color: white;
        }
      }
    }
  }

  .loading {
    text-align: center;
    padding: 4rem 0;

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid $border-color;
      border-top: 4px solid $primary;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }

    p {
      color: $text-secondary;
    }
  }

  .empty-state {
    text-align: center;
    padding: 4rem 0;

    h3 {
      color: $text-primary;
      margin-bottom: 1rem;
    }

    p {
      color: $text-secondary;
    }
  }

  .template-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
  }

  .template-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition:
      transform 0.3s,
      box-shadow 0.3s;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);

      .template-overlay {
        opacity: 1;
      }
    }

    .template-image {
      // position: relative;
      // aspect-ratio: 3/4;
      // overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .template-overlay {}

      // .template-overlay {
      //   position: absolute;
      //   top: 0;
      //   left: 0;
      //   right: 0;
      //   bottom: 0;
      //   background: rgba(0, 0, 0, 0.7);
      //   display: flex;
      //   align-items: center;
      //   justify-content: center;
      //   opacity: 0;
      //   transition: opacity 0.3s;

      //   .template-actions {
      //     display: flex;
      //     gap: 1rem;

      //     .btn {
      //       padding: 0.75rem 1.5rem;
      //       border-radius: 8px;
      //       font-weight: 600;
      //       cursor: pointer;
      //       transition: all 0.3s;
      //       border: none;

      //       &.btn-outline {
      //         background: transparent;
      //         color: white;
      //         border: 2px solid white;

      //         &:hover {
      //           background: white;
      //           color: $primary;
      //         }
      //       }

      //       &.btn-primary {
      //         background: $primary;
      //         color: white;

      //         &:hover:not(:disabled) {
      //           background: darken($primary, 10%);
      //         }

      //         &:disabled {
      //           opacity: 0.7;
      //           cursor: not-allowed;
      //         }
      //       }
      //     }
      //   }
      // }
    }

    .template-info {
      padding: 1.5rem;

      h3 {
        color: $text-primary;
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
      }

      p {
        color: $text-secondary;
        margin-bottom: 1rem;
        line-height: 1.5;
      }

      .template-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .category {
          background: rgba($primary, 0.1);
          color: $primary;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.875rem;
        }

        .price {
          font-weight: 600;
          color: $primary;
          font-size: 1.1rem;
        }
      }
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    .filter-section {
      flex-direction: column;
      align-items: stretch;

      .category-filters {
        justify-content: center;
      }
    }

    .template-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
