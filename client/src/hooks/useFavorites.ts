import { useContext } from "react";
import { FavoritesDispatchCtx, FavoritesStateCtx } from "@/store/Favorites";
import { FavoritesState } from "@/definitions/types";

function useFavoritesState(): FavoritesState {
  const context = useContext(FavoritesStateCtx);

  if (!context) {
    throw new Error('useFavoritesState must be used within a FavoritesProvider');
  }

  return context;
}

function useFavoritesDispatch() {
  const context = useContext(FavoritesDispatchCtx);

  if (!context) {
    throw new Error('useFavoritesDispatch must be used within a FavoritesProvider');
  }

  return context;
}

export { useFavoritesState, useFavoritesDispatch };