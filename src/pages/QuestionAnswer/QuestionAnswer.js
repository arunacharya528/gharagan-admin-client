import React, { useEffect, useState } from "react";
import { getQAs } from "../../adapters/questionAnswer";
import { Card, CardBody } from '@windmill/react-ui'

import PageTitle from '../../components/Typography/PageTitle'
import { Reply } from "./Reply";

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
                        <Card className="mb-4">
                            <CardBody>
                                <div className="flex flex-col">
                                    <div className="font-bold">{question.user.first_name + " " + question.user.last_name}</div>
                                    <div>{question.query}</div>
                                    <span className="text-gray-600 dark:text-gray-500 italic">{moment(question.created_at).fromNow()}</span>


                                    {
                                        question.answers.length !== 0 ?

                                            question.answers.map((answer, index) =>
                                                <div className="ml-16 mt-5" key={index}>
                                                    <div className="font-bold">Replied</div>
                                                    <div>{answer.query}</div>
                                                    <span className="text-gray-600 dark:text-gray-500 italic">{moment(answer.created_at).fromNow()}</span>
                                                </div>
                                            )

                                            :
                                            <Reply parentId={question.id} afterSUbmission={() => { setRefresh(!isRefreshed) }} />
                                    }

                                </div>
                            </CardBody>
                        </Card>

                    )
                }
            </div>
        </>
    );
}

export default QuesitonAnswer;