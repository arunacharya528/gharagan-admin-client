import React, { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getProducts } from "../adapters/product";

export const ProductContext = createContext(
    {
        products: Array,
        refresh: Function
    }
);

export const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState([])
    const [isRefreshed, setRefresh] = useState(false)

    useEffect(() => {

        getProducts()
            .then(response => {
                setProducts(response.data)
            })
            .catch(error => console.log(error));
    }, [isRefreshed])

    return <ProductContext.Provider value={{
        products,
        refresh: () => setRefresh(!isRefreshed)
    }}>{children}</ProductContext.Provider>
}