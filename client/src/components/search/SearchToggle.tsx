import React, { SetStateAction, Dispatch } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { SearchType, ParamsType } from '@/types/types';

interface SearchToggleProps {
  searchType: SearchType;
  setParams: Dispatch<SetStateAction<ParamsType>>;
}

const SearchToggle: React.FC<SearchToggleProps> = ({ searchType, setParams }) => {
  const handleValueChange = (type: SearchType) => {
    if (type) setParams(p => ({...p, type}));
  }

  return (
    <ToggleGroup type="single" className='justify-start'
      value={searchType}
      onValueChange={handleValueChange}
    >
      <ToggleGroupItem value="all">All</ToggleGroupItem>
      <ToggleGroupItem value="song">Song</ToggleGroupItem>
      <ToggleGroupItem value="album">Album</ToggleGroupItem>
      <ToggleGroupItem value="artist">Artist</ToggleGroupItem>
    </ToggleGroup>
  );
}

export default SearchToggle;
