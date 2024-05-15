<template>
  <div>
    <label v-if="label" for="input">{{ label }}</label>
    <input
      id="input"
      class="input"
      ref="inputRef"
      type="text"
      v-model="value"
      readOnly
      @focus="onFocus"
      @blur="onBlur"
    />
    <Teleport to="body">
      <Transition>
        <div
          v-if="showDropdown"
          class="dropdown"
          ref="dropdownRef"
          :style="
            bounding
              ? {
                  top: `${bounding.y + bounding.height + 10}px`,
                  left: `${bounding.x}px`,
                  width: `${bounding.width}px`,
                }
              : {}
          "
        >
          <div
            class="option"
            v-for="option in options"
            @click="() => onSelectOption(option)"
          >
            {{ option }}
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
interface Props {
  options: string[];
  label?: string;
}
type TBounding = {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
};
const value = defineModel();
const { options, label } = defineProps<Props>();
const showDropdown = ref(false);
const inputRef = ref();
const dropdownRef = ref();
const bounding = ref<TBounding | null>(null);
const emit = defineEmits(["select"]);

watch(inputRef, () => {
  bounding.value = inputRef.value.getBoundingClientRect();
});

const onFocus = () => {
  showDropdown.value = true;
};
const onBlur = () => {
  showDropdown.value = true;
};
const onClickOutside = () => {
  showDropdown.value = false;
};
const onSelectOption = (option: string) => {
  emit("select", option);

  showDropdown.value = false;
};

useClickOutside(inputRef, onClickOutside, dropdownRef);
useResize(() => {
  bounding.value = inputRef.value.getBoundingClientRect();
});
</script>

<style scoped>
label {
  display: block;
  margin-bottom: 5px;
}
.input {
  padding: 10px;
  border-radius: 10px;
  outline: none;
  border: none;
  border: 1px solid rgba(0, 0, 0, 0);
  font-weight: 500;
  width: 100%;
  cursor: pointer;
}
.input:focus {
  border: 1px solid var(--primary);
}
.dropdown {
  background-color: var(--text-color-main);
  padding: 10px 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: var(--border-radius-main);
}
.option {
  padding: 5px 0;
  cursor: pointer;
  font-weight: 500;
}
.option:hover {
  color: rgba(0, 0, 0, 0.7);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
