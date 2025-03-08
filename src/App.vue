<script setup>
import Header from "./components/Header.vue";
</script>

<template>
  <Header />

  <h1 class="center">
    <span class="clr">Y</span>ou<span class="clr">T</span>ube
    <span class="clr">P</span>laylists Anal<span class="clr">yzer</span>
  </h1>

  <RouterView />
</template>

<style scoped>
h1 {
  margin: 2rem;
  font-size: 27px;
}
</style>
