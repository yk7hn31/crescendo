import { useContext, Dispatch } from "react";
import type { SParamAction, SParamState } from "@/definitions/types";
import { SParamStateCtx, SParamDispatchCtx } from "@/store/SParam";

function useSParamState(): SParamState {
  const context = useContext(SParamStateCtx);

  if (!context) {
    throw new Error('useSParamState must be used within a SParamProvider');
  }

  return context;
}

function useSParamDispatch(): Dispatch<SParamAction> {
  const context = useContext(SParamDispatchCtx);

  if (!context) {
    throw new Error('useSParamDispatch must be used within a SParamProvider');
  }

  return context;
}

export { useSParamState, useSParamDispatch };