import React from "react";
import { useContext, useMemo } from "react";
import { UserContext } from "../../context/UserContext";
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import { updateEmail } from "../../adapters/auth";

export const UpdateEmail = ({ onSuccess }) => {
    const { user, updateUser } = useContext(UserContext);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: useMemo(() => {
            return {
                email: user.data.email
            }
        }, [user])
    });

    const onSubmit = data => {
        toast.promise(
            updateEmail(user.data.token, data),
            {
                loading: "Updating user's email",
                success: () => {
                    updateUser();
                    onSuccess();
                    return "Updated user's email"
                },
                error: "Error updating user email"
            }
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-3">
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text font-bold">Email</span>
                </label>
                <input type="email" className={"input input-bordered input-secondary w-full " + (errors.email ? 'input-error' : '')} placeholder="Enter your email" {...register("email", { required: "email is required" })} />
                {errors.email ? <label className="text-error px-3 py-1">{errors.email.message}</label> : ''}
            </div>
            <div className="space-x-5">
                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </div>
        </form >
    );
}