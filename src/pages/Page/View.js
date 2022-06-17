import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getPage } from "../../adapters/page";
import { Card, CardBody, Button } from "@windmill/react-ui"
import PageTitle from "../../components/Typography/PageTitle";
import { EditIcon, PlusIcon } from "../../icons";
import PublishedButton from "./PublishedButton";


const moment = require('moment')

const PageView = () => {

    const location = useLocation();

    const pageId = location.pathname.split("/")[3];
    const [page, setPage] = useState({ loading: true, data: {} })
    const [isRefreshed, setRefresh] = useState(false)

    useEffect(() => {
        getPage(pageId)
            .then(response => setPage({ loading: false, data: response.data }))
            .catch(error => console.log(error))
    }, [isRefreshed])

    return (
        <>
            {
                !page.loading ?


                    <>

                        <PageTitle>
                            <div className="flex justify-between">
                                <span>Page Detail</span>

                                <Link layout="link" size="icon" aria-label="Edit" to={"/app/page/" + pageId + "/edit"}>
                                    <EditIcon className="w-5 h-5" aria-hidden="true" />
                                </Link>
                            </div>
                        </PageTitle>

                        <Card className="">
                            <CardBody className="text-gray-600 dark:text-gray-400 flex flex-col" >
                                <div className="bg-blue-100 p-5 rounded-md space-y-3">
                                    <div className="text-2xl font-bold flex justify-between">
                                        <span>
                                            {page.data.title}
                                        </span>
                                        <PublishedButton publishedState={page.data.published} onChange={() => { setRefresh(!isRefreshed) }} id={pageId} />
                                    </div>
                                    <div>Slug: {page.data.slug}</div>
                                    <div className="space-x-5">
                                        <span>Created: {moment(page.data.created_at).calendar()}</span>
                                        <span>Updated: {moment(page.data.updated_at).calendar()}</span>
                                    </div>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: page.data.content }} className="mt-4" />
                            </CardBody>
                        </Card>
                    </>
                    : ''
            }

        </>
    );
}

export default PageView;