import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import AuthService from "../services/auth";
import { useRouter } from "vue-router";


export const useAuthStore = defineStore("auth", () => {
  const state = reactive({
    token: localStorage.getItem("authToken") || null,
    errorMessage: ""
  });

  const router = useRouter();
  const token = computed(() => state.token);
  const errorMessage = computed(() => state.errorMessage);

  async function loginUser(email: string, password: string) {
    try {
      const response = await AuthService.loginUser(email, password);
      state.token = response.acessToken;
      localStorage.setItem("authToken", response.acessToken);
      state.errorMessage = "";
    } catch (error: unknown) {
      if (error instanceof Error) {
        state.errorMessage = error.name;
      } else {
        state.errorMessage = "Erro ao fazer login";
      }
      console.error("Erro no login:", state.errorMessage);
      throw error;
    }
  }

  async function registerUser(name: string, email: string, password: string) {
    try {
      await AuthService.registerUser(name, email, password);
    } catch (error: unknown) {
      let errorMsg = "Erro no registro";
      if (error instanceof Error) {
        errorMsg = error.message;
      }
      console.error("Erro no registro:", errorMsg);
      throw error;
    }
  }

  async function logoutUser() {
    try {
      // await AuthService.logoutUser();
      state.token = null;
      localStorage.removeItem("authToken");
      router.push("/");
      state.errorMessage = "";
    } catch (error: unknown) {
      if (error instanceof Error) {
        state.errorMessage = error.message;
      } else {
        state.errorMessage = "Erro ao fazer logout";
      }
      console.error("Erro no logout:", state.errorMessage);
      throw error;
    }
  }

  return {
    token,
    errorMessage,
    loginUser,
    registerUser,
    logoutUser
  };
});
