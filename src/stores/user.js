import { ref } from "vue";
import { defineStore } from "pinia";
import UserApi from "@/api/user";

export const useUserInfo = defineStore("userInfo", () => {
  const userInfo = ref({ id: 0, name: "" });

  async function getUserInfo() {
    const res = await UserApi.getUserInfo();

    if (res.status === 0) {
      return { id: 0 };
    }
    userInfo.value = res.data;
    return res.data;
  }

  async function logout() {
    userInfo.value = { id: 0, name: "" };
    await UserApi.logout();
    return userInfo.value;
  }

  return { userInfo, getUserInfo, logout };
});
