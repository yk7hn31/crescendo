import { useReducer, useEffect } from 'react';

import { Favorites, FavoritesAction } from '@/definitions/types';

const initialState: Favorites = { song: {}, album: {}, artist: {} };

function favoritesReducer(state: Favorites, action: FavoritesAction): Favorites {
  if (action.type === 'ADD') {
    return { ...state,
      [action.payload.type]: {
        ...state[action.payload.type], [action.payload.id]: action.payload
      }
    };
  } else if (action.type === 'REMOVE') {
    const type = action.payload[0] == 'a' ? 'artist'
    : action.payload[0] == 'c' ? 'album' : 'song';
    const newState = { ...state, [type]: { ...state[type] } };
    delete newState[type][action.payload];
    return newState;
  } else {
    throw new Error('Invalid type for favoritesDispatch');
  }
}

function useFavorites() {
  const [favorites, favoritesDispatch] = useReducer(favoritesReducer, initialState, (init) => {
    const item = localStorage.getItem('favorites');
    return item ? JSON.parse(item) : init;
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return { favorites, favoritesDispatch };
}

export default useFavorites;