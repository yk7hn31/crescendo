import React from 'react';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

const SearchToggle: React.FC = () => {
  return (
    <ToggleGroup type="single" className='justify-start'>
      <ToggleGroupItem value="song">Song</ToggleGroupItem>
      <ToggleGroupItem value="album">Album</ToggleGroupItem>
      <ToggleGroupItem value="artist">Artist</ToggleGroupItem>
    </ToggleGroup>
  );
}

export default SearchToggle;