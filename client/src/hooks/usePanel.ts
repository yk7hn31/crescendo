import { useContext } from "react";
import type { PanelState, PanelTarget } from "@/definitions/types";
import { PanelStateCtx, PanelDispatchCtx } from "@/store/Panel";

function usePanelState(): PanelState {
  const context = useContext(PanelStateCtx);

  if (!context) {
    throw new Error('usePanelState must be used within a PanelProvider');
  }

  return context;
}

function usePanelDispatch() {
  const context = useContext(PanelDispatchCtx);

  if (!context) {
    throw new Error('usePanelDispatch must be used within a PanelProvider');
  }

  return {
    openPanel: (panelTarget: PanelTarget) =>
      context({ type: 'OPEN_PANEL', panelTarget }),
    closePanel: () =>
      context({ type: 'CLOSE_PANEL' })
  };
}

export { usePanelState, usePanelDispatch };