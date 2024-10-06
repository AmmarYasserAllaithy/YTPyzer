<script setup>
import SpeedDuration from "./SpeedDuration.vue";
import { ref } from "vue";

const props = defineProps({
  info: {
    type: Object,
    required: true,
  },
});

const trimmedDesc = ref(true);
const ytHost = "https://youtube.com";

const listHRef = `${ytHost}/playlist?list=${props.info.id}`;

const channelHRef = `${ytHost}/channel/${props.info.snippet.channelId}`;
</script>

<template>
  <main>
    <h2 class="part flex" dir="auto">
      <a :href="`${ytHost}/playlist?list=${info.id}`" target="blank" :aria-label="info.snippet.title">
        {{ info.snippet.title }}
      </a>
    </h2>

    <section class="part">
      <p class="flex" dir="auto">
        <a :href="`${ytHost}/channel/${info.snippet.channelId}`" target="blank">
          {{ info.snippet.channelTitle }}
        </a>
      </p>

      <br>

      <p>
        {{ info.contentDetails.itemCount }} videos • <span class="dim">Published at</span>
        {{ new Date(info.snippet.publishedAt).toDateString().substr(4) }}
      </p>
    </section>

    <p class="dim part desc" :class="{ 'max-lines n3': trimmedDesc }" @click="trimmedDesc = !trimmedDesc">
      {{ info.snippet.description }}
    </p>

    <section class="part duration">
      <h3 class="cap">Speeds durations</h3>

      <article class="speeds">
        <SpeedDuration speed="1.00" :seconds="info.totalDuration" class="spdu" />
        <SpeedDuration speed="1.25" :seconds="info.totalDuration" class="spdu" />
        <SpeedDuration speed="1.50" :seconds="info.totalDuration" class="spdu" />
        <SpeedDuration speed="1.75" :seconds="info.totalDuration" class="spdu" />
        <SpeedDuration speed="2.00" :seconds="info.totalDuration" class="spdu" />
        <SpeedDuration speed="2.25" :seconds="info.totalDuration" class="spdu" />
        <SpeedDuration speed="2.50" :seconds="info.totalDuration" class="spdu" />
        <SpeedDuration speed="2.75" :seconds="info.totalDuration" class="spdu" />
      </article>
    </section>

    <section class="part videos">
      <h3 class="cap">Statistics</h3>

      <SpeedDuration label="Average video duration" :seconds="info.totalDuration"
        :speed="info.contentDetails.itemCount" />

      <p v-if="info.privateCount">
        <span class="dim">Private:</span>
        {{ info.privateCount }}
      </p>

      <p v-if="info.deletedCount">
        <span class="dim">Deleted:</span>
        {{ info.deletedCount }}
      </p>
    </section>
  </main>
</template>

<style scoped>
.desc {
  cursor: pointer;
}

.duration,
.videos {
  line-height: 1.5rem;
}

.spdu {
  margin: 0.35rem auto;
}

@media screen and (min-width: 968px) {
  .duration .speeds {
    display: flex;
    flex-wrap: wrap;
    place-items: center;
    place-content: start;
  }

  .spdu {
    flex-grow: 1;
    flex-basis: 45%;
  }
}
</style>
