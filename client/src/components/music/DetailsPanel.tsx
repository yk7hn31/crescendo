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
      lookup(panelItemKey, panelItemKey[0] === 'a' ? 10 : undefined)
      .then(setContent);
    }
  }, [panelItemKey]);


  if (panelItemInfo) {
    const headerContent = (<>
      <div className={`flex justify-center items-center h-full aspect-square ${panelItemInfo.type === 'Artist' && 'rounded-full bg-slate-200'}`}>
        {panelItemInfo.type === 'Artist' ? 
        <MicVocal /> :
        <img src={panelItemInfo.coverImg} alt='cover' className='rounded h-full border' />}
      </div>

      <div className='flex flex-col justify-center text-left overflow-hidden'>
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
       displayTrackNo={panelItemInfo.type === 'Album'}
       displayDuration
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
            <DrawerTitle className='hidden' />
            <DrawerDescription className='hidden' />
            <DrawerHeader className='flex m-4 h-24 rounded-lg space-x-3 bg-gray-100'>  
              {headerContent}
            </DrawerHeader>

            <ScrollArea className='max-h-[55vh] mx-3 border rounded-lg'>
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
            <DialogTitle className='hidden' />
            <DialogDescription className='hidden' />
            <DialogHeader className='flex flex-row p-4 h-20 rounded-lg space-y-0 space-x-4 bg-gray-100'>
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