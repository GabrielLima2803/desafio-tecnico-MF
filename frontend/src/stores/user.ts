import type { UserType } from "@/types/user.types"
import { defineStore } from "pinia"
import { computed, reactive } from "vue"
import UserService from "../services/user"

export const useUserStore = defineStore('user', () => {
  const state = reactive({
    user: {} as UserType
  })

  const user = computed(() => state.user)

  async function getUser() {
    const response = await UserService.getMe();
    state.user = response.data;
  }

  return {
    user,
    getUser
  }
})
