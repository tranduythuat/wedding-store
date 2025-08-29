<template>
  <div class="template-edit">
    <div class="editor-header">
      <div class="container">
        <div class="header-content">
          <div class="header-left">
            <button @click="goBack" class="btn btn-outline">← Quay lại</button>
            <h1>Chỉnh sửa thiệp cưới</h1>
          </div>
          <div class="header-right">
            <button @click="previewTemplate" class="btn btn-outline">
              Xem trước
            </button>
            <button
              @click="saveTemplate"
              class="btn btn-primary"
              :disabled="saving"
            >
              {{ saving ? "Đang lưu..." : "Lưu" }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="editor-content">
      <div class="container">
        <div class="editor-layout">
          <!-- Left sidebar - Form controls -->
          <div class="editor-sidebar">
            <div class="sidebar-section">
              <h3>Thông tin cô dâu chú rể</h3>
              <div class="form-group">
                <label>Tên cô dâu</label>
                <input
                  v-model="templateData.bride_name"
                  type="text"
                  placeholder="Nhập tên cô dâu"
                />
              </div>
              <div class="form-group">
                <label>Tên chú rể</label>
                <input
                  v-model="templateData.groom_name"
                  type="text"
                  placeholder="Nhập tên chú rể"
                />
              </div>
            </div>

            <div class="sidebar-section">
              <h3>Thông tin đám cưới</h3>
              <div class="form-group">
                <label>Ngày cưới</label>
                <input v-model="templateData.wedding_date" type="date" />
              </div>
              <div class="form-group">
                <label>Giờ cưới</label>
                <input v-model="templateData.wedding_time" type="time" />
              </div>
              <div class="form-group">
                <label>Địa điểm</label>
                <input
                  v-model="templateData.venue_name"
                  type="text"
                  placeholder="Tên địa điểm"
                />
              </div>
              <div class="form-group">
                <label>Địa chỉ</label>
                <textarea
                  v-model="templateData.venue_address"
                  placeholder="Địa chỉ chi tiết"
                  rows="3"
                ></textarea>
              </div>
            </div>

            <div class="sidebar-section">
              <h3>Thông tin liên hệ</h3>
              <div class="form-group">
                <label>Số điện thoại cô dâu</label>
                <input
                  v-model="templateData.bride_phone"
                  type="tel"
                  placeholder="Số điện thoại"
                />
              </div>
              <div class="form-group">
                <label>Số điện thoại chú rể</label>
                <input
                  v-model="templateData.groom_phone"
                  type="tel"
                  placeholder="Số điện thoại"
                />
              </div>
            </div>

            <div class="sidebar-section">
              <h3>Album ảnh</h3>
              <div class="photo-upload">
                <input
                  ref="photoInput"
                  type="file"
                  multiple
                  accept="image/*"
                  @change="handlePhotoUpload"
                  style="display: none"
                />
                <button
                  @click="$refs.photoInput.click()"
                  class="btn btn-outline upload-btn"
                >
                  + Thêm ảnh
                </button>
              </div>
              <div
                v-if="templateData.photos && templateData.photos.length > 0"
                class="photo-grid"
              >
                <div
                  v-for="(photo, index) in templateData.photos"
                  :key="index"
                  class="photo-item"
                >
                  <img :src="photo.url" :alt="`Photo ${index + 1}`" />
                  <button @click="removePhoto(index)" class="remove-photo">
                    ×
                  </button>
                </div>
              </div>
            </div>

            <div class="sidebar-section">
              <h3>Lời nhắn</h3>
              <div class="form-group">
                <label>Lời cảm ơn</label>
                <textarea
                  v-model="templateData.message"
                  placeholder="Lời cảm ơn đến khách mời..."
                  rows="4"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Right side - Preview -->
          <div class="editor-preview">
            <div class="preview-container">
              <div class="preview-header">
                <h3>Xem trước</h3>
                <div class="preview-controls">
                  <button
                    @click="previewMode = 'desktop'"
                    :class="[
                      'control-btn',
                      { active: previewMode === 'desktop' },
                    ]"
                  >
                    💻
                  </button>
                  <button
                    @click="previewMode = 'mobile'"
                    :class="[
                      'control-btn',
                      { active: previewMode === 'mobile' },
                    ]"
                  >
                    📱
                  </button>
                </div>
              </div>

              <div class="preview-frame" :class="`preview-${previewMode}`">
                <WeddingTemplatePreview
                  :template-data="templateData"
                  :template="currentTemplate"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive, onMounted, watch } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useTemplateStore } from "@/stores/template";
  import WeddingTemplatePreview from "@/components/WeddingTemplatePreview.vue";

  const route = useRoute();
  const router = useRouter();
  const templateStore = useTemplateStore();

  const templateId = route.params.id;
  const saving = ref(false);
  const previewMode = ref("desktop");
  const photoInput = ref(null);

  const templateData = reactive({
    bride_name: "",
    groom_name: "",
    wedding_date: "",
    wedding_time: "",
    venue_name: "",
    venue_address: "",
    bride_phone: "",
    groom_phone: "",
    message: "",
    photos: [],
  });

  const currentTemplate = ref(null);

  const loadTemplate = async () => {
    const template = await templateStore.fetchTemplate(templateId);
    if (template) {
      currentTemplate.value = template;

      // Load existing data if available
      if (template.user_data) {
        Object.assign(templateData, template.user_data);
      }
    }
  };

  const saveTemplate = async () => {
    saving.value = true;

    const result = await templateStore.updateTemplate(templateId, {
      user_data: { ...templateData },
    });

    if (result.success) {
      // Show success message
      alert("Đã lưu thành công!");
    }

    saving.value = false;
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);

    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          templateData.photos.push({
            url: e.target.result,
            file: file,
            name: file.name,
          });
        };
        reader.readAsDataURL(file);
      }
    });

    // Reset input
    event.target.value = "";
  };

  const removePhoto = (index) => {
    templateData.photos.splice(index, 1);
  };

  const previewTemplate = () => {
    router.push({
      name: "template-preview",
      params: { id: templateId },
      query: { preview: "true" },
    });
  };

  const goBack = () => {
    router.go(-1);
  };

  // Auto-save functionality
  let saveTimeout = null;
  watch(
    templateData,
    () => {
      if (saveTimeout) clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        saveTemplate();
      }, 2000); // Auto-save after 2 seconds of no changes
    },
    { deep: true }
  );

  onMounted(() => {
    loadTemplate();
  });
