export const headerVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -20 }
};

export const formVariants = {
  visible: { y: 0, opacity: 1},
  hidden: { y: 30, opacity: 0 }
};

export const formSelectVariants = {
  visible: { y: 0, opacity: 1 },
  hidden: { y: 10, opacity: 0 }
};

export const blurButtonVariants = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0.8 }
};

export const buttonVariants = {
  visible: { opacity: 1, y: 70 },
  hidden: { opacity: 0, y: 90 }
};

export const contentDivVariants = {
  initial: { top: '40vh' },
  focused: { top: 0 }
}

export const itemListVariants = {
  visible: { y: 0, opacity: 1, transition: {delay: 0.2} },
  hidden: { y: 30, opacity: 0 }
}

export const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30
};