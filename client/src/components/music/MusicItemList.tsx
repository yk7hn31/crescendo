import React, { type Dispatch } from "react";
import { motion } from "framer-motion";

import { itemListVariants } from "@/definitions/variants";
import type { ItemDetails, PanelAction } from "@/definitions/types";

import { MusicItem, MusicItemSkeleton } from './MusicItem';

interface MusicItemListProps {
  children: ItemDetails[];
  className?: string | number;
  panelDispatch: Dispatch<PanelAction>;
  animate?: {
    initial: string;
    animate: string;
    exit: string;
  };
  displayTrackNo?: boolean;
  displayDuration?: boolean;
}

const MusicItemList: React.FC<MusicItemListProps>
 = ({ children, className, panelDispatch, animate, ...options }) => {
  const items = children.length ? children.map((item: ItemDetails) => {
    const handleItemClick = () => {
      panelDispatch({ type: 'SET_PANEL_BOTH',
        payload: { isPanelOpen: true, panelItemId: item.id }
      });
    }
    if (!options.displayDuration) delete item.data?.duration;
    if (!options.displayTrackNo) delete item.data?.trackNumber;
    return <MusicItem key={item.id} onClick={handleItemClick} {...item} />
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