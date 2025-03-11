import axios from "axios";

class UserService {
  async getMe(){
    const response = await axios.get("/api/user/me");
    return response.data
  }
}

export default new UserService();