<template>
  <v-dialog :model-value="modelValue" persistent max-width="500px" @update:model-value="$emit('update:modelValue', $event)">
    <v-card>
      <v-card-title>
        Nova Categoria
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="categoryName" label="Nome da Categoria" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="saveCategory">Salvar</v-btn>
        <v-btn @click="$emit('update:modelValue', false)">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-snackbar v-model="snackbar" color="green" timeout="6000" location="top right" >
    {{ succesMessage }}
  </v-snackbar>

  <v-snackbar v-model="snackbar" color="red" timeout="6000" location="top right" >
    {{ errorMessages }}
  </v-snackbar>
</template>

<script setup lang="ts">
import {defineEmits, ref, defineProps, onMounted } from "vue";
import { useCategoryStore } from "../../../../stores/category";

const categoryStore = useCategoryStore();
const snackbar = ref(false);
const succesMessage = ref("");
const errorMessages = ref("");

defineProps({
  modelValue: Boolean
});


const emit = defineEmits(['update:modelValue']);

const categoryName = ref("");
onMounted(() => {
  categoryName.value = "";
  snackbar.value = false;
})

async function saveCategory() {
  try {
    await categoryStore.createCategory(categoryName.value);
  succesMessage.value = "Categoria criada com sucesso!";
  snackbar.value = true;
  categoryName.value = "";
  emit('update:modelValue', false);
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    errorMessages.value = "Erro ao criar categoria";
    snackbar.value = true;
  }

}
</script>
