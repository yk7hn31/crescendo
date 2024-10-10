import React, { useReducer } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useViewport } from "@/hooks/useViewport";
import { useSParamState } from "@/hooks/useSParam";
import useDebouncedFetch from "@/hooks/useDebouncedFetch";

import type { PanelState, PanelAction } from "@/definitions/types";
import { contentDivVariants, springTransition } from "@/definitions/variants";

import DetailsPanel from "./music/DetailsPanel";
import SearchOpenButton from "./search/SearchOpenButton";
import SearchForm from "./search/SearchForm";
import MusicItemList from "./music/MusicItemList";

const panelReducer = (state: PanelState, action: PanelAction): PanelState => {
  switch (action.type) {
    case 'SET_PANEL_OPEN':
      return { ...state, isPanelOpen: action.payload };
    case 'SET_PANEL_ITEM_KEY':
      return { ...state, panelItemKey: action.payload };
    case 'SET_PANEL_BOTH':
      return { ...action.payload }
  }
}

const Content: React.FC = () => {
  const { isMobile } = useViewport();
  const { isFormActive, searchTerm, entityType } = useSParamState();
  const [panelState, panelDispatch] = useReducer(panelReducer, { isPanelOpen: false, panelItemKey: '' });
  const items = useDebouncedFetch(searchTerm, entityType);

  return (
  <>
    <DetailsPanel isMobile={isMobile} panelState={panelState} panelDispatch={panelDispatch} />
    <AnimatePresence initial={false}>
      {(isMobile && !isFormActive) &&
      <SearchOpenButton key='search-button' />}
    </AnimatePresence>
    <motion.div 
      className={`absolute w-full flex flex-col items-center space-y-4 px-4 p-6 ${(!isMobile && !isFormActive) && 'translate-y-11'}`}
      variants={contentDivVariants}
      initial='initial'
      animate={isFormActive ? 'focused' : 'initial'}
      transition={{...springTransition, delay: 0.075}}
    >
      <AnimatePresence>
        {(isFormActive || !isMobile) && 
        <SearchForm key='search-form' isMobile={isMobile} />}
        {isFormActive && 
        <MusicItemList 
          key='search-item-list'
          className={`rounded-lg ${isMobile ? 'w-full' : 'w-7/12'} ${items.length && 'border'}`}
          panelDispatch={panelDispatch}
          animate={{
            initial: 'hidden', animate: isFormActive ? 'visible' : 'hidden', exit: 'hidden'
          }}
        >
          {items}
        </MusicItemList>}
      </AnimatePresence>
    </motion.div>
  </>
  );
}

export default Content;