import React, { useState, useEffect } from 'react'
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableFooter,
    TableContainer,
    Button,
    Modal, ModalHeader, ModalBody
} from '@windmill/react-ui'

import { EyeIcon, TrashIcon, PlusIcon } from '../../icons'
import PageTitle from '../../components/Typography/PageTitle'
import { Link } from 'react-router-dom'
import { getProducts } from '../../adapters/product'


function Tables() {

    const [dataTable, setDataTable] = useState([])


    const [modalData, setModalData] = useState({ title: undefined, body: undefined });


    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    useEffect(() => {

        getProducts()
            .then(response => {
                setDataTable(response.data)
            })
            .catch(error => console.log(error));
    }, [])

    const getAverageRating = (ratings) => {
        const numbers = ratings.map((rating) => rating.rate);

        var sum = 0;
        for (let i = 0; i < numbers.length; i++) {
            sum += numbers[i];
        }

        return Math.round(((sum / numbers.length) + Number.EPSILON) * 100) / 100
    }

    const handleEditButtonPress = () => {
        openModal();
        setModalData({ title: "Edit data", body: <div>Hello there</div> });
    }
    return (
        <>
            <PageTitle>
                <div className="flex justify-between align-middle">
                    <span>Products</span>
                    <Link layout="link" size="icon" aria-label="Edit" to={"/app/product/add"}>
                        <PlusIcon className="w-5 h-5" aria-hidden="true" />
                    </Link>
                </div>
            </PageTitle>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalHeader>{modalData.title}</ModalHeader>
                <ModalBody>
                    {modalData.body}
                </ModalBody>
            </Modal>
            <TableContainer className="mb-8">
                <Table>
                    <TableHeader>
                        <tr>
                            <TableCell>Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Brand</TableCell>
                            <TableCell>Average rating</TableCell>
                            <TableCell>Views</TableCell>
                            <TableCell>Action</TableCell>

                        </tr>
                    </TableHeader>
                    <TableBody>
                        {dataTable.map((product, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    {product.name}
                                </TableCell>
                                <TableCell>
                                    {product.category.name}
                                </TableCell>
                                <TableCell>
                                    {product.brand ? product.brand.name : ''}
                                </TableCell>
                                <TableCell>
                                    {product.ratings ? getAverageRating(product.ratings) : '0'}
                                </TableCell>
                                <TableCell>
                                    {product.views}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-4">
                                        <Link layout="link" size="icon" aria-label="Edit" to={"/app/product/" + product.id}>
                                            <EyeIcon className="w-5 h-5" aria-hidden="true" />
                                        </Link>
                                        <Button layout="link" size="icon" aria-label="Delete">
                                            <TrashIcon className="w-5 h-5" aria-hidden="true" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TableFooter>
                </TableFooter>
            </TableContainer>
        </>
    )
}

export default Tables
