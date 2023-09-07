<template>
  <div>
    <vue-ueditor-wrap
      v-model="msg"
      :config="editorConfig"
      editor-id="com-editor"
    />
  </div>
</template>

<script setup >
import { ref } from "vue";

const msg = ref("");
const editorConfig = ref({
  UEDITOR_HOME_URL: "/UEditor/",
});
</script>

<style>
</style>