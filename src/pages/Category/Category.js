import React, { useState, useEffect } from 'react'
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


import { EditIcon, PlusIcon, TrashIcon } from '../../icons'

import PageTitle from '../../components/Typography/PageTitle'
import { Link } from 'react-router-dom'
import { getCategories } from '../../adapters/category'
// import { Edit } from './Edit'

function Category() {

    const [dataTable, setDataTable] = useState([])

    const [modalData, setModalData] = useState({ title: undefined, body: undefined });

    const [isRefreshed, setRefresh] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    useEffect(() => {

        getCategories()
            .then(response => {
                setDataTable(response.data)
            })
            .catch(error => console.log(error));
    }, [isRefreshed])

    // const handleAddButtonPress = () => {
    //     openModal();
    //     setModalData({
    //         title: "Add Category",
    //         body: <Add categories={dataTable} afterSubmission={() => {
    //             closeModal();
    //             setRefresh(!isRefreshed);
    //         }} />
    //     });
    // }

    // const handleEditButtonPress = (id) => {
    //     openModal();
    //     setModalData({
    //         title: "Edit Category",
    //         body: <Edit id={id} categories={dataTable} afterSubmission={() => {
    //             closeModal();
    //             setRefresh(!isRefreshed);
    //         }} />
    //     });
    // }


    return (
        <>
            <PageTitle>
                <div className="flex justify-between">
                    <span>Categories</span>
                    <Link layout="link" to="/app/category/add">
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
                                            <Link layout='link' size="icon" to={"/app/category/" + category.id + "/edit"}>
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
                                                        <Link to={"/app/category/" + child_category.id + "/edit"}>
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
