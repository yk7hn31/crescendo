import React from 'react';
import { motion } from 'framer-motion';

import { useSParamDispatch } from '@/hooks/useSParam';

import { buttonVariants, springTransition } from '@/definitions/variants';

import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';


const SearchOpenButton: React.FC = () => {
  const dispatch = useSParamDispatch();

  const handleButtonClick = () => {
    dispatch({type: 'SET_FORM_ACTIVE', payload: true});
  }

  return (
    <motion.div
      className='absolute flex w-full top-[40vh] justify-center'
      variants={buttonVariants}
      initial='hidden'
      animate='visible'
      transition={springTransition}
      exit='hidden'
    >
      <Button variant='outline' onClick={handleButtonClick}>
        <Search className='mr-2 h-4 w-4' />
        Search
      </Button>
    </motion.div>
  );
}

export default SearchOpenButton;