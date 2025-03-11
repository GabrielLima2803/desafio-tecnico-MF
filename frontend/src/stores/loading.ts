import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    isLoading: false,
    requestCount: 0
  }),
  actions: {
    show() {
      this.requestCount++
      this.isLoading = true
    },
    hide() {
      this.requestCount = Math.max(0, this.requestCount - 1)
      this.isLoading = this.requestCount > 0
    }
  }
})