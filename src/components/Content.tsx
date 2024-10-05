import React, { useState, useContext } from "react";
import { AnimatePresence } from "framer-motion";

import FormActiveCtx from "@/store/FormActive";
import useViewport from "@/hooks/useViewport";
import { searchSong } from "@/lib/search";
import type { SearchType } from "@/types/types";
import { SearchButton, SearchForm } from './search/SearchActions';


const Content: React.FC = () => {
  const { isMobile } = useViewport();
  const { isFormActive } = useContext(FormActiveCtx);
  const [params, setParams] = useState<{query:string,type:SearchType}>({query:'',type:'song'});

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(params.type, await searchSong(params.query));
    // TODO: use debouncing for API calls
  }

  return (
    <AnimatePresence initial={false}>
      {(isMobile && !isFormActive) && 
      <SearchButton key='search-button' />}
      {(isFormActive || !isMobile) && 
      <SearchForm key='search-form' handleSubmit={handleSubmit} paramState={[params, setParams]} />}
    </AnimatePresence>
  );
}

export default Content;