import React, { useContext, useEffect, useState } from "react";
import { deleteQA, getQAs } from "../../adapters/questionAnswer";
import { Card, CardBody, Button } from '@windmill/react-ui'

import PageTitle from '../../components/Typography/PageTitle'
import { Reply } from "./Reply";
import { TrashIcon } from "../../icons";
import { QAView } from "./View";
import { UserContext } from "../../context/UserContext";
import SectionTitle from "../../components/Typography/SectionTitle";
import { Link } from "react-router-dom";

const moment = require('moment');
const QuesitonAnswer = ({ count }) => {


    const [qAs, setQAs] = useState([]);
    const [isRefreshed, setRefresh] = useState(false);

    const { user } = useContext(UserContext)

    useEffect(() => {
        getQAs(user.data.token)
            .then(response => setQAs(response.data))
            .catch(error => console.log(error))
    }, [isRefreshed]);

    return (
        <>
            {
                count ?
                    <SectionTitle>
                        <div className='flex justify-between align-middle'>
                            <span>Question Answers</span>
                            <Button tag={Link} to="/app/qa" layout="link">
                                View more
                            </Button>
                        </div>
                    </SectionTitle>
                    :
                    <PageTitle>
                        <div className='flex justify-between align-middle'>
                            <span>Question Answers</span>
                        </div>
                    </PageTitle>
            }



            <div className="text-gray-600 dark:text-gray-400">
                {

                    count ?
                        qAs.slice(0, 5).map((question, index) =>
                            <QAView question={question} refresh={() => { setRefresh(!isRefreshed) }} key={index} />
                        )
                        :
                        qAs.map((question, index) =>
                            <QAView question={question} refresh={() => { setRefresh(!isRefreshed) }} key={index} />
                        )
                }
            </div>
        </>
    );
}

export default QuesitonAnswer;