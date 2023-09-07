<template>
  <div class="com-head">
    <div class="com-head-title">
      <el-icon :size="20" color="var(--el-color-primary)"><Platform /></el-icon>
      <span class="com-title-text"> 管理后台 </span>
    </div>
    <div class="com-head-tools">
      <div class="com-tools-item">
        <el-icon :size="16" color="#999"><UserFilled /></el-icon>
        <span class="com-tools-name">
          {{ userInfo.name }}
        </span>
      </div>
      <div class="com-tools-item" @click="logoutTap">
        <el-icon :size="20"><SwitchButton /></el-icon>
        <span class="com-tools-name"> 退出 </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { SwitchButton, UserFilled, Platform } from "@element-plus/icons-vue";
import { useUserInfo } from "@/stores/user";
import { useRouter } from "vue-router";

const { userInfo, logout } = useUserInfo();
const router = useRouter();

async function logoutTap() {
  await logout();
  router.replace({
    path: "/login",
    query: {
      _t: Date.now(),
    },
  });
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
