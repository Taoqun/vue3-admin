<template>
  <div class="com-side-bar">
    <div
      v-for="item in list"
      :key="item.url"
      :class="{ 'com-side-item': true, active: currentUrl === item.url }"
      @click="toItem(item)"
    >
      <el-icon><ArrowRight /></el-icon>
      <span>
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { ArrowRight } from "@element-plus/icons-vue";
import { useTabs } from "@/stores/tabs";

const tabsStore = useTabs();

const list = ref([
  {
    name: "管理员列表",
    url: "/vue-admin/pages/adminTable",
  },
  {
    name: "用户列表",
    url: "/vue-admin/pages/userTable",
  },
  {
    name: "操作",
    url: "/vue-admin/pages/options",
  },
]);

const currentUrl = computed(() => {
  const result = tabsStore.tabs[tabsStore.tabsIndex];
  return result?.url;
});

async function toItem(item) {
  tabsStore.addTab(item);
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
