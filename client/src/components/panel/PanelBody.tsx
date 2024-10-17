import React, { useState } from 'react';

import { cn } from '@/lib/utils';
import { usePanelDispatch } from '@/hooks/usePanel';

import { ItemDetails, ItemType } from '@/definitions/types';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MusicItemList from '@/components/music/MusicItemList';

interface LPanelBodyProps {
  className?: string;
  type?: ItemType;
  children: ItemDetails[];
}

interface FPanelBodyProps {
  className?: string;
  children: ItemDetails[];
}

const LookupPanelBody: React.FC<LPanelBodyProps> = ({ className, type, children }) => (
  <ScrollArea className={cn('rounded-lg border', className)}>
    <MusicItemList
      className='w-full'
      displayTrackNo={type === 'album'}
      displayDuration
    >
      {(!children.length || type === 'song') ? children : children.slice(1)}
    </MusicItemList>
  </ScrollArea>
);

const FavoritesPanelBody: React.FC<FPanelBodyProps> = ({ className, children }) => {
  const [selectedTab, setSelectedTab] = useState<ItemType>('song');
  const { openPanel } = usePanelDispatch();
  
  const handleValueChange = (tab: string) => {
    const type = tab as ItemType;
    setSelectedTab(type);
    openPanel(`favrts_${type}`);
  }

  return (<>
    <Tabs value={selectedTab} onValueChange={handleValueChange} className='mx-3 mb-2'>
      <TabsList className='w-full'>
        <TabsTrigger className='grow' value='song'>Song</TabsTrigger>
        <TabsTrigger className='grow' value='album'>Album</TabsTrigger>
        <TabsTrigger className='grow' value='artist'>Artist</TabsTrigger>
      </TabsList>
    </Tabs>
    <ScrollArea className={cn('rounded-lg border', className)}>
      <MusicItemList className='w-full' displayDuration>
        {children}
      </MusicItemList>
    </ScrollArea>
  </>);
}

export { LookupPanelBody, FavoritesPanelBody }