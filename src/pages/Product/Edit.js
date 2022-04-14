import React, { useContext, useRef, useState } from "react";
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
import { Editor } from '@tinymce/tinymce-react';
// import 'tinymce/plugins/link';
const Edit = () => {



    const [name, setName] = useState('');


    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
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
                            <Label>
                                <span>Name</span>
                                <Input className="mt-1" placeholder="Enter product name" />
                            </Label>
                            <Label className="mt-4">
                                <span>Summary</span>
                                <Textarea className="mt-1" rows="3" placeholder="Enter summary" />
                            </Label>
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

            {/* <Card className="mb-8 shadow-md ">
                <CardBody>
                    <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Description</p>
                    <p className='text-gray-600 dark:text-gray-400'>

                        <Label className="mt-4">
                            <span>Message</span>
                            <Textarea className="mt-1" rows="10" placeholder="Enter some long form content." />
                        </Label>

                    </p>

                </CardBody>
            </Card> */}
            <Card className="mb-8 shadow-md ">
                <CardBody>
                    <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Inventory</p>
                    <table className='table-auto w-full text-gray-600 dark:text-gray-400 '>
                        <tbody>
                            <tr className='text-left text-gray-600 dark:text-gray-300'>
                                <th className='py-2'>Type</th>
                                <th className='py-2'>Price</th>
                                <th className='py-2'>Discount %</th>
                                <th className='py-2'>Amount</th>
                                <th className='py-2'>Status</th>
                            </tr>
                            <tr>
                                <th>
                                    <Input className="mt-1" placeholder="Jane Doe" />
                                </th>
                                <th>
                                    <Input className="mt-1" placeholder="Jane Doe" />
                                </th>
                                <th>
                                    <Input className="mt-1" placeholder="Jane Doe" />
                                </th>
                                <th>
                                    123
                                </th>
                                <th>
                                    <Select className="mt-1">
                                        <option value={'active'}>Active</option>
                                        <option value={'inactive'}>Inactive</option>
                                    </Select>
                                </th>
                                <th>
                                    <button>Save</button>
                                </th>
                            </tr>
                            
                            {/* {data.inventories.map((inventory, index) =>
                                <tr key={index}>
                                    <td>{inventory.type}</td>
                                    <td>{inventory.price}</td>
                                    <td>{inventory.discount.discount_percent}%</td>
                                    <td>{getDiscountedPrice(inventory.price, inventory.discount.discount_percent)}</td>
                                    <td>{getStatusBadge(inventory.discount.active)}</td>
                                </tr>
                            )} */}
                        </tbody>
                    </table>

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