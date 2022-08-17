import React, { useContext, useEffect, useState } from "react";
import { getOrders } from "../../adapters/orderDetail";

import { Card, CardBody, Modal, ModalHeader, ModalBody, Button } from '@windmill/react-ui'
import PageTitle from '../../components/Typography/PageTitle'
import { OrderSummary } from "./Summary";
import { UserContext } from "../../context/UserContext";
import SectionTitle from "../../components/Typography/SectionTitle";
import { Link } from "react-router-dom";

const moment = require('moment');
const Order = ({ count }) => {

    const [orders, setOrders] = useState({ loading: true, data: [] });
    const [isRefreshed, setRefresh] = useState(false);

    const { user } = useContext(UserContext)
    useEffect(() => {
        getOrders(user.data.token)
            .then(respose => setOrders({ loading: false, data: respose.data }))
            .catch(error => console.log(error))
    }, [isRefreshed])

    return (
        <div>
            {
                count ?
                    <SectionTitle>
                        <div className='flex justify-between align-middle'>
                            <span>Orders</span>
                            <Button tag={Link} to="/app/order" layout="link">
                                View more
                            </Button>
                        </div>
                    </SectionTitle>

                    :
                    <PageTitle>
                        <div className='flex justify-between align-middle'>
                            <span>Orders</span>
                        </div>
                    </PageTitle>
            }
            <div className="text-gray-600 dark:text-gray-400">


                {
                    orders.loading ?

                        "Loading" :
                        count ?
                            orders.data.slice(0, count).map((order, index) =>
                                <OrderSummary order={order} change={() => { setRefresh(!isRefreshed) }} key={index} />
                            )
                            :
                            orders.data.map((order, index) =>
                                <OrderSummary order={order} change={() => { setRefresh(!isRefreshed) }} key={index} />
                            )
                }

            </div>
        </div>
    );
}

export default Order;