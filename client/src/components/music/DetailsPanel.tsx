import React, { type Dispatch, useEffect, useState } from "react";

import { lookup, formatPanelItemInfo } from "@/lib/music";

import type { PanelState, PanelAction, ItemDetails } from "@/definitions/types";

import { Drawer, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, MicVocal } from "lucide-react";
import MusicItemList from "./MusicItemList";

interface DetailsPanelProps {
  isMobile: boolean;
  panelState: PanelState;
  panelDispatch: Dispatch<PanelAction>;
}

const DetailsPanel: React.FC<DetailsPanelProps> = ({ isMobile, panelState, panelDispatch }) => {
  const { isPanelOpen, panelItemKey } = panelState;
  const [content, setContent] = useState<ItemDetails[]>([]);
  const panelItemInfo = formatPanelItemInfo(content);

  useEffect(() => {
    if (panelItemKey) {
      setContent([]);
      lookup(panelItemKey, panelItemKey[0] === 'a' ? 10 : undefined)
      .then(setContent);
    }
  }, [panelItemKey]);


  if (panelItemInfo) {
    const headerContent = (<>
      {panelItemInfo.type === 'Artist' ? 
      <div className='flex justify-center items-center rounded-full h-full aspect-square bg-slate-200'>
        <MicVocal />
      </div> :
      <img src={panelItemInfo.coverImg} alt='cover' className='rounded h-full' />}
      <div className='flex flex-col justify-center text-left'>
        <h1 className='font-bold text-xl'>
          {panelItemInfo.title} {/* demo for collections(albums) */}
        </h1>
        <p className='text-sm text-gray-600 space-x-2'>
          <span>{panelItemInfo.type}</span>
          <span>/</span>
          {panelItemInfo.extra && panelItemInfo.extra.map((e, i) => {
            return (<>
              <span key={1 + i}>{e}</span>
              <span key={2 + i}>/</span>
            </>);
          })}
          <span>{content[0].primaryGenreName}</span>
        </p>
      </div>
    </>);

    const musicItemList = panelItemInfo.type === 'Song' ? null : (
    <>
      <MusicItemList
       className='w-full'
       panelDispatch={panelDispatch}
       inclTrackNo={panelItemInfo.type === 'Album'}
      >
        {content.slice(1)}
      </MusicItemList>
    </>);

    const footerContent = (<>
      <Button className='space-x-2'>
        <Plus className='w-4 h-4' />
        <span>Add to Collection</span>
      </Button>
    </>);
    if (isMobile) {
      const handleClose = () => panelDispatch({ type: 'SET_PANEL_OPEN', payload: false });
      return (
        <Drawer open={isPanelOpen} onClose={handleClose}>
          <DrawerContent>
            <DrawerHeader className='flex m-4 h-24 rounded-lg space-x-3 bg-gray-100'>
              <DrawerTitle className='hidden' />
              <DrawerDescription className='hidden' />
              {headerContent}
            </DrawerHeader>

            <ScrollArea className='max-h-[60vh] mx-3 border rounded-lg'>
              {musicItemList}
            </ScrollArea>

            <DrawerFooter>{footerContent}</DrawerFooter>
          </DrawerContent>
        </Drawer>
      );
    } else {
      const handleOpenChange = (isOpen: boolean) => panelDispatch({ type: 'SET_PANEL_OPEN', payload: isOpen });
      return (
        <Dialog open={isPanelOpen} onOpenChange={handleOpenChange}>
          <DialogContent>
            <DialogHeader className='flex flex-row p-4 h-20 rounded-lg space-x-3 bg-gray-100'>
              <DialogTitle className='hidden' />
              <DialogDescription className='hidden' />
              {headerContent}
            </DialogHeader>

            <ScrollArea className='max-h-96 rounded-lg border'>
              {musicItemList}
            </ScrollArea>

            <DialogFooter>{footerContent}</DialogFooter>
          </DialogContent>
        </Dialog>
      );
    }
  }

  return;
}

export default DetailsPanel;