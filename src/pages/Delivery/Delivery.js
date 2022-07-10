import React from "react";
import { Link } from "react-router-dom";
import { Button, TableContainer, Table, TableHeader, TableCell, TableBody, TableRow } from '@windmill/react-ui';
import PageTitle from "../../components/Typography/PageTitle";
import { EditIcon, PlusIcon, TrashIcon } from "../../icons";
import { useEffect } from "react";
import { deleteDelivery, getDeliveries } from "../../adapters/delivery";
import { useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { DeliveryForm } from "./Form";
import { DeliveryAdd } from "./Add";
import { DeliveryEdit } from "./Edit";
import { ModalContext } from "../../context/ModalContext";
import toast from "react-hot-toast";

const Delivery = () => {
    const [deliveries, setDeliveries] = useState([])
    const { user } = useContext(UserContext)
    const [toggleAdd, setToggleAdd] = useState(true);
    const [toggleEdit, setToggleEdit] = useState(false);
    const [isRefreshed, setRefresh] = useState(false);
    const [delivery, setDelivery] = useState({});
    const { setModalData, openModal, closeModal } = useContext(ModalContext);

    useEffect(() => {
        getDeliveries(user.data.token)
            .then(response => setDeliveries(response.data))
            .catch(error => console.log(error))
    }, [isRefreshed])

    const handleDeletion = (id) => {

        const confirmDeletion = () => {
            toast.promise(
                deleteDelivery(user.data.token, id),
                {
                    loading: "Deleting delivery option",
                    success: () => {
                        setRefresh(!isRefreshed)
                        closeModal();
                        return "Delivery option deleted"
                    },
                    error: "Error deleting delivery option"
                }
            )
        }
        setModalData({
            title: "Are you sure you want to delete this delivery option?",
            body: <div>
                <p>The data will be permanrntly deleted</p>
                <Button onClick={confirmDeletion}>Confirm</Button>
            </div>
        })
        openModal();

    }
    return (
        <>
            <PageTitle>
                <div className="flex justify-between">
                    <span>Deliveries</span>
                    <Button layout="link" icon={PlusIcon} onClick={e => {
                        setToggleEdit(false)
                        setToggleAdd(true)
                    }} />
                </div>
            </PageTitle>

            <div className="flex flex-row">
                <TableContainer className="mb-8 flex-grow">
                    <Table className="table-fixed">
                        <TableHeader>
                            <tr>
                                <TableCell>Region</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Action</TableCell>
                            </tr>
                        </TableHeader>
                        <TableBody>

                            {
                                deliveries.map((delivery, i) =>
                                    <TableRow key={i}>
                                        <TableCell>{delivery.region}</TableCell>
                                        <TableCell>{delivery.price}</TableCell>
                                        <TableCell>
                                            <Button layout="link" icon={EditIcon} onClick={e => {
                                                setToggleAdd(false)
                                                setToggleEdit(true)
                                                setDelivery(delivery)
                                            }} />
                                            <Button layout="link" icon={TrashIcon} onClick={e => handleDeletion(delivery.id)} />
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="w-1/3">
                    <div className="sticky top-0">
                        {toggleAdd ? <DeliveryAdd onSubmit={() => { setRefresh(!isRefreshed) }} /> : ''}
                        {toggleEdit ? <DeliveryEdit delivery={delivery} onSubmit={() => { setRefresh(!isRefreshed) }} /> : ''}
                    </div>
                </div>
            </div>

        </>
    );
}

export default Delivery;