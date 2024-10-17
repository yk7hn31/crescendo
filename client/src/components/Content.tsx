import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { useSParamState } from "@/hooks/useSParam";
import useSearch from "@/hooks/useSearch";

import type { ItemDetails } from "@/definitions/types";
import { contentDivVariants, springTransition } from "@/definitions/variants";

import SearchOpenButton from "./search/SearchOpenButton";
import SearchForm from "./search/SearchForm";
import MusicItemList from "./music/MusicItemList";

const Content: React.FC<{isMobile: boolean}> = ({isMobile}) => {
  const { isFormActive, searchTerm, entityType } = useSParamState();
  const items: ItemDetails[] = useSearch(searchTerm, entityType);

  return (<>
    <AnimatePresence initial={false}>
      {(isMobile && !isFormActive) &&
      <SearchOpenButton key='search-button' />}
    </AnimatePresence>
    <motion.div 
      className={cn(
        'absolute w-full flex flex-col items-center pb-6',
        (!isMobile && !isFormActive) && 'translate-y-11')}
      variants={contentDivVariants}
      initial='initial'
      animate={isFormActive ? 'focused' : 'initial'}
      transition={{...springTransition, delay: 0.075}}
    >
      <AnimatePresence>
        {(isFormActive || !isMobile) && 
        <SearchForm
          key='search-form'
          className={cn('fixed p-4',
            isMobile ? 'w-full' : 'w-7/12 max-w-[560px] min-w-[330px]')}
          isMobile={isMobile}
        />}
        {isFormActive && 
        <div className={cn('mt-32 mx-4', isMobile ? 'w-full px-3' : 'w-7/12')}>
          <MusicItemList 
            key='search-item-list'
            className={cn('w-full overflow-hidden', items.length && 'rounded-lg border')}
            animate={{
              initial: 'hidden', animate: isFormActive ? 'visible' : 'hidden', exit: 'hidden'
            }}
          >
            {items}
          </MusicItemList>
        </div>}
      </AnimatePresence>
    </motion.div>
  </>);
}

export default Content;