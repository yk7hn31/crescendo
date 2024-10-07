import React, { useContext } from "react";
import { motion } from "framer-motion";
import FormActiveCtx from "@/store/FormActive";

interface SearchItemListProps {
  children: React.ReactNode;
}

const itemListVariants = {
  visible: { y: 0, opacity: 1 },
  hidden: { y: 30, opacity: 0 }
}

const SearchItemList: React.FC<SearchItemListProps> = ({ children }) => {
  const { isFormActive } = useContext(FormActiveCtx);

  return (
    <motion.div
      className='w-7/12 pb-8 space-y-[-1px]'
      variants={itemListVariants}
      initial='hidden'
      animate={isFormActive ? 'visible' : 'hidden'}
      exit='hidden'
    >
      {children}
    </motion.div>
  );
}

export default SearchItemList;