<template>
  <main class="about">
    <p>
      Uses
      <a
        href="https://developers.google.com/youtube/v3/docs/playlists"
        target="blank"
        >YouTube Data API v3</a
      >
      to retrieve and analyze most common data of YouTube playlists and videos
      as listed.
    </p>

    <br />

    <article class="card">
      <h3 class="clr">Playlist</h3>
      <ul>
        <li>Name</li>
        <li>Description</li>
        <li>
          Date
          <ul>
            <li>Published</li>
            <li>Last modified</li>
          </ul>
        </li>
        <li>Channel</li>
        <li>Total duration (with different speeds)</li>
        <li>Videos (count)</li>
      </ul>
    </article>

    <article class="card">
      <h3 class="clr">Video</h3>
      <ul>
        <li>Image</li>
        <li>Name</li>
        <li>Description</li>
        <li>Duration</li>
        <li>Channel</li>
        <li>
          Date
          <ul>
            <li>Published</li>
            <li>Added to playlist</li>
          </ul>
        </li>
        <li>
          Statistics
          <ul>
            <li>Views count</li>
            <li>Likes count</li>
            <li>Comments count</li>
          </ul>
        </li>
        <li>
          Language
          <ul>
            <li>Caption (if exists)</li>
          </ul>
        </li>

        <li>Live status</li>
        <li>Quality Definition</li>
      </ul>
    </article>
  </main>
</template>

<style>
.about {
  margin: 1rem;
}
</style>
