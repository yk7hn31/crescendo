import React from 'react';
import { motion } from 'framer-motion';

import { useSParamState, useSParamDispatch } from '@/hooks/useSParam';

import type { SearchEntity } from '@/definitions/types';
import { formSelectVariants, springTransition } from '@/definitions/variants';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const SearchEntitySelect: React.FC = () => {
  const { isFormActive, entityType } = useSParamState();
  const dispatch = useSParamDispatch();

  const handleEntityTypeChange = (type: SearchEntity) => {
    if (type) dispatch({ type: 'SET_ENTITY_TYPE', payload: type });
  }

  return (
    <motion.div
      variants={formSelectVariants}
      initial='hidden'
      animate={isFormActive ? 'visible' : 'hidden'}
      transition={{ delay: 0.2, ...springTransition }}
    >
      <ToggleGroup type="single" className='justify-start'
        value={entityType}
        onValueChange={handleEntityTypeChange}
      >
        <ToggleGroupItem value="all">All</ToggleGroupItem>
        <ToggleGroupItem value="song">Song</ToggleGroupItem>
        <ToggleGroupItem value="album">Album</ToggleGroupItem>
        <ToggleGroupItem value="artist">Artist</ToggleGroupItem>
      </ToggleGroup>
    </motion.div>
  );
}

export default SearchEntitySelect;