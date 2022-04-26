import React from "react";
import { Card, CardBody, Button } from '@windmill/react-ui'
import { TrashIcon } from "../../icons";
import { deleteQA } from "../../adapters/questionAnswer";
import { Reply } from "./Reply";
import { Link } from "react-router-dom";

import { HashLink } from 'react-router-hash-link'
const moment = require('moment');

export const QAView = ({ question, refresh }) => {

    const handleDeletion = (id) => {
        deleteQA(id)
            .then(response => refresh())
            .catch(error => console.log(error))
    }
    return (
        <Card className="mb-4" >
            <CardBody>
                <div className="flex flex-row" id={`qa${question.id}`}>
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row">
                            <div className="font-bold">{question.user.first_name + " " + question.user.last_name}</div>
                            {question.product ?
                                <HashLink to={"/app/product/" + question.product.id + "#qa" + question.id} className="px-2 underline">{question.product.name}</HashLink>
                                : ''
                            }
                        </div>
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
                        <Reply parentId={question.id} afterSUbmission={() => { refresh() }} />
                }
            </CardBody>
        </Card>
    );
}