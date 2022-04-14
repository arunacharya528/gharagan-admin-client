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


import { EditIcon, TrashIcon } from '../../icons'

// PageTitle

import PageTitle from '../../components/Typography/PageTitle'
// import { getProducts } from './adapter'
import { Link } from 'react-router-dom'
import { getCategories } from '../../adapters/category'

function Category() {

    // setup pages control for every table
    // const [pageTable, setPageTable] = useState(1)

    // setup data for every table
    const [dataTable, setDataTable] = useState([])

    // pagination setup
    // const resultsPerPage = 10
    // const totalResults = response.length
    // const [totalResults, setTotalResults] = useState(10);

    const [modalData, setModalData] = useState({ title: undefined, body: undefined });

    // pagination change control
    // function onPageChangeTable(p) {
    //     setPageTable(p)
    // }

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

        getCategories()
            .then(response => {
                // console.log(response.data)
                setDataTable(response.data)
                // setTotalResults(response.data.length)
            })
            .catch(error => console.log(error));
    }, [])

    const handleEditButtonPress = () => {
        openModal();
        setModalData({
            title: "Edit data",
            body: <div>Hello there</div>
        });
    }
    return (
        <>
            <PageTitle>Categories</PageTitle>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalHeader>{modalData.title}</ModalHeader>
                <ModalBody>
                    {modalData.body}
                </ModalBody>

            </Modal>
            <TableContainer className="mb-8">
                <Table className="table-fixed">
                    <TableHeader>
                        <tr>
                            <TableCell>Parent</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Action</TableCell>

                        </tr>
                    </TableHeader>
                    <TableBody>
                        {dataTable.map((category, i) => (
                            <>
                                <TableRow key={i}>
                                    <TableCell>
                                        None
                                    </TableCell>
                                    <TableCell className="bg-gray-700 text-white border-l-4 border-gray-700">
                                        {category.name}
                                    </TableCell>
                                    <TableCell>
                                        {category.description}
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center space-x-4">
                                            <Link layout="link" size="icon" aria-label="Edit">
                                                <EditIcon className="w-5 h-5" aria-hidden="true" />
                                            </Link>
                                            <Button layout="link" size="icon" aria-label="Delete">
                                                <TrashIcon className="w-5 h-5" aria-hidden="true" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                                {
                                    category.child_categories.map((child_category, i) => (
                                        <>
                                            <TableRow key={i}>
                                                <TableCell >
                                                    {category.name}
                                                </TableCell>
                                                <TableCell className="border-l-4 border-gray-700">
                                                    {child_category.name}
                                                </TableCell>
                                                <TableCell>
                                                    {child_category.description}
                                                </TableCell>

                                                <TableCell>
                                                    <div className="flex items-center space-x-4">
                                                        <Link layout="link" size="icon" aria-label="Edit">
                                                            <EditIcon className="w-5 h-5" aria-hidden="true" />
                                                        </Link>
                                                        <Button layout="link" size="icon" aria-label="Delete">
                                                            <TrashIcon className="w-5 h-5" aria-hidden="true" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    ))
                                }
                            </>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Category
