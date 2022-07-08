import React, { useState } from "react";
import { useEffect } from "react";
import { deletePage, getPages } from "../../adapters/page";

import PageTitle from '../../components/Typography/PageTitle'

import { TableContainer, Table, TableHeader, TableCell, TableBody, TableRow, Button } from '@windmill/react-ui';
import { CheckIcon, EditIcon, EyeIcon, PlusIcon, TrashIcon } from "../../icons";
import { Link } from "react-router-dom";
import PublishedButton from "./PublishedButton";
import { useContext } from "react";
import { PageContext } from "../../context/PageContext";
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContext";
import { ModalContext } from "../../context/ModalContext";


const moment = require('moment');

const Page = () => {
    const { pages, updatePages } = useContext(PageContext)
    const { user } = useContext(UserContext);
    const { setModalData, openModal, closeModal } = useContext(ModalContext)

    const handleDeletion = (id) => {

        const confirmDeletion = () => {
            toast.promise(deletePage(user.data.token, id),
                {
                    loading: "Deleting page",
                    success: () => {
                        closeModal();
                        updatePages();
                        return "Page deleted"
                    },
                    error: "Error deleting page"
                })
        }

        setModalData({
            title: "Are you sure you want to delete?",
            body: <div>
                <p>Deleted page cannot be recovered</p>
                <p>It is advised to unpublish page to make it temorarily unavailable in main section</p>
                <Button onClick={confirmDeletion}>Confirm</Button>
            </div>
        })
        openModal();



    }
    return (

        <>
            <PageTitle>
                <div className="flex justify-between">
                    <span>Pages</span>

                    <Link layout="link" size="icon" aria-label="Edit" to={"/app/page/add"}>
                        <PlusIcon className="w-5 h-5" aria-hidden="true" />
                    </Link>
                </div>

            </PageTitle>
            <TableContainer className="mb-8">
                <Table className="table-auto">
                    <TableHeader>
                        <tr>
                            <TableCell>Slug</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Published</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell>Updated</TableCell>
                            <TableCell>Action</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {
                            pages.map((page, index) =>
                                <TableRow>
                                    <TableCell>{page.slug}</TableCell>
                                    <TableCell>{page.title}</TableCell>
                                    <TableCell>
                                        <PublishedButton id={page.id} onChange={() => { updatePages() }} publishedState={page.published} />
                                    </TableCell>
                                    <TableCell>{moment(page.created_at).calendar()}</TableCell>
                                    <TableCell>{moment(page.updated_at).calendar()}</TableCell>
                                    <TableCell>
                                        <Link to={"/app/page/" + page.id}>
                                            <Button icon={EyeIcon} layout="link" aria-label="View" />
                                        </Link>
                                        <Button icon={TrashIcon} layout="link" aria-label="Delete" onClick={e => handleDeletion(page.id)} />
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>

            </TableContainer>
        </>
    );
}

export default Page;