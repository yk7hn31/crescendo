export type SearchEntity = 'song' | 'album' | 'artist' | 'all';

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

export type SearchState = {
  isFormActive: boolean;
  searchTerm: string;
  entityType: SearchEntity;
}

export type SearchAction =
  | { type: 'SET_FORM_ACTIVE', payload: boolean }
  | { type: 'SET_SEARCH_TERM', payload: string }
  | { type: 'SET_ENTITY_TYPE', payload: SearchEntity }