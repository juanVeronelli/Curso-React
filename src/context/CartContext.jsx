import { createContext, useState } from "react";

export const productContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([])

    //logica para añadir una nueva orden al context
    const handleClickCart = (product, activeItem) => {
      const newOrder = { product, activeItem };
      setProducts([...products, newOrder]);
    };
  return (
    <productContext.Provider value={[products, handleClickCart]}>
      {children}
    </productContext.Provider>
  );
};
