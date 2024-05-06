<template>
  <div class="signup-form">
    <h1 class="signup-form--heading">Login</h1>
    <FormLoginViaGithub />
    <FormLoginViaGoogle />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.signup-form {
  width: 600px;
  background-color: var(--bg-form-main);
  border-radius: var(--border-radius-main);
  padding: 20px;
  margin: auto;
}
.signup-form--heading {
  text-align: center;
  width: 100%;
  color: var(--text-color-main);
}
</style>
