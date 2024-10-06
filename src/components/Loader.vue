<template>
  <main class="loader"></main>
</template>

<style scoped>
.loader {
  /*
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate (-50%, -50%);
  */
  margin: 2rem auto;
  border: 10px solid var(--color-primary-soft);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
