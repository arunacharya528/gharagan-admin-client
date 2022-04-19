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


import { BackIcon, CrossIcon, EditIcon, PlusIcon, TrashIcon } from '../../icons'

import PageTitle from '../../components/Typography/PageTitle'
import { deleteBrand, getBrands } from '../../adapters/brand'
import { Add } from './Add'

function Brand() {

    const [brands, setBrands] = useState([])

    const [modalData, setModalData] = useState({ title: undefined, body: undefined });
    const [isRefreshed, setRefresh] = useState(true);


    useEffect(() => {

        getBrands()
            .then(response => {
                setBrands(response.data)
            })
            .catch(error => console.log(error));
    }, [isRefreshed])

    const [toggleAdd, setToggleAdd] = useState(false);

    const handleDeletion = (id) => {
        deleteBrand(id)
            .then(response => { setRefresh(!isRefreshed) })
            .catch(error => console.log(error))
    }

    return (
        <>
            {toggleAdd ?

                <>
                    <PageTitle>
                        <div className="flex align-middle">
                            <span onClick={e => setToggleAdd(!toggleAdd)} className="w-16 flex align-middle">
                                <BackIcon className="w-5 h-5 my-auto" aria-hidden="true" />
                            </span>
                            <span>Add Brand</span>
                        </div>
                    </PageTitle>
                    <Add afterSubmission={() => { setToggleAdd(!toggleAdd); setRefresh(!isRefreshed) }} />
                </>
                :
                <>
                    <PageTitle>
                        <div className="flex justify-between">
                            <span>Brands</span>
                            <span onClick={e => setToggleAdd(!toggleAdd)}>
                                <PlusIcon className="w-5 h-5" aria-hidden="true" />
                            </span>
                        </div>
                    </PageTitle>
                    <TableContainer className="mb-8">
                        <Table className="table-auto w-100">
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
                                                    <Button layout='link' size="icon" >
                                                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                                                    </Button>
                                                    <Button layout="link" size="icon" aria-label="Delete" onClick={e => handleDeletion(brand.id)}>
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
            }

        </>
    )
}

export default Brand
