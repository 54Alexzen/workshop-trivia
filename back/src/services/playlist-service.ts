import { db } from '../config/firebase';
import { PlaylistWithOutTracks } from '../types/dezzer-types';
import { getDataDezzer } from './dezzer-service';

export const addPlaylistsToFirebase = async (): Promise<void> => {
  try {
    const playlists = await getDataDezzer();
    const batch = db.batch();

    playlists.forEach((playlist) => {
      const playlistRef = db.collection('playlists').doc(playlist.id.toString());

      batch.set(playlistRef, {
        id: playlist.id,
        title: playlist.title,
        picture_medium: playlist.picture_medium,
        tracklist: playlist.tracklist,
        totalSongs: playlist.tracks.length,
      });

      playlist.tracks.forEach((track) => {
        const trackRef = playlistRef.collection('tracks').doc(track.id.toString());
        batch.set(trackRef, track);
      });
    });

    await batch.commit();
    console.log(`Added ${playlists.length} playlists to Firestore with their songs`);
  } catch (error) {
    console.error('Error adding playlists to Firebase:', error);
    throw new Error(`Error adding playlists to Firebase: ${error}`);
  }
};

export const getPlaylistsFromFirebase = async (): Promise<PlaylistWithOutTracks[]> => {
  try {
    const playlistsRef = db.collection('playlists');
    const playlistsSanapshot = await playlistsRef.get();

    const playlists: PlaylistWithOutTracks[] = [];

    for (const doc of playlistsSanapshot.docs) {
      const playlistData = doc.data();

      playlists.push({
        id: playlistData.id,
        title: playlistData.title,
        picture_medium: playlistData.picture_medium,
        totalSongs: playlistData.songCount,
      });
    }
    return playlists;
  } catch (error) {
    console.error('Error getting playlists from Firebase:', error);
    throw new Error(`Error getting playlists from Firebase: ${error}`);
  }
};
