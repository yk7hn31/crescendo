import React from 'react';
import { motion } from 'framer-motion';

import { formVariants, springTransition } from '@/definitions/variants';

import SearchInput from './SearchInput';
import SearchEntitySelect from './SearchEntitySelect';

interface SearchFormProps {
  isMobile: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ isMobile }) => {
  return (
    <motion.form
      onSubmit={e => e.preventDefault()}
      className={`flex flex-col gap-y-2 ${isMobile ? 'w-full' : 'w-1/2'} max-w-[530px] min-w-[330px]`}
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