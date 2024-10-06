<script setup>
import { ref } from "vue";

const emit = defineEmits(["analyze"]);

const url = ref("");
const errorMsg = ref("");

const isValidPlaylistId = () => {
  let myURL = new URL(url.value);
  let id = null;

  if (
    myURL.host.endsWith("youtube.com") &&
    myURL.pathname == "/playlist" &&
    (id = myURL.searchParams.get("list"))
  ) {
    errorMsg.value = "";
    return id;
  } else {
    errorMsg.value = "Invalid url";
    return null;
  }
};

const submit = () => {
  let id = isValidPlaylistId();

  if (id) emit("analyze", id);
};
</script>

<template>
  <form class="flex card" @submit.prevent="submit">
    <label for="urlTF" class="cap">Playlist url</label>

    <input
      v-model="url"
      type="url"
      id="urlTF"
      class="urlTF"
      placeholder="youtube.com/playlist?list=PL4cUxeGkcC9hYYGbV60Vq3IXYNfDk8At1"
      required
    />

    <span v-if="errorMsg" class="error">{{ errorMsg }}</span>

    <input type="submit" value="Analyze" class="clr-btn cap btn" />
  </form>
</template>

<style scoped>
form {
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

label {
  color: var(--vt-c-text-light-2);
  color: var(--color-text);
  font-weight: bold;
}

input {
  display: block;
  border-radius: 5pt;
}

.urlTF {
  flex-grow: 1;
  padding: 0.85rem 0.7rem;
  font-size: 16px;
  color: var(--color-text);
  background: var(--color-background);
}

.btn {
  margin: 0.5rem auto auto;
  padding: 0.7rem;
}
</style>
