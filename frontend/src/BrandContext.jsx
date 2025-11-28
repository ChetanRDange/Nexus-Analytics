// BrandContext.js
import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";

const BrandContext = createContext();

export const BrandProvider = ({ children }) => {
  const [brand, setBrand] = useState(null);


  const { data, loading } = useFetch("/public/brand");

  useEffect(() => {
    if (data) {
      setBrand(data?.data);
    }
  }, [data]);
  return (
    <BrandContext.Provider value={{ brand}}>{children}</BrandContext.Provider>
  );
};

export const useBrand = () => useContext(BrandContext);
