// export.store.ts
import { defineStore } from "pinia";
import ExportService from "../services/export";

export const useExportStore = defineStore('export', () => {
  async function downloadPdf() {
    try {
      const response = await ExportService.getPdf();

      const url = window.URL.createObjectURL(new Blob([response.data], {
        type: "application/pdf"
      }));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "transacoes.pdf");
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao baixar PDF:", error);
      throw error;
    }
  }

  async function downloadExcel() {
    try {
      const response = await ExportService.getExcel();

      const url = window.URL.createObjectURL(new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "transacoes.xlsx");
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao baixar Excel:", error);
      throw error;
    }
  }

  return {
    downloadPdf,
    downloadExcel
  };
});