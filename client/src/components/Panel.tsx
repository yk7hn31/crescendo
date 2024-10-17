import React, { useEffect, useState } from 'react';

import { lookup } from '@/lib/music';
import { identifyType } from '@/lib/utils';
import { usePanelDispatch, usePanelState } from '@/hooks/usePanel';
import { useFavoritesDispatch, useFavoritesState } from '@/hooks/useFavorites';
import useErrorHandler from '@/hooks/useErrorHandler';

import type { ItemDetails, ItemID, ItemType } from '@/definitions/types';

import MobilePanel from './panel/Mobile';
import DesktopPanel from './panel/Desktop';
import { LookupPanelFooter, LookupPanelHeader, FavoritesPanelHeader } from './panel/Parts';
import { LookupPanelBody, FavoritesPanelBody } from './panel/PanelBody';

const Panel: React.FC<{isMobile: boolean}> = ({ isMobile }) => {
  const { isPanelOpen, panelTarget } = usePanelState();
  const { closePanel } = usePanelDispatch();
  const favorites = useFavoritesState();
  const { addFavorite, removeFavorite, getFavorites } = useFavoritesDispatch();
  const errHandler = useErrorHandler();
  const [contentList, setContentList] = useState<ItemDetails[]>([]);

  const panelTargetKey = panelTarget?.slice(7) as ItemID | undefined;
  const panelTargetType = panelTarget?.startsWith('favrts') ? 'favrts' : 'lookup';
  const PanelUIBody = panelTargetType === 'favrts' ? FavoritesPanelBody : LookupPanelBody;
  const PanelUI = isMobile ? MobilePanel : DesktopPanel;
  let panelHeader: JSX.Element | undefined;
  let panelFooter: JSX.Element | undefined;
  const panelUIProps = {
    open: isPanelOpen,
    onClose: closePanel,
    onOpenChange: (isOpen: boolean) => {
      if (!isOpen) closePanel();
    }
  }

  useEffect(() => {
    if (isPanelOpen && panelTargetKey && panelTarget) {
      setContentList([]);
      if (panelTargetType === 'lookup') {
        const type = identifyType(panelTargetKey);
        lookup(panelTargetKey, type === 'artist' ? 10 : undefined)
        .then(setContentList)
        .catch(errHandler);
      } else if (panelTargetType === 'favrts') {
        setContentList(getFavorites(panelTargetKey as ItemType));
      }
    } else if (!isPanelOpen) {
      console.log('closing; 0');
      const timeout = setTimeout(() => {
        setContentList([]);
        console.log('closing; 300');
      }, 300);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPanelOpen, panelTarget, panelTargetKey, panelTargetType]);

  if (contentList.length > 0 && panelTarget && panelTargetKey) {
    if (panelTargetType === 'lookup') {
      const type = identifyType(panelTargetKey);
      const isFavorite = (favorites[type] as ItemID[]).includes(panelTargetKey);
      panelHeader = <LookupPanelHeader {...contentList[0]} />;
      panelFooter = (
        <LookupPanelFooter
          isFavorite={isFavorite}
          onClick={() =>
            isFavorite ? removeFavorite(panelTargetKey) : addFavorite(contentList[0])
          }
        />
      );
    } else if (panelTargetType === 'favrts') {
      panelHeader = <FavoritesPanelHeader />;
    }
  }

  return (
    <PanelUI type={panelTargetType} header={panelHeader} footer={panelFooter} {...panelUIProps}>
      <PanelUIBody
        type={panelTargetKey && identifyType(panelTargetKey)}
        className={isMobile ? 'max-h-[55vh] mx-3' : 'max-h-96'}
      >
        {contentList}
      </PanelUIBody>
    </PanelUI>
  );
}

export default Panel;