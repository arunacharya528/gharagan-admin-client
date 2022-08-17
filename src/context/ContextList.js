import React from "react"
import { AdvertisementProvider } from "./AdvertisementContext"
import { DiscountProvider } from "./DiscountContext"
import { FileProvider } from "./FileContext"
import { ModalProvider } from "./ModalContext"
import { PageProvider } from "./PageContext"
import { ProductProvider } from "./ProductContext"

export const ContextList = ({ children }) => {


    return (
        <ProductProvider>
            <DiscountProvider>
                <FileProvider>
                    <AdvertisementProvider>
                        <ModalProvider>
                            {children}
                        </ModalProvider>
                    </AdvertisementProvider>
                </FileProvider>
            </DiscountProvider>
        </ProductProvider>
    )
}