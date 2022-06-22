import React from "react"
import { AdvertisementProvider } from "./AdvertisementContext"
import { DiscountProvider } from "./DiscountContext"
import { FileProvider } from "./FileContext"
import { ModalProvider } from "./ModalContext"
import { PageProvider } from "./PageContext"

export const ContextList = ({ children }) => {


    return (
        <DiscountProvider>
            <FileProvider>
                <AdvertisementProvider>
                    <PageProvider>
                        <ModalProvider>
                            {children}
                        </ModalProvider>
                    </PageProvider>
                </AdvertisementProvider>
            </FileProvider>
        </DiscountProvider>
    )
}