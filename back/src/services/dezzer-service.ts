import { CONFIG } from '../config/environments';
import { Playlist, PlaylistWithTracks, Song } from '../types/dezzer-types';
import { apiService } from '../utils/fetch-service';

export const getPlaylistDezzer = async (): Promise<Playlist[]> => {
  try {
    const response = await apiService.get<{ data: Playlist[] }>(
      `${CONFIG.DEZZER_URL_API_PLAYLIST}`
    );
    const data = response.data || [];

    return data.map((playlist: Playlist) => ({
      id: playlist.id,
      title: playlist.title,
      picture_medium: playlist.picture_medium,
      tracklist: playlist.tracklist,
    }));
  } catch (error) {
    console.error('Error getting data from Deezer:', error);
    throw error;
  }
};

export const getDataDezzer = async (): Promise<PlaylistWithTracks[]> => {
  try {
    const playlists = await getPlaylistDezzer();

    const playlistWithTracks = await Promise.all(
      playlists.map(async (playlist) => {
        try {
          const response = await apiService.get<{ data: Song[] }>(playlist.tracklist);
          const data = response.data || [];

          const tracks = data.map((song: Song) => ({
            id: song.id,
            title: song.title,
            preview: song.preview,
            artist: {
              id: song.artist.id,
              name: song.artist.name,
              picture_medium: song.artist.picture_medium,
            },
          }));

          return {
            ...playlist,
            tracks,
          };
        } catch (error) {
          console.error(`Error getting tracks from playlist ${playlist.id}:`, error);
          return {
            id: playlist.id,
            title: playlist.title,
            picture_medium: playlist.picture_medium,
            tracklist: playlist.tracklist,
            tracks: [],
          };
        }
      })
    );

    return playlistWithTracks;
  } catch (error) {
    console.error('Error getting data from Deezer:', error);
    throw error;
  }
};
