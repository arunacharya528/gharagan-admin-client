import React from "react";
import { Card, CardBody, Button } from '@windmill/react-ui'
import { Link } from "react-router-dom";
import moment from "moment";
import { CrossIcon, EyeIcon, TrashIcon } from "../../icons";
import { cancelOrder, deleteOrder, getInvoice, updateOrder } from "../../adapters/orderDetail";
import toast from "react-hot-toast";
import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import { UserContext } from "../../context/UserContext";
import { useState } from "react";
export const OrderSummary = ({ order, change }) => {

    const { setModalData, openModal, closeModal } = useContext(ModalContext);
    const { user } = useContext(UserContext)

    const getStatus = (status) => {
        const determineColor = (levelValue) => {
            if (status < levelValue) {
                return 'bg-gray-300 dark:bg-gray-700'
            } else {
                return 'bg-purple-300 dark:bg-purple-700'
            }
        }

        const handleStatusChange = (status) => {

            const confirm = () => {
                toast.promise(
                    updateOrder(user.data.token, { status: status }, order.id)
                    , {
                        loading: "Updating status of order #" + order.id,
                        success: () => {
                            closeModal();
                            change();
                            return "Order status updated"
                        },
                        error: "Error updating order status"
                    }
                )
            }

            setModalData({
                title: "Confirm status change of order #" + order.id,
                body: <div>
                    <p>Decision could be revert back but the client would notice changes</p>
                    <Button onClick={confirm}>Confirm Change</Button>
                </div>
            })
            openModal();

        }

        return (
            <>
                <button className={"text-gray-700 dark:text-white hover:bg-green-500 dark:hover:bg-green-700 py-1 pl-5 rounded-l-full " + determineColor(1)} onClick={e => handleStatusChange(1)}>
                    Order Placed
                </button>
                <button className={"text-gray-700 dark:text-white hover:bg-green-500 dark:hover:bg-green-700 p-1 " + determineColor(2)} onClick={e => handleStatusChange(2)}>
                    Product collected for delivery
                </button>
                <button className={"text-gray-700 dark:text-white hover:bg-green-500 dark:hover:bg-green-700 p-1 " + determineColor(3)} onClick={e => handleStatusChange(3)}>
                    Product being shipped
                </button>
                <button className={"text-gray-700 dark:text-white hover:bg-green-500 dark:hover:bg-green-700 p-1  rounded-r-full " + determineColor(4)} onClick={e => handleStatusChange(4)}>
                    Product received
                </button></>
        );
    }

    const handleOrderCancellation = (id) => {
        const confirm = () => {
            toast.promise(
                cancelOrder(user.data.token, id)
                , {
                    loading: "Cancelling order #" + id,
                    success: () => {
                        closeModal();
                        change();
                        return "Order cancelled"
                    },
                    error: "Error cancelling order"
                }
            )
        }

        setModalData({
            title: "Confirm cancellation of order #" + id,
            body: <div>
                <p>Decision cannot be reverted and the client would notice changes</p>
                <Button onClick={confirm}>Confirm</Button>
            </div>
        })
        openModal();
    }

    const handleOrderDeletion = (id) => {
        const confirm = () => {
            toast.promise(
                deleteOrder(user.data.token, id)
                , {
                    loading: "Deleting order #" + id,
                    success: () => {
                        closeModal();
                        change();
                        return "Order deleted"
                    },
                    error: "Error deleting order"
                }
            )
        }

        setModalData({
            title: "Confirm deletion of order #" + id,
            body: <div>
                <p>Decision cannot be reverted and the client would notice changes</p>
                <Button onClick={confirm}>Confirm</Button>
            </div>
        })
        openModal();
    }

    const viewInvoice = (id) => {
        getInvoice(user.data.token, id)
            .then((response) => response.blob()).then((blob) => {
                var _url = window.URL.createObjectURL(blob);
                window.open(_url, "_blank").focus();
            })
            .catch((err) => { console.log(err); });
    }


    return (
        <Card className="mb-4">
            <CardBody>
                <div className="flex flex-col space-y-5">

                    <div className="flex flex-row">
                        <div className="flex flex-row flex-grow space-x-8">
                            <div className="">
                                <div className="uppercase font-semibold text-sm">Invoice #</div>
                                <div>{order.id}</div>
                            </div>

                            <div className="">
                                <Link to={"/app/user/" + order.user.id + "/view"} className="underline">{order.user.name}</Link>
                                <div>{order.user.email}</div>
                            </div>

                            <div className="">
                                <div className="uppercase font-semibold text-sm">Total</div>
                                <div>Rs. {order.total}</div>
                            </div>
                        </div>

                        <div className="flex">
                            <Button iconLeft={EyeIcon} onClick={e => viewInvoice(order.id)}>
                                <span className="whitespace-no-wrap">View Invoice</span>
                            </Button>
                        </div>


                    </div>

                    <div className="col-span-8 grid grid-cols-4 items-stretch text-xs">
                        {getStatus(order.status)}
                    </div>

                    <div className="flex flex-row space-x-8 items-center">
                        <div className="col-span-3 flex flex-col flex-grow ">
                            <span><b>Created: </b>{moment(order.created_at).calendar()}</span>
                            <span><b>Updated: </b>{moment(order.updated_at).calendar()}</span>
                            <span><b>Difference: </b>{moment(order.created_at).from(order.updated_at, true)}</span>
                        </div>

                        <div className="flex space-x-5">
                            <Button iconLeft={CrossIcon} layout="link" aria-label="Cancel" onClick={e => handleOrderCancellation(order.id)}>
                                <span className="whitespace-no-wrap">Cancel order</span>
                            </Button>

                            <Button iconLeft={TrashIcon} layout="link" aria-label="Delete" onClick={e => handleOrderDeletion(order.id)}>
                                <span className="whitespace-no-wrap">Delete order</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}