import { onMounted } from "vue";
import { useRouter } from "vue-router";

export function useAuthRedirect() {
  const router = useRouter();

  const checkAuth = () => {
    const token = localStorage.getItem("authToken");
    const redirectPath = token ? "/dashbord" : "/";
    router.push(redirectPath);
  };

  onMounted(() => {
    checkAuth();
  });
}