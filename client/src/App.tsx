import React from 'react';
import Content from '@/components/Content';
import Header from '@/components/Header';
import { FormActiveProvider } from './store/FormActive';

const App: React.FC = () => {
  return (
    <FormActiveProvider>
      <div className="h-screen overflow-hidden">
        <Header />
        <Content />
      </div>
    </FormActiveProvider>
  );
};

export default App;