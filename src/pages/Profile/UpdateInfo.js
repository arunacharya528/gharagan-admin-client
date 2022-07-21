import React from "react";
import { useContext, useMemo } from "react";
// import { postUser } from "../../adapters/auth";
import { UserContext } from "../../context/UserContext";
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import { postUser } from "../../adapters/auth";

export const UpdateInfo = ({ onSuccess }) => {
    const { user, updateUser } = useContext(UserContext);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: useMemo(() => {
            return {
                name: user.data.name,
                contact: user.data.contact
            }
        }, [user])
    });
    const onSubmit = data => {
        toast.promise(
            postUser(user.data.token, 'updateInfo', data),
            {
                loading: "Updating user info",
                success: () => {
                    updateUser();
                    onSuccess();
                    return "Updated user info"
                },
                error: (error) => {
                    console.log(error)
                    return "Error updating user info"
                }
            }
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-3">
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text font-bold">Name</span>
                </label>
                <input type="text" className={"input input-bordered input-secondary w-full " + (errors.name ? 'input-error' : '')} placeholder="Enter your name" {...register("name", { required: "Name is required" })} />
                {errors.name ? <label className="text-error px-3 py-1">{errors.name.message}</label> : ''}
            </div>
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text font-bold">Contact</span>
                </label>
                <input type="text" className={"input input-bordered input-secondary w-full " + (errors.contact ? 'input-error' : '')} placeholder="Enter your contact" {...register("contact", { required: "Contact is required" })} />
                {errors.contact ? <label className="text-error px-3 py-1">{errors.contact.message}</label> : ''}
            </div>

            <div className="space-x-5">
                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </div>
        </form >
    );
}