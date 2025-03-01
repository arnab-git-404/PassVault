// context.jsx
import { createContext, useContext } from 'react';

// Create the context
const GlobalContext = createContext();

// Custom hook to use the context
export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalContext;
