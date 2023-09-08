<template>
  <div class="page-main">
    <ComHead />
    <div class="page-content">
      <SideBar />
      <div class="page-view-content">
        <Tabs />
        <div class="page-view">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
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
import { useRouter, useRoute } from "vue-router";
import { onBeforeMount, onBeforeUnmount } from "vue";

const tabStore = useTabs();
const userStore = useUserInfo();
const router = useRouter();
const route = useRoute();

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
  const src = route.query.src || "";
  const url = decodeURIComponent(src);
  const result = tabStore.tabs.find((item) => {
    return item.url === url;
  });
  if (result) {
    tabStore.removeTab(result);
  }
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
