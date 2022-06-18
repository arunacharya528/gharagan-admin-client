import React from "react"
import { AdvertisementProvider } from "./AdvertisementContext"
import { FileProvider } from "./FileContext"
import { ModalProvider } from "./ModalContext"
import { PageProvider } from "./PageContext"

export const ContextList = ({ children }) => {


    return (
        <ModalProvider>
            <FileProvider>
                <AdvertisementProvider>
                    <PageProvider>
                        {children}
                    </PageProvider>
                </AdvertisementProvider>
            </FileProvider>
        </ModalProvider>
    )
}