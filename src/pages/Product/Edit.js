import React, { useContext, useEffect, useRef, useState } from "react";
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { HeartIcon, PeopleIcon, EditIcon, TrashIcon, EyeIcon } from '../../icons'


// import React, { useState, useEffect } from 'react'
import { Card, CardBody, Badge, Modal, ModalHeader, ModalBody } from '@windmill/react-ui'
import response from '../../utils/demo/productData'
import PageTitle from '../../components/Typography/PageTitle'
import { getproduct, getProducts } from '../../adapters/product'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
// import { HeartIcon, PeopleIcon, EditIcon, TrashIcon } from '../../icons'
import InfoCard from '../../components/Cards/InfoCard'
import RoundIcon from '../../components/RoundIcon'
import { Link } from 'react-router-dom'
import { GeneralInfoEdit } from "./GeneralInfoEdit";
import { InventoryEdit } from "./InventoryEdit";
import { DescriptionEdit } from "./DescriptionEdit";
import { FileSelect } from "../File/Select";
import { ImageHandler } from "./ImageHandler";


const Edit = () => {
    const location = useLocation();

    return (
        <>
            <PageTitle>

                <div className="flex justify-between">
                    <span>Edit Product</span>
                    <div className='flex space-x-5'>
                        <Link to={"/app/product/" + location.pathname.split('/')[3]}>
                            <EyeIcon className="w-5 h-5" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </PageTitle>
            <Card className="mb-8 shadow-md">
                <CardBody>
                    <div className="mb-4 font-semibold text-gray-600 dark:text-gray-300 flex justify-between">
                        <span>General Info</span>

                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                        <GeneralInfoEdit />
                    </div>
                </CardBody>
            </Card>

            <Card className="mb-8 shadow-md ">
                <CardBody>
                    <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Inventory</p>

                    <InventoryEdit />

                </CardBody>
            </Card>
            <Card className="mb-8 shadow-md ">
                <CardBody>
                    <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Photos</p>

                    <div className="text-gray-600 dark:text-gray-300">
                        <ImageHandler />
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default Edit;