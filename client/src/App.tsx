import React from 'react';

import { SParamProvider } from './store/SParam';
import Content from '@/components/Content';
import Header from '@/components/Header';

const App: React.FC = () => {
  return (
    <SParamProvider>
      <div className="h-screen overflow-hidden">
        <Header />
        <Content />
      </div>
    </SParamProvider>
  );
};

export default App;