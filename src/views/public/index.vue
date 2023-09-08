<template>
  <div class="com-not-found">
    <img class="com-not-img" :src="notFound" />
  </div>
</template>
<script setup>
import notFound from "@/assets/img_404.svg";
</script>
<style lang="scss" scoped>
.com-not-found {
  margin: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
.com-not-img {
  width: 500px;
  height: 500px;
}
</style>
