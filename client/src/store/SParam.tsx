import React, { createContext, Dispatch, useReducer } from 'react';
import type { SParamState, SParamAction } from '@/definitions/types';

const sParamReducer = (state: SParamState, action: SParamAction): SParamState => {
  switch (action.type) {
    case 'SET_FORM_ACTIVE':
      return { ...state, isFormActive: action.payload };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_ENTITY_TYPE':
      return { ...state, entityType: action.payload };
    default:
      return state;
  }
}

const initialState: SParamState = {
  isFormActive: false,
  searchTerm: '',
  entityType: 'all'
}

export const SParamStateCtx = createContext<SParamState>(initialState);
export const SParamDispatchCtx = createContext<Dispatch<SParamAction>>(() => {});

export const SParamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(sParamReducer, initialState);

  return (
    <SParamStateCtx.Provider value={state}>
      <SParamDispatchCtx.Provider value={dispatch}>
        {children}
      </SParamDispatchCtx.Provider>
    </SParamStateCtx.Provider>
  )
}