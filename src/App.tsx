import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SearchForm from './components/SearchForm';

const App: React.FC = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };
  const inputVariants = {
    initial: { y: 0 },
    focused: { y: -50 }
  };

  function handleInputFocus() {
    setIsFocused(prev => !prev);
  }

  return (
    <div
      className="flex flex-col items-center justify-center p-6 h-screen"
    >
      <motion.div
        variants={headerVariants}
        initial='visible'
        animate={isFocused ? 'hidden': 'visible'}
        transition={{duration: 0.3}}
      >
        <h1 className='mb-8 font-mono font-semibold text-4xl'>crescendo.</h1>
      </motion.div>
      <motion.div
        className='w-5/12 max-w-[510px] min-w-[330px]'
        variants={inputVariants}
        initial='initial'
        animate={isFocused ? 'focused' : 'initial'}
        transition={{duration: 0.3}}
      >
        <SearchForm onFocus={handleInputFocus} />
      </motion.div>
    </div>
  );
};

export default App;