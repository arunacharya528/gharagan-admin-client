import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getPageLinks } from "../../adapters/pageLink";

import PageTitle from '../../components/Typography/PageTitle'

import { TableContainer, Table, TableHeader, TableCell, TableBody, TableRow, Button } from '@windmill/react-ui';
import { CheckIcon, EditIcon, EyeIcon, PlusIcon, TrashIcon } from "../../icons";
import { Link } from "react-router-dom";
const moment = require('moment')

const PageLink = () => {

    const [pageLinks, setPageLinks] = useState([]);

    useEffect(() => {
        getPageLinks()
            .then(response => setPageLinks(response.data))
            .catch(error => console.log(error))
    }, [])

    const handleEdit = () => { 

    }

    const handleDeletion = () => { 

    }

    return (
        <>
            <PageTitle>
                <div className="flex justify-between">
                    <span>Page Links</span>

                    <Link layout="link" size="icon" aria-label="Edit" to={"/app/page/add"}>
                        <PlusIcon className="w-5 h-5" aria-hidden="true" />
                    </Link>
                </div>

            </PageTitle>
            <TableContainer className="mb-8">
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
                                            <Button icon={EditIcon} layout="link" aria-label="Edit" onClick={handleEdit} />
                                            <Button icon={TrashIcon} layout="link" aria-label="Delete" onClick={handleDeletion} />
                                        </div>
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

export default PageLink;