<template>
  <div class="com-tabs-bar">
    <div
      v-for="(tab, index) in tabsStore.tabs"
      :key="tab.url"
      :class="{ 'com-tab-item': true, active: tabsStore.tabsIndex === index }"
      @click="changeTab(tab)"
    >
      <div class="com-item-name">{{ tab.name }}</div>
      <div class="com-item-close" @click.stop="closeTab(tab)">
        <el-icon :size="18"><CircleCloseFilled /></el-icon>
      </div>
    </div>
  </div>
</template>
<script setup>
import { CircleCloseFilled } from "@element-plus/icons-vue";
import { onBeforeMount } from "vue";
import { useTabs } from "@/stores/tabs";

const tabsStore = useTabs();

onBeforeMount(() => {
  console.log("onBeforeMount--->", tabsStore.tabsIndex);
});

// 切换tab
function changeTab(item) {
  tabsStore.addTab({
    name: item.name,
    url: item.url,
  });
}

// 删除 tab
function closeTab(item) {
  tabsStore.removeTab(item);
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
