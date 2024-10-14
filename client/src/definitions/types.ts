export type ItemType = 'song' | 'album' | 'artist';
export type SearchEntity = ItemType | 'all';

export interface ItemDetails {
  title: string;
  type: ItemType;
  id: string;
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

export interface Favorites {
  song: { [key: string]: ItemDetails; };
  album: { [key: string]: ItemDetails; };
  artist: { [key: string]: ItemDetails; };
}

export type FavoritesAction =
  | { type: 'ADD', payload: ItemDetails }
  | { type: 'REMOVE', payload: string } // a[xxx] c[xxx] t[xxx]

export type SParamState = {
  isFormActive: boolean;
  searchTerm: string;
  entityType: SearchEntity;
}

export type SParamAction =
  | { type: 'SET_FORM_ACTIVE', payload: boolean }
  | { type: 'SET_SEARCH_TERM', payload: string }
  | { type: 'SET_ENTITY_TYPE', payload: SearchEntity }

export type PanelState = {
  isPanelOpen: boolean;
  panelItemId: string;
}

export type PanelAction =
  | { type: 'SET_PANEL_OPEN', payload: boolean }
  | { type: 'SET_PANEL_ITEM_KEY', payload: string }
  | { type: 'SET_PANEL_BOTH', payload: PanelState }