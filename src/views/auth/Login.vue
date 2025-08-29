<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h1>Đăng nhập</h1>
        <p>Chào mừng bạn quay trở lại!</p>
      </div>

      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            :class="{ error: errors.email }"
            @input="clearFieldError('email')"
          />
          <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="password">Mật khẩu</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            :class="{ error: errors.password }"
            @input="clearFieldError('password')"
          />
          <span v-if="errors.password" class="error-text">{{
            errors.password
          }}</span>
        </div>

        <div v-if="authStore.error" class="alert alert-error">
          {{ authStore.error }}
        </div>

        <button
          type="submit"
          class="btn btn-primary"
          :disabled="authStore.loading"
        >
          <span v-if="authStore.loading">Đang đăng nhập...</span>
          <span v-else>Đăng nhập</span>
        </button>
      </form>

      <div class="auth-footer">
        <p>
          Chưa có tài khoản?
          <router-link to="/auth/register" class="link"
            >Đăng ký ngay</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
  email: "",
  password: "",
});

const errors = ref({});

const handleLogin = async () => {
  errors.value = {};

  // Basic validation
  if (!form.email) {
    errors.value.email = "Email là bắt buộc";
    return;
  }
  if (!form.password) {
    errors.value.password = "Mật khẩu là bắt buộc";
    return;
  }

  const result = await authStore.login(form);

  if (result.success) {
    router.push("/dashboard");
  }
};

const clearFieldError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field];
  }
  authStore.clearError();
};
</script>

<style lang="scss" scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, $primary-light, $primary);
  padding: 2rem;
}

.auth-card {
  background: white;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    color: $text-primary;
    margin-bottom: 0.5rem;
  }

  p {
    color: $text-secondary;
  }
}

.auth-form {
  .form-group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: $text-primary;
    }

    input {
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

      &.error {
        border-color: $error-color;
      }
    }

    .error-text {
      color: $error-color;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
  }

  .btn {
    width: 100%;
    padding: 0.875rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;

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
}

.alert {
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;

  &.alert-error {
    background: rgba($error-color, 0.1);
    color: $error-color;
    border: 1px solid rgba($error-color, 0.3);
  }
}

.auth-footer {
  text-align: center;
  margin-top: 2rem;

  p {
    color: $text-secondary;
  }

  .link {
    color: $primary;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
