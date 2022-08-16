import React, { useContext, useState } from "react";
import { Button } from '@windmill/react-ui';
import toast from 'react-hot-toast';
import { putSiteData } from '../../adapters/siteData';
import { RichTextEditor } from '../../components/Editor';
import { UserContext } from "../../context/UserContext";

export const Notification = ({ notification }) => {

    const [value, setValue] = useState(notification.value);
    const { user } = useContext(UserContext)

    const handleUpdate = () => {
        toast.promise(
            putSiteData(user.data.token, { value: value }, notification.id)
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
                <div className="space-x-5">
                    <Button onClick={handleUpdate} className="mt-4">Update</Button>
                    <Button onClick={() => { setValue('-'); handleUpdate() }} className="mt-4">Clear notification</Button>
                </div>
            </div>
        </div>
    );
}