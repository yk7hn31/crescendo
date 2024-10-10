import React, { Dispatch } from "react";

import { lookup } from "@/lib/music";

import type { PanelState, PanelAction } from "@/definitions/types";

import {
  Drawer, 
  DrawerContent, 
  DrawerTitle, 
  DrawerDescription, 
  DrawerHeader, 
  DrawerFooter
} from "./ui/drawer";
import { 
  Dialog, 
  DialogContent, 
  DialogTitle,
  DialogDescription, 
  DialogHeader,
  DialogFooter 
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface DetailsPanelProps {
  isMobile: boolean;
  panelState: PanelState;
  panelDispatch: Dispatch<PanelAction>;
}

const DetailsPanel: React.FC<DetailsPanelProps> = ({ isMobile, panelState, panelDispatch }) => {
  if (panelState.panelItemKey) {
    lookup(panelState.panelItemKey).then((resp) => {
      console.log(resp); // TODO: link with MusicItemList
    });
  }

  if (isMobile) {
    const handleClose = () => {
      panelDispatch({ type: 'SET_PANEL_OPEN', payload: false });
    }
    return (
      <Drawer open={panelState.isPanelOpen} onClose={handleClose}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              Song title here
            </DrawerTitle>
            <DrawerDescription>
              Song / keshi
            </DrawerDescription>
          </DrawerHeader>
          {/* info here */}
          <DrawerFooter>
            <Button className='space-x-2'>
              <Plus className='w-4 h-4' />
              <span>Add to Collection</span>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  } else {
    const handleOpenChange = (isOpen: boolean) => {
      panelDispatch({ type: 'SET_PANEL_OPEN', payload: isOpen });
    }
    return (
      <Dialog open={panelState.isPanelOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Song title here
            </DialogTitle>
            <DialogDescription>
              Song / keshi
            </DialogDescription>
          </DialogHeader>
          {/* info here */}
          <DialogFooter>
            <Button className='space-x-2'>
              <Plus className='w-4 h-4' />
              <span>Add to Collection</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
}

export default DetailsPanel;