import React from 'react';
import Content from '@/components/Content';
import Header from '@/components/Header';
import { FormActiveProvider } from './store/FormActive';

const App: React.FC = () => {
  return (
    <FormActiveProvider>
      <div className="relative flex flex-col items-center justify-center p-6 h-screen">
        <Header />
        <Content />
      </div>
    </FormActiveProvider>
  );
};

export default App;