import React, { useState, useEffect } from 'react'

import { Table, TableCell, TableBody, TableContainer, TableHeader, TableRow, Button, Modal, ModalHeader, ModalBody, Badge } from "@windmill/react-ui"
import PageTitle from '../../components/Typography/PageTitle'
import { getDiscounts } from '../../adapters/discount';
import { EditIcon, PlusIcon } from '../../icons';
import { Edit } from './Edit';
import { Add } from './Add';

const Discount = () => {

    const [discounts, setDiscounts] = useState([]);
    const [isRefreshed, setREfresh] = useState(false);

    useEffect(() => {
        getDiscounts()
            .then(response => setDiscounts(response.data))
            .catch(error => console.log(error))
    }, [isRefreshed])


    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalData, setModalData] = useState({ title: undefined, body: undefined });

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    const handleAddition = () => { 
        setModalData({
            title: "Add discount",
            body: <Add afterSubmission={() => { setREfresh(!isRefreshed); closeModal() }} />
        })
        openModal();
    }

    const handleEdit = (data) => {
        setModalData({
            title: "Edit discount",
            body: <Edit data={data} afterSubmission={() => { setREfresh(!isRefreshed); closeModal() }} />
        })
        openModal();
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
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalHeader>{modalData.title}</ModalHeader>
                <ModalBody>
                    {modalData.body}
                </ModalBody>
            </Modal>
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
                                        <TableCell>
                                            <Button icon={EditIcon} layout="link" aria-label="Like" onClick={e => handleEdit(discount)} />
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