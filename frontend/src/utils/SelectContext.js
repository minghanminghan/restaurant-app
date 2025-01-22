import { useContext, createContext, useState } from "react";

export const SelectContext = createContext({count: 0, cost: 0});

const SelectProvider = ({children}) =>{
    const [val, setVal] = useState({count: 0, cost: 0});
    return (
        <SelectContext.Provider value={{val, setVal}}>
            {children}
        </SelectContext.Provider>
    )
}

export const useSelect = (id) =>{
    const val = useContext(SelectContext)[id.toString()];
    console.log(val);
    return val ?? 0;
}

export default SelectProvider;