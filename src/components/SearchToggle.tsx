import React, { SetStateAction, Dispatch } from 'react';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import type { SearchType } from '@/types/types';

interface SearchToggleProps {
  searchType: SearchType;
  setSearchType: Dispatch<SetStateAction<SearchType>>;
}

const SearchToggle: React.FC<SearchToggleProps> = ({ searchType, setSearchType }) => {
  const handleValueChange = (value: SearchType) => value && setSearchType(value);

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
