<template>
  <SearchBar :keys="['back', 'hideSearch']" />
  <div class="page-detail">
    <div class="page-defailt-form">
      <el-form
        ref="form"
        :model="model"
        :rules="rules"
        label-width="120px"
        size="default"
      >
        <el-form-item prop="Name" label="姓名">
          <el-input
            v-model="model.Name"
            placeholder="请输入"
            style="width: 200px"
          />
        </el-form-item>

        <el-form-item prop="UserName" label="账号">
          <el-input
            v-model="model.UserName"
            placeholder="请输入"
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item prop="Password" label="密码">
          <el-input
            v-model="model.Password"
            placeholder="请输入"
            style="width: 200px"
          />
        </el-form-item>

        <el-form-item prop="Mobile" label="手机">
          <el-input
            v-model="model.Mobile"
            placeholder="请输入"
            style="width: 200px"
          />
        </el-form-item>

        <el-form-item prop="Email" label="邮箱">
          <el-input
            v-model="model.Email"
            placeholder="请输入"
            style="width: 200px"
          />
        </el-form-item>

        <el-form-item prop="Avatar" label="头像">
          <el-input
            v-model="model.Avatar"
            placeholder="请输入"
            style="width: 200px"
          />
        </el-form-item>

        <el-form-item prop="" label=" ">
          <el-button-group v-if="!route.params.id">
            <el-button type="danger" @click="back" style="width: 150px"
              >取消</el-button
            >
            <el-button type="primary" @click="submit" style="width: 150px"
              >保存</el-button
            >
          </el-button-group>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import UserAdmin from "@/api/admin";
import { useRouter, useRoute } from "vue-router";
import SearchBar from "@/components/searchBar/index.vue";
import { ElMessage } from "element-plus";

const router = useRouter();
const route = useRoute();

const form = ref(null);

const model = ref({
  Name: "",
  UserName: "",
  Password: "",
  Mobile: "",
  Email: "",
  Avatar: "",
});

const rules = ref({
  Name: [{ required: true, message: "请输入", trigger: "change" }],
  UserName: [{ required: true, message: "请输入", trigger: "change" }],
  Password: [{ required: true, message: "请输入", trigger: "change" }],
  Mobile: [{ required: true, message: "请输入", trigger: "change" }],
  Email: [{ required: true, message: "请输入", trigger: "change" }],
});

// 获取 详细
async function getDetail() {
  const res = await UserAdmin.getUserDetail({
    Id: route.query.id,
  });
  if (res.status === 1) {
    model.value = {
      ...res.data,
    };
  }
}

async function submit() {
  if (!form.value) {
    return;
  }

  const res = await form.value.validate().catch(() => false);

  if (!res) {
    return;
  }

  if (route.query.id) {
    update();
  } else {
    create();
  }
}

async function create() {
  const params = {
    ...model.value,
  };

  const res = await UserAdmin.createUserDetail(params);
  if (res.status === 1) {
    ElMessage({
      message: "保存成功",
      type: "success",
    });
    router.back();
  } else {
    ElMessage.error(res.errMsg);
  }
}

async function update() {
  const params = {
    ...model.value,
  };

  const res = await UserAdmin.updateUserDetail(params);
  if (res.status === 1) {
    ElMessage({
      message: "保存成功",
      type: "success",
    });
    router.back();
  } else {
    ElMessage.error(res.errMsg);
  }
}

function back() {
  router.back();
}

function init() {
  if (route.query.id) {
    getDetail();
  }
}

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
@import "info.scss";
</style>
