import React from "react";
import { useState } from "react";
import { PageLinkForm } from "./Form";
import { Button } from '@windmill/react-ui';
import toast from "react-hot-toast";
import { postPageLink, putPageLink } from "../../adapters/pageLink";
import { useEffect } from "react";

export const EditPageLink = ({ data, onChange }) => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [slug, setSlug] = useState('');


    useEffect(() => {
        setName(data.name)
        setLocation(data.location)
        setSlug(data['url-slug'])
    }, [data]);


    const handleUpdate = () => {
        toast.promise(
            putPageLink({
                name,
                location,
                'url-slug': slug
            }, data.id),
            {
                loading: "Updating link",
                success: () => {
                    onChange();
                    return "Link Updated"
                },
                error: "Error Updating link"
            }
        )
    };
    return (
        <div className="text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-600 flex flex-col p-5 rounded-lg shadow mb-8">

            <div className="text-sm font-bold">Edit page link</div>
            <PageLinkForm
                location={{ value: location, setValue: setLocation }}
                name={{ value: name, setValue: setName }}
                url_slug={{ value: slug, setValue: setSlug }} />
            <div className="mt-4">
                <Button onClick={handleUpdate}>Update</Button>
            </div>
        </div>
    );
}