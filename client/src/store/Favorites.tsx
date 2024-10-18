import { createContext, useReducer, type Dispatch } from 'react';

import { identifyType } from '@/lib/utils';

import type { FavoritesAction, FavoritesState } from '@/definitions/types';

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
export const FavoritesDispatchCtx = createContext<Dispatch<FavoritesAction>>(() => {});

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(favReducer, initialState, () => {
    const item = localStorage.getItem('favorites');
    return item ? JSON.parse(item) : initialState;
  });

  return (
    <FavoritesStateCtx.Provider value={state}>
      <FavoritesDispatchCtx.Provider value={dispatch}>
        {children}
      </FavoritesDispatchCtx.Provider>
    </FavoritesStateCtx.Provider>
  )
}