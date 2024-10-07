import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import FormActiveCtx from "@/store/FormActive";
import useViewport from "@/hooks/useViewport";
import { searchSong } from "@/lib/search";
import type { SongInfo, AlbumInfo, ParamsType } from "@/types/types";
import { SearchForm, SearchButton } from './search/SearchActions';
import SearchItemList from "./search/SearchItemList";
import { SearchItem, SearchItemSkeleton } from "./search/SearchItem";

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
  const [params, setParams] = useState<ParamsType>({query:'',debouncedQuery:'',type:'all'});
  const [results, setResults] = useState<(SongInfo | AlbumInfo)[]>([]);

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
        setResults(await searchSong(params.debouncedQuery));
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
          {results.length ? results.map((result: SongInfo | AlbumInfo) => {
            let extra: string = '';
            let key: string = '';
            if (result.type === 'song') {
              const minutes = Math.floor(result.trackLength / 60000);
              const seconds = Math.floor((result.trackLength % 60000) / 1000);
              extra = minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
              key = 't' + result.trackId;
            } else if (result.type === 'album') {
              extra = `${result.trackCount} tracks`
              key = 'c' + result.collectionId;
            }
            return (
              <SearchItem
                key={key}
                title={result.title} 
                description={result.artist} 
                extra={extra} 
                type={result.type}
                coverImg={result.artwork}
              />
            );
          }) : <><SearchItemSkeleton /><SearchItemSkeleton /><SearchItemSkeleton /></>}
        </SearchItemList>}
      </AnimatePresence>
    </motion.div>
  </>);
}

export default Content;