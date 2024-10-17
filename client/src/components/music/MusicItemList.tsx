import React from "react";
import { motion } from "framer-motion";

import { usePanelDispatch } from "@/hooks/usePanel";

import { itemListVariants } from "@/definitions/variants";
import type { ItemDetails } from "@/definitions/types";

import { MusicItem, MusicItemSkeleton } from './MusicItem';

interface MusicItemListProps {
  children: ItemDetails[];
  className?: string | number;
  animate?: {
    initial: string;
    animate: string;
    exit: string;
  };
  displayTrackNo?: boolean;
  displayDuration?: boolean;
}

const MusicItemList: React.FC<MusicItemListProps>
 = ({ children, className, animate, ...options }) => {
  const { openPanel } = usePanelDispatch();

  const items = children.length ? children.map((item: ItemDetails) => {
    if (!options.displayDuration) delete item.data?.duration;
    if (!options.displayTrackNo) delete item.data?.trackNumber;

    return (
      <MusicItem key={item.id} onClick={() => openPanel(`lookup_${item.id}`)} {...item} />
    );
  }) : <>
    <MusicItemSkeleton /><MusicItemSkeleton /><MusicItemSkeleton />
  </>

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