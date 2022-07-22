import React, { useState, useEffect, useContext } from 'react'
import { Card, CardBody, Badge, Modal, ModalHeader, ModalBody, Button } from '@windmill/react-ui'
import PageTitle from '../../components/Typography/PageTitle'
import { deleteProduct, getProduct, getProducts } from '../../adapters/product'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { HeartIcon, PeopleIcon, EditIcon, TrashIcon, StarIcon, ChatIcon, PagesIcon } from '../../icons'
import InfoCard from '../../components/Cards/InfoCard'
import RoundIcon from '../../components/RoundIcon'
import { Link } from 'react-router-dom'

import { QAView } from "../QuestionAnswer/View"
import { RatingView } from '../Rating/View'
import { DescriptionEdit } from './DescriptionEdit'
import toast from 'react-hot-toast'
import { UserContext } from '../../context/UserContext'
import { ModalContext } from '../../context/ModalContext'
import { getTotalPrice } from '../../utils/helper/calculatePrice'
const moment = require('moment');

function View() {

    const [product, setProduct] = useState({ loading: true, data: {} })
    const location = useLocation();

    const [isRefreshed, setRefresh] = useState(false)

    const id = location.pathname.split('/')[3];
    useEffect(() => {
        getProduct(id)
            .then(response => {
                console.log(response)
                setProduct({ loading: false, data: response.data })
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

    const { setModalData, openModal, closeModal } = useContext(ModalContext)

    const { user } = useContext(UserContext)

    const handleDeletion = () => {
        const confirm = () => {
            toast.promise(
                deleteProduct(user.data.token, id)
                , {
                    loading: "Deleting product",
                    success: () => {
                        setRefresh(!isRefreshed);
                        closeModal();
                        return "Deleted product"
                    },
                    error: "Error deleting product"
                }
            )
        }
        openModal();
        setModalData({
            title: "Delete product",
            body: <div>
                All the related things like QAs, ratings would also be deleted permanently
                <Button onClick={confirm}>Confirm</Button>
            </div>
        })

    }
    return (
        <>
            {!product.loading ?
                <>
                    <PageTitle>

                        <div className="flex justify-between">
                            <span>Product Detail</span>
                            <div className='flex space-x-5'>
                                <Link to={"/app/product/" + id + "/edit"}>
                                    <Button icon={EditIcon} layout="link" aria-label="Delete" />
                                </Link>
                                <Button icon={TrashIcon} layout="link" aria-label="Delete" onClick={handleDeletion} />
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
                                                <td>{product.data.name}</td>
                                            </tr>
                                            <tr>
                                                <th className='text-left pr-2'>Category</th>
                                                <td>{product.data.category.name}</td>
                                            </tr>
                                            <tr>
                                                <th className='text-left pr-2'>Brand</th>
                                                <td>{product.data.brand.name}</td>
                                            </tr>

                                            <tr>
                                                <th className='text-left pr-2'>Summary</th>
                                                <td>{product.data.summary}</td>
                                            </tr>
                                            <tr>
                                                <th className='text-left pr-2'>Avg Rating</th>
                                                <td>{product.data.ratings_avg_rate}</td>
                                            </tr>
                                            <tr>
                                                <th className='text-left pr-2'>Created at</th>
                                                <td>{moment(product.data.created_at).calendar()}</td>
                                            </tr>
                                            <tr>
                                                <th className='text-left pr-2'>Updated at</th>
                                                <td>{moment(product.data.updated_at).calendar()}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </CardBody>
                        </Card>
                        <div className="flex flex-col space-y-3">
                            <InfoCard title="Wishlist Count" value={product.data.wish_list_count}>
                                <RoundIcon
                                    icon={PagesIcon}
                                    iconColorClass="text-orange-500 dark:text-orange-100"
                                    bgColorClass="bg-red-100 dark:bg-red-500"
                                    className="mr-4"
                                />
                            </InfoCard>
                            <InfoCard title="Ratings count" value={product.data.ratings_count}>
                                <RoundIcon
                                    icon={StarIcon}
                                    iconColorClass="text-orange-500 dark:text-orange-100"
                                    bgColorClass="bg-orange-100 dark:bg-orange-500"
                                    className="mr-4"
                                />
                            </InfoCard>
                            <InfoCard title="Question Answers count" value={product.data.question_answers_count}>
                                <RoundIcon
                                    icon={ChatIcon}
                                    iconColorClass="text-orange-500 dark:text-orange-100"
                                    bgColorClass="bg-green-100 dark:bg-green-500"
                                    className="mr-4"
                                />
                            </InfoCard>
                        </div>
                    </div>

                    <Card className="mb-8 shadow-md ">
                        <CardBody>

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
                                    {product.data.inventories.map((inventory, index) =>
                                        <tr key={index}>
                                            <td>{inventory.type}</td>
                                            <td>{inventory.price}</td>
                                            <td>{inventory.quantity}</td>
                                            <td>{inventory.discount === null ? '-' : inventory.discount.discount_percent + "%"}</td>
                                            <td>{getTotalPrice(inventory)}</td>
                                            <td>{inventory.discount === null ? '' : getStatusBadge(inventory.discount.active)}</td>
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
                                    {product.data.images.map((image, index) =>
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
                                {product.data.ratings.map((rating, index) =>
                                    <RatingView rating={rating} key={index} />
                                )}
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="mb-8 shadow-md ">
                        <CardBody>
                            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Questions and Answers</p>


                            <div className="text-gray-600 dark:text-gray-300">
                                {product.data.question_answers.map((question, index) =>
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
