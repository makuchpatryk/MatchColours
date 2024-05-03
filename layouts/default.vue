<template>
  <div class="main-layout">
    <nav class="navbar">
      <template v-if="isDOMLoaded">
        <Button
          v-if="!isAuthComputed"
          @click="open = !open"
          variants="ghost"
          color="secondary"
          size="regular"
          >Login</Button
        >

        <FormLogoutButton v-else />
        <FormLogin v-model="open" />
      </template>
      <USkeleton v-else class="h-[32px] w-[70px]" />
    </nav>
    <main class="main-container">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import "./global.css";
const user = useSupabaseUser();
const store = useAuthStore();
const isDOMLoaded = ref(false);

const isAuthComputed = computed(() => store.isAuth);

onMounted(() => {
  isDOMLoaded.value = true;
  if (user.value) {
    store.setAuth(true);
    store.setUser(user.value);
  }
});

const open = ref(false);
</script>

<style scoped>
.main-layout {
  padding: 20px;
  box-sizing: border-box;
}
.navbar {
  display: flex;
  gap: 20px;
  justify-content: flex-end;
}
.main-container {
  display: block;
  width: 1000px;
  padding: 20px;
  margin: auto;
}
</style>
