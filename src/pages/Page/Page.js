import React, { useState } from "react";
import { useEffect } from "react";
import { getPages } from "../../adapters/page";

import PageTitle from '../../components/Typography/PageTitle'

import { TableContainer, Table, TableHeader, TableCell, TableBody, TableRow, Button } from '@windmill/react-ui';
import { CheckIcon, EditIcon, EyeIcon } from "../../icons";
import { Link } from "react-router-dom";

const moment = require('moment');

const Page = () => {
    const [pages, setPages] = useState({ loading: true, data: [] });
    useEffect(() => {
        getPages()
            .then(response => setPages({ loading: false, data: response.data }))
            .catch(error => console.log(error))
    }, [])


    return (

        <>
            <PageTitle>Pages</PageTitle>
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
                            pages.data.map((page, index) =>
                                <TableRow>
                                    <TableCell>{page.slug}</TableCell>
                                    <TableCell>{page.title}</TableCell>
                                    <TableCell>
                                        <button className="bg-green-600 p-2 rounded-md">
                                            <CheckIcon className="w-5 h-5 text-white" />
                                        </button>
                                    </TableCell>
                                    <TableCell>{moment(page.created_at).calendar()}</TableCell>
                                    <TableCell>{moment(page.updated_at).calendar()}</TableCell>
                                    <TableCell>
                                        <Link to={"/app/page/" + page.id}>
                                            <Button icon={EyeIcon} layout="link" aria-label="View" />
                                        </Link>
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