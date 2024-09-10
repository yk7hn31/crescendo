import React, { useState } from "react";

import SearchInput from "./SearchInput";
import SearchToggle from "./SearchToggle";

interface SearchFormProps {
  onFocus: () => void;
};

const SearchForm: React.FC<SearchFormProps> = ({ onFocus }) => {
  const [query, setQuery] = useState<string>('');

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}
      className='flex flex-col gap-y-2'
    >
      <SearchInput
        placeholder='Search for artists, songs, albums...'
        value={query}
        onChange={handleQueryChange}
        onFocus={onFocus}
      />
      <SearchToggle />
    </form>
  );
}

export default SearchForm;