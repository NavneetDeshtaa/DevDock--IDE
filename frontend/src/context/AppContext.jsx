import { createContext } from "react";

export const AppContext  = createContext();   // AppContext  is my context object 

const AppContextProvider = ({ children }) => {
  const api_base_url = import.meta.env.VITE_BACKEND_URL;

  const value = { api_base_url };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
