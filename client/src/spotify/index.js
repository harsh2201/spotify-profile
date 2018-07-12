import axios from 'axios';

const getHashParams = () => {
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

const getAccessToken = () => {
  const params = getHashParams();

  if (params.error) {
    alert('There was an error during authentication');
  }

  if (!params.access_token) {
    return;
  }

  return params.access_token;
};

export const token = getAccessToken();

export const getUser = callback => {
  axios
    .get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      // console.log(response.data);
      callback(response.data);
    })
    .catch(error => console.error(error));
};

export const getTopArtists = callback => {
  axios
    .get('https://api.spotify.com/v1/me/top/artists', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      // console.log(response.data);
      callback(response.data);
    })
    .catch(error => console.error(error));
};

export const getTopTracks = callback => {
  axios
    .get('https://api.spotify.com/v1/me/top/tracks', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      // console.log(response.data);
      callback(response.data);
    })
    .catch(error => console.error(error));
};

export const getPlaylists = callback => {
  axios
    .get('https://api.spotify.com/v1/me/playlists', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      // console.log(response.data);
      callback(response.data);
    })
    .catch(error => console.error(error));
};

export const getRecommendations = (topTracks, callback) => {
  // get IDs of first 3 artists in topTracks
  const seed_artists = topTracks.items
    .slice(0, 3)
    .map(track => track.artists[0].id)
    .join(',');

  // get IDS of 4th and 5th topTracks
  const seed_tracks = topTracks.items
    .slice(3, 5)
    .map(track => track.id)
    .join(',');

  const url = `https://api.spotify.com/v1/recommendations?seed_artists=${seed_artists}&seed_tracks=${seed_tracks}`;

  axios
    .get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      // console.log(response.data);
      callback(response.data);
    })
    .catch(error => console.error(error));
};

export const getPlaylistTracks = (url, callback) => {
  axios
    .get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      // console.log(response.data);
      callback(response.data);
    })
    .catch(error => console.error(error));
};

export const getAudioFeaturesForTracks = (url, callback) => {
  axios
    .get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      // console.log(response.data);
      callback(response.data);
    })
    .catch(error => console.error(error));
};
