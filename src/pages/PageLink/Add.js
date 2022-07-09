import React, { useContext } from "react";
import { useState } from "react";
import { PageLinkForm } from "./Form";
import { Button } from '@windmill/react-ui';
import toast from "react-hot-toast";
import { postPageLink } from "../../adapters/pageLink";
import { UserContext } from "../../context/UserContext";

export const AddPageLink = ({ onChange }) => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState({});
    const [slug, setSlug] = useState({});
    const { user } = useContext(UserContext)


    const handleAddition = () => {
        toast.promise(
            postPageLink(user.data.token, {
                name,
                location,
                'url-slug': slug
            }),
            {
                loading: "Saving link",
                success: () => {
                    setName('');
                    setLocation({});
                    setSlug({});
                    onChange();
                    return "Link saved"
                },
                error: "Error saving link"
            }
        )
    };


    return (
        <div className="text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-600 flex flex-col p-5 rounded-lg shadow mb-8">

            <div className="text-sm font-bold">Add new page link</div>
            <PageLinkForm location={{ value: location, setValue: setLocation }} name={{ value: name, setValue: setName }} url_slug={{ value: slug, setValue: setSlug }} />
            <div className="mt-4">
                <Button onClick={handleAddition}>Create</Button>
            </div>
        </div>
    );
}