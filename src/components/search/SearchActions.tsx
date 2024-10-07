import { Dispatch, SetStateAction, useContext, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchToggle from './SearchToggle';
import SearchInput from './SearchInput';
import FormActiveCtx from '@/store/FormActive';
import type { SearchType } from '@/types/types';

interface SearchFormProps {
  handleSubmit: (e: React.FormEvent) => void;
  paramState: [{query: string, type: SearchType},
    Dispatch<SetStateAction<{query: string, type: SearchType}>>
  ];
  isMobile: boolean;
}

const formVariants = {
  visible: { y: 0, opacity: 1 },
  hidden: { y: 30, opacity: 0 }
};

const formToggleVariants = {
  visible: { y: 0, opacity: 1 },
  hidden: { y: 10, opacity: 0 }
};

const blurButtonVariants = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0.8 }
};

const buttonVariants = {
  visible: { opacity: 1, top: '100%', y: 0 },
  hidden: { opacity: 0, top: '100%', y: -20 }
};

const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30
};

const SearchButton: React.FC = () => {
  const { setIsFormActive } = useContext(FormActiveCtx);

  const handleButtonClick = () => {
    setIsFormActive(true);
  }

  return (
    <motion.div
      className='absolute'
      variants={buttonVariants}
      initial='hidden'
      animate='visible'
      transition={springTransition}
      exit='hidden'
    >
      <Button variant='outline' onClick={handleButtonClick}>
        <Search className='mr-2 h-4 w-4' />
        Search
      </Button>
    </motion.div>
  );
}

const SearchForm: React.FC<SearchFormProps> = ({ paramState, handleSubmit, isMobile }) => {
  const { isFormActive, setIsFormActive } = useContext(FormActiveCtx);
  const inputRef = useRef<HTMLInputElement>(null);
  const [params, setParams] = paramState;

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams(p => ({ ...p, query: e.target.value }));
  };

  const handleInputFocus = () => {
    setIsFormActive(true);
  };

  const handleInputBlur = () => {
    setIsFormActive(false);
  }

  useEffect(() => {
    if (isFormActive) inputRef.current?.focus();
  }, [isFormActive]);

  return (
    <motion.form
      onSubmit={handleSubmit}
      className='flex flex-col gap-y-2 w-1/2 max-w-[530px] min-w-[330px]'
      variants={formVariants}
      initial={isMobile ? 'hidden' : 'visible'}
      transition={springTransition}
      exit='hidden'
    >
      <motion.div layout className='flex space-x-2 items-center'>
        <SearchInput
          key='search-input'
          placeholder='Search for artists, songs, albums...'
          value={params.query}
          onChange={handleQueryChange}
          onFocus={handleInputFocus}
          ref={inputRef}
        />
        <AnimatePresence mode='popLayout'>
          {isFormActive &&
          <motion.button
            key='search-blur-button'
            className='w-10 h-10 rounded-full flex justify-center items-center transition hover:bg-gray-100'
            onClick={handleInputBlur}
            type='button'
            variants={blurButtonVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
          >
            <X className='text-gray-500' />
          </motion.button>}
        </AnimatePresence>
      </motion.div>
      <motion.div
        variants={formToggleVariants}
        initial='hidden'
        animate={isFormActive ? 'visible' : 'hidden'}
        transition={{ delay: 0.2, ...springTransition }}
      >
        <SearchToggle
          searchType={params.type}
          setParams={setParams}
        />
      </motion.div>
    </motion.form>
  );
}

export { SearchButton, SearchForm };