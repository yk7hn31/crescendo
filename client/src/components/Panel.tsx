import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { lookup } from '@/lib/music';
import { identifyType } from '@/lib/utils';
import { usePanelDispatch, usePanelState } from '@/hooks/usePanel';
import { useFavoritesDispatch, useFavoritesState } from '@/hooks/useFavorites';
import useErrorHandler from '@/hooks/useErrorHandler';

import type { ItemDetails, ItemID, ItemType, FetchError } from '@/definitions/types';

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

  const [panelTargetKey, panelTargetType] = useMemo(() => [
    panelTarget?.slice(7) as ItemID | undefined,
    panelTarget?.startsWith('favrts') ? 'favrts' : 'lookup'
  ] as const, [panelTarget]);

  const PanelUIBody = panelTargetType === 'favrts' ? FavoritesPanelBody : LookupPanelBody;
  const PanelUI = isMobile ? MobilePanel : DesktopPanel;
  
  const fetchContent = useCallback(async () => {
    if (!panelTargetKey) return;
    setContentList([]); // TODO: choose if to use this or not
    try {
      if (panelTargetType === 'lookup') {
        const type = identifyType(panelTargetKey);
        const result = await lookup(panelTargetKey, type === 'artist' ? 10 : undefined);
        setContentList(result);
      } else if (panelTargetType === 'favrts') {
        setContentList(getFavorites(panelTargetKey as ItemType));
      }
    } catch (err) {
      errHandler(err as FetchError);
    }
  }, [panelTargetKey, panelTargetType, getFavorites, errHandler]);

  useEffect(() => {
    if (isPanelOpen) {
      fetchContent();
    } else {
      const timeout = setTimeout(() => {
        setContentList([]);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isPanelOpen, fetchContent]);
  
  const panelUIProps = useMemo(() => ({
    open: isPanelOpen,
    onClose: closePanel,
    onOpenChange: (isOpen: boolean) => {
      if (!isOpen) closePanel();
    }
  }), [isPanelOpen, closePanel]);

  const { panelHeader, panelFooter } = useMemo(() => {
    if (contentList.length > 0 && panelTarget && panelTargetKey) {
      if (panelTargetType === 'lookup') {
        const type = identifyType(panelTargetKey);
        const isFavorite = (favorites[type] as ItemID[]).includes(panelTargetKey);
        return {
          panelHeader: <LookupPanelHeader {...contentList[0]} />,
          panelFooter: <LookupPanelFooter
            isFavorite={isFavorite}
            onClick={() =>
              isFavorite ? removeFavorite(panelTargetKey) : addFavorite(contentList[0])
            }
          />
        };
      } else if (panelTargetType === 'favrts') {
        return { panelHeader: <FavoritesPanelHeader /> };
      }
    }
    return {panelHeader: undefined, panelFooter: undefined};
  }, [contentList, panelTarget, panelTargetKey, panelTargetType, favorites, removeFavorite, addFavorite]);

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