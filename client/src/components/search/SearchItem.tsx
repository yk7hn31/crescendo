import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, MicVocal } from 'lucide-react';

interface SearchItemProps {
  title: string;
  description: string;
  extra: string;
  type: string;
  coverImg: string;
}

const SearchItem: React.FC<SearchItemProps> = ({ title, description, extra, type, coverImg }) => {
  type = type !== 'artist' ? type === 'track' ? 'song' : 'album' : 'artist';
  return (
    <div className='flex items-center space-x-4 px-5 p-4 w-full h-20 border cursor-pointer transition hover:bg-gray-100 group first:rounded-t-lg last:rounded-b-lg'>
      <div className={`w-12 h-12 overflow-hidden ${type === 'artist' && 'rounded-full bg-slate-200 flex items-center justify-center'}`}>
        <div className='absolute flex items-center justify-center w-12 h-12 rounded bg-gray-500 bg-opacity-30 backdrop-blur-sm group-hover:opacity-100 opacity-0 transition'>
          <Plus className='text-white' />
        </div>
        {type === 'artist' ? 
        <MicVocal className='w-6 h-6 text-gray-700' />
        : <img src={coverImg} alt='cover' className='rounded h-12' />}
      </div>
      <div className='flex flex-col justify-center'>
        <h2 className='font-semibold'>{title}</h2>
        <p className='text-gray-600 text-sm'>
          <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
          <span className='mx-2'>/</span>
          <span>{description}</span>
        </p>
      </div>
      <p className='text-gray-600 font-mono text-sm !ml-auto'>{extra}</p>
    </div>
  );
}

const SearchItemSkeleton: React.FC = () => {
  return (
    <div className='flex items center justify-center space-x-4 px-5 p-4 w-full h-20'>
      <Skeleton className='w-12 h-12 rounded' />
      <div className='grow space-y-2 flex flex-col justify-center'>
        <Skeleton className='w-3/4 h-4 rounded' />
        <Skeleton className='w-1/2 h-3 rounded' />
      </div>
    </div>
  );
}

export { SearchItem, SearchItemSkeleton };