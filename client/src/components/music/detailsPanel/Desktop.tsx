import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";

interface DesktopDetailsPanelProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  header?: JSX.Element;
  content: JSX.Element;
  footer?: JSX.Element;
}

const DesktopDetailsPanel: React.FC<DesktopDetailsPanelProps> = ({ open, onOpenChange, header, content, footer }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle className='hidden' />
        <DialogDescription className='hidden' />
        <DialogHeader className='flex flex-row p-4 h-20 rounded-lg space-y-0 space-x-4 bg-gray-100'>
          {header}
        </DialogHeader>
        {content}
        <DialogFooter>{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DesktopDetailsPanel;