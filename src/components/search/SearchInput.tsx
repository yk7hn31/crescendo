import React, { forwardRef, ForwardedRef } from 'react';
import { Search } from "lucide-react";
import { motion } from 'framer-motion';

interface SearchInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ placeholder, value, onChange, onFocus }, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <motion.div layout className='relative grow'>
        <label htmlFor='query' className='sr-only'>{placeholder}</label>
        <input type='text' name='query' id='query'
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          ref={ref}
          className='rounded-xl text-base px-5 py-2.5 w-full border-2 outline-none'
        />
        <Search color='rgb(215, 215, 215)'
          className='absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none'
        />
      </motion.div>
    );
  }
);

export default SearchInput;