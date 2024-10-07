export type SearchType = 'song' | 'album' | 'artist' | 'all';

export interface ParamsType {
  query: string;
  debouncedQuery: string;
  type: SearchType;
}

export interface SongSearchOptions {
  artist?: string;
  album?: string;
  artworkSize?: number;
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
  artwork: string;
}

export interface SongInfo extends MediaInfo {
  type: 'song';
  album: string;
  available: boolean;
  trackLength: number;
  trackNumber: number;
  trackId: number;
}

export interface AlbumInfo extends MediaInfo {
  type: 'album';
  trackCount: number;
  releaseDate: Date;
  collectionId: number;
}

export interface ArtistInfo {
  type: 'artist';
  name: string;
  genre: string;
  amLink: string;
  artistId: number;
}

export interface RawMediaInfo {
  artistName: string;
  collectionName: string;
  primaryGenreName: string;
  artworkUrl100: string;
}

export interface RawSongInfo extends RawMediaInfo {
  wrapperType: 'track';
  trackName: string;
  trackNumber: number;
  trackTimeMillis: number;
  trackExplicitness: string;
  isStreamable: boolean;
  trackId: number;
}

export interface RawAlbumInfo extends RawMediaInfo {
  wrapperType: 'collection';
  trackCount: number;
  releaseDate: number;
  collectionId: number;
  collectionExplicitness: string;
}

export interface RawArtistInfo {
  wrapperType: 'artist';
  artistName: string;
  primaryGenreName: string;
  artistLinkUrl: string;
  artistId: number;
}

export type RawInfoArr = RawSongInfo[] | RawAlbumInfo[] | RawArtistInfo[];

export type RawInfoObject = {
  results: RawSongInfo[] | RawAlbumInfo[] | RawArtistInfo[]
}