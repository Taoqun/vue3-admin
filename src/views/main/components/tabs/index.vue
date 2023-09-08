<template>
  <div v-if="tabsStore.tabs.length" class="com-tabs-bar">
    <div
      v-for="tab in tabsStore.tabs"
      :key="tab.url"
      :class="{ 'com-tab-item': true, active: currentUrl === tab.url }"
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
import { onBeforeMount, watch, ref } from "vue";
import { useTabs } from "@/stores/tabs";
import { useRouter, useRoute } from "vue-router";

const tabsStore = useTabs();
const router = useRouter();
const route = useRoute();
const currentUrl = ref("");

onBeforeMount(() => {
  init();
});

watch(
  () => route.path,
  () => {
    init();
  }
);

function init() {
  const url = route.query.src;
  currentUrl.value = decodeURIComponent(url);
}

// 切换tab
function changeTab(item) {
  tabsStore.addTab(item);
  tabsStore.toLink(item.url);
}

// 删除 tab
function closeTab(item) {
  tabsStore.removeTab(item);
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
