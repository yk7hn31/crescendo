import React, { createContext, useState, Dispatch, SetStateAction } from 'react';

interface FormActiveCtxType {
  isFormActive: boolean;
  setIsFormActive: Dispatch<SetStateAction<boolean>>;
}

const FormActiveCtx = createContext<FormActiveCtxType>({
  isFormActive: false,
  setIsFormActive: () => {}
});

const FormActiveProvider: React.FC<{children: React.ReactNode}>
 = ({ children }) => {
  const [isFormActive, setIsFormActive] = useState<boolean>(false);

  return (
    <FormActiveCtx.Provider value={{isFormActive, setIsFormActive}}>
      {children}
    </FormActiveCtx.Provider>
  );
}

export default FormActiveCtx;
export { FormActiveProvider };