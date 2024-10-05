import { Dispatch, SetStateAction, useContext, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
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
}

// const formVariants = {
//   initial: { y: 70, opacity: 1, top: 'auto' },
//   focused: { y: 0, opacity: 1, top: 20 },
//   hidden: { y: 0, opacity: 0, top: 40 }
// };

const formVariants = {
  initial: { y: 70, opacity: 1 },
  focused: { y: 0, opacity: 1},
  hidden: { y: 20, opacity: 0 }
};

const buttonVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -20 }
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

const SearchForm: React.FC<SearchFormProps> = ({ paramState, handleSubmit }) => {
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
      className='absolute flex flex-col gap-y-2 w-5/12 max-w-[510px] min-w-[330px]'
      variants={formVariants}
      initial='initial'
      animate={isFormActive ? 'focused' : 'initial'}
      transition={springTransition}
      exit='hidden'
    >
      <SearchInput
        placeholder='Search for artists, songs, albums...'
        value={params.query}
        onChange={handleQueryChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, ...springTransition }}
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