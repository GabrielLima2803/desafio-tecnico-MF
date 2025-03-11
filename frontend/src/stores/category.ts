import type { CategoryData } from '@/types/category.types'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import CategoryService from '../services/category'

export const useCategoryStore = defineStore('category', () => {
  const state = reactive({
    categories: [] as CategoryData[],
    error: null as string | null,
    loading: false,
  })

  const categories = computed(() => state.categories);

  async function getCategories() {
    try {
      state.loading = true;
      const response = await CategoryService.getCategories();
      state.categories = response.data;
    } catch (error) {
      state.error = 'Erro ao carregar categorias. Tente novamente mais tarde.';
      console.error('Erro ao buscar categorias:', error);
    } finally {
      state.loading = false;
    }
  }

  async function createCategory(name: string) {
    try {
      state.loading = true;
      await CategoryService.createCategory(name);
      await getCategories();
    } catch (error) {
      state.error = 'Erro ao criar categoria. Verifique os dados e tente novamente.';
      console.error('Erro ao criar categoria:', error);
      throw error;
    } finally {
      state.loading = false;
    }
  }

  async function deleteCategory(id: number) {
    try {
      state.loading = true;
      await CategoryService.deleteCategory(id);
      await getCategories();
    } catch (error) {
      state.error = 'Erro ao deletar categoria. Tente novamente mais tarde.';
      console.error('Erro ao deletar categoria:', error);
      throw error;
    } finally {
      state.loading = false;
    }
  }

  return {
    categories,
    getCategories,
    createCategory,
    deleteCategory
  }
})
