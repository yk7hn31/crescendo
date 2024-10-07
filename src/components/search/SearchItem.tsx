import React from 'react';
import { Plus } from 'lucide-react';

interface SearchItemProps {
  title: string;
  description: string;
  duration: string;
}

const exampleUrl = 'https://cdna.artstation.com/p/assets/images/images/010/722/852/medium/oksana-radionova-nomnom24.jpg?1525885436';

const SearchItem: React.FC<SearchItemProps> = ({ title, description, duration }) => {
  return (
    <div className='flex items-center space-x-4 px-5 p-4 w-full h-20 border cursor-pointer transition hover:bg-gray-100 group first:rounded-t-lg last:rounded-b-lg'>
      <div>
        <div className='absolute flex items-center justify-center w-12 h-12 rounded bg-gray-500 bg-opacity-30 backdrop-blur-sm group-hover:opacity-100 opacity-0 transition'>
          <Plus className='text-white' />
        </div>
        <img src={exampleUrl} alt='cover' className='rounded h-12' />
      </div>
      <div>
        <h2 className='font-semibold'>{title}</h2>
        <p className='text-gray-600 text-sm'>
          <span>Song</span>
          <span className='mx-2'>/</span>
          <span>{description}</span>
        </p>
      </div>
      <p className='text-gray-600 font-mono !ml-auto'>{duration}</p>
    </div>
  );
}

export { SearchItem };