import { createContext, Dispatch, useReducer } from 'react';

import type { PanelAction, PanelState } from '@/definitions/types';

const panelReducer = (state: PanelState, action: PanelAction): PanelState => {
  switch (action.type) {
    case 'OPEN_PANEL':
      return { isPanelOpen: true, panelTarget: action.panelTarget };
    case 'CLOSE_PANEL':
      return { isPanelOpen: false, panelTarget: null };
    default:
      return state;
  }
}

const initialState: PanelState = {
  isPanelOpen: false,
  panelTarget: null
};

export const PanelStateCtx = createContext<PanelState>(initialState);
export const PanelDispatchCtx = createContext<Dispatch<PanelAction>>(() => {});

export const PanelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(panelReducer, initialState);

  return (
    <PanelStateCtx.Provider value={state}>
      <PanelDispatchCtx.Provider value={dispatch}>
        {children}
      </PanelDispatchCtx.Provider>
    </PanelStateCtx.Provider>
  )
}