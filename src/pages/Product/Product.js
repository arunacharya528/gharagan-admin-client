import React, { useState, useEffect, useContext } from 'react'
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
import { deleteProduct, getProducts } from '../../adapters/product'
import { ModalContext } from '../../context/ModalContext'
import toast from 'react-hot-toast'
import { UserContext } from '../../context/UserContext'
import { ProductContext } from '../../context/ProductContext'


function Tables() {

    const [dataTable, setDataTable] = useState([])


    const { products, refresh } = useContext(ProductContext)
    const { setModalData, openModal, closeModal } = useContext(ModalContext)

    const { user } = useContext(UserContext)
    const handleDeleteButtonPress = (id) => {

        const handleDeletion = () => {
            toast.promise(
                deleteProduct(user.data.token, id)
                , {
                    loading: "Deleting product",
                    success: () => {
                        refresh();
                        closeModal();
                        return "Deleted product"
                    },
                    error: "Error deleting product"
                }
            )
        }
        setModalData({
            title: "Are you sure you want to delete this product ?",
            body: <div>
                <p>All data related to this product like <u>inventory</u>, <u>images</u>, <u>ratings</u> and <u>QAs</u> would also be deleted</p>

                <Button onClick={handleDeletion} className="mt-4">Confirm deletion</Button>
            </div>
        })
        openModal();
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
            <TableContainer className="mb-8">
                <Table>
                    <TableHeader>
                        <tr>
                            <TableCell>Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Brand</TableCell>
                            <TableCell>Average rating</TableCell>
                            <TableCell>Action</TableCell>

                        </tr>
                    </TableHeader>
                    <TableBody>
                        {products.map((product, i) => (
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
                                    {product.ratings_avg_rate}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-4">
                                        <Link layout="link" size="icon" aria-label="Edit" to={"/app/product/" + product.id}>
                                            <EyeIcon className="w-5 h-5" aria-hidden="true" />
                                        </Link>
                                        <Button layout="link" size="icon" aria-label="Delete" onClick={e => handleDeleteButtonPress(product.id)}>
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
