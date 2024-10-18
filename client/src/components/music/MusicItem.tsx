import React from 'react';
// import { motion, useTransform } from 'framer-motion';

import { cn } from '@/lib/utils';

import type { ItemDetails } from '@/definitions/types';

import { Skeleton } from '@/components/ui/skeleton';
import { MicVocal, ChevronRight } from 'lucide-react';

interface MusicItemProps extends ItemDetails {
  onClick: () => void;
}

const MusicItem: React.FC<MusicItemProps> = ({ title, type, genre, data, onClick }) => (
  <div
    className='flex items-center space-x-4 p-3 pl-4 w-full h-20 border-y cursor-pointer transition hover:bg-gray-100 first:border-t-0 last:border-b-0'
    onClick={onClick}
  >
    <div className={cn(
      'flex items-center justify-center h-12 overflow-hidden',
      data?.trackNumber ? 'w-6' : 'w-12 border',
      type === 'artist' ? 'rounded-full bg-slate-200' : 'rounded'
    )}>
      {type === 'artist' ? 
      <MicVocal className='text-gray-700' />
      : data?.trackNumber ? <div className='font-mono'>{data?.trackNumber}</div> :
      <img src={data?.coverImg} alt='cover' className='h-12' />}
    </div>

    <div className='flex flex-col justify-center flex-1 min-w-0 pr-4'>
      <h2 className='font-semibold text-ellipsis overflow-hidden whitespace-nowrap max-w-full'>{title}</h2>
      <p className='text-gray-600 text-sm text-ellipsis overflow-hidden whitespace-nowrap max-w-full'>
        <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
        <span className='mx-2'>/</span>
        <span>{type === 'artist' ? genre : data?.artist}</span>
      </p>
    </div>

    <p className='text-gray-600 text-sm font-mono !ml-auto'>
      {data?.duration || <ChevronRight />}
    </p>
  </div>
);

const MusicItemSkeleton: React.FC = () => {
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

export { MusicItem, MusicItemSkeleton };