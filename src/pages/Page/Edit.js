import React, { useEffect, useState } from "react";
import PageTitle from "../../components/Typography/PageTitle";
import { Card, CardBody, Button } from "@windmill/react-ui"
import { getPage, putPage } from "../../adapters/page";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { PageForm } from "./Form";
import toast from "react-hot-toast";

const Edit = () => {

    const location = useLocation();
    const history = useHistory();

    const pageId = location.pathname.split("/")[3];
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {
        getPage(pageId)
            .then(response => {
                setTitle(response.data.title)
                setContent(response.data.content)
            })
            .catch(error => console.log(error))
    }, [])


    const handleUpdate = () => {
        toast.promise(
            putPage({ title, content }, pageId),
            {
                loading: "Updating page",
                success: () => {
                    history.push("/app/page/" + pageId)
                    return "Page updated"
                },
                error: "Error updating page"
            }
        )
    }
    return (
        <>
            <PageTitle>
                <div className="flex justify-between">
                    <span>Edit Page</span>
                </div>
            </PageTitle>

            <Card className="">
                <CardBody className="text-gray-600 dark:text-gray-400 flex flex-col" >
                    <PageForm title={{ value: title, setValue: setTitle }} content={{ value: content, setValue: setContent }} />
                    <div className="mt-4">
                        <Button onClick={handleUpdate}>Update</Button>
                    </div>
                </CardBody>
            </Card>
        </>
    )
}

export default Edit;