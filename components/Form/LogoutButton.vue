<template>
  <Button :loading="loading" @click="onLogout"> Log out </Button>
</template>

<script setup lang="ts">
import Button from "../ui/Button.vue";

const supabase = useSupabaseClient();

const store = useAuthStore();
const loading = ref(false);

const onLogout = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    store.setUser(null);
    store.setAuth(false);
    navigateTo("/login");
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
};
</script>

<style scoped></style>
