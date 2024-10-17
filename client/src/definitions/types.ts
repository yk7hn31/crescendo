export type SongID = `t${string}`;
export type AlbumID = `c${string}`;
export type ArtistID = `a${string}`;

export type ItemType = 'song' | 'album' | 'artist';
export type ItemID = SongID | AlbumID | ArtistID;
export type SearchEntity = ItemType | 'all';

export interface ItemDetails {
  title: string;
  type: ItemType;
  id: ItemID;
  genre: string;
  data?: Partial<{
    album: string;
    coverImg: string;
    duration: string;
    trackNumber: number;
    artist: string;
    releaseYear: number;
  }>;
}

export interface FavoritesState {
  song: SongID[];
  album: AlbumID[];
  artist: ArtistID[];
}

export type FavoritesAction = {
  type: 'FAVORITES_ADD' | 'FAVORITES_REMOVE', id: ItemID
}

export type SParamState = {
  isFormActive: boolean;
  searchTerm: string;
  entityType: SearchEntity;
}

export type SParamAction =
  | { type: 'SET_FORM_ACTIVE', payload: boolean }
  | { type: 'SET_SEARCH_TERM', payload: string }
  | { type: 'SET_ENTITY_TYPE', payload: SearchEntity }

export type PanelTarget = `lookup_${ItemID}` | `favrts_${ItemType}`;

export interface PanelState {
  isPanelOpen: boolean;
  panelTarget: PanelTarget | null;
}

export type PanelAction =
  | { type: 'OPEN_PANEL', panelTarget: PanelTarget }
  | { type: 'CLOSE_PANEL' }