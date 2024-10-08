import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useViewport } from "@/hooks/useViewport";
import { useSearchState } from "@/hooks/useSearch";

import { contentDivVariants, springTransition } from "@/definitions/variants";

import SearchOpenButton from "./search/SearchOpenButton";
import SearchForm from "./search/SearchForm";
import SearchItemList from "./search/SearchItemList";

const Content: React.FC = () => {
  const { isMobile } = useViewport();
  const { isFormActive } = useSearchState();

  return (<>
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
        <SearchItemList key='search-item-list' isMobile={isMobile} />}
      </AnimatePresence>
    </motion.div>
  </>);
}

export default Content;