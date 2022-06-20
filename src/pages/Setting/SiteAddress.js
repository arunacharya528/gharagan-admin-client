import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React, { useState } from "react";
import toast from 'react-hot-toast';
import { putSiteData } from '../../adapters/siteData';
import { Button } from '@windmill/react-ui'

export const SiteAddress = ({ address }) => {

    const [siteAddress, setSiteAddress] = useState(address.value);

    const handleUpdate = () => {
        toast.promise(
            putSiteData({ value: siteAddress }, address.id)
            , {
                loading: "Updating address",
                success: () => {
                    return "Updated address";
                },
                error: "Error updating address"
            }
        )
    }

    return (
        <div className="flex items-center">
            <div className="w-64 font-semibold">Site Address</div>
            <div className="flex-grow flex flex-col">
                <CKEditor
                    editor={ClassicEditor}
                    data={siteAddress}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setSiteAddress(data)
                    }}
                />
                <div>
                    <Button onClick={handleUpdate} className="mt-4">Update</Button>
                </div>
            </div>
        </div>
    );
}