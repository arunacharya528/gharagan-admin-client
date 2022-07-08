import React from "react";
import { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import { getPages } from "../adapters/page";
import { UserContext } from "./UserContext";

export const PageContext = createContext();

export const PageProvider = ({ children }) => {

    const [pages, setPages] = useState([]);
    const [isRefreshed, setRefresh] = useState(false);
    const { user } = useContext(UserContext);
    
    useEffect(() => {
        getPages(user.data.token)
            .then(response => setPages(response.data))
            .catch(error => console.log(error))
    }, [isRefreshed])


    return <PageContext.Provider value={{
        pages,
        updatePages: () => { setRefresh(!isRefreshed) }
    }}>{children}</PageContext.Provider>
}