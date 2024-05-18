<template>
  <Modal v-model="openModel">
    <template #header>
      <h1>Result</h1>
      <p>To start the game you need to select a game level.</p>
    </template>
    <template #body>
      <div class="row" v-for="item in data" :key="item.id">
        <div class="row__user-profile">
          <img
            class="row__user-profile__image"
            :src="item.profiles.avatar_url"
          /><span class="user-profile__title">{{ item.profiles.email }}</span>
        </div>
        <div class="row__finished-time">{{ item.finished_time_sec }}</div>
        <div class="row__tries">{{ item.tries }}</div>
        <div class="row__created-at">{{ getDate(item.created_at) }}</div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "./ui/Modal.vue";

const openModel = defineModel({ default: false });

const supabase = useSupabaseClient();
const data = ref();
const error = ref();
const getDate = (time: string) => {
  const date = new Date(time);
  return date.toLocaleDateString();
};

onMounted(async () => {
  let { data: rankings, error } = await supabase
    .from("rankings")
    .select(
      `tries, id, finished_time_sec, created_at,profiles(email,avatar_url)`
    );
  console.log("rankings", rankings);
  data.value = rankings;
});
</script>

<style scoped>
.row {
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
}
.row__user-profile {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.row__user-profile__image {
  width: 30px;
  height: 30px;
  border-radius: 10px;
}
.row__user-profile__title {
}
.row__finished-time {
  flex-grow: 1;
}
.row__tries {
  flex-grow: 1;
}
.row__created-at {
  flex-grow: 1;
}
</style>
