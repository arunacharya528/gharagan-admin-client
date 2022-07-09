import React, { useEffect, useRef, useState } from "react";
import { Card, CardBody, Badge, Button } from '@windmill/react-ui'
import PageTitle from '../../components/Typography/PageTitle'
import { getUser } from "../../adapters/user";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import moment from 'moment';
import { SessionSummary } from "../Cart/Summary";
import { OrderSummary } from "../Order/Summary";
import { RatingView } from "../Rating/View";
import { QAView } from "../QuestionAnswer/View";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const View = () => {

    const [data, setData] = useState(null);
    const location = useLocation();
    const [isRefreshed, setRefresh] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        getUser(user.data.token, location.pathname.split("/")[3])
            .then(response => setData(response.data))
    }, [isRefreshed])

    const sessionRef = useRef(null)
    const orderRef = useRef(null)
    const ratingRef = useRef(null)
    const qaRef = useRef(null)


    const getBadge = (id) => {
        switch (id) {
            case 1:
                return <Badge type="danger" >Super Admin</Badge>
            case 2:
                return <Badge type="warning" >Admin</Badge>
            case 3:
                return <Badge type="success" >Client</Badge>
        }
    }

    const scrollIntoView = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    return (
        <>
            {
                data !== null ?
                    <>
                        <PageTitle>
                            User detail
                        </PageTitle>

                        <div className="grid grid-cols-6 text-gray-600 dark:text-gray-400 gap-5">
                            <div className="col-span-2">
                                <Card className="sticky top-0">
                                    <CardBody>
                                        <div className="grid grid-cols-3 gap-2">
                                            <span className="font-bold">Name: </span>
                                            <span className="col-span-2">{data.name}</span>

                                            <span className="font-bold">Email: </span>
                                            <span className="col-span-2">{data.email}</span>

                                            <span className="font-bold">Contact: </span>
                                            <span className="col-span-2">{data.contact}</span>

                                            <span className="font-bold">Type: </span>
                                            <span className="col-span-2">{getBadge(data.type)}</span>

                                            <span className="font-bold">Created: </span>
                                            <span className="col-span-2">{moment(data.created_at).calendar()}</span>

                                            <span className="font-bold">Updated: </span>
                                            <span className="col-span-2">{moment(data.updated_at).calendar()}</span>
                                        </div>

                                        <div className="flex flex-col space-y-1 mt-4">
                                            <Button layout="outline" onClick={() => { scrollIntoView(sessionRef) }}>Session</Button>
                                            <Button layout="outline" onClick={() => { scrollIntoView(orderRef) }}>Orders</Button>
                                            <Button layout="outline" onClick={() => { scrollIntoView(ratingRef) }}>Ratings</Button>
                                            <Button layout="outline" onClick={() => { scrollIntoView(qaRef) }}>Question answer</Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                            <div className="col-span-4 flex flex-col space-y-5">
                                <div ref={sessionRef}>
                                    <div className="py-2 font-bold text-lg">Session</div>
                                    <SessionSummary session={data.shopping_session} refresh={() => { setRefresh(!isRefreshed) }} />
                                </div>

                                <div ref={orderRef}>
                                    <div className="py-2 font-bold text-lg">Orders</div>
                                    {
                                        data.order_details.length !== 0 ?

                                            data.order_details.map((detail, index) =>
                                                <OrderSummary order={detail} key={index} />
                                            )
                                            : <div>There is no order placed by this user</div>
                                    }
                                </div>

                                <div ref={ratingRef}>
                                    <div className="py-2 font-bold text-lg">Ratings</div>
                                    {
                                        data.product_ratings.length !== 0 ?

                                            data.product_ratings.map((rating, index) =>
                                                <RatingView rating={rating} key={index} refresh={() => { setRefresh(!isRefreshed) }} />
                                            )

                                            : <div>There is no product rated by this user</div>

                                    }
                                </div>

                                <div ref={qaRef}>
                                    <div className="py-2 font-bold text-lg">Question Answers</div>
                                    {
                                        data.question_answers.length !== 0 ?

                                            data.question_answers.map((instance, index) =>
                                                <QAView question={instance} key={index} refresh={() => { setRefresh(!isRefreshed) }} />
                                            )

                                            : <div>This user has not participated in any QA session</div>

                                    }
                                </div>
                            </div>


                        </div>
                    </>
                    : ''
            }

        </>
    )
}

export default View;