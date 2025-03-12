import axios from 'axios'
import { useLoadingStore } from '@/stores/loading'

export function setupAxios() {
  const loadingStore = useLoadingStore()

  axios.defaults.baseURL = 'http://localhost:8000'

  axios.interceptors.request.use(config => {
    loadingStore.show()
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  axios.interceptors.response.use(
    response => {
      loadingStore.hide()
      return response
    },
    error => {
      loadingStore.hide()
      return Promise.reject(error)
    }
  )
}