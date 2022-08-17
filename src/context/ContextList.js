import React from "react"
import { AdvertisementProvider } from "./AdvertisementContext"
import { DiscountProvider } from "./DiscountContext"
import { FileProvider } from "./FileContext"
import { ModalProvider } from "./ModalContext"
import { PageProvider } from "./PageContext"
import { ProductProvider } from "./ProductContext"
import {  UserListProvider } from "./UserListContext"

export const ContextList = ({ children }) => {


    return (
        <UserListProvider>
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
        </UserListProvider>

    )
}