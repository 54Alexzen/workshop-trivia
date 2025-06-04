interface Artist {
  id: number;
  name: string;
  picture_medium: string;
}

export interface Song {
  id: number;
  title: string;
  preview: string;
  artist: Artist;
}

export interface Playlist {
  id: number;
  title: string;
  picture_medium: string;
  tracklist: string;
}

export interface PlaylistWithOutTracks {
  id: number;
  title: string;
  picture_medium: string;
  totalSongs?: number;
}

export interface PlaylistWithTracks extends Playlist {
  tracks: Song[];
}
