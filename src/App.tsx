import React, { useState } from 'react';
import SearchForm from '@/components/SearchForm';
import Header from '@/components/Header';

const App: React.FC = () => {
  const [isFormActive, setIsFormActive] = useState<boolean>(false);

  return (
    <div className="relative flex flex-col items-center justify-center p-6 h-screen">
      <Header isFormActive={isFormActive} />
      <SearchForm formState={[isFormActive, setIsFormActive]} />
    </div>
  );
};

export default App;