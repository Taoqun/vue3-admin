<template>
  <div class="page-login-form">
    <img class="page-bg-img" :src="LoginBg" />
    <div class="page-login-head">管理后台</div>
    <el-form
      ref="formRef"
      class="page-form"
      :model="model"
      :rules="rules"
      size="default"
      label-width="70px"
    >
      <el-form-item prop="account" label="账号">
        <el-input
          v-model="model.account"
          placeholder="请输入"
          style="width: 250px"
        />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input
          v-model="model.password"
          type="password"
          placeholder="请输入"
          style="width: 250px"
        />
      </el-form-item>
      <!-- <el-form-item prop="code" label="验证码">
        <div>
          <el-input
            v-model="model.code"
            placeholder="请输入"
            style="width: 140px"
          />
          <img class="page-login-code" :src="codeImage" @click="getCodeImage" />
        </div>
      </el-form-item> -->
      <el-form-item label=" ">
        <el-button
          :loading="loading"
          type="primary"
          @click="submitValidate"
          style="width: 250px"
        >
          登陆
        </el-button>
      </el-form-item>
    </el-form>

    <div style="height: 100px"></div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import LoginBg from "@/assets/login_bg.svg";
import UserApi from "@/api/user";
import { useUserInfo } from "@/stores/user";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const { getUserInfo } = useUserInfo();
const router = useRouter();

const formRef = ref();
const model = ref({
  account: "",
  password: "",
  code: "",
});

const rules = ref({
  account: [
    {
      required: true,
      message: "请输入账号",
      trigger: "change",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "change",
    },
  ],
});

const codeImage = ref("");

const loading = ref(false);

onBeforeMount(() => {
  init();
});

function init() {
  getCodeImage();
}

async function getCodeImage() {
  const res = await UserApi.validateCode();
  console.log("res-->", res);
  codeImage.value = res.data;
}

async function submitValidate() {
  if (formRef.value) {
    formRef.value.validate((valid) => {
      if (valid) {
        submit();
      }
    });
  }
}

async function submit() {
  loading.value = true;
  const params = {
    UserName: model.value.account,
    Password: model.value.password,
  };
  const res = await UserApi.login(params);
  loading.value = false;
  if (!res.status) {
    ElMessage.error(res.message);
    return;
  }
  router.replace({
    path: "/main",
    query: {
      t: Date.now(),
    },
  });

  getUserInfo();
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
