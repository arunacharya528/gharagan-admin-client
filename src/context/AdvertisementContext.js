import React, { createContext, useEffect, useState } from "react";
import { getAdvertisements } from "../adapters/advertisement";

export const AdvertisementContext = createContext();

export const AdvertisementProvider = ({ children }) => {

    const [advertisements, setAdvertisements] = useState([]);

    useEffect(() => {
        getAdvertisements()
            .then(response => {
                // console.log(response);
                setAdvertisements(response.data)
            })
            .catch(error => console.log(error))
    }, []);


    return <AdvertisementContext.Provider value={[advertisements, setAdvertisements]}>{children}</AdvertisementContext.Provider>
}