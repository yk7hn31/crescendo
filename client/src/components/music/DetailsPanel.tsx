import React, { type Dispatch, useEffect, useState } from "react";

import useErrorHandler from "@/hooks/useErrorHandler";
import { lookup } from "@/lib/music";

import type { PanelState, PanelAction, ItemDetails, Favorites, FavoritesAction } from "@/definitions/types";

import MobileDetailsPanel from "./detailsPanel/Mobile";
import DesktopDetailsPanel from "./detailsPanel/Desktop";
import { PanelContent, PanelFooter, PanelHeader } from "./detailsPanel/Parts";

interface DetailsPanelProps {
  isMobile: boolean;
  panelState: PanelState;
  panelDispatch: Dispatch<PanelAction>;
  favorites: Favorites;
  favoritesDispatch: Dispatch<FavoritesAction>;
}

const DetailsPanel: React.FC<DetailsPanelProps>
 = ({ isMobile, panelState, panelDispatch, favorites, favoritesDispatch }) => {
  const { isPanelOpen, panelItemId } = panelState;
  const [featured, setFeatured] = useState<ItemDetails[]>([]);
  const errHandler = useErrorHandler();

  const closePanel = () => panelDispatch({
    type: 'SET_PANEL_BOTH',
    payload: { isPanelOpen: false, panelItemId: '' }
  });
  const Panel = isMobile ? MobileDetailsPanel : DesktopDetailsPanel;
  let header: JSX.Element | undefined;
  let footer: JSX.Element | undefined;
  const props = {
    open: isPanelOpen,
    onClose: closePanel,
    onOpenChange: (isOpen: boolean) => {
      if (!isOpen) closePanel();
    },
    content: (
      <PanelContent
        type={featured[0] && featured[0].type}
        className={isMobile ? 'max-h-[55vh] mx-3' : 'max-h-96'}
        panelDispatch={panelDispatch}
      >{featured}</PanelContent>
    )
  };

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isPanelOpen && panelItemId) {
      setFeatured([]);
      lookup(panelItemId, panelItemId[0] === 'a' ? 10 : undefined)
      .then(setFeatured)
      .catch(errHandler);
    }
    if (!isPanelOpen) timeout = setTimeout(() => setFeatured([]), 100);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPanelOpen, panelItemId]);

  if (featured.length > 0) {
    const panelItem: ItemDetails = featured[0];
    const isFavorite = panelItemId in favorites[panelItem.type];
    header = <PanelHeader {...panelItem} />;
    footer = (
      <PanelFooter
        isFavorite={isFavorite}
        onClick={isFavorite ? () => favoritesDispatch({ type: 'REMOVE', payload: panelItemId })
        : () => favoritesDispatch({ type: 'ADD', payload: panelItem })
        }
      />
    );
  }

  return <Panel header={header} footer={footer} {...props} />;
}

export default DetailsPanel;