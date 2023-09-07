<template>
  <div class="page-login">
    <div class="page-content">
      <LoginCover />
      <LoginForm />
    </div>
  </div>
</template>

<script setup >
import LoginCover from "./components/loginCover/index.vue";
import LoginForm from "./components/loginForm/index.vue";
</script>

<style lang="scss" scoped >
@import "./index.scss";
</style>