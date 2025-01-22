import { useContext, createContext, useState } from "react";

export const ThemeContext = createContext('dark');

const ThemeProvider = ({children}) =>{
  const [val, setVal] = useState('dark');
  return (
    <ThemeContext.Provider value={{val, setVal}}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () =>{
  const val = useContext(ThemeContext);
  if (val === undefined) throw new Error("Context is undefined")
  return val;
}

export default ThemeProvider;