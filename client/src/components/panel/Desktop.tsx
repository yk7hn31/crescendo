import React from "react";

import { cn } from "@/lib/utils";

import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";

interface DesktopPanelProps {
  children: JSX.Element;
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  header?: JSX.Element;
  footer?: JSX.Element;
  type: 'lookup' | 'favrts';
}

const DesktopPanel: React.FC<DesktopPanelProps>
 = ({ children, open, onOpenChange, header, footer, type }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogTitle className='hidden' />
      <DialogDescription className='hidden' />
      <DialogHeader className={cn(
        'p-4 h-20 space-y-0',
        type === 'lookup' && 'flex flex-row rounded-lg bg-gray-100 space-x-4'
      )}>
        {header}
      </DialogHeader>
      {children}
      <DialogFooter>{footer}</DialogFooter>
    </DialogContent>
  </Dialog>
);

export default DesktopPanel;