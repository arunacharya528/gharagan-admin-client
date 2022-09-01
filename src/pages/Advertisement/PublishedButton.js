import React, { useContext } from "react";
import toast from "react-hot-toast";
import { putAdvertisement } from "../../adapters/advertisement";
import { putProduct } from "../../adapters/product";
import { UserContext } from "../../context/UserContext";
import { CheckIcon } from "../../icons";

export const PublishedButton = ({ id, publishedState, onChange }) => {
    const state = publishedState === 1 ? "Inactivate" : "Activate"
    const { user } = useContext(UserContext);
    const handleUpdate = () => {
        toast.promise(
            putAdvertisement(user.data.token, { active: publishedState === 1 ? 0 : 1 }, id),
            {
                loading: state + "ing advertisement",
                success: () => {
                    onChange()
                    return "Advertisement " + state + "ed"
                },
                error: "Error " + state + " ing advertisement",
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
