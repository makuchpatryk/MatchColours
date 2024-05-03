<template>
  <UButton color="gray" block class="mt-6" :loading="loading" @click="onSubmit"
    >Login via Google</UButton
  >
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const loading = ref(false);

const onSubmit = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
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
