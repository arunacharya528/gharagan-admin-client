import React, { createContext, useEffect, useState } from "react";
import { getAdvertisements } from "../adapters/advertisement";

export const AdvertisementContext = createContext();

export const AdvertisementProvider = ({ children }) => {

    const [advertisements, setAdvertisements] = useState([]);
    const [refresh, setRefreshed] = useState(false);

    useEffect(() => {
        getAdvertisements()
            .then(response => {
                setAdvertisements(response.data)
            })
            .catch(error => console.log(error))
    }, [refresh]);

    const updateAds = () => {
        setRefreshed(!refresh)
    }

    return <AdvertisementContext.Provider value={{ advertisements, updateAds }
    }>{children}</AdvertisementContext.Provider>
}