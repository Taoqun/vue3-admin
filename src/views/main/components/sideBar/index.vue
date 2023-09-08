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
import { ref, onBeforeMount, watch } from "vue";
import { ArrowRight } from "@element-plus/icons-vue";
import { useTabs } from "@/stores/tabs";
import { useRouter, useRoute } from "vue-router";

const tabsStore = useTabs();
const router = useRouter();
const route = useRoute();
const list = ref([
  {
    name: "管理员列表",
    url: "/main/adminTable",
  },
  {
    name: "用户列表",
    url: "/main/userTable",
  },
  {
    name: "操作",
    url: "/main/options",
  },
]);

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

async function toItem(item) {
  tabsStore.addTab(item);
  tabsStore.toLink(item.url);
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
