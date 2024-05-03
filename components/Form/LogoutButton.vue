<template>
  <UButton label="Log out" :loading="loading" @click="onLogout" />
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();

const store = useAuthStore();
const loading = ref(false);

const onLogout = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    else {
      store.setUser(null);
      store.setAuth(false);
    }
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
