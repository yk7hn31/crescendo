import { useContext, Dispatch } from "react";
import type { SearchAction, SearchState } from "@/definitions/types";
import { SearchDispatchContext, SearchStateContext } from "@/store/Search";

function useSearchState(): SearchState {
  const context = useContext(SearchStateContext);

  if (!context) {
    throw new Error('useSearchState must be used within a SearchProvider');
  }

  return context;
}

function useSearchDispatch(): Dispatch<SearchAction> {
  const context = useContext(SearchDispatchContext);

  if (!context) {
    throw new Error('useSearchDispatch must be used within a SearchProvider');
  }

  return context;
}

export { useSearchState, useSearchDispatch };