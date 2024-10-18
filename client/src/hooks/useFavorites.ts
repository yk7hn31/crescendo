import { useContext, useCallback, useEffect, type Dispatch, useMemo } from "react";

import { FavoritesDispatchCtx, FavoritesStateCtx } from "@/store/Favorites";
import { identifyType } from "@/lib/utils";

import { FavoritesState, FavoritesAction, ItemDetails, ItemID, ItemType } from "@/definitions/types";

function useFavoritesState(): FavoritesState {
  const state: FavoritesState = useContext(FavoritesStateCtx);

  if (!state) {
    throw new Error('useFavoritesState must be used within a FavoritesProvider');
  }

  useEffect(() => {
    const details = localStorage.getItem('favoritesDetails');
    if (!details) localStorage.setItem('favoritesDetails',
      JSON.stringify({song: {}, album: {}, artist: {}})
    );
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state));
  }, [state]);

  return state;
}

function useFavoritesDispatch() {
  const dispatch: Dispatch<FavoritesAction> = useContext(FavoritesDispatchCtx);

  if (!dispatch) {
    throw new Error('useFavoritesDispatch must be used within a FavoritesProvider');
  }

  const addFavorite = useCallback((item: ItemDetails) => {
    dispatch({ type: 'FAVORITES_ADD', id: item.id });

    const storedDetails = JSON.parse(localStorage.getItem('favoritesDetails')!);
    storedDetails[item.type][item.id] = item;
    localStorage.setItem('favoritesDetails', JSON.stringify(storedDetails));
  }, [dispatch]);

  const removeFavorite = useCallback((id: ItemID) => {
    dispatch({ type: 'FAVORITES_REMOVE', id });

    const storedDetails = JSON.parse(localStorage.getItem('favoritesDetails')!);
    delete storedDetails[identifyType(id)][id];
    localStorage.setItem('favoritesDetails', JSON.stringify(storedDetails));
  }, [dispatch]);

  const getFavorites = useCallback((type: ItemType): ItemDetails[] => {
    const storedDetails = JSON.parse(localStorage.getItem('favoritesDetails')!);
    return Object.values(storedDetails[type]);
  }, []);

  const dispatchValue = useMemo(() => ({
    addFavorite, removeFavorite, getFavorites
  }), [addFavorite, removeFavorite, getFavorites]);

  return dispatchValue;
}

export { useFavoritesState, useFavoritesDispatch };