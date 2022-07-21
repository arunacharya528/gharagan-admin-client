import React from "react";
import { useContext } from "react";
import PageTitle from "../../components/Typography/PageTitle";
import { UserContext } from "../../context/UserContext";
import { Button } from "@windmill/react-ui"
import { ModalContext } from "../../context/ModalContext";
import { UpdateInfo } from "./UpdateInfo";
import { UpdateEmail } from "./UpdateEmail";
import { UpdatePassword } from "./UpdatePassword";
import { VerifyEmail } from "./VerifyEmail";

const Profile = () => {
    const { user } = useContext(UserContext);

    const { setModalData, openModal, closeModal } = useContext(ModalContext)

    const handleInfoUpdate = () => {
        setModalData({
            title: "Update your info",
            body: <UpdateInfo onSuccess={() => { closeModal() }} />
        })
        openModal();
    }

    const handleEmailUpdate = () => {
        setModalData({
            title: "Update your email",
            body: <UpdateEmail onSuccess={() => { closeModal() }} />
        })
        openModal();
    }

    const handlePasswordUpdate = () => {
        setModalData({
            title: "Update your password",
            body: <UpdatePassword onSuccess={() => { closeModal() }} />
        })
        openModal();
    }

    const handleEmailVerification = () => {
        setModalData({
            title: "Verify your email",
            body: <VerifyEmail onSuccess={() => { closeModal() }} />
        })
        openModal();
    }

    return (
        <>
            <PageTitle>My profile</PageTitle>

            <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 text-gray-700 dark:text-gray-400 flex flex-col">
                {
                    user.data.email_verified_at === null ?
                        <div className="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple">
                            <div className="flex items-center">
                                <span>Verify this email address to access account even if you forgot password</span>
                            </div>
                            <button className="p-2 border" onClick={handleEmailVerification}>Verify</button>
                        </div>
                        : ''
                }


                <div className="grid grid-cols-2 w-1/3 gap-3">
                    <span><b>Name</b></span>
                    <span>{user.data.name}</span>

                    <span><b>Contact</b></span>
                    <span>{user.data.contact}</span>

                    <span><b>Email</b></span>
                    <span>{user.data.email}</span>
                </div>
                <div className="mt-4 space-x-5">
                    <Button layout="outline" onClick={handleInfoUpdate}>Update info</Button>
                    <Button layout="outline" onClick={handleEmailUpdate}>Update Email</Button>
                    <Button layout="outline" onClick={handlePasswordUpdate}>Update Password</Button>
                </div>
            </div>
        </>
    );
}

export default Profile