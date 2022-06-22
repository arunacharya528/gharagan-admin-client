import React, { createContext, useEffect, useState } from "react";
import { getDiscounts } from "../adapters/discount";

/**
 * Context of discounts
 */
export const DiscountContext = createContext({
    discounts: Array,
    updateDiscount: Function,
    getActiveDiscounts: Array
});

export const DiscountProvider = ({ children }) => {
    const [discounts, setDiscounts] = useState([]);
    const [isRefreshed, setRefresh] = useState(false);

    useEffect(() => {
        getDiscounts()
            .then(response => setDiscounts(response.data))
            .catch(error => console.log(error))
    }, [isRefreshed])

    return <DiscountContext.Provider value={{
        discounts,
        updateDiscount: () => { setRefresh(!isRefreshed) },
        getActiveDiscounts: () => discounts.filter((discount) => discount.active === 1)
    }}>{children}</DiscountContext.Provider>
}