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
      className={`absolute w-full flex flex-col items-center pb-6 ${(!isMobile && !isFormActive) && 'translate-y-11'}`}
      variants={contentDivVariants}
      initial='initial'
      animate={isFormActive ? 'focused' : 'initial'}
      transition={{...springTransition, delay: 0.075}}
    >
      <AnimatePresence> {/*  max-w-[530px] min-w-[330px] */}
        {(isFormActive || !isMobile) && 
        <SearchForm
          key='search-form'
          className={`fixed p-4 ${isMobile ? 'w-full' : 'w-7/12'}`}
          isMobile={isMobile}
        />}
        {isFormActive && 
        <div className={`mt-32 mx-4 ${isMobile ? 'w-full px-3' : 'w-7/12'}`}>
          <MusicItemList 
            key='search-item-list'
            className={`w-full overflow-hidden ${items.length && 'rounded-lg border'}`}
            panelDispatch={panelDispatch}
            animate={{
              initial: 'hidden', animate: isFormActive ? 'visible' : 'hidden', exit: 'hidden'
            }}
          >
            {items}
          </MusicItemList>
        </div>}
      </AnimatePresence>
    </motion.div>
  </>
  );
}

export default Content;