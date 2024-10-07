export type SearchType = 'song' | 'album' | 'artist' | 'all';

export interface SongSearchOptions {
  artist?: string;
  album?: string;
}

export interface AlbumSearchOptions {
  artist?: string;
  artworkSize?: number;
}

export interface MediaInfo {
  title: string;
  artist: string;
  genre: string;
  explicit: boolean;
}

export interface SongInfo extends MediaInfo {
  type: 'song';
  album: string;
  available: boolean;
  trackLength: number;
  trackNumber: number;
}

export interface AlbumInfo extends MediaInfo {
  type: 'album';
  trackCount: number;
  releaseDate: Date;
  artwork: string;
}

export interface RawMediaInfo {
  artistName: string;
  collectionName: string;
  trackExplicitness: string;
  primaryGenreName: string;
}

export interface RawSongInfo extends RawMediaInfo {
  trackName: string;
  trackNumber: number;
  trackTimeMillis: number;
  isStreamable: boolean;
}

export interface RawAlbumInfo extends RawMediaInfo {
  trackCount: number;
  releaseDate: number;
  artworkUrl100: string;
}