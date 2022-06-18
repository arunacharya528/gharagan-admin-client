import React from "react"
import { AdvertisementProvider } from "./AdvertisementContext"
import { FileProvider } from "./FileContext"
import { ModalProvider } from "./ModalContext"
import { PageProvider } from "./PageContext"

export const ContextList = ({ children }) => {


    return (
        <FileProvider>
            <AdvertisementProvider>
                <PageProvider>
                    <ModalProvider>
                        {children}
                    </ModalProvider>
                </PageProvider>
            </AdvertisementProvider>
        </FileProvider>
    )
}