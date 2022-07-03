import React, { createContext, useContext, useEffect, useState } from "react";
import { getAdvertisements } from "../adapters/advertisement";
import { UserContext } from "./UserContext";

export const AdvertisementContext = createContext();

export const AdvertisementProvider = ({ children }) => {

    const [advertisements, setAdvertisements] = useState([]);
    const [refresh, setRefreshed] = useState(false);

    const { user } = useContext(UserContext)

    useEffect(() => {
        getAdvertisements(user.data.token)
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