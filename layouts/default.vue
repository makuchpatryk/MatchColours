<template>
  <div class="main-layout">
    <main class="main-container">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.main-layout {
  padding: 20px;
  box-sizing: border-box;
  background-color: var(--bg-color);
}
.main-container {
  display: block;
  width: 1000px;
  padding: 20px;
  margin: auto;
}
</style>
