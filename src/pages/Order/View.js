import React, { useEffect, useState } from "react";

import { Card, CardBody, TableContainer, Table, TableCell, TableHeader, TableBody, TableRow } from '@windmill/react-ui'
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import PageTitle from "../../components/Typography/PageTitle";
import { getOrder } from "../../adapters/orderDetail";

const View = () => {

    const location = useLocation();
    const [order, setOrder] = useState(undefined);

    useEffect(() => {
        getOrder(location.pathname.split("/")[3])
            .then(response => setOrder(response.data))
            .catch(error => console.log(error))
    }, []);

    const getDiscountedPrice = (price, discount) => {
        if (!discount) {
            return price
        } else {
            const discountP = discount.discount_percent;
            const discountedPrice = price - (0.01 * discountP * price);
            return Math.round((discountedPrice + Number.EPSILON) * 100) / 100;
        }
    }

    const getTotal = (price, discount, quantity) => {
        console.log(getDiscountedPrice(price, discount));

        var returningPrice = 0;
        if (!discount) {
            returningPrice = price * quantity
        } else {
            returningPrice = quantity * getDiscountedPrice(price, discount)
        }

        return Math.round((returningPrice + Number.EPSILON) * 100) / 100;
    }
    return (
        <>
            <PageTitle>
                Order Detail
            </PageTitle>

            <Card>
                <CardBody className="text-gray-600 dark:text-gray-400 flex flex-col" >

                    {order ?
                        <>
                            <div className="flex flex-row justify-between items-center my-4">
                                <div className="text-xl font-bold w-16">GHARAGAN</div>
                                <div className="flex flex-col space-y-2">
                                    <span>Ordered By: </span>
                                    <span className="">{order.user.first_name + " " + order.user.last_name}</span>
                                    <span className="">{order.user.contact}</span>
                                    <span className="">{order.user.email}</span>
                                </div>
                            </div>
                            <div className="text-lg underline text-center font-bold py-3 uppercase">Order slip</div>


                            <div className="grid grid-cols-6 border-b py-3 uppercase font-semibold">
                                <span>Item</span>
                                <span>Price</span>
                                <span>Discount</span>
                                <span>Discounted price</span>
                                <span>Quantity</span>
                                <span>Total</span>
                            </div>

                            {order.order_items.map((item, index) =>
                                < div className="grid grid-cols-6 border-b py-3" key={index}>
                                    <div>{item.product.name}</div>
                                    <div>Rs. {item.inventory.price}</div>
                                    <div>
                                        {item.inventory.discount ?
                                            item.inventory.discount.discount_percent + "%"
                                            : '-'
                                        }
                                    </div>
                                    <div>
                                        Rs. {getDiscountedPrice(item.inventory.price, item.inventory.discount)}
                                    </div>
                                    <div>{item.quantity}</div>
                                    <div>
                                        Rs. {getTotal(item.inventory.price, item.inventory.discount, item.quantity)}
                                    </div>
                                </div>
                            )}

                            
                            <div className="grid grid-cols-6 border-b py-3">
                                <div className="col-span-4"></div>
                                <div className="col-span-2">
                                    <div className="grid grid-cols-2">
                                        <span className="uppercase font-semibold">Total</span>
                                        <span>Rs. {order.total}</span>
                                    </div>
                                </div>
                            </div>


                            
                            {/* <div className="grid grid-cols-5">
                                <div className="col-span-3"></div>
                                <div className="col-span-2">
                                    <div className="grid grid-cols-2 py-3 border-b">
                                        <span className="">Grand Discount</span>
                                        <span>
                                            {
                                                order.discount ?
                                                    order.discount.discount_percent + "%"
                                                    : "-"
                                            }
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 py-3 border-b">
                                        <span>Total</span>
                                        <span>{order.total}</span>
                                    </div>
                                </div>
                            </div> */}

                        </>

                        : ''
                    }


                </CardBody>
            </Card>
        </>
    );
}

export default View;