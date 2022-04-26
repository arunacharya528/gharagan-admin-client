import React, { useEffect, useState } from "react";
import { deleteQA, getQAs } from "../../adapters/questionAnswer";
import { Card, CardBody, Button } from '@windmill/react-ui'

import PageTitle from '../../components/Typography/PageTitle'
import { Reply } from "./Reply";
import { TrashIcon } from "../../icons";

const moment = require('moment');
const QuesitonAnswer = () => {


    const [qAs, setQAs] = useState([]);
    const [isRefreshed, setRefresh] = useState(false);

    useEffect(() => {
        getQAs()
            .then(response => setQAs(response.data))
            .catch(error => console.log(error))
    }, [isRefreshed]);

    const handleDeletion = (id) => {
        deleteQA(id)
            .then(response => setRefresh(!isRefreshed))
            .catch(error => console.log(error))
    }

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
                        <Card className="mb-4" key={index}>
                            <CardBody>
                                <div className="flex flex-row">
                                    <div className="flex flex-col w-full">
                                        <div className="font-bold">{question.user.first_name + " " + question.user.last_name}</div>
                                        <div>{question.query}</div>
                                        <span className="text-gray-600 dark:text-gray-500 italic">{moment(question.created_at).fromNow()}</span>
                                    </div>
                                    <div className="w-16">
                                        <Button icon={TrashIcon} layout="link" aria-label="Like" onClick={e => handleDeletion(question.id)} />
                                    </div>

                                </div>

                                {
                                    question.answers.length !== 0 ?

                                        question.answers.map((answer, index) =>
                                            <div className="flex flex-row ml-16 mt-5" key={index}>
                                                <div className="flex flex-col w-full">
                                                    <div className="font-bold">Replied</div>
                                                    <div>{answer.query}</div>
                                                    <span className="text-gray-600 dark:text-gray-500 italic">{moment(answer.created_at).fromNow()}</span>
                                                </div>
                                                <div className="w-16">
                                                    <Button icon={TrashIcon} layout="link" aria-label="Like" onClick={e => handleDeletion(answer.id)} />
                                                </div>
                                            </div>
                                        )

                                        :
                                        <Reply parentId={question.id} afterSUbmission={() => { setRefresh(!isRefreshed) }} />
                                }
                            </CardBody>
                        </Card>

                    )
                }
            </div>
        </>
    );
}

export default QuesitonAnswer;