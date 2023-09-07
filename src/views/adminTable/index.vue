<template>
  <div>
    <SearchBar
      :keys="['create']"
      v-model="query"
      @submit="init"
      @create="toCreate"
    />

    <div class="page-user-table">
      <el-table :data="source">
        <el-table-column prop="Avatar" label="头像" width="100">
          <template #default="scope">
            <el-avatar :size="50" :src="scope.row.avatar" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户名" width="150" />
        <el-table-column prop="mobile" label="手机" width="120" />
        <el-table-column prop="county" label="国家" />
        <el-table-column prop="province" label="省份" />
        <el-table-column prop="city" label="城市" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button-group>
              <el-button type="success" @click="DisabledItem(scope.row)">
                {{ scope.row.IsDisable ? "已禁用" : "禁用" }}
              </el-button>
              <el-button type="danger" @click="DelItem(scope.row)">
                删除
              </el-button>
              <el-button type="primary" @click="toDetail(scope.row)">
                详情
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <div class="com-pagination">
        <el-pagination
          :current-page="pageIndex"
          :page-size="20"
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="changePageIndex"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import UserAdmin from "@/api/admin";
import SearchBar from "@/components/searchBar/index.vue";
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";

const router = useRouter();
const source = ref([]);
const pageIndex = ref(1);
const query = ref("");
const total = ref(0);

function toCreate() {
  router.push("/main/adminInfo");
}

function toDetail(item) {
  router.push({
    path: "/main/adminInfo",
    query: {
      id: item.Id,
    },
  });
}

function changePageIndex(val) {
  pageIndex.value = val;
  getData();
}
async function getData() {
  const res = await UserAdmin.getAdminList();
  if (res.status === 0) {
    return;
  }
  source.value = res.data.list;
  total.value = res.data.total;
  pageIndex.value = res.data.pageIndex + 1;
}

// 禁用
async function DisabledItem(item) {
  const res = await ElMessageBox.confirm(
    `确认${item.IsDisable ? "启用" : "禁用"}么。`,
    ""
  ).catch(() => "cancel");

  if (res === "cancel") {
    return;
  }

  let result = {};
  if (item.IsDisable) {
    result = await UserAdmin.enableddUser({
      Id: item.Id,
    });
  } else {
    result = await UserAdmin.disabledUser({
      Id: item.Id,
    });
  }

  if (result.status === 0) {
    ElMessage.error(result.errMsg);
  }

  getData();
}

// 删除
async function DelItem(item) {
  const res = await ElMessageBox.confirm(
    "确认删除么，删除后无法恢复。",
    "删除确认？"
  ).catch(() => "cancel");

  if (res === "cancel") {
    return;
  }

  const result = await UserAdmin.deleteUser({
    Id: item.Id,
  });

  if (result.status === 0) {
    ElMessage.error(result.errMsg);
  }

  getData();
}

function init() {
  pageIndex.value = 1;
  getData();
}

onBeforeMount(() => {
  init();
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
