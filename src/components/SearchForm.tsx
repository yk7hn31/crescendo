import React, { useState, useRef, Dispatch, SetStateAction, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import SearchInput from "./SearchInput";
import SearchToggle from "./SearchToggle";
import SearchButton from "./SearchButton";
import useViewport from "@/hooks/useViewport";
import { searchSong } from "@/lib/search";
import type { SearchType } from "@/types/types";

interface SearchFormProps {
  formState: [boolean, Dispatch<SetStateAction<boolean>>];
};

const formVariants = {
  initial: { y: 70, opacity: 1 },
  focused: { y: 0, opacity: 1 },
  hidden: { opacity: 0, y: 20 }
};

const buttonVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -20 }
};

const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30
};

const SearchForm: React.FC<SearchFormProps> = ({ formState }) => {
  const { isMobile } = useViewport();
  const [isFormActive, setIsFormActive] = formState;
  const [query, setQuery] = useState<string>('');
  const [searchType, setSearchType] = useState<SearchType>('song');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(searchType, await searchSong(query));
    // TODO: use debouncing for API calls
  }

  const handleInputFocus = () => setIsFormActive(true);
  const handleInputBlur = () => setIsFormActive(false);

  const handleButtonClick = () => {
    setIsFormActive(true);
  }

  useEffect(() => {
    if (isFormActive) inputRef.current?.focus();
  }, [isFormActive]);

  return (
    <AnimatePresence initial={false}>
      {isMobile && !isFormActive && 
      <motion.div
        key='search-button'
        variants={buttonVariants}
        initial='hidden'
        animate='visible'
        transition={springTransition}
        exit='hidden'
      >
        <SearchButton onClick={handleButtonClick} />
      </motion.div>}
      {(isFormActive || !isMobile) &&
      <motion.form
        key='search-form'
        onSubmit={handleSubmit}
        className='absolute flex flex-col gap-y-2 w-5/12 max-w-[510px] min-w-[330px]'
        variants={formVariants}
        initial='initial'
        animate={isFormActive ? 'focused' : 'initial'}
        transition={springTransition}
        exit='hidden'
      >
        <SearchInput
          placeholder='Search for artists, songs, albums...'
          value={query}
          onChange={handleQueryChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputRef}
        />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, ...springTransition }}
        >
          <SearchToggle
            searchType={searchType}
            setSearchType={setSearchType}
          />
        </motion.div>
      </motion.form>}
    </AnimatePresence>
  );
}

export default SearchForm;