// export.service.ts
import axios from "axios";

class ExportService {
  async getPdf() {
    return await axios.get("/api/export/pdf", {
      responseType: "blob"
    });
  }

  async getExcel() {
    return await axios.get("/api/export/excel", {
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }
    });
  }

  async getCSV() {
    return await axios.get("/api/export/csv", {
      responseType: "blob"
    });
  }
}

export default new ExportService();