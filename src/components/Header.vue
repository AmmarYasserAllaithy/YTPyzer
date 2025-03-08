<template>
  <header class="flex-sb">
    <h1 class="app-title">YTPyzer</h1>

    <nav>
      <RouterLink class="route clr cap" activeClass="active" to="/">Home</RouterLink>
      <RouterLink class="route clr cap" activeClass="active" to="/about">About</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
header {
  padding: 1rem;
  background: var(--color-primary-soft);
}

.route {
  display: inline-block;
  font-size: 13px;
  padding: 0.2rem 0.7rem;
  cursor: pointer;
}

.route.active {
  color: var(--color-text);
  background: var(--color-primary-soft);
}
</style>
