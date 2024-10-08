import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import FormActiveCtx from "@/store/FormActive";
import useViewport from "@/hooks/useViewport";
import { searchAll } from "@/lib/search";
import type { ParamsType, ItemDetails } from "@/types/types";
import { SearchForm, SearchButton } from './search/SearchActions';
import SearchItemList from "./search/SearchItemList";
import { SearchItem, SearchItemSkeleton } from "./search/SearchItem";

const divVariants = {
  initial: { top: '40vh' },
  focused: { top: 0 }
};

const springTransition2 = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  delay: 0.075
};

const Content: React.FC = () => {
  const { isMobile } = useViewport();
  const { isFormActive } = useContext(FormActiveCtx);
  const [params, setParams] = useState<ParamsType>({query:'',debouncedQuery:'',type:'all'});
  const [results, setResults] = useState<ItemDetails[]>([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setParams(p => ({...p, debouncedQuery: p.query}))
    }, 300);

    return () => {
      clearTimeout(handler);
    }
  }, [params.query]);

  useEffect(() => {
    (async () => {
      if (params.debouncedQuery) {
        setResults(await searchAll(params.debouncedQuery));
      } else {
        setResults([]);
      }
    })();
  }, [params.debouncedQuery]);

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
          paramState={[params, setParams]} isMobile={isMobile}
        />}
        {isFormActive && 
        <SearchItemList key='search-item-list' isMobile={isMobile}>
          {results.length ? results.map((result: ItemDetails) => {
            const itemInfo = { key: '', title: '', description: '', extra: '', coverImg: '' };

            if (result.wrapperType === 'track' || result.wrapperType === 'collection') {
              itemInfo.coverImg = result.artworkUrl100;
              itemInfo.description = result.artistName;
              if (result.wrapperType === 'track') {
                const minutes = Math.floor(result.trackTimeMillis / 60000);
                const seconds = Math.floor((result.trackTimeMillis % 60000) / 1000);
                itemInfo.title = result.trackName
                itemInfo.key = 't' + result.trackId;
                itemInfo.extra = minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
              } else if (result.wrapperType === 'collection') {
                itemInfo.title = result.collectionName;
                itemInfo.key = 'c' + result.collectionId;
                itemInfo.extra = `${result.trackCount} tracks`;
              }
            } else if (result.wrapperType === 'artist') {
              itemInfo.title = result.artistName;
              itemInfo.key = 'a' + result.artistId;
              itemInfo.description = result.primaryGenreName.charAt(0).toUpperCase() + result.primaryGenreName.slice(1);
              itemInfo.extra = '>'; // TODO: temp
            }
            return (
              <SearchItem type={result.wrapperType} {...itemInfo} />
            );
          }) : <><SearchItemSkeleton /><SearchItemSkeleton /><SearchItemSkeleton /></>}
        </SearchItemList>}
      </AnimatePresence>
    </motion.div>
  </>);
}

export default Content;