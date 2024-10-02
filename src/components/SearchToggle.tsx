import React, { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

type SearchType = 'song' | 'album' | 'artist';

const SearchToggle: React.FC = () => {
  const [selected, setSelected] = useState<SearchType>('song');

  const handleValueChange = (value: SearchType) => value && setSelected(value);

  return (
    <ToggleGroup type="single" className='justify-start'
      value={selected}
      onValueChange={handleValueChange}
    >
      <ToggleGroupItem value="song">Song</ToggleGroupItem>
      <ToggleGroupItem value="album">Album</ToggleGroupItem>
      <ToggleGroupItem value="artist">Artist</ToggleGroupItem>
    </ToggleGroup>
  );
}

export default SearchToggle;