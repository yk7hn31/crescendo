import React from 'react';
import { motion } from 'framer-motion';

import { formVariants, springTransition } from '@/definitions/variants';

import SearchInput from './SearchInput';
import SearchEntitySelect from './SearchEntitySelect';

interface SearchFormProps {
  className?: string;
  isMobile: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ isMobile, className }) => {
  return (
    <motion.form
      onSubmit={e => e.preventDefault()}
      className={`flex flex-col gap-y-2 bg-white ${className}`}
      variants={formVariants}
      initial={false}
      animate='visible'
      transition={springTransition}
      exit='hidden'
    >
      <SearchInput key='search-input' isMobile={isMobile} />
      <SearchEntitySelect />
    </motion.form>
  );
}

export default SearchForm;