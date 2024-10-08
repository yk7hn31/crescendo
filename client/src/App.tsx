import React from 'react';
import Content from '@/components/Content';
import Header from '@/components/Header';
import { SearchProvider } from './store/Search';

const App: React.FC = () => {
  return (
    <SearchProvider>
      <div className="h-screen overflow-hidden">
        <Header />
        <Content />
      </div>
    </SearchProvider>
  );
};

export default App;