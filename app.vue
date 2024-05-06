<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "MatchColours",
  meta: [
    { name: "description", content: "Amazing game about matching colours!" },
  ],
});
import "./global.css";
const user = useSupabaseUser();
const store = useAuthStore();

if (user.value) {
  store.setAuth(true);
  store.setUser(user.value);
}
</script>
