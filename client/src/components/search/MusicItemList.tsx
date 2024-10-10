import React from "react";
import { motion } from "framer-motion";

import { formatSearchItems } from "@/lib/music";

import { itemListVariants } from "@/definitions/variants";
import type { ItemDetails, PanelAction } from "@/definitions/types";

import { MusicItem, MusicItemSkeleton } from './MusicItem';

interface MusicItemListProps {
  children: ItemDetails[];
  className: string;
  panelDispatch: React.Dispatch<PanelAction>;
  animate?: {
    initial: string;
    animate: string;
    exit: string;
  }
}

const MusicItemList: React.FC<MusicItemListProps> = 
({ children, className, panelDispatch, animate }) => {
  const items = children.length ? children.map((item: ItemDetails) => {
    const { itemKey, itemInfo } = formatSearchItems(item);
    const handleItemClick = () => {
      panelDispatch({ type: 'SET_PANEL_BOTH',
        payload: { isPanelOpen: true, panelItemKey: itemKey }
      });
    }
    return <MusicItem key={itemKey} onClick={handleItemClick} {...itemInfo} />
  }) : <><MusicItemSkeleton /><MusicItemSkeleton /><MusicItemSkeleton /></>

  if (animate) {
    return (
      <motion.div
        className={`space-y-[-1px] ${className}`}
        variants={itemListVariants}
        {...animate}
      >
        {items}
      </motion.div>
    );
  } else {
    return (
      <div className={`space-y-[-1px] ${className}`}>
        {items}
      </div>
    );
  }
}

export default MusicItemList;