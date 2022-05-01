import React, { useState, useEffect, useContext } from 'react'
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
import { deleteCategory, getCategories } from '../../adapters/category'
import { ModalContext } from '../../context/ModalContext'
import toast from 'react-hot-toast'

function Category() {

    const [categories, setCategories] = useState([])
    const [isRefreshed, setRefresh] = useState(true);
    const { setModalData, openModal, closeModal } = useContext(ModalContext)

    useEffect(() => {

        getCategories()
            .then(response => {
                setCategories(response.data)
            })
            .catch(error => console.log(error));
    }, [isRefreshed])

    const handleDeleteButtonPress = (id) => {
        const handleDeletion = () => {
            toast.promise(
                deleteCategory(id)
                ,
                {
                    loading: "Deleting category",
                    success: () => {
                        setRefresh(!isRefreshed)
                        closeModal()
                        return "Deleted category"
                    },
                    error: "Error deleting category"
                }
            )
        }
        setModalData({
            title: "Are you sure you want to delete this category?",
            body:
                <div>
                    <p>All related child category would remain with no parent and related product would have no category</p>
                    <Button className="mt-4" onClick={handleDeletion}>Confirm delete</Button>
                </div>
        })
        openModal();
    }

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
                        {categories.map((category, i) => (
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
                                            <Button layout="link" size="icon" aria-label="Delete" onClick={e => handleDeleteButtonPress(category.id)}>
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
                                                        <Button layout="link" size="icon" aria-label="Delete" onClick={e => handleDeleteButtonPress(child_category.id)}>
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
