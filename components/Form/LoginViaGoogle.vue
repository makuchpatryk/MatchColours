<template>
  <Button block :loading="loading" @click="onSubmit">Login via Google</Button>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const loading = ref(false);

const onSubmit = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/confirm",
      },
    });
    if (error) throw error;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped></style>
