import { useCallback, useContext, useMemo, type Dispatch } from "react";
import type { PanelState, PanelTarget, PanelAction } from "@/definitions/types";
import { PanelStateCtx, PanelDispatchCtx } from "@/store/Panel";

function usePanelState(): PanelState {
  const state: PanelState = useContext(PanelStateCtx);

  if (!state) {
    throw new Error('usePanelState must be used within a PanelProvider');
  }

  return state;
}

function usePanelDispatch() {
  const dispatch: Dispatch<PanelAction> = useContext(PanelDispatchCtx);

  if (!dispatch) {
    throw new Error('usePanelDispatch must be used within a PanelProvider');
  }

  const openPanel = useCallback((panelTarget: PanelTarget) => {
    dispatch({ type: 'OPEN_PANEL', panelTarget })
  }, [dispatch]);
  const closePanel = useCallback(() => {
    dispatch({ type: 'CLOSE_PANEL' });
  }, [dispatch]);

  const dispatchValue = useMemo(() => ({
    openPanel, closePanel
  }), [openPanel, closePanel]);

  return dispatchValue;
}

export { usePanelState, usePanelDispatch };