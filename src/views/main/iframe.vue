<template>
  <iframe width="100%" height="100%" frameborder="0" :src="url" />
</template>
<script setup>
import { useRoute } from "vue-router";
import { ref, onBeforeMount, watch } from "vue";

const route = useRoute();
const url = ref("");

onBeforeMount(() => {
  init();
});

watch(
  () => route.path,
  () => {
    init();
  }
);

function init() {
  const src = route.query.src || "";
  url.value = decodeURIComponent(src);
}
</script>
<style lang="scss" scoped></style>
