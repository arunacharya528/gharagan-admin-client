import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React, { useState } from "react";
import { Button } from '@windmill/react-ui';
import toast from 'react-hot-toast';
import { putSiteData } from '../../adapters/siteData';

export const Notification = ({ notification }) => {

    const [value, setValue] = useState(notification.value);

    const handleUpdate = () => {
        toast.promise(
            putSiteData({ value: value }, notification.id)
            , {
                loading: "Updating notification",
                success: () => {
                    return "Updated notification";
                },
                error: "Error updating notification"
            }
        )
    }

    return (
        <div className="flex items-center">
            <div className="w-64 font-semibold">Notification</div>
            <div className="flex-grow flex flex-col">
                <CKEditor
                    editor={ClassicEditor}
                    data={value}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setValue(data)
                    }}
                />
                <div>
                    <Button onClick={handleUpdate} className="mt-4">Update</Button>
                </div>
            </div>
        </div>
    );
}