import React, { useEffect, useState } from "react";
import { getSessions } from "../../adapters/shoppingSessions";
import PageTitle from "../../components/Typography/PageTitle";

import { Card, CardBody, Button } from '@windmill/react-ui'
import { Link } from "react-router-dom";
import { CrossIcon } from "../../icons";

const Cart = () => {


    const [sessions, setSessions] = useState([]);
    useEffect(() => {
        getSessions()
            .then(response => setSessions(response.data))
            .catch(error => console.log(error))
    }, [])

    return (
        <>
            <PageTitle>
                All Sessions
            </PageTitle>

            <div className="text-gray-600 dark:text-gray-400">

                {
                    sessions ?
                        sessions.map((session, index) =>
                            <Card className="mb-4">
                                <CardBody>
                                    <div className="grid grid-cols-4 gap-2 items-center" key={index}>
                                        <div>
                                            {session.user.first_name + " " + session.user.last_name}
                                        </div>

                                        <div className="col-span-2 grid grid-cols-3 border rounded-lg p-2 items-center">
                                            {
                                                session.cart_items.length !== 0 ?

                                                    session.cart_items.map((item, index) =>
                                                        <React.Fragment key={index}>
                                                            <Link className="underline" to={"/app/product/" + item.product.id}>{item.product.name}
                                                            </Link>

                                                            <span>
                                                                {item.quantity}
                                                            </span>

                                                            <span>
                                                                <Button icon={CrossIcon} layout="link" aria-label="Remove" />
                                                            </span>
                                                        </React.Fragment>
                                                    )

                                                    : <div className="text-center col-span-3">No cart item in this session</div>
                                            }
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>

                        )

                        : ''
                }

            </div>

        </>
    );
}

export default Cart;