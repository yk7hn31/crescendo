import React from "react";
import { motion } from "framer-motion";

interface HeaderProps {
  isFormActive: boolean;
}

const headerVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -20 }
};

const Header: React.FC<HeaderProps> = ({ isFormActive }) => {
  return (
    <motion.div
      variants={headerVariants}
      initial='visible'
      animate={isFormActive ? 'hidden': 'visible'}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.5
      }}
    >
      <h1 className='mb-8 font-mono font-semibold text-4xl'>crescendo.</h1>
    </motion.div>
  );
}

export default Header;