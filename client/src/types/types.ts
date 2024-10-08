export type SearchType = 'song' | 'album' | 'artist' | 'all';

export interface ParamsType {
  query: string;
  debouncedQuery: string;
  type: SearchType;
}

export type ItemDetails = SongDetails | AlbumDetails | ArtistDetails;

export interface MediaDetails {
  artistName: string;
  collectionName: string;
  primaryGenreName: string;
  artworkUrl100: string;
}

export interface SongDetails extends MediaDetails {
  wrapperType: 'track';
  trackName: string;
  trackNumber: number;
  trackTimeMillis: number;
  trackExplicitness: string;
  isStreamable: boolean;
  trackId: number;
}

export interface AlbumDetails extends MediaDetails {
  wrapperType: 'collection';
  trackCount: number;
  releaseDate: number;
  collectionId: number;
  collectionExplicitness: string;
}

export interface ArtistDetails {
  wrapperType: 'artist';
  artistName: string;
  primaryGenreName: string;
  artistLinkUrl: string;
  artistId: number;
}