import React, { useContext } from "react";
import { motion } from "framer-motion";
import FormActive from "@/store/FormActive";

const headerVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -20 }
};

const Header: React.FC = () => {
  const { isFormActive } = useContext(FormActive);

  return (
    <motion.div
      className='relative flex justify-center top-[40vh]'
      variants={headerVariants}
      initial='visible'
      animate={isFormActive ? 'hidden': 'visible'}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.3
      }}
    >
      <h1 className='mb-8 font-mono font-semibold text-4xl'>crescendo.</h1>
    </motion.div>
  );
}

export default Header;