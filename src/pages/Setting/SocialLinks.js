import React, { useState } from "react";
import { Input, HelperText, Label, Select, Textarea, Button } from '@windmill/react-ui'
import { EditIcon, TrashIcon } from "../../icons";
import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import { useEffect } from "react";
import { putSiteData } from "../../adapters/siteData";
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContext";

export const SocialLinks = ({ socialLink }) => {

    const [links, setLinks] = useState(JSON.parse(socialLink.value));

    const { setModalData, openModal, closeModal } = useContext(ModalContext);

    const LinkForm = (props = {
        path: { value: String, setValue: Function },
    }) => {
        return (
            <div className="space-y-1 py-3 flex items-center">
                <div className="flex-grow">
                    <Label>
                        <Input placeholder="Enter site path" value={props.path.value} onChange={e => props.path.setValue(e.target.value)} />
                    </Label>
                </div>
            </div>
        );
    }

    const LinkEdit = ({ link, submit }) => {
        const [path, setPath] = useState('');

        useEffect(() => {
            setPath(link.path);
        }, [link])

        return (
            <>
                <LinkForm
                    path={{ value: path, setValue: setPath }}
                />
                <div>
                    <Button onClick={e => submit({ path })}>OK</Button>
                </div>
            </>
        );
    }

    const LinkAdd = ({ submit }) => {
        const [path, setPath] = useState('');
        return (
            <>
                <LinkForm
                    path={{ value: path, setValue: setPath }}
                />
                <div>
                    <Button onClick={e => submit({ path })}>OK</Button>
                </div>
            </>
        );
    }



    const handleEdit = (link, index) => {
        const handleSubmission = (data) => {
            const oldData = links;
            oldData[index] = data;
            closeModal();
        }
        setModalData({
            title: "Update social media link",
            body: <LinkEdit link={link} submit={handleSubmission} />
        })
        openModal()
    }

    const handleAddition = () => {
        const handleSubmission = (data) => {
            setLinks([...links, ...[data]])
            closeModal();
        }

        setModalData({
            title: "Add new social media link",
            body: <LinkAdd submit={handleSubmission} />
        })
        openModal()
    }
    const handleDeletion = (index) => {
        setLinks(links.filter((link, i) => i !== index))
    }

    const { user } = useContext(UserContext)
    const handleUpdate = () => {
        toast.promise(
            putSiteData(user.data.token, { value: JSON.stringify(links) }, socialLink.id)
            , {
                loading: "Updating social links",
                success: () => {
                    return "Updated social links";
                },
                error: "Error updating social links"
            }
        )
    }

    return (
        <div className="flex items-center">
            <div className="w-64 font-semibold">Social links</div>
            <div className="flex-grow divide-y">
                {
                    links.map((link, index) =>
                        <div className="space-y-1 py-3 flex items-center">
                            <div className="flex-grow">
                                <div> {link.path}</div>
                            </div>
                            <div>
                                <Button icon={EditIcon} layout="link" aria-label="Edit" onClick={e => handleEdit(link, index)}></Button>
                                <Button icon={TrashIcon} layout="link" aria-label="Remove" onClick={e => handleDeletion(index)}></Button>
                            </div>

                        </div>
                    )
                }
                <div className="flex justify-between pt-4">
                    <Button onClick={handleAddition}>Add new</Button>

                    <Button onClick={handleUpdate}>Update</Button>
                </div>
            </div>

        </div>
    );
}