///
/// Constant variables
///
const API_URL = "https://www.googleapis.com/youtube/v3/";
const API_KEY = "AIzaSyBaansERBkmaI0dpTtEfHt3X-_pMoea8Mc";

///
/// Utility functions
///

/**
 * Create api url with my api key
 *
 * @endpoint YT api endpoint
 */
const apiUrlOf = (endpoint) => API_URL + endpoint + "?key=" + API_KEY;

/**
 * Build url for endpoints
 *
 * @endpoint YT api endpoint
 * @params YT api url parameters
 */
const buildUrlFor = (endpoint, params) => {
  let url = apiUrlOf(endpoint);

  Object.entries(params).forEach(([key, value]) => (url += `&${key}=${value}`));

  return url;
};

///
/// API core functionality
///

/**
 * Fetch playlist metadata
 *
 * @id playlist id
 */
export const fetchListData = async (id) => {
  const url = buildUrlFor("playlists", {
    id: id,
    part: "snippet,status,contentDetails",
    fields: `
      items(
        id,
        snippet(
          title,
          description,
          publishedAt,
          channelId,
          channelTitle
        ),
        status,
        contentDetails
      )`.replace(/\s+/g, ""),
  });

  return fetch(url).then((rsp) => rsp.json());
};

/**
 * Fetch playlist videos
 *
 * @id playlist id
 * @token page token
 */
export const fetchListItems = (id, token = "") => {
  const url = buildUrlFor("playlistItems", {
    playlistId: id,
    pageToken: token,
    maxResults: 50,
    part: "snippet,status",
    fields: `
      nextPageToken,
      items(
        id,
        snippet(
          publishedAt,
          position,
          resourceId(
            videoId
          )
        ),
        status
      ),
      pageInfo`.replace(/\s+/g, ""),
  });

  return fetch(url).then((rsp) => rsp.json());
};

/**
 * Fetch list of videos data by video id
 *
 * @ids list of videos ids
 */
export const fetchVideoData = (ids) => {
  const url = buildUrlFor("videos", {
    id: ids.slice(0, 50),
    part: "snippet,contentDetails,statistics",
    fields: `
      nextPageToken,
      items(
        id,
        snippet(
          publishedAt,
          channelId,
          title,
          description,
          thumbnails(
            high(
              url
            )
          ),
          channelTitle,
          liveBroadcastContent,
          defaultAudioLanguage
        ),
        contentDetails(
          duration,
          definition,
          caption
        ),
        statistics(
          viewCount,
          likeCount,
          commentCount
        )
      ),
      pageInfo`.replace(/\s+/g, ""),
  });

  console.log(url, new URL(url).searchParams);

  return fetch(url).then((rsp) => rsp.json());
};
