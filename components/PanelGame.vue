<template>
  <div class="panel-game">
    <div class="panel-game__item" v-for="item in items">
      <component
        :is="item.component"
        v-bind="{ ...props }"
        v-on="{ ...events }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TPanelComponet, TPanelEvents, TPanelProps } from "~/types";

interface Props {
  items: TPanelComponet[];
  props?: TPanelProps;
  events?: TPanelEvents;
}
const { items, props, events } = defineProps<Props>();
</script>

<style scoped>
.panel-game {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  margin-bottom: 20px;
}
.panel-game__item {
  flex: 1 1 0px;
  border-right: 1px solid var(--bg-color-secondary);
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
}
.panel-game__item:last-child {
  border-right: none;
}
</style>
