import React, { useContext } from "react";
import toast from "react-hot-toast";
import { putProduct } from "../../adapters/product";
import { UserContext } from "../../context/UserContext";
import { CheckIcon } from "../../icons";

export const PublishedButton = ({ id, publishedState, onChange }) => {
    const state = publishedState === 1 ? "Un-Publish" : "Publish"
    const { user } = useContext(UserContext);
    const handleUpdate = () => {
        toast.promise(
            putProduct(user.data.token, { published: publishedState === 1 ? 0 : 1 }, id),
            {
                loading: state + "ing product",
                success: () => {
                    onChange()
                    return "Product " + state + "ed"
                },
                error: "Error " + state + "ing product",
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
