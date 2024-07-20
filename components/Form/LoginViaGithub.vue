<template>
  <Button variants="outline" block :loading="loading" @click="onSubmit"
    >Login via Github</Button
  >
</template>

<script setup lang="ts">
import useSignSupabase from "@/composables/useSignSupabase";
import Button from "../ui/Button.vue";
const config = useRuntimeConfig();
console.log("patch");
const { loading, onSubmit } = useSignSupabase({
  provider: "github",
  options: {
    redirectTo: config.public.loginRedirect || "http://localhost:3000/confirm",
  },
});
</script>

<style scoped></style>
