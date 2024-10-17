import { createContext, useEffect, useReducer } from 'react';

import { identifyType } from '@/lib/utils';

import type { FavoritesAction, FavoritesState, ItemDetails, ItemID, ItemType } from '@/definitions/types';

const favReducer = (state: FavoritesState, action: FavoritesAction): FavoritesState => {
  const type = identifyType(action.id);
  switch (action.type) {
    case 'FAVORITES_ADD':
      return {...state, [type]: [...state[type], action.id]};
    case 'FAVORITES_REMOVE':
      return {
        ...state, [type]: state[type].filter(id => id !== action.id)
      };
    default:
      return state;
  }
}

const initialState: FavoritesState = {
  song: [], album: [], artist: []
};

export const FavoritesStateCtx = createContext<FavoritesState>(initialState);
export const FavoritesDispatchCtx = createContext<{
  addFavorite: (item: ItemDetails) => void;
  removeFavorite: (id: ItemID) => void;
  getFavorites: (type: ItemType) => ItemDetails[];
}>({addFavorite: () => {}, removeFavorite: () => {}, getFavorites: () => []});

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(favReducer, initialState, () => {
    const item = localStorage.getItem('favorites');
    return item ? JSON.parse(item) : initialState;
  });

  useEffect(() => {
    const details = localStorage.getItem('favoritesDetails');
    if (!details) localStorage.setItem('favoritesDetails',
      JSON.stringify({song: {}, album: {}, artist: {}})
    );
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state));
  }, [state]);

  const addFavorite = (item: ItemDetails) => {
    dispatch({ type: 'FAVORITES_ADD', id: item.id });

    const storedDetails = JSON.parse(localStorage.getItem('favoritesDetails')!);
    storedDetails[item.type][item.id] = item;
    localStorage.setItem('favoritesDetails', JSON.stringify(storedDetails));
  }

  const removeFavorite = (id: ItemID) => {
    dispatch({ type: 'FAVORITES_REMOVE', id });

    const storedDetails = JSON.parse(localStorage.getItem('favoritesDetails')!);
    delete storedDetails[identifyType(id)][id];
    localStorage.setItem('favoritesDetails', JSON.stringify(storedDetails));
  }

  const getFavorites = (type: ItemType): ItemDetails[] => {
    const storedDetails = JSON.parse(localStorage.getItem('favoritesDetails')!);
    return Object.values(storedDetails[type]);
  }

  return (
    <FavoritesStateCtx.Provider value={state}>
      <FavoritesDispatchCtx.Provider value={{
        addFavorite, removeFavorite, getFavorites
      }}>
        {children}
      </FavoritesDispatchCtx.Provider>
    </FavoritesStateCtx.Provider>
  )
}