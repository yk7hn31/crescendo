import React, { type Dispatch } from 'react';

import { ItemDetails, ItemType, PanelAction } from '@/definitions/types';

import { cn } from '@/lib/utils';

import { MicVocal, Plus, Minus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import MusicItemList from '../MusicItemList';

interface PanelContentProps {
  className?: string;
  type?: ItemType;
  children: ItemDetails[];
  panelDispatch: Dispatch<PanelAction>;
}

interface PanelFooterProps {
  isFavorite: boolean;
  onClick: () => void;
}

const PanelHeader: React.FC<ItemDetails> = ({ title, type, genre, data }) => (<>
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
    <p className='text-sm text-gray-600 space-x-2'>
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

const PanelContent: React.FC<PanelContentProps> = ({ className, panelDispatch, type, children }) => (
  <ScrollArea className={cn('rounded-lg border', className)}>
    <MusicItemList
      className='w-full'
      panelDispatch={panelDispatch}
      displayTrackNo={type === 'album'} displayDuration
    >
      {(type === 'song' || !children.length) ? children : children.slice(1)}
    </MusicItemList>
  </ScrollArea>
);

const PanelFooter: React.FC<PanelFooterProps> = ({ isFavorite, onClick }) => (
  <Button
    className='space-x-2'
    variant={isFavorite ? 'secondary' : 'default'}
    onClick={onClick}
  >
    {isFavorite ? <Minus className='w-4 h-4' /> : <Plus className='w-4 h-4' />}
    <span>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
  </Button>
);

export { PanelHeader, PanelContent, PanelFooter };