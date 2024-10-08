import React, { useEffect, useRef } from 'react';
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

import { useSearchDispatch, useSearchState } from '@/hooks/useSearch';

import { blurButtonVariants } from '@/definitions/variants';

interface SearchInputProps {
  isMobile: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ isMobile }) => {
  const { isFormActive, searchTerm } = useSearchState();
  const dispatch = useSearchDispatch();
  const input = useRef<HTMLInputElement>(null);

  const handleTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value });
  }

  const handleInputFocus = () => {
    dispatch({ type: 'SET_FORM_ACTIVE', payload: true });
  }

  const handleBlurButtonClick = () => {
    dispatch({ type: 'SET_FORM_ACTIVE', payload: false });
  }

  useEffect(() => {
    if (isFormActive) input.current?.focus();
  }, [isFormActive]);

  return (
    <motion.div layout className='flex space-x-2 items-center'>
      <motion.div layout className='relative grow'>
        <label htmlFor='query' className='sr-only'></label>
        <input type='text' name='query' id='query'
          placeholder={isMobile ? 'Search...' : 'Search for artists, songs, albums...'}
          value={searchTerm}
          onChange={handleTermChange}
          onFocus={handleInputFocus}
          ref={input}
          className='rounded-xl text-base px-5 py-2.5 w-full border-2 outline-none'
        />
        <Search color='rgb(215, 215, 215)'
          className='absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none'
        />
      </motion.div>
      <AnimatePresence mode='popLayout'>
        {isFormActive &&
        <motion.button
          key='search-blur-button'
          className='w-10 h-10 rounded-full flex justify-center items-center transition hover:bg-gray-100'
          onClick={handleBlurButtonClick}
          type='button'
          variants={blurButtonVariants}
          initial='hidden'
          animate='visible'
          exit='hidden'
        >
          <X className='text-gray-500' />
        </motion.button>}
      </AnimatePresence>
    </motion.div>
  );
}

export default SearchInput;