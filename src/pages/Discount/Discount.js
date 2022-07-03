import React, { useState, useEffect, useContext } from 'react'

import { Table, TableCell, TableBody, TableContainer, TableHeader, TableRow, Button, Modal, ModalHeader, ModalBody, Badge } from "@windmill/react-ui"
import PageTitle from '../../components/Typography/PageTitle'
import { deleteDiscount, getDiscounts } from '../../adapters/discount';
import { EditIcon, PlusIcon, TrashIcon } from '../../icons';
import { Edit } from './Edit';
import { Add } from './Add';
import { ModalContext } from '../../context/ModalContext';
import toast from 'react-hot-toast';
import { DiscountContext } from '../../context/DiscountContext';
import { UserContext } from '../../context/UserContext';

const Discount = () => {

    const { discounts, updateDiscount } = useContext(DiscountContext)

    const { setModalData, openModal, closeModal } = useContext(ModalContext)

    const handleAddition = () => {
        setModalData({
            title: "Add discount",
            body: <Add afterSubmission={() => { updateDiscount(); closeModal() }} />
        })
        openModal();
    }

    const handleEdit = (data) => {
        setModalData({
            title: "Edit discount",
            body: <Edit data={data} afterSubmission={() => { updateDiscount(); closeModal() }} />
        })
        openModal();
    }

    const { user } = useContext(UserContext)

    const handleDeleteButtonPress = (id) => {
        const handleDeletion = () => {
            toast.promise(
                deleteDiscount(user.data.token, id)
                ,
                {
                    loading: "Deleting discount",
                    success: () => {
                        updateDiscount()
                        closeModal();
                        return "Discount deleted"
                    },
                    error: "Error deleting discount"
                }
            )
        }
        setModalData({
            title: "Are you sure you want to delete this discount instance?",
            body:
                <div>
                    <p>All the related discount in inventory would be set to null</p>
                    <Button className="mt-4" onClick={handleDeletion}>Confirm deletion</Button>
                </div>
        })
        openModal()
    }


    return (
        <>
            <PageTitle>
                <div className='flex justify-between'>
                    <span>Discounts</span>
                    <div>
                        <Button icon={PlusIcon} layout="link" aria-label="Add" onClick={handleAddition} />
                    </div>
                </div>
            </PageTitle>
            <TableContainer className="mb-8">
                <Table className="table-fixed">
                    <TableHeader>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Discount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {
                            discounts.length !== 0 ?

                                discounts.map((discount, index) =>
                                    <TableRow key={index}>
                                        <TableCell>{discount.name}</TableCell>
                                        <TableCell>{discount.description}</TableCell>
                                        <TableCell>{discount.discount_percent}</TableCell>
                                        <TableCell>
                                            <Badge type={discount.active === 1 ? 'success' : 'danger'}>
                                                {discount.active === 1 ? 'Active' : "Inactive"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="flex">
                                            <Button icon={EditIcon} layout="link" aria-label="Edit" onClick={e => handleEdit(discount)} />
                                            <Button icon={TrashIcon} layout="link" aria-label="Delete" onClick={e => handleDeleteButtonPress(discount.id)} />
                                        </TableCell>
                                    </TableRow>
                                )

                                : ''

                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Discount