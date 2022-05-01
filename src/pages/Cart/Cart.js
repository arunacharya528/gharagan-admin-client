import React, { useEffect, useState } from "react";
import { getSessions } from "../../adapters/shoppingSessions";
import PageTitle from "../../components/Typography/PageTitle";
import { SessionSummary } from "./Summary";

const Cart = () => {

    const [isRefreshed, setRefresh] = useState(false);
    const [sessions, setSessions] = useState([]);
    useEffect(() => {
        getSessions()
            .then(response => setSessions(response.data))
            .catch(error => console.log(error))
    }, [isRefreshed])

    return (
        <>
            <PageTitle>
                All Sessions
            </PageTitle>

            <div className="text-gray-600 dark:text-gray-400">

                {
                    sessions ?
                        sessions.map((session, index) =>
                            <SessionSummary session={session} refresh={() => { setRefresh(!isRefreshed) }} />
                        )

                        : ''
                }

            </div>

        </>
    );
}

export default Cart;