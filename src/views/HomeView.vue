<script setup>
import Form from "../components/Form.vue";
import Loader from "../components/Loader.vue";
import PlaylistInfo from "../components/PlaylistInfo.vue";
import Video from "../components/Video.vue";

import { ref, reactive, watch, onMounted } from "vue";
import { fetchListData, fetchListItems, fetchVideoData } from "../api";
import { sumDurationsAsSeconds } from "@/api/utils.js";

/**
 * Variables
 */
const isLoading = ref(false);
const playlist = reactive({});

const isSliced = ref(false);
const hasPrevious = ref(false);
const hasNext = ref(true);

const shownCount = 50;
const firstId = ref(0);
const lastId = ref(shownCount);

/**
 * re-initiaize variable
 */
const init = () => {
  playlist.info = {};
  playlist.items = [];
  playlist.videos = [];

  isSliced.value = false;
  hasPrevious.value = false;
  hasNext.value = true;

  firstId.value = 0;
  lastId.value = shownCount;
};

/**
 * Calculate total duration
 */
const calcDuration = () =>
  (playlist.info.totalDuration = sumDurationsAsSeconds(
    playlist.videos.map((video) => video.contentDetails.duration)
  ));

/**
 * Count private and deleted videos
 */
const calcStatus = () => {
  if (playlist.items.length > playlist.videos.length) {
    playlist.info.privateCount = playlist.items.filter(
      (item) => item.status.privacyStatus == "private"
    ).length;

    playlist.info.deletedCount =
      playlist.items.length -
      playlist.videos.length -
      playlist.info.privateCount;
  }
};

/**
 * Merge required item attributes in video
 */
const mergeAttrs = () => {
  for (let video of playlist.videos) {
    let item = playlist.items.find(
      (item) => item.snippet.resourceId.videoId == video.id
    );

    if (item)
      Object.assign(video.snippet, {
        addedAt: item.snippet.publishedAt,
        position: item.snippet.position,
      });
  }
};

/**
 * Get playlist data
 */
const getPlaylistData = async (id) => {
  const data = await fetchListData(id);

  playlist.info = data.items[0];
};

/**
 * Get video data
 */
const getVideoData = async (ids) => {
  const data = await fetchVideoData(ids);

  playlist.videos = playlist.videos.concat(data.items);
};

/**
 * Get playlist items
 */
const getPlaylistItems = async (id) => {
  let token = "";

  while (token != undefined) {
    const data = await fetchListItems(id, token);

    token = data.nextPageToken;
    playlist.items = playlist.items.concat(data.items);

    await getVideoData(
      data.items.map((item) => item.snippet.resourceId.videoId)
    );
  }
};

/**
 * Post fetching operations
 */
const onFetching = () => {
  calcDuration();
  calcStatus();
  mergeAttrs();

  let count = playlist.videos.length;

  if (count > shownCount) isSliced.value = true;
  else lastId.value = count;
};

/////////////////
////  UI events
/////////////////

/**
 * Analyze event listener
 */
const analyze = async (playlistId) => {
  init();

  isLoading.value = true;
  playlist.id = playlistId;

  try {
    await getPlaylistData(playlist.id);
    await getPlaylistItems(playlist.id);

    onFetching();
  } catch (err) {
    alert(err.toString());
  }

  isLoading.value = false;
};

/**
 * Previous page event listener
 */
const previousVideos = () => {
  lastId.value = firstId.value;
  firstId.value -= shownCount;
  hasNext.value = true;

  if (firstId.value <= 0) {
    firstId.value = 0;
    hasPrevious.value = false;
  }
};

/**
 * Next page event listener
 */
const nextVideos = () => {
  firstId.value = lastId.value;
  lastId.value += shownCount;
  hasPrevious.value = true;

  let videosCount = playlist.videos.length;

  if (lastId.value >= videosCount) {
    lastId.value = videosCount;
    hasNext.value = false;
  }
};

////////////////////////////////////////
////  pre-fetched data for offline use
////////////////////////////////////////

/*/
import playlistData from "@/api/data.json";
import itemsData from "@/api/items.json";
import videosData from "@/api/videos.json";

try {
  Object.assign(playlist, {
    info: playlistData.items[0],
    items: itemsData.items,
    videos: videosData.items, //.slice(0,45)
  });

  onFetching();
} catch (err) {
  alert(err.toString());
}
/*/
</script>

<template>
  <main>
    <Form @analyze="analyze" />

    <Loader v-if="isLoading" />

    <section v-else-if="playlist.info">
      <PlaylistInfo :info="playlist.info" />

      <section class="flex-sb part">
        <h3 class="cap title">Videos</h3>

        <section v-if="isSliced" class="flex-sb">
          <button class="clr pnbtn" @click="hasPrevious && previousVideos()">
            <i class="fa fa-chevron-left"></i>
          </button>

          <h3 class="dim bold">{{ firstId }} : {{ lastId }}</h3>

          <button class="clr pnbtn" @click="hasNext && nextVideos()">
            <i class="fa fa-chevron-right"></i>
          </button>
        </section>
      </section>

      <section class="flex part videos-wrapper">
        <Video
          v-for="video in playlist.videos.slice(firstId, lastId)"
          :key="video.id"
          :video="video"
          :playlistId="playlist.id"
          class="video"
        />
      </section>

      <section v-if="isSliced" class="flex-sb part">
        <button
          class="clr-btn cap"
          :class="{ freezed: !hasPrevious }"
          @click="hasPrevious && previousVideos()"
        >
          <i class="far fa-hand-point-left"></i>
        </button>

        <h3 class="dim bold">
          {{ firstId }} : {{ lastId }} of {{ playlist.videos.length }}
        </h3>

        <button
          class="clr-btn cap"
          :class="{ freezed: !hasNext }"
          @click="hasNext && nextVideos()"
        >
          <i class="far fa-hand-point-right"></i>
        </button>
      </section>
    </section>
  </main>
</template>

<style scoped>
.pnbtn {
  background: transparent;
}

.freezed {
  background: var(--vt-c-text-dark-2);
}

.videos-wrapper {
  flex-wrap: wrap;
  gap: 1rem;
  place-content: center;
}

.video {
  flex-basis: 300px;
  flex-grow: 1;
}
</style>
