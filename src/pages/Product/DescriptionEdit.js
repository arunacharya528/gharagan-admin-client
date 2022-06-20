import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Input, HelperText, Label, Select, Textarea, Button } from '@windmill/react-ui'

import { CheckIcon, CrossIcon } from "../../icons";
import { getProduct, putProduct } from "../../adapters/product";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { RichTextEditor } from "../../components/Editor";
export const DescriptionEdit = () => {


    const [description, setDescription] = useState('');

    const location = useLocation();

    const [toggleCancel, setToggleCancel] = useState(false);

    useEffect(() => {
        getProduct(location.pathname.split('/')[3])
            .then(response => {
                setDescription(response.data.description)
            })
            .catch(error => console.log(error))
    }, [toggleCancel])


    const handleSubmission = () => {
        toast.promise(
            putProduct({ description: description }, location.pathname.split('/')[3]),
            {
                loading: "Updating",
                success: "Updated description",
                error: "Error updating description"
            }
        )
    }


    return (
        <>

            <div className="">

                <Label className="">
                    <span>Description</span>
                    <RichTextEditor text={{ value: description, setValue: setDescription }} />
                </Label>
            </div>

            <div className="flex justify-between">
                <div className="mt-4">
                    <Button icon={CheckIcon} layout="link" aria-label="Save" onClick={handleSubmission} />
                </div>
                <div className="mt-4">
                    <Button icon={CrossIcon} layout="link" aria-label="Cancel"
                        onClick={e => setToggleCancel(!toggleCancel)} />
                </div>
            </div>

        </>
    );
}