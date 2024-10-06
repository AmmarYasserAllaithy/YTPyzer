<script setup>
import Header from "./components/Header.vue";
import Home from "./views/HomeView.vue";
import About from "./views/AboutView.vue";

import { ref } from "vue";

const viewHome = ref(true);
</script>

<template>
  <Header @nav="(isHome) => (viewHome = isHome)" />

  <h1 class="center">
    <span class="clr">Y</span>ou<span class="clr">T</span>ube
    <span class="clr">P</span>laylist Anal<span class="clr">yzer</span>
  </h1>

  <Home v-show="viewHome" />
  <About v-show="!viewHome" />
</template>

<style scoped>
h1 {
  margin: 2rem;
}
</style>
