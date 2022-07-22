import React, { useContext, useState } from "react";
import { Card, CardBody, Button } from '@windmill/react-ui'
import { Link } from "react-router-dom";
import { CrossIcon } from "../../icons";
import moment from 'moment';
import { ModalContext } from "../../context/ModalContext";
import { deleteCartItem } from "../../adapters/shoppingSessions";
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContext";

export const SessionSummary = ({ session, refresh }) => {

    const { setModalData, openModal, closeModal } = useContext(ModalContext)
    const { user } = useContext(UserContext);
    const handleDeletebuttonPress = (id) => {
        const handleDeletion = () => {
            toast.promise(
                deleteCartItem(user.data.token, id)
                ,
                {
                    loading: "Removing Cart item",
                    success: () => {
                        refresh();
                        closeModal();
                        return "Cart item removed"
                    },
                    error: "Error removing cart item"
                }
            )
        }

        setModalData({
            title: "Are you sure you want to remove this item from cart?",
            body:
                <div>
                    <div>The change would be noticed by client. <br />
                        <p className="italic pt-4">
                            <b>Tip: </b>Only remove item if there is a significant gap between addition date in cart and modification date in session
                        </p>
                    </div>
                    <Button className="mt-0" onClick={handleDeletion}>Confirm removal</Button>
                </div>
        })
        openModal();
    }
    return (
        <Card className="mb-4">
            <CardBody>
                <div className="grid grid-cols-4 gap-2 items-center">
                    <div>
                        {session.user.name}
                    </div>

                    <div className="col-span-2 border rounded-lg p-2">
                        {
                            session.cart_items.length !== 0 ?
                                <>
                                    <div className="grid grid-cols-3 font-bold">
                                        <span>Product</span>
                                        <span>Quantity</span>
                                        <span>Added</span>
                                    </div>
                                    {session.cart_items.map((item, index) =>
                                        <div class="flex flex-row" key={index}>
                                            <div className="grid grid-cols-3 items-center w-full">
                                                <Link to={"/app/product/" + item.product.id}>
                                                    <span className="underline"> {item.product.name}</span>&emsp;{item.inventory.type}
                                                </Link>
                                                <span>
                                                    {item.quantity}
                                                </span>
                                                <span>{moment(item.created_at).fromNow()}</span>
                                            </div>
                                            <div className="flex-1">
                                                <Button icon={CrossIcon} layout="link" aria-label="Remove" onClick={e => handleDeletebuttonPress(item.id)} />
                                            </div>
                                        </div>
                                    )
                                    }
                                </>

                                : <div className="text-center col-span-3">No cart item in this session</div>
                        }
                    </div>
                    <div className="flex flex-col">
                        <span><b>Created: </b>{moment(session.created_at).fromNow()}</span>
                        <span><b>Updated: </b>{moment(session.updated_at).fromNow()}</span>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}