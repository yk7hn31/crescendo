import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

import FormActiveCtx from "@/store/FormActive";
import useViewport from "@/hooks/useViewport";
import { searchSong } from "@/lib/search";
import type { SearchType } from "@/types/types";
import { SearchForm, SearchButton } from './search/SearchActions';
import SearchItemList from "./search/SearchItemList";
import { SearchItem } from "./search/SearchItem";

const divVariants = {
  initial: { top: '40vh' },
  focused: { top: 0 }
}

const springTransition2 = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  delay: 0.075
};

const Content: React.FC = () => {
  const { isMobile } = useViewport();
  const { isFormActive } = useContext(FormActiveCtx);
  const [params, setParams] = useState<{query:string,type:SearchType}>({query:'',type:'all'});

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(params.type, await searchSong(params.query));
    // TODO: use debouncing for API calls
  }

  return (<>
    <AnimatePresence initial={false}>
      {(isMobile && !isFormActive) &&
      <SearchButton key='search-button'
        className='absolute flex w-full top-[40vh] justify-center'
      />}
    </AnimatePresence>
    <motion.div className={`absolute w-full flex flex-col items-center space-y-4 p-6 ${(!isMobile && !isFormActive) && 'translate-y-11'}`}
      variants={divVariants}
      initial='initial'
      animate={isFormActive ? 'focused' : 'initial'}
      transition={springTransition2}
    >
      <AnimatePresence>
        {(isFormActive || !isMobile) && 
        <SearchForm key='search-form' 
          handleSubmit={handleSubmit} paramState={[params, setParams]} isMobile={isMobile}
        />}
        {isFormActive && 
        <SearchItemList key='search-item-list' isMobile={isMobile}>
          <SearchItem title='Misty' description='Calvin Jung' duration='3:30' />
          <SearchItem title='Misty 2' description='Lucas Han' duration='3:30' />
          <SearchItem title='Misty 3' description='Amamiya Yuzuki' duration='3:30' />
          <SearchItem title='Misty 3' description='Amamiya Yuzuki' duration='3:30' />
          <SearchItem title='Misty 3' description='Amamiya Yuzuki' duration='3:30' />
          <SearchItem title='Misty 3' description='Amamiya Yuzuki' duration='3:30' />
          <SearchItem title='Misty 3' description='Amamiya Yuzuki' duration='3:30' />
          <SearchItem title='Misty 3' description='Amamiya Yuzuki' duration='3:30' />
          <SearchItem title='Misty 3' description='Amamiya Yuzuki' duration='3:30' />
          <SearchItem title='Misty 3' description='Amamiya Yuzuki' duration='3:30' />
          <SearchItem title='Misty 3' description='Amamiya Yuzuki' duration='3:30' />
          <SearchItem title='Misty 3' description='Amamiya Yuzuki' duration='3:30' />
        </SearchItemList>}
      </AnimatePresence>
    </motion.div>
  </>);
}

export default Content;