</script>

<style lang="scss" scoped>
  .template-edit {
    min-height: 100vh;
    background: #f8f9fa;
  }

  .editor-header {
    background: white;
    border-bottom: 1px solid $border-color;
    padding: 1rem 0;
    position: sticky;
    top: 80px;
    z-index: 100;

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .header-left {
        display: flex;
        align-items: center;
        gap: 1rem;

        h1 {
          margin: 0;
          color: $text-primary;
        }
      }

      .header-right {
        display: flex;
        gap: 1rem;
      }
    }
  }

  .editor-content {
    padding: 2rem 0;
  }

  .editor-layout {
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 2rem;
    min-height: calc(100vh - 200px);
  }

  .editor-sidebar {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    height: fit-content;
    max-height: calc(100vh - 200px);
    overflow-y: auto;

    .sidebar-section {
      margin-bottom: 2rem;

      &:last-child {
        margin-bottom: 0;
      }

      h3 {
        color: $text-primary;
        margin-bottom: 1rem;
        font-size: 1.1rem;
        border-bottom: 2px solid $primary;
        padding-bottom: 0.5rem;
      }

      .form-group {
        margin-bottom: 1rem;

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: $text-primary;
        }

        input,
        textarea {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid $border-color;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s;

          &:focus {
            outline: none;
            border-color: $primary;
          }
        }

        textarea {
          resize: vertical;
          min-height: 80px;
        }
      }
    }
  }

  .photo-upload {
    margin-bottom: 1rem;

    .upload-btn {
      width: 100%;
      padding: 0.75rem;
      border: 2px dashed $primary;
      background: rgba($primary, 0.05);
      color: $primary;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background: rgba($primary, 0.1);
      }
    }
  }

  .photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 0.5rem;

    .photo-item {
      position: relative;
      aspect-ratio: 1;
      border-radius: 8px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .remove-photo {
        position: absolute;
        top: 2px;
        right: 2px;
        width: 20px;
        height: 20px;
        border: none;
        background: rgba(255, 0, 0, 0.8);
        color: white;
        border-radius: 50%;
        cursor: pointer;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          background: red;
        }
      }
    }
  }

  .editor-preview {
    .preview-container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .preview-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid $border-color;
      background: #f8f9fa;

      h3 {
        margin: 0;
        color: $text-primary;
      }

      .preview-controls {
        display: flex;
        gap: 0.5rem;

        .control-btn {
          padding: 0.5rem;
          border: 1px solid $border-color;
          background: white;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1.2rem;
          transition: all 0.3s;

          &:hover {
            border-color: $primary;
          }

          &.active {
            background: $primary;
            border-color: $primary;
            color: white;
          }
        }
      }
    }

    .preview-frame {
      padding: 1rem;
      overflow: auto;
      max-height: calc(100vh - 300px);

      &.preview-mobile {
        display: flex;
        justify-content: center;

        :deep(.wedding-template) {
          max-width: 375px;
          margin: 0 auto;
        }
      }
    }
  }

  .btn {
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    border: none;
    text-decoration: none;

    &.btn-outline {
      background: transparent;
      color: $primary;
      border: 2px solid $primary;

      &:hover {
        background: $primary;
        color: white;
      }
    }

    &.btn-primary {
      background: $primary;
      color: white;

      &:hover:not(:disabled) {
        background: darken($primary, 10%);
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
  }

  @media (max-width: 1024px) {
    .editor-layout {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .editor-sidebar {
      order: 2;
    }

    .editor-preview {
      order: 1;
    }
  }
</style>
