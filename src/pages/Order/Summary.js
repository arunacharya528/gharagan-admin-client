import React from "react";
import { Card, CardBody, Button } from '@windmill/react-ui'
import { Link } from "react-router-dom";
import moment from "moment";
import { EyeIcon } from "../../icons";
export const OrderSummary = ({ order }) => {
    const calculateTotal = (itemList, discount) => {

        const prices = itemList.map((item) => {
            const priceByQuantity = item.inventory.price * item.quantity
            const discountP = item.inventory.discount ? item.inventory.discount.discount_percent : 0;
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

    const getStatus = (status) => {
        var level = 0;

        if (status.toLowerCase() === "Order Placed".toLowerCase()) {
            level = 1
        } else if (status.toLowerCase() === "Product collected for delivery".toLowerCase()) {
            level = 2
        } else if (status.toLowerCase() === "Product being shipped".toLowerCase()) {
            level = 3
        } else if (status.toLowerCase() === "Product received".toLowerCase()) {
            level = 4
        }

        const determineColor = (levelValue) => {
            if (level < levelValue) {
                return 'bg-gray-300 dark:bg-gray-700'
            } else {
                return 'bg-purple-300 dark:bg-purple-700'
            }
        }
        return (
            <>
                <div className={"text-gray-700 dark:text-white py-1 pl-5 rounded-l-full " + determineColor(1)}>
                    Order Placed
                </div>
                <div className={"text-gray-700 dark:text-white p-1 " + determineColor(2)}>
                    Product collected for delivery
                </div>
                <div className={"text-gray-700 dark:text-white p-1 " + determineColor(3)}>
                    Product being shipped
                </div>
                <div className={"text-gray-700 dark:text-white p-1  rounded-r-full " + determineColor(4)}>
                    Product received
                </div></>
        );
    }

    return (
        <Card className="mb-4">
            <CardBody>
                <div className="grid grid-cols-8 gap-5 items-center">

                    <div className="">
                        {order.id}
                    </div>


                    <div className="flex flex-col col-span-3">
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

                    <div className="flex flex-col">
                        <span>{order.user.first_name + " " + order.user.last_name}</span>
                    </div>

                    
                    <div className="flex flex-col col-span-3">
                        {
                            order.address ?
                                <>
                                    <span>{order.address.address_line1}</span>
                                    <span>{order.address.address_line2}</span>
                                    <span>{order.address.city}</span>
                                    <span>{order.address.telephone}</span>
                                    <span>{order.address.mobile}</span>
                                </>
                                : ''
                        }

                    </div>
                    
                    
                    <div className="col-span-8 grid grid-cols-4 items-stretch text-xs">
                        {getStatus(order.status)}
                    </div>

                    <div className="col-span-3 flex flex-col ">
                        <span><b>Created: </b>{moment(order.created_at).fromNow()}</span>
                        <span><b>Updated: </b>{moment(order.updated_at).fromNow()}</span>
                    </div>

                    <div className="col-span-4">
                        <b>Ordered total: </b>{order.total}
                    </div>
                    <div className="flex">
                        <Link to={"/app/order/" + order.id + "/view"}>
                            <Button icon={EyeIcon} layout="link" aria-label="Like" />

                        </Link>
                    </div>

                   
                </div>
            </CardBody>
        </Card>
    );
}