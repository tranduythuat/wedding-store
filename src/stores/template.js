import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/services/api";

export const useTemplateStore = defineStore("template", () => {
  const templates = ref([]);
  const currentTemplate = ref(null);
  const userTemplates = ref([]);
  const loading = ref(false);
  const error = ref("");

  // Getters
  const availableTemplates = computed(() =>
    templates.value.filter((t) => t.status === "active")
  );

  // Actions
  async function fetchTemplates() {
    try {
      loading.value = true;
      const response = await api.get("/templates");
      templates.value = response.data;
    } catch (err) {
      error.value = "Không thể tải danh sách template";
      console.error("Fetch templates error:", err);
      templates.value = [
        {
          id: 1,
          name: "Template Cưới Cổ Điển",
          status: "active",
          description: "Thiệp cưới phong cách cổ điển test",
          // preview_image: "https://yenstudio.com.vn/wp-content/uploads/2024/06/anh-web-1.jpg",
          preview_image: "",
          category_name: "Cổ Điển",
          price: 200,
        },
        {
          id: 2,
          name: "Template Cưới Hiện Đại",
          status: "active",
          description: "Thiệp cưới phong cách hiện đại",
          preview_image: "https://yenstudio.com.vn/wp-content/uploads/2024/06/anh-web-2-1200x1200.jpg",
          category_name: "Hiện Đại",
          price: 250,
        },
        {
          id: 3,
          name: "Template Cưới Tối Giản",
          status: "active",
          description: "Thiệp cưới phong cách tối giản",
          preview_image: "https://yenstudio.com.vn/wp-content/uploads/2025/06/MS6-1-1200x1200.jpg",
          category_name: "Tối Giản",
          price: 180,
        },
      ];
    } finally {
      loading.value = false;
    }
  }

  async function fetchTemplate(id) {
    try {
      loading.value = true;
      const response = await api.get(`/templates/${id}`);
      currentTemplate.value = response.data;
      return response.data;
    } catch (err) {
      error.value = "Không thể tải template";
      console.error("Fetch template error:", err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function fetchUserTemplates() {
    try {
      loading.value = true;
      const response = await api.get("/user/templates");
      userTemplates.value = response.data;
    } catch (err) {
      error.value = "Không thể tải template của bạn";
      console.error("Fetch user templates error:", err);
    } finally {
      loading.value = false;
    }
  }

  async function selectTemplate(templateId) {
    try {
      loading.value = true;
      const response = await api.post(`/templates/${templateId}/select`);

      // Add to user templates
      userTemplates.value.push(response.data);

      return { success: true, data: response.data };
    } catch (err) {
      error.value = "Không thể chọn template";
      console.error("Select template error:", err);
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }

  async function updateTemplate(templateId, updates) {
    try {
      loading.value = true;
      const response = await api.put(`/user/templates/${templateId}`, updates);

      // Update in user templates
      const index = userTemplates.value.findIndex((t) => t.id === templateId);
      if (index !== -1) {
        userTemplates.value[index] = response.data;
      }

      // Update current template if it's the same
      if (currentTemplate.value?.id === templateId) {
        currentTemplate.value = response.data;
      }

      return { success: true, data: response.data };
    } catch (err) {
      error.value = "Không thể cập nhật template";
      console.error("Update template error:", err);
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }

  async function deleteUserTemplate(templateId) {
    try {
      loading.value = true;
      await api.delete(`/user/templates/${templateId}`);

      // Remove from user templates
      userTemplates.value = userTemplates.value.filter(
        (t) => t.id !== templateId
      );

      return { success: true };
    } catch (err) {
      error.value = "Không thể xóa template";
      console.error("Delete template error:", err);
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }

  function clearError() {
    error.value = "";
  }

  function setCurrentTemplate(template) {
    currentTemplate.value = template;
  }

  return {
    templates,
    currentTemplate,
    userTemplates,
    loading,
    error,
    availableTemplates,
    fetchTemplates,
    fetchTemplate,
    fetchUserTemplates,
    selectTemplate,
    updateTemplate,
    deleteUserTemplate,
    clearError,
    setCurrentTemplate,
  };
});
