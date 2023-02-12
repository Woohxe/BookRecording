<template>
  <div class="main">
        <HeaderNav />
        <LeftNav />
        <router-view></router-view>
  </div>
</template>

<script setup>
import HeaderNav from "@/components/HeaderNav.vue"
import LeftNav from "@/components/LeftNav.vue"
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
