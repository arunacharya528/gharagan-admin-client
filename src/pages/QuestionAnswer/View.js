import React, { useContext } from "react";
import { Card, CardBody, Button } from '@windmill/react-ui'
import { TrashIcon } from "../../icons";
import { deleteQA, updateQA } from "../../adapters/questionAnswer";
import { Reply } from "./Reply";
import { Link } from "react-router-dom";

import { HashLink } from 'react-router-hash-link'
import toast from "react-hot-toast";
import { ModalContext } from "../../context/ModalContext";
import { UserContext } from "../../context/UserContext";
const moment = require('moment');

export const QAView = ({ question, refresh }) => {

    const { setModalData, openModal, closeModal } = useContext(ModalContext);
    const { user } = useContext(UserContext)
    const handleDeleteButtonPress = (id) => {
        const handleDeletion = () => {
            toast.promise(
                deleteQA(user.data.token, id)
                , {
                    loading: "Deleting selected instance",
                    success: () => {
                        refresh();
                        closeModal();
                        return "Deleted selected instance"
                    },
                    error: "Error deleting selected query"
                }
            )
        }
        setModalData({
            title: "Are you sure you want to delete this instance of question answer?",
            body:
                <div>
                    <p>The instance would be permanently deleted from database</p>
                    <Button className="mt-4" onClick={handleDeletion}>Confirm deletion</Button>
                </div>
        });
        openModal();
    }

    const handleAnswerRemoval = (id) => {
        const confirm = () => {
            toast.promise(
                updateQA(user.data.token, { answer: null }, id)
                , {
                    loading: "Removing answer",
                    success: () => {
                        refresh();
                        closeModal();
                        return "Removed answer"
                    },
                    error: "Error removing answer"
                }
            )
        }
        setModalData({
            title: "Are you sure you want to remove this answer?",
            body:
                <div>
                    <Button className="mt-4" onClick={confirm}>Confirm deletion</Button>
                </div>
        });
        openModal();
    }
    return (
        <Card className="mb-4" >
            <CardBody>
                <div className="flex flex-row" id={`qa${question.id}`}>
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row">
                            <div className="font-bold">{question.user.name}</div>
                            {question.product ?
                                <HashLink to={"/app/product/" + question.product.id + "#qa" + question.id} className="px-2 underline">{question.product.name}</HashLink>
                                : ''
                            }
                        </div>
                        <div>{question.question}</div>
                        <span className="text-gray-600 dark:text-gray-500 italic">{moment(question.created_at).fromNow()}</span>
                    </div>
                    <div className="w-16">
                        <Button icon={TrashIcon} layout="link" aria-label="Like" onClick={e => handleDeleteButtonPress(question.id)} />
                    </div>

                </div>

                {
                    question.answer ?
                        <div className="flex flex-row ml-16 mt-5" >
                            <div className="flex flex-col w-full">
                                <div className="font-bold">Replied</div>
                                <div>{question.answer}</div>
                                <span className="text-gray-600 dark:text-gray-500 italic">{moment(question.updated_at).fromNow()}</span>
                            </div>
                            <div className="w-16">
                                <Button icon={TrashIcon} layout="link" aria-label="Like" onClick={e => handleAnswerRemoval(question.id)} />
                            </div>
                        </div>
                        :
                        <Reply id={question.id} afterSUbmission={() => { refresh() }} />
                }
            </CardBody>
        </Card>
    );
}