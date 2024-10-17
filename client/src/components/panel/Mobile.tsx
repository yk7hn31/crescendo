import React from "react";

import { cn } from "@/lib/utils";

import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

interface MobilePanelProps {
  children: JSX.Element;
  open: boolean;
  onClose: () => void;
  header?: JSX.Element;
  footer?: JSX.Element;
  type: 'lookup' | 'favrts';
}

const MobilePanel: React.FC<MobilePanelProps>
 = ({ children, open, onClose, header, footer, type }) => (
  <Drawer open={open} onClose={onClose}>
    <DrawerContent>
      <DrawerTitle className='hidden' />
      <DrawerDescription className='hidden' />
      <DrawerHeader className={cn(
        'm-4 space-x-3',
        type === 'lookup' && 'flex rounded-lg bg-gray-100 h-24',
        // type === 'favrts' && 'p-0'
      )}>
        {header}
      </DrawerHeader>
      {children}
      <DrawerFooter>
        {footer}
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);

export default MobilePanel;