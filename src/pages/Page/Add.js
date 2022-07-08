import React, { useEffect, useState } from "react";
import PageTitle from "../../components/Typography/PageTitle";
import { Card, CardBody, Button } from "@windmill/react-ui"
import { getPage, postPage, putPage } from "../../adapters/page";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { PageForm } from "./Form";
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Add = () => {
    const history = useHistory();

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const { user } = useContext(UserContext);

    const handleAddition = () => {
        toast.promise(
            postPage(user.data.token,{ title, content }),
            {
                loading: "Creating page",
                success: (response) => {
                    history.push("/app/page/" + response.data.id)
                    return "Page created"
                },
                error: "Error creating page"
            }
        )
    }
    return (
        <>
            <PageTitle>
                <div className="flex justify-between">
                    <span>Add Page</span>
                </div>
            </PageTitle>

            <Card className="">
                <CardBody className="text-gray-600 dark:text-gray-400 flex flex-col" >
                    <PageForm title={{ value: title, setValue: setTitle }} content={{ value: content, setValue: setContent }} />
                    <div className="mt-4">
                        <Button onClick={handleAddition}>Create</Button>
                    </div>
                </CardBody>
            </Card>
        </>
    )
}

export default Add;