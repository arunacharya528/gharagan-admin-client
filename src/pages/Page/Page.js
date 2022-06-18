import React, { useState } from "react";
import { useEffect } from "react";
import { getPages } from "../../adapters/page";

import PageTitle from '../../components/Typography/PageTitle'

import { TableContainer, Table, TableHeader, TableCell, TableBody, TableRow, Button } from '@windmill/react-ui';
import { CheckIcon, EditIcon, EyeIcon, PlusIcon } from "../../icons";
import { Link } from "react-router-dom";
import PublishedButton from "./PublishedButton";
import { useContext } from "react";
import { PageContext } from "../../context/PageContext";

const moment = require('moment');

const Page = () => {
    const { pages, updatePages } = useContext(PageContext)

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