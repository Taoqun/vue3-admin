<template>
  <RouterView />
</template>

<script setup>
import { RouterView, useRouter } from "vue-router";
import { useUserInfo } from "@/stores/user";
import { onBeforeMount } from "vue";

const { getUserInfo } = useUserInfo();
const router = useRouter();

onBeforeMount(() => {
  init();
});

async function init() {
  const res = await getUserInfo();
}
</script>

<style scoped></style>
