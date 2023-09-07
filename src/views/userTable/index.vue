<template>
  <div>
    <SearchBar :keys="[]" v-model="query" @submit="init" />

    <div class="page-user-table">
      <el-table :data="source">
        <el-table-column prop="Avatar" label="头像">
          <template #default="scope">
            <el-avatar :size="50" :src="scope.row.avatar" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户名" width="100" />
        <el-table-column prop="mobile" label="手机" width="120" />
        <el-table-column prop="county" label="国家" width="150" />
        <el-table-column prop="province" label="省份" width="150" />
        <el-table-column prop="city" label="城市" width="150" />
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
import UserApi from "@/api/user";
import SearchBar from "@/components/searchBar/index.vue";
const source = ref([]);
const pageIndex = ref(1);
const query = ref("");
const total = ref(0);

onBeforeMount(() => {
  init();
});

function init() {
  pageIndex.value = 1;
  getData();
}

function changePageIndex(val) {
  pageIndex.value = val;
  getData();
}

// 获取数据
async function getData() {
  const res = await UserApi.getUserList({});

  if (res.status === 0) {
    return;
  }
  source.value = res.data.list;
  total.value = res.data.total;
  pageIndex.value = res.data.pageIndex;
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
