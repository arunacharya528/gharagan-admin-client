import React, { useContext, useEffect, useRef, useState } from "react";
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { HeartIcon, PeopleIcon, EditIcon, TrashIcon } from '../../icons'


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

    return (
        <>
            <PageTitle>

                <div className="flex justify-between">
                    <span>Edit Product</span>
                    <div className='flex space-x-5'>

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
                    <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Update Description</p>
                    <p className='text-gray-600 dark:text-gray-400'>
                        <DescriptionEdit />
                    </p>

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
            <Card className="mb-8 shadow-md ">
                <CardBody>
                    <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Ratings</p>
                    <div className="text-gray-600 dark:text-gray-300">

                    </div>
                </CardBody>
            </Card>

            <Card className="mb-8 shadow-md ">
                <CardBody>
                    <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Questions and Answers</p>


                    <div className="text-gray-600 dark:text-gray-300">

                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default Edit;