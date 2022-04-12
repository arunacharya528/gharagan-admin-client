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

    // setup pages control for every table
    const [pageTable, setPageTable] = useState(1)

    // setup data for every table
    const [dataTable, setDataTable] = useState([])

    // pagination setup
    const resultsPerPage = 10
    // const totalResults = response.length
    const [totalResults, setTotalResults] = useState(10);

    const [modalData, setModalData] = useState({ title: undefined, body: undefined });

    // pagination change control
    function onPageChangeTable(p) {
        setPageTable(p)
    }

    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    // on page change, load new sliced data
    // here you would make another server request for new data
    useEffect(() => {

        getProducts()
            .then(response => {
                console.log(response.data)
                setDataTable(response.data.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage))
                setTotalResults(response.data.length)
            })
            .catch(error => console.log(error));
    }, [pageTable])

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
                    <Pagination
                        totalResults={totalResults}
                        resultsPerPage={resultsPerPage}
                        onChange={onPageChangeTable}
                        label="Table navigation"
                    />
                </TableFooter>
            </TableContainer>
        </>
    )
}

export default Tables
