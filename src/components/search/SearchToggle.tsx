import React, { SetStateAction, Dispatch } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { SearchType } from '@/types/types';

interface SearchToggleProps {
  searchType: SearchType;
  setParams: Dispatch<SetStateAction<{query: string, type: SearchType}>>;
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
      <ToggleGroupItem value="song">Song</ToggleGroupItem>
      <ToggleGroupItem value="album">Album</ToggleGroupItem>
      <ToggleGroupItem value="artist">Artist</ToggleGroupItem>
    </ToggleGroup>
  );
}

export default SearchToggle;
