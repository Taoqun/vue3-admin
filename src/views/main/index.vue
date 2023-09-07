<template>
  <div class="page-main">
    <ComHead />
    <div class="page-content">
      <SideBar />
      <div class="page-view-content">
        <Tabs />
        <div class="page-view">
          <iframe width="100%" height="100%" frameborder="0" :src="url" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ComHead from "./components/header/index.vue";
import SideBar from "./components/sideBar/index.vue";
import Tabs from "./components/tabs/index.vue";
import { useTabs } from "@/stores/tabs";
import { useUserInfo } from "@/stores/user";
import { useRouter } from "vue-router";
import { computed, onBeforeMount, onBeforeUnmount } from "vue";

const tabStore = useTabs();
const userStore = useUserInfo();
const router = useRouter();

const url = computed(() => {
  const result = tabStore.tabs[tabStore.tabsIndex];
  return result?.url;
});

onBeforeMount(() => {
  initPostMessage();
});

onBeforeUnmount(() => {
  window.removeEventListener("message", getEvent, false);
});

function initPostMessage() {
  window.addEventListener("message", getEvent, false);
}

function getEvent(event) {
  console.log("event--->", event);
  const data = event.data;
  const type = data?.type;

  if (!type) {
    return;
  }

  switch (type) {
    case "close":
      closeCurrentTab();
      break;
    case "loginOut":
      loginOut();

      break;
  }
}

// 关闭当前 tab
function closeCurrentTab() {
  const result = tabStore.tabs[tabStore.tabsIndex];
  tabStore.removeTab(result);
}

// 退出登陆
async function loginOut() {
  await userStore.logout();
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
