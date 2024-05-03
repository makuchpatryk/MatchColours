<template>
  <UButton color="gray" block :loading="loading" @click="onSubmit"
    >Login via Github</UButton
  >
</template>

<script setup lang="ts">
import useSignSupabase from "~/composables/useSignSupabase";

const { loading, onSubmit } = useSignSupabase({ provider: "github" });
</script>

<style scoped></style>
