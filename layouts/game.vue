<template>
  <div class="main-layout">
    <Navbar />
    <main class="main-container">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.main-layout {
  padding: 20px;
  background-color: var(--bg-color);
  box-sizing: border-box;
}

.main-container {
  display: block;
  width: 1000px;
  padding: 20px;
  margin: auto;
}
</style>
