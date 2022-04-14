import React, { useState, useEffect } from 'react'
// import PageTitle from '../components/Typography/PageTitle'
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableFooter,
    TableContainer,
    Badge,
    Avatar,
    Button,
    Pagination,
    Modal, ModalHeader, ModalBody, ModalFooter
} from '@windmill/react-ui'

// import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui'

import { EditIcon, TrashIcon } from '../../icons'

// PageTitle

import response from '../../utils/demo/productData'
import PageTitle from '../../components/Typography/PageTitle'
import { getProducts } from './adapter'
import { Link } from 'react-router-dom'
// import { Modal, MyModal } from '../../components/Modal/MyModal'
// make a copy of the data, for the second table
const response2 = response.concat([])

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
            <PageTitle>Products</PageTitle>
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
                                    {product.brand.name}
                                </TableCell>
                                <TableCell>
                                    {getAverageRating(product.ratings)}
                                </TableCell>
                                <TableCell>
                                    {product.views}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-4">
                                        <Link layout="link" size="icon" aria-label="Edit" to={"/app/product/" + product.id}>
                                            <EditIcon className="w-5 h-5" aria-hidden="true" />
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