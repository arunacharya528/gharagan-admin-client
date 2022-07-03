import React, { createContext, useContext, useEffect, useState } from "react";
import { getAdvertisements } from "../adapters/advertisement";
import { getFiles } from "../adapters/file";
import { UserContext } from "./UserContext";

export const FileContext = createContext();

export const FileProvider = ({ children }) => {

    const [files, setFiles] = useState([]);
    const [refresh, setRefreshed] = useState(false);

    const { user } = useContext(UserContext)

    useEffect(() => {
        getFiles(user.data.token)
            .then(response => {
                setFiles(response.data)
            })
            .catch(error => console.log(error))
    }, [refresh]);

    const updateFiles = () => {
        setRefreshed(!refresh)
    }


    return <FileContext.Provider value={{ files, updateFiles }
    }>{children}</FileContext.Provider>
}