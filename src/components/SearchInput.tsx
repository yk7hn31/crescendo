import React from 'react';
import { Search } from "lucide-react";

interface SearchInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder, value, onChange, onFocus }) => {
  return (
    <div className='relative w-full'>
      <input type='text' name='query' id='query'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onFocus}
        className='rounded-xl text-base px-5 py-2.5 w-full border-2 outline-none'
      />
      <Search color='rgb(215, 215, 215)'
        className='absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none'
      />
    </div>
  );
}

export default SearchInput;