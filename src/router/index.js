import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory("/vue-admin"),
  routes: [
    {
      path: "/main",
      name: "main",
      component: () => import("@/views/main/index.vue"),
    },
    {
      path: "/main/*",
      name: "mainNromal",
      component: () => import("@/views/main/index.vue"),
    },
    {
      path: "/pages/userTable",
      component: () => import("@/views/userTable/index.vue"),
    },
    {
      path: "/pages/adminTable",
      component: () => import("@/views/adminTable/index.vue"),
    },
    {
      path: "/pages/adminInfo",
      component: () => import("@/views/adminTable/info.vue"),
    },
    {
      path: "/pages/options",
      component: () => import("@/views/options/index.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/index.vue"),
    },
    {
      path: "",
      name: "normal",
      component: () => import("@/views/login/index.vue"),
    },
  ],
});

export default router;
