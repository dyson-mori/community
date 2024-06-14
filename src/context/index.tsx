import { useEffect, useState, useContext, createContext } from 'react';
import * as Props from './types';

const Context = createContext<Props.ContextProps>({} as Props.ContextProps);

export const ContextProvider: React.FC<Props.ContextProvider> = ({children}) => {
  const [data, setData] = useState<Array<object>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    // useMedia({ array:Images, screens:'home' })
    //   .then(setMedia)
    //   .finally(() => setLoading(false));
  }, []);

  const contexts = {
    data,
    loading,
  };

  return (
    <Context.Provider value={contexts}>
      {children}
    </Context.Provider>
  );
};

export const useContexts = () => {
  const context = useContext(Context);
  return context;
};