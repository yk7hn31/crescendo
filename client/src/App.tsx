import React from 'react';

import { SParamProvider } from './store/SParam';
import { PanelProvider } from './store/Panel';
import { FavoritesProvider } from './store/Favorites';

import { useViewport } from './hooks/useViewport';

import { Toaster } from './components/ui/toaster';
import Header from './components/Header';
import Content from './components/Content';
import Panel from './components/Panel';
import FavoritesButton from './components/music/FavoritesButton';

const App: React.FC = () => {
  const { isMobile } = useViewport();

  return (
    <SParamProvider>
      <PanelProvider>
        <FavoritesProvider>
          <Toaster />
          <Panel isMobile={isMobile} />
          <div className="h-screen overflow-hidden">
            <Header />
            <Content isMobile={isMobile} />
          </div>
          <FavoritesButton />
        </FavoritesProvider>
      </PanelProvider>
    </SParamProvider>
  );
};

export default App;