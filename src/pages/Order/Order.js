import React, { useEffect, useState } from "react";
import { getOrders } from "../../adapters/orderDetail";

import { Card, CardBody, Modal, ModalHeader, ModalBody, Button } from '@windmill/react-ui'
import PageTitle from '../../components/Typography/PageTitle'
import { OrderSummary } from "./Summary";

const moment = require('moment');
const Order = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders()
            .then(respose => setOrders(respose.data))
            .catch(error => console.log(error))
    }, [])

    return (
        <>
            <PageTitle>
                <div className='flex justify-between align-middle'>
                    <span>Orders</span>
                </div>
            </PageTitle>

            <div className="text-gray-600 dark:text-gray-400">
                {orders.map((order, index) =>
                    <OrderSummary order={order} key="index" />
                )}
            </div>
        </>
    );
}

export default Order;