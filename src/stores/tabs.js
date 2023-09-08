import { ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useTabs = defineStore("tabs", () => {
  const router = useRouter();

  // 添加的 tab 页面
  const tabs = ref([
    {
      name: "交互操作",
      url: "/main/options",
    },
    {
      name: "用户列表",
      url: "/main/userTable",
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
      if (list.length) {
        toLink(list[0].url);
      } else {
        toLink("/main");
      }
    }
  }

  // 跳转
  function toLink(link) {
    if (/^http/.test(link)) {
      router.replace({
        path: `/main/render/${Date.now()}`,
        query: {
          src: encodeURIComponent(link),
          _t: Date.now(),
        },
      });
    } else if (/^\//.test(link)) {
      router.replace({
        path: link,
        query: {
          src: encodeURIComponent(link),
          _t: Date.now(),
        },
      });
    }
  }

  return { tabs, toLink, addTab, removeTab };
});
