interface SongSearchOptions {
  artist?: string;
  album?: string;
}

interface AlbumSearchOptions {
  artist?: string;
  artworkSize?: number;
}

interface MediaInfo {
  title: string;
  artist: string;
  genre: string;
  explicit: boolean;
}

interface SongInfo extends MediaInfo {
  type: 'song';
  album: string;
  available: boolean;
  trackLength: number;
  trackNumber: number;
}

interface AlbumInfo extends MediaInfo {
  type: 'album';
  trackCount: number;
  releaseDate: Date;
  artwork: string;
}

interface RawMediaInfo {
  artistName: string;
  collectionName: string;
  trackExplicitness: string;
  primaryGenreName: string;
}

interface RawSongInfo extends RawMediaInfo {
  trackName: string;
  trackNumber: number;
  trackTimeMillis: number;
  isStreamable: boolean;
}

interface RawAlbumInfo extends RawMediaInfo {
  trackCount: number;
  releaseDate: number;
  artworkUrl100: string;
}

export type { SongInfo, AlbumInfo, SongSearchOptions, AlbumSearchOptions, RawSongInfo, RawAlbumInfo }