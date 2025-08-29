import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))
  const loading = ref(false)
  const error = ref('')

  const isAuthenticated = computed(() => !!token.value)

  // Actions
  async function login(credentials) {
    try {
      loading.value = true
      error.value = ''
      
      const response = await api.post('/auth/login', credentials)
      const { user: userData, token: userToken } = response.data
      
      user.value = userData
      token.value = userToken
      localStorage.setItem('token', userToken)
      
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Đăng nhập thất bại'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  async function register(userData) {
    try {
      loading.value = true
      error.value = ''
      
      const response = await api.post('/auth/register', userData)
      const { user: newUser, token: userToken } = response.data
      
      user.value = newUser
      token.value = userToken
      localStorage.setItem('token', userToken)
      
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Đăng ký thất bại'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try {
      await api.post('/auth/logout')
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      user.value = null
      token.value = null
      localStorage.removeItem('token')
    }
  }

  async function fetchUser() {
    if (!token.value) return
    
    try {
      const response = await api.get('/auth/me')
      user.value = response.data
    } catch (err) {
      console.error('Fetch user error:', err)
      logout()
    }
  }

  function clearError() {
    error.value = ''
  }

  // Initialize
  if (token.value) {
    fetchUser()
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    fetchUser,
    clearError
  }
})
