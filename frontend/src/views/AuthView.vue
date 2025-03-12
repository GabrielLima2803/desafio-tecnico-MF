<script setup lang="ts">
import { DefaultLoginRegister } from '../components';
import {useAuthRedirect} from '../composables/useAuthRedirect';
useAuthRedirect();
</script>

<template>
  <DefaultLoginRegister />
</template>
