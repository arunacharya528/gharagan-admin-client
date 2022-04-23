import React, { createContext, useEffect, useState } from "react";
import { getAdvertisements } from "../adapters/advertisement";
import { getFiles } from "../adapters/file";

export const FileContext = createContext();

export const FileProvider = ({ children }) => {

    const [files, setFiles] = useState([]);
    const [refresh, setRefreshed] = useState(false);

    useEffect(() => {
        getFiles()
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