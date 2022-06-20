import React, { useState, useEffect } from 'react'
import { Card, CardBody, Badge, Modal, ModalHeader, ModalBody } from '@windmill/react-ui'
import PageTitle from '../../components/Typography/PageTitle'
import { getProduct, getProducts } from '../../adapters/product'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { HeartIcon, PeopleIcon, EditIcon, TrashIcon } from '../../icons'
import InfoCard from '../../components/Cards/InfoCard'
import RoundIcon from '../../components/RoundIcon'
import { Link } from 'react-router-dom'

import { QAView } from "../QuestionAnswer/View"
import { RatingView } from '../Rating/View'
import { DescriptionEdit } from './DescriptionEdit'
const moment = require('moment');

function View() {

    const [data, setData] = useState(undefined)
    const location = useLocation();

    const [isRefreshed, setRefresh] = useState(false)
    useEffect(() => {
        getProduct(location.pathname.split('/')[3])
            .then(response => {
                setData(response.data)
            })
            .catch(error => console.log(error))
    }, [isRefreshed])


    const getStatusBadge = (status) => {
        switch (status) {
            case 0:
                return <Badge type="danger">inactive</Badge>
            case 1:
                return <Badge type="success">active</Badge>

        }
    }

    const getDiscountedPrice = (price, discountP) => {
        const result = price - (0.01 * discountP * price);
        return Math.round(((result) + Number.EPSILON) * 100) / 100
    }


    //=========================================
    //      Modal data
    //=========================================


    const [modalData, setModalData] = useState({ title: undefined, body: undefined });
    const [isModalOpen, setIsModalOpen] = useState(false)
    function openModal() {
        setIsModalOpen(true)
    }
    function closeModal() {
        setIsModalOpen(false)
    }

    const handleGeneralInfoEdit = () => {
        openModal();
        setModalData({
            title: "Edit general info",
            body: <></>
        });
    }
    return (
        <>
            {data ?
                <>
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <ModalHeader>{modalData.title}</ModalHeader>
                        <ModalBody>
                            {modalData.body}
                        </ModalBody>

                    </Modal>
                    <PageTitle>

                        <div className="flex justify-between">
                            <span>Product Detail</span>
                            <div className='flex space-x-5'>
                                <Link layout="link" size="icon" aria-label="Edit" to={"/app/product/" + data.id + "/edit"}>
                                    <EditIcon className="w-5 h-5" aria-hidden="true" />
                                </Link>
                                <Link layout="link" size="icon" aria-label="Edit" to={"/app/product/"}>
                                    <TrashIcon className="w-5 h-5" aria-hidden="true" />
                                </Link>
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
                                    <table>
                                        <tbody>

                                            <tr>
                                                <th className='text-left pr-2'>Name</th>
                                                <td>{data.name}</td>
                                            </tr>
                                            <tr>
                                                <th className='text-left pr-2'>SKU</th>
                                                <td>{data.SKU}</td>
                                            </tr>
                                            <tr>
                                                <th className='text-left pr-2'>Category</th>
                                                <td>{data.category.name}</td>
                                            </tr>
                                            <tr>
                                                <th className='text-left pr-2'>Brand</th>
                                                <td>{data.brand.name}</td>
                                            </tr>

                                            <tr>
                                                <th className='text-left pr-2'>Summary</th>
                                                <td>{data.summary}</td>
                                            </tr>
                                            <tr>
                                                <th className='text-left pr-2'>Created at</th>
                                                <td>{moment(data.created_at).calendar()}</td>
                                            </tr>
                                            <tr>
                                                <th className='text-left pr-2'>Updated at</th>
                                                <td>{moment(data.updated_at).calendar()}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </CardBody>
                        </Card>
                        <div>
                            <InfoCard title="Views" value={data.views}>
                                <RoundIcon
                                    icon={PeopleIcon}
                                    iconColorClass="text-orange-500 dark:text-orange-100"
                                    bgColorClass="bg-orange-100 dark:bg-orange-500"
                                    className="mr-4"
                                />
                            </InfoCard>
                        </div>
                    </div>

                    <Card className="mb-8 shadow-md ">
                        <CardBody>
                            {/* <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Description</p>
                         

                            <div dangerouslySetInnerHTML={{ __html: data.description }} className="text-gray-600 dark:text-gray-400 unrest" /> */}
<DescriptionEdit />
                        </CardBody>
                    </Card>
                    <Card className="mb-8 shadow-md ">
                        <CardBody>
                            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Inventory</p>
                            <table className='table-auto w-full text-gray-600 dark:text-gray-400 '>
                                <tbody>
                                    <tr className='text-left text-gray-600 dark:text-gray-300'>
                                        <th className='py-2'>Type</th>
                                        <th className='py-2'>Price</th>
                                        <th className='py-2'>Quantity</th>
                                        <th className='py-2'>Discount %</th>
                                        <th className='py-2'>Amount</th>
                                        <th className='py-2'>Discount Status</th>
                                    </tr>
                                    {data.inventories.map((inventory, index) =>
                                        <tr key={index}>
                                            <td>{inventory.type}</td>
                                            <td>{inventory.price}</td>
                                            <td>{inventory.quantity}</td>
                                            <td>{inventory.discount.discount_percent}%</td>
                                            <td>{getDiscountedPrice(inventory.price, inventory.discount.discount_percent)}</td>
                                            <td>{getStatusBadge(inventory.discount.active)}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </CardBody>
                    </Card>
                    <Card className="mb-8 shadow-md ">
                        <CardBody>
                            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Photos</p>

                            <div className="">
                                <div className="grid sm:grid-cols-3 md:grid-cols-5 gap-5">
                                    {data.images.map((image, index) =>
                                        <img src={image.file ? process.env.REACT_APP_FILE_PATH + '/' + image.file.path : image.image_url} className="flex-initial w-64 h-auto mr-4 rounded-lg mb-6" key={index} />
                                    )}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                    <Card className="mb-8 shadow-md ">
                        <CardBody>
                            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Ratings</p>
                            <div className="text-gray-600 dark:text-gray-300">
                                {data.ratings.map((rating, index) =>
                                    <RatingView rating={rating} key={index} />
                                )}
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="mb-8 shadow-md ">
                        <CardBody>
                            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Questions and Answers</p>


                            <div className="text-gray-600 dark:text-gray-300">
                                {data.question_answers.map((question, index) =>
                                    <QAView question={question} refresh={() => { setRefresh(!isRefreshed) }} key={index} />
                                )}
                            </div>
                        </CardBody>
                    </Card>
                </>

                : ''}

        </>
    )
}

export default View
