<script setup>
import { computed } from "vue";
import { parseVideoDuration } from "@/api/utils.js";

const props = defineProps({
  video: {
    type: Object,
    required: true,
  },

  playlistId: {
    type: String,
    required: true,
  },
});

const videoHref = `https://youtube.com/watch?v=${props.video.id}&list=${props.playlistId}`;

const downloadHref = videoHref.replace(/youtube/, "ss$&");

const channelHref = `https://youtube.com/playlist?list=${props.video.snippet.channelId}`;

const isLive = computed(
  () => props.video.snippet.liveBroadcastContent == "live"
);

const hasCaption = computed(() => props.video.contentDetails.caption == "true");

const parseDate = (date) => new Date(date).toDateString().substr(4);
</script>

<template>
  <main class="video">
    <figure class="preview">
      <img alt="Video thumbnail" :src="video.snippet.thumbnails.high.url" />

      <div class="flex-sb panel top">
        <label class="floating channel">
          <a :href="channelHref" target="blank">
            {{ video.snippet.channelTitle }}
          </a>
        </label>

        <p class="flex deflive">
          <label class="floating definition">
            {{ video.contentDetails.definition.toUpperCase() }}
          </label>

          <span v-if="isLive" class="floating live"></span>
        </p>
      </div>

      <div class="flex-sb panel bottom">
        <p>
          <label class="floating lang">
            {{ video.snippet.defaultAudioLanguage }}
          </label>

          <label v-if="hasCaption" class="floating caption">CC</label>
        </p>

        <label class="floating duration">
          {{ parseVideoDuration(video.contentDetails.duration) }}
        </label>
      </div>

      <main class="flex dnl-wrapper">
        <a :href="downloadHref" target="_blank" class="clr-btn cap">
          <i class="fa fa-download"></i>
          download
        </a>
      </main>
    </figure>

    <h3>
      <a :href="videoHref" target="_blank" :aria-label="video.snippet.title">{{ video.snippet.title }}</a>
    </h3>

    <p class="dim max-lines n1">{{ video.snippet.description }}</p>

    <p>
      <span class="dim"> Published: </span>
      {{ parseDate(video.snippet.publishedAt) }}
      <span class="dim"> • Added: </span>
      {{ parseDate(video.snippet.addedAt) }}
    </p>

    <section class="flex-sb stats">
      <p class="flex p">
        <span class="dim">
          <i class="far fa-thumbs-up"></i>
        </span>
        {{ video.statistics.likeCount }}
      </p>

      <p class="flex p">
        <span class="dim">
          <i class="far fa-comments"></i>
        </span>
        {{ video.statistics.commentCount }}
      </p>

      <p class="flex p">
        <span class="dim">
          <i class="far fa-eye"></i>
        </span>
        {{ video.statistics.viewCount }}
      </p>
    </section>
  </main>
</template>

<style scoped>
.video {
  border-radius: 10pt;
  background: var(--color-primary-soft);
  overflow: hidden;
}

.video > *:not(figure) {
  margin: 0.7rem;
}

.preview {
  width: 100%;
  height: 184px;
  overflow: hidden;
  position: relative;
}

img {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.panel,
.dnl-wrapper {
  position: absolute;
  width: 100%;
  left: 0;
  padding: 0.2rem;
  transition: all 400ms;
}

.preview:hover .panel {
  opacity: 0;
}

.dnl-wrapper {
  place-content: center;
  place-items: center;
  background: var(--vt-c-divider-dark-2);
  height: inherit;
  display: none;
}

.preview:hover .dnl-wrapper {
  display: flex;
}

.dnl-wrapper,
.top {
  top: 0;
}

.bottom {
  bottom: 0;
}

.floating {
  display: inline-block;
  border-radius: 4pt;
  padding: 1pt 4pt;
  margin: 0.35rem;
}

.floating:not(.channel) {
  background: var(--color-background);
  color: var(--color-text);
  opacity: 0.8;
}

.deflive {
  place-items: center;
  gap: 0;
}

.deflive .live {
  width: 20px;
  height: 20px;
  background: red;
  border-radius: 50%;
}

.p {
  flex-grow: 1;
  width: 33%;
  justify-content: center;
}

@media screen and (min-width: 768px) {
  .preview {
    height: 206px;
  }
}
</style>
