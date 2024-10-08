import React, { createContext, Dispatch, useReducer } from 'react';
import type { SearchState, SearchAction } from '@/definitions/types';

const searchReducer = (state: SearchState, action: SearchAction): SearchState => {
  switch (action.type) {
    case 'SET_FORM_ACTIVE':
      return { ...state, isFormActive: action.payload };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_ENTITY_TYPE':
      return { ...state, entityType: action.payload };
    default:
      throw new Error('Unknown action type');
  }
}

const initialState: SearchState = {
  isFormActive: false,
  searchTerm: '',
  entityType: 'all'
}

export const SearchStateContext = createContext<SearchState>(initialState);
export const SearchDispatchContext = createContext<Dispatch<SearchAction>>(() => {});

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  return (
    <SearchStateContext.Provider value={state}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchStateContext.Provider>
  )
}