import React, { useContext, useEffect, useState } from "react";
import { deleteFile, getFiles } from "../../adapters/file";
import { Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui'
import { FileIcon, PlusIcon, TrashIcon } from "../../icons";
import { Add } from "./Add";
import Buttons from "../Buttons";
import { FileContext } from "../../context/FileContext";
import { ImageThumbnail } from "./ImageThumbnail";
import { isImgLink } from "../../utils/helper/checkImageLink";
import toast from "react-hot-toast";
import PageTitle from "../../components/Typography/PageTitle";
import { ModalContext } from "../../context/ModalContext";

const File = () => {

    const { files, updateFiles } = useContext(FileContext)
    // const [fileList, setFileList] = useState([])

    // useEffect(() => {
    //     setFileList(files)
    // }, [files])

    const [toggleAdd, setToggleAdd] = useState(false);
    const { setModalData, openModal, closeModal } = useContext(ModalContext)

    const viewFile = (file) => {
        setModalData({
            title: file.name,
            body:
                <>
                    <a href={process.env.REACT_APP_FILE_PATH + "/" + file.path} target="_blank" title={file.name}>
                        {
                            isImgLink(process.env.REACT_APP_FILE_PATH + "/" + file.path) ?
                                <img src={process.env.REACT_APP_FILE_PATH + "/" + file.path}
                                    alt={file.name + " image"} className="rounded" />
                                :
                                <span className="font-bold text-gray-500 flex">
                                    Click here to download file
                                </span>
                        }


                    </a>

                    <div className="pt-4">
                        Used State:
                        <div className="grid grid-cols-2 gap-1 pt-4">
                            <span className="font-bold">Product</span>
                            <span>{file.number_of_product_images}</span>

                            <span className="font-bold">Brand</span>
                            <span>{file.number_of_brands}</span>

                            <span className="font-bold">Advertisement</span>
                            <span>{file.number_of_advertisements}</span>
                        </div>
                    </div>
                </>
        });
        openModal();

    }




    const handleDeletion = (file) => {
        const confirmDeletion = (id) => {
            toast.promise(
                deleteFile(id)
                , {
                    loading: "Deleting file",
                    success: () => {
                        updateFiles();
                        closeModal();
                        return "Deleted file"
                    },
                    error: "Error deleting file"
                }
            )
        }
        setModalData({
            title: "Are you sure you want to delete " + file.name,
            body:
                <>
                    <div className="pt-4">
                        The value would be set as empty in all the related tables:
                        <div className="grid grid-cols-2 gap-1 pt-4">
                            <span className="font-bold">Product</span>
                            <span>{file.product_images_count}</span>

                            <span className="font-bold">Brand</span>
                            <span>{file.brands_count}</span>

                            <span className="font-bold">Advertisement</span>
                            <span>{file.advertisements_count}</span>
                        </div>
                    </div>

                    <Button className="my-4" onClick={e => confirmDeletion(file.id)}>Confirm Deletion</Button>

                </>
        });

        openModal();
    }

    return (
        <>
            <PageTitle>
                File Manager
            </PageTitle>
            {
                toggleAdd ?
                    <Card className="shadow-md">
                        <CardBody>
                            <div className="mb-4 font-semibold text-gray-600 dark:text-gray-300 flex justify-between">
                                <span>Add new Files</span>

                            </div>
                            <div className="text-gray-600 dark:text-gray-400">
                                <Add afterSubmission={() => { setToggleAdd(!toggleAdd); updateFiles() }} />
                            </div>
                        </CardBody>
                    </Card>
                    : ''
            }

            <Button icon={PlusIcon} className="mb-4" onClick={e => setToggleAdd(!toggleAdd)}>{toggleAdd ? 'Close Adding Form' : "Add new file"}</Button>
            <Card className="mb-8 shadow-md">
                <CardBody>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 items-stretch">
                        {
                            files.map((file, index) =>
                                <ImageThumbnail
                                    file={file}
                                    key={index}
                                    viewAction={(e) => viewFile(file)}
                                    removalAction={{
                                        icon: <TrashIcon className="w-5 h-5" />,
                                        action: () => handleDeletion(file)
                                    }} />
                            )
                        }
                    </div>
                </CardBody>
            </Card>


        </>
    );
}

export default File;