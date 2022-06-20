import React, { useState } from "react";
import { Button } from '@windmill/react-ui';
import toast from 'react-hot-toast';
import { putSiteData } from '../../adapters/siteData';
import { RichTextEditor } from '../../components/Editor';

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
                <RichTextEditor text={{ value, setValue }} />
                <div>
                    <Button onClick={handleUpdate} className="mt-4">Update</Button>
                </div>
            </div>
        </div>
    );
}