<template>
  <router-view />
</template>

<script setup>
import jwt_decode from "jwt-decode";
import { useStore } from "vuex";
import { onMounted } from "vue";
const store = useStore();

// 判断token是否为空
const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

onMounted(() => {
  if (localStorage.bookRecordToken) {
    const decoded = jwt_decode(localStorage.bookRecordToken);
    // token存储到vuex中
    store.dispatch("setAuthenticated", !isEmpty(decoded));
    store.dispatch("setUser", decoded);
  }
});
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
}
</style>
