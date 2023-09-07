import { ref } from "vue";
import { defineStore } from "pinia";

export const useTabs = defineStore("tabs", () => {
  // 添加的 tab 页面
  const tabs = ref([
    {
      name: "交互操作",
      url: "/vue-admin/pages/options",
    },
    {
      name: "用户列表",
      url: "/vue-admin/pages/userTable",
    },
    {
      name: "闲蝉",
      url: "http://freecicoda.com",
    },
    {
      name: "陶群",
      url: "http://taoquns.com",
    },
  ]);
  // 当前tab索引
  const tabsIndex = ref(0);

  // 添加
  async function addTab(tab = { name: "", url: "" }) {
    const index = tabs.value.findIndex((item) => {
      return item.url === tab.url;
    });

    if (index === -1) {
      tabs.value.push({
        name: tab.name,
        url: tab.url,
      });
      tabsIndex.value = tabs.value.length - 1;
    } else {
      tabsIndex.value = index;
    }
  }

  // 移除
  async function removeTab(tab = { name: "", url: "" }) {
    const list = [...tabs.value];

    const index = list.findIndex((item) => {
      return item.url === tab.url;
    });
    if (index > -1) {
      list.splice(index, 1);
      tabs.value = list;
      const current = list.length - 1;
      console.log("list--->", list.length, current);
      tabsIndex.value = current;
    }
  }

  return { tabs, tabsIndex, addTab, removeTab };
});
