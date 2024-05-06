<template>
  <button :class="classes" v-bind="$attrs">
    <Preloader v-if="loading" />
    <span class="button__content">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import type { TButtonVariants, TButtonColors, TButtonSizes } from "@/types";

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
  border-radius: var(--border-radius-main);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
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
  margin: 8px 0;

  color: #ccc;
}

.button--ghost {
  background: var(--white);
  color: var(--background);
}
.button--ghost:hover {
  background-color: color-mix(in srgb, var(--white), #000 15%);
}
.button--outline {
  background: none;
  border: 1px solid var(--background);
  color: var(--background);
}

.button--outline:hover {
  background: none;
  border: 1px solid color-mix(in srgb, var(--white), #000 15%);
  color: color-mix(in srgb, var(--white), #000 15%);
}

.button--block {
  width: 100%;
  display: block;
}
.button__content {
  padding: 4px 0;
}
</style>
