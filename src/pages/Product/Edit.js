import React, { useContext, useEffect, useRef, useState } from "react";
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { HeartIcon, PeopleIcon, EditIcon, TrashIcon } from '../../icons'


// import React, { useState, useEffect } from 'react'
import { Card, CardBody, Badge, Modal, ModalHeader, ModalBody } from '@windmill/react-ui'
import response from '../../utils/demo/productData'
import PageTitle from '../../components/Typography/PageTitle'
import { getproduct, getProducts } from './adapter'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
// import { HeartIcon, PeopleIcon, EditIcon, TrashIcon } from '../../icons'
import InfoCard from '../../components/Cards/InfoCard'
import RoundIcon from '../../components/RoundIcon'
import { Link } from 'react-router-dom'
import { GeneralInfoEdit } from "./GeneralInfoEdit";
import { InventoryEdit } from "./InventoryEdit";
import { DescriptionEdit } from "./DescriptionEdit";


const Edit = () => {



    const [product, setProduct] = useState(undefined);
    const [editor, setEditor] = useState(null);
    const location = useLocation();

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    useEffect(() => {
        getproduct(location.pathname.split('/')[3])
            .then(response => {
                // console.log(response.data)
                setProduct(response.data)
            })
            .catch(error => console.log(error))
    }, [])


    return (
        <>
            <PageTitle>

                <div className="flex justify-between">
                    <span>Edit Product</span>
                    <div className='flex space-x-5'>

                    </div>
                </div>
            </PageTitle>
            <div className="grid gap-6 mb-8 md:grid-cols-2">
                <Card>
                    <CardBody>
                        <div className="mb-4 font-semibold text-gray-600 dark:text-gray-300 flex justify-between">
                            <span>General Info</span>

                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                            {product ?
                                <GeneralInfoEdit product={product} />
                                : ''
                            }

                        </div>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <div className="mb-4 font-semibold text-gray-600 dark:text-gray-300 flex justify-between">
                            <span>Unchangeable details</span>

                        </div>
                        <div className="text-gray-600 dark:text-gray-400">

                        </div>
                    </CardBody>
                </Card>
            </div>

            <Card className="mb-8 shadow-md ">
                <CardBody>
                    <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Update Description</p>
                    <p className='text-gray-600 dark:text-gray-400'>
                        <DescriptionEdit/>
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

                    <div className="">
                        <div className="flex overflow-auto">
                            {/* {data.images.map((image, index) =>
                                <img src={image.image} className="flex-initial w-64 mr-4 rounded-lg mb-6" key={index} />
                            )} */}
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Card className="mb-8 shadow-md ">
                <CardBody>
                    <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Ratings</p>
                    <div className="text-gray-600 dark:text-gray-300">
                        {/* {data.ratings.map((rating, index) =>
                            <div class="p-6 rounded-xl flex items-center space-x-4">
                                <div>
                                    <div class="text-md font-bold flex">{rating.user.first_name + ' ' + rating.user.last_name} &nbsp;
                                        ({rating.rate} <HeartIcon className='w-5 h-5' />)
                                    </div>
                                    <p class="text-slate-500">{rating.comment}</p>
                                    <span className='italic font-light text-gray-400'>{moment(rating.created_at).calendar()}</span>
                                </div>
                            </div>
                        )} */}
                    </div>
                </CardBody>
            </Card>

            <Card className="mb-8 shadow-md ">
                <CardBody>
                    <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Questions and Answers</p>


                    <div className="text-gray-600 dark:text-gray-300">
                        {/* {data.questions.map((question, index) =>
                            <div class="p-6 rounded-xl flex space-x-4 flex-col">
                                <div>
                                    <div class="text-md font-bold">{question.user.first_name + ' ' + question.user.last_name}</div>
                                    <p class="text-slate-500">{question.query}</p>
                                    <span className='italic font-light text-gray-400'>{moment(question.created_at).calendar()}</span>
                                    {
                                        question.answers.length != 0
                                            ?
                                            <div className='pl-6 pt-3'>
                                                <div class="text-md font-bold">Replied</div>
                                                <p class="text-slate-500">{question.answers[0].query}</p>
                                                <span className='italic font-light text-gray-400'>{moment(question.created_at).calendar()}</span>
                                            </div>
                                            : ""
                                    }
                                </div>
                            </div>
                        )} */}
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default Edit;