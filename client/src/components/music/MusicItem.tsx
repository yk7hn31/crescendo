import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { MicVocal, ChevronRight } from 'lucide-react';

interface MusicItemProps {
  title: string;
  description: string;
  type: string;
  coverImg?: string;
  trackNumber?: number;
  duration?: number;
  onClick: () => void;
}

const MusicItem: React.FC<MusicItemProps>
 = ({ title, description, type, coverImg, trackNumber, duration, onClick }) => {
  let extra: JSX.Element | string = <ChevronRight />;
  type = type !== 'artist' ? type === 'track' ? 'song' : 'album' : 'artist';
  if (duration) {
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    extra = minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
  }

  return (
    <div 
      className='flex items-center space-x-4 p-3 pl-4 w-full h-20 border-y cursor-pointer transition hover:bg-gray-100 first:border-t-0 last:border-b-0'
      onClick={onClick}
    >
      <div className={`flex items-center justify-center ${trackNumber ? 'w-6' : 'w-12 border'} h-12 overflow-hidden rounded${type === 'artist' ? '-full' : ''} ${type === 'artist' && 'bg-slate-200'}`}>
        {type === 'artist' ? 
        <MicVocal className='text-gray-700' />
        : trackNumber ? <div className='font-mono'>{trackNumber}</div> :
        <img src={coverImg} alt='cover' className='h-12' />}
      </div>

      <div className='flex flex-col justify-center flex-1 min-w-0 pr-4'>
        <h2 className='font-semibold text-ellipsis overflow-hidden whitespace-nowrap max-w-full'>{title}</h2>
        <p className='text-gray-600 text-sm text-ellipsis overflow-hidden whitespace-nowrap max-w-full'>
          <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
          <span className='mx-2'>/</span>
          <span>{description}</span>
        </p>
      </div>

      <p className='text-gray-600 text-sm font-mono !ml-auto'>
        {extra}
      </p>
    </div>
  );
}

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