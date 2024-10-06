<script setup>
import { ref } from "vue";

const EVENT_NAV = "nav";

const emit = defineEmits(EVENT_NAV);
const isHome = ref(true);

const nav = (view) => emit(EVENT_NAV, (isHome.value = view == "home"));
</script>

<template>
  <header class="flex-sb">
    <h1 class="app-title">YTPyzer</h1>

    <nav>
      <span class="clr cap" :class="{ active: isHome }" @click="nav('home')">
        Home
      </span>

      <span class="clr cap" :class="{ active: !isHome }" @click="nav('about')">
        About
      </span>
    </nav>
  </header>
</template>

<style scoped>
header {
  padding: 1rem;
  background: var(--color-primary-soft);
}

span {
  display: inline-block;
  font-size: 13px;
  padding: 0.2rem 0.7rem;
}

span.active {
  color: var(--color-text);
}
</style>
