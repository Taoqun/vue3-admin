<template>
  <div class="page-login-cover" @click="randomImg">
    <img class="page-login-img" :src="loginCover" />
  </div>
</template>

<script setup >
import { ref } from "vue";
import login1 from "@/assets/secure_login-1.svg";
import login2 from "@/assets/secure_login-2.svg";

const index = ref(1);
const loginCover = ref("");

function randomImg() {
  index.value = index.value === 1 ? 2 : 1;
  loginCover.value = index.value === 1 ? login1 : login2;
}

randomImg();
</script>

<style lang="scss" scope >
@import "./index.scss";
</style>