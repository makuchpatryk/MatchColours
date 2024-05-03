<template>
  <ArrowPathIcon :class="classes" />
</template>

<script setup lang="ts">
import { ArrowPathIcon } from "@heroicons/vue/24/solid";
import type { TPreloaderSizes } from "~/types";

export interface Props {
  size?: TPreloaderSizes;
}

const { size } = withDefaults(defineProps<Props>(), {
  size: "regular",
});

const classes = computed(() => ["preloader", `preloader--${size}`]);
</script>

<style scoped>
@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.preloader {
  width: 26px;
  height: 26px;
  padding: 4px;
  -webkit-animation: rotating 1s linear infinite;
  -moz-animation: rotating 1s linear infinite;
  -ms-animation: rotating 1s linear infinite;
  -o-animation: rotating 1s linear infinite;
  animation: rotating 1s linear infinite;
}
</style>
