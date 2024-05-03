<template>
  <button :class="classes" v-bind="$attrs">
    <Preloader v-if="loading" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import type { TButtonVariants, TButtonColors, TButtonSizes } from "~/types";

export interface Props {
  variants?: TButtonVariants;
  color?: TButtonColors;
  size?: TButtonSizes;
  loading?: boolean;
  block?: boolean;
}

const { variants, color, size, loading, block } = withDefaults(
  defineProps<Props>(),
  {
    variants: "solid",
    color: "primary",
    size: "regular",
    loading: false,
    block: false,
  }
);

const classes = computed(() => [
  "button",
  `button--${variants}`,
  `button--${color}`,
  `button--${size}`,
  block ? `button--block` : "",
]);
</script>

<style scoped>
.button {
  background-color: var(--background);
  padding: 8px 12px;
  margin: 8px 12px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button:hover {
  background-color: color-mix(in srgb, var(--background), #000 15%);
}
.button:focus {
  background-color: color-mix(in srgb, var(--background), #000 15%);
}
.button:active {
  background-color: color-mix(in srgb, var(--background), #000 15%);
}

.button--primary {
  --background: var(--primary);

  color: #ccc;
}

.button--secondary {
  --background: var(--secondary);
  --backgroundHover: var(--secondary);

  color: #ccc;
}

.button--block {
  width: 100%;
  display: block;
}
</style>
