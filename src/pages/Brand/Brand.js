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


import { BackIcon, CrossIcon, EditIcon, PlusIcon, TrashIcon } from '../../icons'

import PageTitle from '../../components/Typography/PageTitle'
import { deleteBrand, getBrands } from '../../adapters/brand'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ModalContext } from '../../context/ModalContext'

function Brand() {

    const [brands, setBrands] = useState([])

    // const [modalData, setModalData] = useState({ title: undefined, body: undefined });
    const [isRefreshed, setRefresh] = useState(true);
    const { setModalData, openModal, closeModal } = useContext(ModalContext)


    useEffect(() => {

        getBrands()
            .then(response => {
                setBrands(response.data)
            })
            .catch(error => console.log(error));
    }, [isRefreshed])

    const handleDeleteButtonPress = (id) => {
        const handleDeletion = () => {
            toast.promise(
                deleteBrand(id)
                    .then(response => { setRefresh(!isRefreshed) }),
                {
                    loading: "Deleting brand",
                    success: () => {
                        setRefresh(!isRefreshed)
                        closeModal();
                        return "Deleted Brand";
                    },
                    error: "Errod deleting brand"
                }
            )

                .catch(error => console.log(error))
        }
        setModalData({
            title: "Are you sure you want to delete this brand?",
            body:
                <div>
                    <p>The product of related brand would be set to null</p>
                    <Button className="mt-4" onClick={handleDeletion}>Confirm deletion</Button>
                </div>
        })
        openModal();
    }


    return (
        <>
            <PageTitle>
                <div className="flex justify-between">
                    <span>Brands</span>
                    <Link to={"/app/brand/add"}>
                        <PlusIcon className="w-5 h-5" aria-hidden="true" />
                    </Link>
                </div>
            </PageTitle>
            <TableContainer className="mb-8">
                <Table className="table-fixed">
                    <TableHeader>
                        <tr>
                            <TableCell>SN</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>No of Products</TableCell>
                            <TableCell>Action</TableCell>

                        </tr>
                    </TableHeader>
                    <TableBody>
                        {brands.map((brand, i) => (
                            <>
                                <TableRow key={i}>
                                    <TableCell className="font-bold">
                                        {i + 1}
                                    </TableCell>
                                    <TableCell>
                                        {brand.name}
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <img src={brand.file ? process.env.REACT_APP_FILE_PATH + "/" + brand.file.path : brand.image_url} className="w-32 rounded" />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {brand.number_of_products}
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center space-x-4">
                                            <Link to={"/app/brand/" + brand.id + "/edit"} layout='link' size="icon" >
                                                <EditIcon className="w-5 h-5" aria-hidden="true" />
                                            </Link>
                                            <Button layout="link" size="icon" aria-label="Delete" onClick={e => handleDeleteButtonPress(brand.id)}>
                                                <TrashIcon className="w-5 h-5" aria-hidden="true" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>

                            </>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Brand
