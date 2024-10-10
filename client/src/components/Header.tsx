import React from "react";
import { motion } from "framer-motion";

import { useSearchState } from "@/hooks/useSParam";

import { headerVariants, springTransition } from "@/definitions/variants";

const Header: React.FC = () => {
  const { isFormActive } = useSearchState();

  return (
    <motion.div
      className='relative flex justify-center top-[40vh]'
      variants={headerVariants}
      initial='visible'
      animate={isFormActive ? 'hidden': 'visible'}
      transition={springTransition}
    >
      <h1 className='mb-8 font-mono font-semibold text-4xl'>crescendo.</h1>
    </motion.div>
  );
}

export default Header;