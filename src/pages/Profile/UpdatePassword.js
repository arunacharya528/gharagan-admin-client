import React from "react";
import { useContext, useState } from "react";
import { postUser } from "../../adapters/auth";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";

export const UpdatePassword = ({ onSuccess }) => {
    const { user, updateUser } = useContext(UserContext);
    const [password, setPassword] = useState('');
    const [errorList, setErrorList] = useState([]);
    const onSubmit = (e) => {
        e.preventDefault();
        toast.promise(
            postUser(user.data.token, 'updatePassword', { password }),
            {
                loading: "Updating password",
                success: (response) => {
                    updateUser();
                    onSuccess();
                    return "Updated password"
                },
                error: (error) => {
                    setErrorList(error.response.data);
                    return "Error occured updating password"
                }
            }
        )
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col space-y-3">
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text font-bold">New password</span>
                </label>
                <input type="text" className={"input input-bordered input-secondary w-full " + (errorList.length !== 0 ? 'input-error' : '')} placeholder="Enter your password" onChange={e => setPassword(e.target.value)} value={password} />
                <div className="flex flex-col px-3 space-y-2">
                    {
                        errorList.map((error, index) =>
                            <label className="text-error" key={index}>{error}</label>
                        )
                    }
                </div>

            </div>

            <div className="space-x-5">
                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </div>
        </form >
    );
}