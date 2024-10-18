import React from "react";
import { motion } from "framer-motion";

import { useSParamState } from "@/hooks/useSParam";

import { headerVariants, springTransition } from "@/definitions/variants";

const Header: React.FC<{isMobile: boolean}> = ({ isMobile }) => {
  const { isFormActive } = useSParamState();

  return (
    <motion.div
      className='relative flex flex-col items-center h-[50vh] justify-end'
      variants={headerVariants}
      initial='visible'
      animate={isFormActive ? 'hidden': 'visible'}
      transition={springTransition}
    >
      <h1 className='mb-2 font-mono font-semibold text-4xl tracking-tight'>crescendo.</h1>
      <h3 className='mb-2 text-gray-600 space-x-2'>
        {!isMobile && <>
          <span>powered by</span>
          <span className='font-semibold text-black'>iTunes</span>
          <span>/</span>
        </>}
        <span>made by</span>
        <a
          href='https://github.com/yk7hn31/crescendo'
          className='font-mono font-semibold text-black cursor-pointer rounded p-1 transition hover:bg-slate-100'
        >
          yk7hn31
        </a>
      </h3>
    </motion.div>
  );
}

export default Header;