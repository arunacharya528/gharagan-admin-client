import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { deletePageLink, getPageLinks } from "../../adapters/pageLink";

import PageTitle from '../../components/Typography/PageTitle'

import { TableContainer, Table, TableHeader, TableCell, TableBody, TableRow, Button } from '@windmill/react-ui';
import { CheckIcon, EditIcon, EyeIcon, PlusIcon, TrashIcon } from "../../icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import { AddPageLink } from "./Add";
import { EditPageLink } from "./Edit";
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContext";
const moment = require('moment')

const PageLink = () => {

    const [pageLinks, setPageLinks] = useState([]);
    const [toggleAdd, setToggleAdd] = useState(false);
    const [toggleEdit, setToggleEdit] = useState(false);
    const [isRefreshed, setRefresh] = useState(false);
    const [selectedLink, setSelectedLink] = useState({});

    const { user } = useContext(UserContext)

    useEffect(() => {
        getPageLinks(user.data.token)
            .then(response => setPageLinks(response.data))
            .catch(error => console.log(error))
    }, [isRefreshed])

    const { setModalData, openModal, closeModal } = useContext(ModalContext)

    const handleEdit = () => {

    }

    const handleDeletion = (id) => {

        const confirmDeletion = () => {
            toast.promise(
                deletePageLink(user.data.token, id),
                {
                    loading: "Deleting Link",
                    success: () => {
                        setRefresh(!isRefreshed)
                        closeModal();
                        return "Link deleted"
                    },
                    error: "Error deleting link"
                }
            )
        }
        setModalData({
            title: "Are you sure you want to delete this page link?",
            body: <div>
                <p>Link would be permanenetly deleted from database</p>
                <Button onClick={confirmDeletion}>Confirm</Button>
            </div>
        })
        openModal();
    }

    return (
        <>
            <PageTitle>
                <div className="flex justify-between">
                    <span>Page Links</span>
                    <Button icon={PlusIcon} layout="link" aria-label="Add" onClick={e => setToggleAdd(!toggleAdd)} />
                </div>

            </PageTitle>

            {
                toggleAdd ?
                    <AddPageLink onChange={() => { setRefresh(!isRefreshed); setToggleAdd(!toggleAdd) }} />
                    : ''
            }

            <div className="flex space-x-5">
                <TableContainer className="mb-8 flex-grow">
                    <Table className="table-auto">
                        <TableHeader>
                            <tr>
                                <TableCell>Name</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Slug</TableCell>
                                <TableCell>Created</TableCell>
                                <TableCell>Updated</TableCell>
                                <TableCell>Action</TableCell>
                            </tr>
                        </TableHeader>
                        <TableBody>
                            {
                                pageLinks.map((link, index) =>
                                    <TableRow>
                                        <TableCell>{link.name}</TableCell>
                                        <TableCell>{link.location}</TableCell>
                                        <TableCell>{link['url-slug']}</TableCell>
                                        <TableCell>{moment(link.created_at).calendar()}</TableCell>
                                        <TableCell>{moment(link.updated_at).calendar()}</TableCell>
                                        <TableCell>
                                            <div className="flex">
                                                <Button icon={EditIcon} layout="link" aria-label="Edit" onClick={e => { setToggleEdit(true); setSelectedLink(link) }} />
                                                <Button icon={TrashIcon} layout="link" aria-label="Delete" onClick={e => handleDeletion(link.id)} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>

                </TableContainer>

                {
                    toggleEdit ?
                        <div className="w-1/3">
                            <div className="sticky top-0">
                                <EditPageLink data={selectedLink} onChange={() => { setRefresh(!isRefreshed) }} />
                            </div>
                        </div>
                        : ''
                }

            </div>

        </>
    );
}

export default PageLink;