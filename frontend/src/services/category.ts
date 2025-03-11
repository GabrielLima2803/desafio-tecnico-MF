import axios from "axios";

class CategoryService {
  async createCategory(name: string) {
    const response = await axios.post("/api/categories", {
      name,
    });
    return response.data;
  }

  async getCategories() {
    const response = await axios.get("/api/categories");
    return response.data;
  }

  async deleteCategory(id: number) {
    const response = await  axios.delete(`/api/categories/${id}`);
    return response.data
  }
}

export default new CategoryService();
