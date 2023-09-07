<template>
  <div class="com-search">
    <div>
      <el-button-group>
        <el-button
          v-if="keys.includes('create')"
          size="default"
          type="primary"
          @click="create"
        >
          新建
        </el-button>
        <el-button
          v-if="keys.includes('export')"
          size="default"
          type="warning"
          @click="getExport"
        >
          导出
        </el-button>
        <el-button
          v-if="keys.includes('back')"
          size="default"
          type="primary"
          @click="back"
        >
          返回
        </el-button>
      </el-button-group>
    </div>
    <div v-if="!keys.includes('hideSearch')" class="com-search-input">
      <el-input
        v-model="search"
        size="default"
        placeholder="请输入"
        :clearable="true"
        @input="changeVal"
      />
      <el-button size="default" type="primary" @click="submit">搜索</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps(["modelValue", "keys"]);
const emit = defineEmits(["update:modelValue", "submit", "create", "export"]);

const router = useRouter();
const search = ref("");
const keys = ref([]);

function back() {
  router.back();
}

function create() {
  emit("create");
}

function changeVal() {
  emit("update:modelValue", search.value);
}

function submit() {
  emit("submit");
}

function getExport() {
  emit("export");
}

function init() {
  search.value = props.modelValue || search.value;
  keys.value = props.keys || [];
}

init();
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
<style lang="scss">
.com-search-input {
  display: flex;
  align-items: center;

  .el-input__wrapper {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  .el-button {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
}
</style>
