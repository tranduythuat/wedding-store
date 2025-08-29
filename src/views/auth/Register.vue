<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h1>Đăng ký</h1>
        <p>Tạo tài khoản mới để bắt đầu!</p>
      </div>

      <form @submit.prevent="handleRegister" class="auth-form">
        <div class="form-group">
          <label for="name">Họ và tên</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            :class="{ error: errors.name }"
            @input="clearFieldError('name')"
          >
          <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            :class="{ error: errors.email }"
            @input="clearFieldError('email')"
          >
          <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="phone">Số điện thoại</label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            required
            :class="{ error: errors.phone }"
            @input="clearFieldError('phone')"
          >
          <span v-if="errors.phone" class="error-text">{{ errors.phone }}</span>
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
          >
          <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
        </div>

        <div class="form-group">
          <label for="confirmPassword">Xác nhận mật khẩu</label>
          <input
            id="confirmPassword"
            v-model="form.confirmPassword"
            type="password"
            required
            :class="{ error: errors.confirmPassword }"
            @input="clearFieldError('confirmPassword')"
          >
          <span v-if="errors.confirmPassword" class="error-text">{{ errors.confirmPassword }}</span>
        </div>

        <div v-if="authStore.error" class="alert alert-error">
          {{ authStore.error }}
        </div>

        <button 
          type="submit" 
          class="btn btn-primary" 
          :disabled="authStore.loading"
        >
          <span v-if="authStore.loading">Đang đăng ký...</span>
          <span v-else>Đăng ký</span>
        </button>
      </form>

      <div class="auth-footer">
        <p>Đã có tài khoản? 
          <router-link to="/auth/login" class="link">Đăng nhập ngay</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

const errors = ref({})

const validateForm = () => {
  errors.value = {}

  if (!form.name) {
    errors.value.name = 'Họ và tên là bắt buộc'
  }
  if (!form.email) {
    errors.value.email = 'Email là bắt buộc'
  }
  if (!form.phone) {
    errors.value.phone = 'Số điện thoại là bắt buộc'
  }
  if (!form.password) {
    errors.value.password = 'Mật khẩu là bắt buộc'
  } else if (form.password.length < 6) {
    errors.value.password = 'Mật khẩu phải có ít nhất 6 ký tự'
  }
  if (!form.confirmPassword) {
    errors.value.confirmPassword = 'Xác nhận mật khẩu là bắt buộc'
  } else if (form.password !== form.confirmPassword) {
    errors.value.confirmPassword = 'Mật khẩu xác nhận không khớp'
  }

  return Object.keys(errors.value).length === 0
}

const handleRegister = async () => {
  if (!validateForm()) return

  const result = await authStore.register({
    name: form.name,
    email: form.email,
    phone: form.phone,
    password: form.password
  })
  
  if (result.success) {
    router.push('/dashboard')
  }
}

const clearFieldError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field]
  }
  authStore.clearError()
}
</script>

<style lang="scss" scoped>
// Same styles as Login.vue
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
  max-height: 90vh;
  overflow-y: auto;
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
