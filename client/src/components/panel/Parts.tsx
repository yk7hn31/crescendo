import React from 'react';

import { ItemDetails } from '@/definitions/types';

import { cn } from '@/lib/utils';

import { MicVocal, Heart, HeartOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PanelFooterProps {
  isFavorite: boolean;
  onClick: () => void;
}

const LookupPanelHeader: React.FC<ItemDetails> = ({ title, type, genre, data }) => (<>
  <div className={cn(
    'flex justify-center items-center h-full aspect-square',
    type === 'artist' && 'rounded-full bg-gray-200'
  )}>
    {type === 'artist' ? <MicVocal /> :
    <img src={data?.coverImg} alt='cover' className='rounded h-full border' />}
  </div>

  <div className='flex flex-col justify-center text-left overflow-hidden'> {/* TODO: ellipsis for overflow */}
    <h1 className='font-bold text-xl'>
      {title}
    </h1>
    <p className='text-sm text-gray-600 space-x-2 max-h-10'>
      <span>{type[0].toUpperCase() + type.slice(1)}</span>
      
      {data?.artist && <>
        <span>/</span>
        <span>{data?.artist}</span>
      </>}

      {data?.album && <>
        <span>/</span>
        <span>{data?.album}</span>
      </>}

      <span>/</span>
      <span>{genre[0].toUpperCase() + genre.slice(1)}</span>
      
      {data?.releaseYear && <>
        <span>/</span>
        <span>{data?.releaseYear}</span>
      </>}
    </p>
  </div>
</>);

const LookupPanelFooter: React.FC<PanelFooterProps> = ({ isFavorite, onClick }) => (
  <Button
    className='space-x-2'
    variant={isFavorite ? 'secondary' : 'default'}
    onClick={onClick}
  >
    {isFavorite ? <HeartOff className='w-4 h-4' /> : <Heart className='w-4 h-4' />}
    <span>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
  </Button>
);

const FavoritesPanelHeader: React.FC = () => {
  return (
    <>
      <h1 className='text-xl font-semibold'>Favorites</h1>
      <p className='text-gray-600'>Favorite songs you've selected.</p>
    </>
  );
}

export { LookupPanelHeader, LookupPanelFooter, FavoritesPanelHeader };