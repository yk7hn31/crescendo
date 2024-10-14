import React from "react";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

interface MobileDetailsPanelProps {
  open: boolean;
  onClose: () => void;
  header?: JSX.Element;
  content: JSX.Element | null;
  footer?: JSX.Element;
}

const MobileDetailsPanel: React.FC<MobileDetailsPanelProps> = ({ open, onClose, header, content, footer }) => {
  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent>
        <DrawerTitle className='hidden' />
        <DrawerDescription className='hidden' />
        <DrawerHeader className='flex m-4 h-24 rounded-lg space-x-3 bg-gray-100'>
          {header}
        </DrawerHeader>
        {content}
        <DrawerFooter>
          {footer}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default MobileDetailsPanel;