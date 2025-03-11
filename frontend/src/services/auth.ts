import axios from "axios";

class AuthService {
  async loginUser(email: string, password: string) {
    const response = await axios.post("/api/login", {
      email,
      password,
    });
    return response.data;
  }

  async registerUser(name: string, email: string, password: string) {
    const response = await axios.post("/api/register", {
      name,
      email,
      password,
    });
    return response.data;
  }

  async logoutUser() {
    const response = await axios.post("/api/logout");
    return response.data;
  }
}

export default new AuthService();
