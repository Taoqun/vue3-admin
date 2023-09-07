<template>
  <div class="page-options">
    <el-button type="primary" @click="sendClose">关闭当前tab</el-button>
    <el-button type="primary" @click="sendLoginOut">退出登陆</el-button>
  </div>
</template>
<script setup>
// 发送消息
function sendClose() {
  window.top.postMessage(
    {
      type: "close",
    },
    "*"
  );
}
function sendLoginOut() {
  window.top.postMessage(
    {
      type: "loginOut",
    },
    "*"
  );
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
