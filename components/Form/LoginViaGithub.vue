<template>
  <Button block :loading="loading" @click="onSubmit">Login via Github</Button>
</template>

<script setup lang="ts">
import useSignSupabase from "~/composables/useSignSupabase";
const config = useRuntimeConfig();

const { loading, onSubmit } = useSignSupabase({
  provider: "github",
  options: {
    redirectTo: config.public.loginRedirect || "http://localhost:3000/confirm",
  },
});
</script>

<style scoped></style>
