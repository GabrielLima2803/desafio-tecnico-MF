<template>
  <v-dialog
    :model-value="modelValue"
    persistent
    max-width="600px"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <v-card>
      <v-card-title> Gerenciar Categorias </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item class="d-flex" v-for="category in categoryStore.categories" :key="category.id">
            <v-list-item-content>
              <v-list-item-title>{{ category.name }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                icon="mdi-delete"
                variant="tonal"
                color="error"
                density="comfortable"
                @click="deleteCategory(category.id)"
              >
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="$emit('update:modelValue', false)"> Fechar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, onMounted } from 'vue'
import { useCategoryStore } from '../../../../stores/category'

defineProps({
  modelValue: Boolean,
})
defineEmits(['update:modelValue'])
const categoryStore = useCategoryStore()
async function loadCategories() {
  await categoryStore.getCategories()
}

async function deleteCategory(id: number) {
  try {
    await categoryStore.deleteCategory(id)
    await loadCategories()
  } catch (error) {
    console.error('Erro ao excluir categoria:', error)
  }
}

onMounted(loadCategories)
</script>

<style scoped>
</style>
