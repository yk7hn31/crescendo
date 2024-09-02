import React from 'react';
import { Card } from '@/components/ui/card';
import SearchHeader from './components/SearchHeader';
import SearchBody from './components/SearchBody';

const App: React.FC = () => {
  return (
    <div
    className="flex content-center justify-center p-6"
    >
      <Card className="w-96">
        <SearchHeader />
        <SearchBody />
      </Card>
    </div>
  );
};

export default App;