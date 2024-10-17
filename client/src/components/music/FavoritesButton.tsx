import React from 'react';

import { usePanelDispatch } from '@/hooks/usePanel';

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FavoritesButton: React.FC = () => {
  const { openPanel } = usePanelDispatch();

  return (
    <Button
      onClick={() => openPanel('favrts_song')}
      className='flex items-center justify-center fixed right-6 bottom-6 rounded-full w-12 h-12'
    >
      <Heart />
    </Button>
  )
}

export default FavoritesButton;