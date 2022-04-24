import React, { useEffect, useState } from "react";
import { getOrders } from "../../adapters/orderDetail";

import { Card, CardBody, Modal, ModalHeader, ModalBody, Button } from '@windmill/react-ui'
import PageTitle from '../../components/Typography/PageTitle'
import { Link } from "react-router-dom";
import { EyeIcon } from "../../icons";

const moment = require('moment');
const Order = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders()
            .then(respose => setOrders(respose.data))
            .catch(error => console.log(error))
    }, [])



    const calculateTotal = (itemList, discount) => {

        const prices = itemList.map((item) => {
            const priceByQuantity = item.inventory.price * item.quantity
            const discountP = item.inventory.discount.discount_percent;
            return priceByQuantity - (0.01 * discountP * priceByQuantity)
        })

        var sum = 0;
        for (let i = 0; i < prices.length; i++) {
            sum += prices[i];
        }

        const initialPrice = Math.round((sum + Number.EPSILON) * 100) / 100;
        if (discount !== null) {
            sum = sum - (0.01 * discount.discount_percent * sum)
        }

        sum = Math.round((sum + Number.EPSILON) * 100) / 100
        return (
            <div className="grid grid-cols-3 gap-2">
                <b>Price</b>
                <span className="col-span-2">{initialPrice}</span>

                <b>Discount</b>
                <span className="col-span-2">{discount ? discount.discount_percent + "%" : "None"}</span>

                <b>Final Price</b>
                <span className="col-span-2">{sum}</span>
            </div>
        );
    }


    const [modalData, setModalData] = useState({ title: undefined, body: undefined });

    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalHeader>{modalData.title}</ModalHeader>
                <ModalBody>
                    {modalData.body}
                </ModalBody>

            </Modal>
            <PageTitle>
                <div className='flex justify-between align-middle'>
                    <span>Orders</span>
                </div>
            </PageTitle>

            <div className="text-gray-600 dark:text-gray-400">

                <Card className="mb-4 sticky top-0">
                    <CardBody>
                        <div className="grid grid-cols-7 gap-5 font-bold text-center">
                            <span>Order ID</span>
                            <span>Status</span>
                            <span className="col-span-2">Order Detail</span>
                            <span>Total</span>
                            <span>Date of actions</span>
                            <span>Action</span>
                        </div>
                    </CardBody>
                </Card>
                {orders.map((order, index) =>
                    <Card className="mb-4" key={index}>
                        <CardBody>
                            <div className="grid grid-cols-7 gap-2 items-center">

                                <div className="text-center">
                                    {order.id}
                                </div>
                                <div className="">
                                    {order.status}
                                </div>


                                <div className="flex flex-col col-span-2">
                                    <div className="border p-2 rounded-lg flex flex-col">
                                        {
                                            order.order_items.length !== 0 ?
                                                <>
                                                    <div className="grid grid-cols-3 gap-2 font-bold">
                                                        <span>Product</span>
                                                        <span>Quantity</span>
                                                        <span>Discount</span>
                                                    </div>
                                                    {
                                                        order.order_items.map((item, index) =>
                                                            <div className="grid grid-cols-3 gap-2">
                                                                <Link to={'/app/product/' + item.product.id + "/"} className="underline">
                                                                    {item.product.name}
                                                                </Link>

                                                                <span>
                                                                    {item.quantity}
                                                                </span>

                                                                <span>
                                                                    {item.inventory.discount
                                                                        ?
                                                                        <>
                                                                            <a href="" className="underline">
                                                                                {item.inventory.discount.name}
                                                                            </a>
                                                                            {' - '}
                                                                            {item.inventory.discount.discount_percent + "%"}
                                                                        </>
                                                                        : ""
                                                                    }

                                                                </span>


                                                            </div>
                                                        )
                                                    }
                                                </>
                                                : <span className="text-center">No ordered items</span>

                                        }
                                    </div>


                                    <span className="py-2 flex flex-col">
                                        {calculateTotal(order.order_items, order.discount)}
                                    </span>
                                </div>

                                {/* <div className="col-span-4">
                                    <div className="grid grid-cols-3 gap-2">
                                        <b>Name</b>
                                        <span className="col-span-2">{order.user.first_name}</span>

                                        <b>Contact</b>
                                        <span className="col-span-2">{order.user.contact}</span>

                                        <b>Email</b>
                                        <span className="col-span-2">{order.user.email}</span>

                                        {order.address ?
                                            <>
                                                <b>Address 1</b>
                                                <span className="col-span-2">{order.address.address_line1}</span>

                                                <b>Address 2</b>
                                                <span className="col-span-2">{order.address.address_line2}</span>

                                                <b>City</b>
                                                <span className="col-span-2">{order.address.city}</span>

                                                <b>Telephone</b>
                                                <span className="col-span-2">{order.address.telephone}</span>

                                                <b>Mobile</b>
                                                <span className="col-span-2">{order.address.mobile}</span>
                                            </>

                                            : <span>No address provided</span>
                                        }
                                    </div>
                                </div> */}
                                <div className="text-center">
                                    {order.total}
                                </div>

                                <div className="flex flex-col ">
                                    <span><b>C: </b>{moment(order.created_at).fromNow()}</span>
                                    <span><b>U: </b>{moment(order.updated_at).fromNow()}</span>
                                </div>

                                <div className="flex justify-center">
                                    <Link to={"/app/order/" + order.id + "/view"}>
                                        <Button icon={EyeIcon} layout="link" aria-label="Like" />

                                    </Link>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                )}

                <Card className="mb-4 sticky bottom-0">
                    <CardBody>
                        <div className="grid grid-cols-7 gap-5 font-bold text-center">
                            <span>Order ID</span>
                            <span>Status</span>
                            <span className="col-span-2">Order Detail</span>
                            <span>Total</span>
                            <span>Date of actions</span>
                            <span>Action</span>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default Order;