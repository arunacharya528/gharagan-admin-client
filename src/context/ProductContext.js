import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getProducts } from "../adapters/product";
import { UserContext } from "./UserContext";

export const ProductContext = createContext(
    {
        products: Array,
        refresh: Function
    }
);

export const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState([])
    const [isRefreshed, setRefresh] = useState(false)
    const { user } = useContext(UserContext)

    useEffect(() => {
        getProducts(user.data.token)
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