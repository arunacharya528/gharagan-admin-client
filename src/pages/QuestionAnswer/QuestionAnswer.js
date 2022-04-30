import React, { useEffect, useState } from "react";
import { deleteQA, getQAs } from "../../adapters/questionAnswer";
import { Card, CardBody, Button } from '@windmill/react-ui'

import PageTitle from '../../components/Typography/PageTitle'
import { Reply } from "./Reply";
import { TrashIcon } from "../../icons";
import { QAView } from "./View";

const moment = require('moment');
const QuesitonAnswer = () => {


    const [qAs, setQAs] = useState([]);
    const [isRefreshed, setRefresh] = useState(false);

    useEffect(() => {
        getQAs()
            .then(response => setQAs(response.data))
            .catch(error => console.log(error))
    }, [isRefreshed]);

    return (
        <>
            <PageTitle>
                <div className='flex justify-between align-middle'>
                    <span>Question Answers</span>
                </div>
            </PageTitle>


            <div className="text-gray-600 dark:text-gray-400">
                {
                    qAs.map((question, index) =>
                        <QAView question={question} refresh={() => { setRefresh(!isRefreshed) }} key={index} />
                    )
                }
            </div>
        </>
    );
}

export default QuesitonAnswer;