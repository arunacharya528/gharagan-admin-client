import React, { useContext } from "react";
import { CheckIcon } from "../../icons";
import toast from "react-hot-toast";
import { putPage } from "../../adapters/page";
import { UserContext } from "../../context/UserContext";


const PublishedButton = ({ id, publishedState, onChange }) => {
    const state = publishedState === 1 ? "Un-Publish" : "Publish"
    const { user } = useContext(UserContext);
    const handleUpdate = () => {
        toast.promise(
            putPage(user.data.token, { published: publishedState === 1 ? 0 : 1 }, id),
            {
                loading: state + "ing page",
                success: () => {
                    onChange()
                    return "Page " + state + "ed"
                },
                error: "Error " + state + "ing page",
            }
        )
    }

    return (
        <button className={"p-2 rounded-md flex flex-row space-x-2 " + (publishedState === 1 ? "bg-green-600 text-white" : "")} onClick={handleUpdate}>
            <span className="text-sm whitespace-no-wrap">
                {state}
            </span>
            <CheckIcon className="w-5 h-5" />
        </button>
    );
}

export default PublishedButton;