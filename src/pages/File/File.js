import React, { useEffect, useState } from "react";
import { deleteFile, getFiles } from "../../adapters/file";
import { Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui'
import { PlusIcon, TrashIcon } from "../../icons";
import { Add } from "./Add";
import Buttons from "../Buttons";

const File = () => {

    const [files, setFiles] = useState([]);
    const [isRefreshed, setRefresh] = useState(false);

    useEffect(() => {

        getFiles()
            .then(response => {
                setFiles(response.data)
            })
            .catch(error => console.log(error));
    }, [isRefreshed])

    const [toggleAdd, setToggleAdd] = useState(false);



    //===================================
    //
    //      Model Data
    //
    //===================================
    const [modalData, setModalData] = useState({ title: undefined, body: undefined });
    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }


    const viewImage = (file) => {
        setModalData({
            title: file.name,
            body:
                <>
                    <a href={process.env.REACT_APP_FILE_PATH + "/" + file.path} target="_blank" title={file.name + " image"}>
                        <img src={process.env.REACT_APP_FILE_PATH + "/" + file.path}
                            alt={file.name + " image"} className="rounded" />
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


    const confirmDeletion = (id) => {
        deleteFile(id)
            .then(response => {
                closeModal();
                setRefresh(!isRefreshed);
            })
            .catch(error => console.log(error))
    }

    const handleDeletion = (file) => {
        setModalData({
            title: "Are you sure you want to delete " + file.name,
            body:
                <>
                    <div className="pt-4">
                        The value would be set as empty in all the related tables:
                        <div className="grid grid-cols-2 gap-1 pt-4">
                            <span className="font-bold">Product</span>
                            <span>{file.number_of_product_images}</span>

                            <span className="font-bold">Brand</span>
                            <span>{file.number_of_brands}</span>

                            <span className="font-bold">Advertisement</span>
                            <span>{file.number_of_advertisements}</span>
                        </div>
                    </div>

                    <Button className="my-4" onClick={e => confirmDeletion(file.id)}>Confirm Deletion</Button>

                </>
        });

        openModal();
    }

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalHeader>{modalData.title}</ModalHeader>
                <ModalBody>
                    {modalData.body}
                </ModalBody>

            </Modal>

            {
                toggleAdd ?
                    <Card className="mt-8 shadow-md">
                        <CardBody>
                            <div className="mb-4 font-semibold text-gray-600 dark:text-gray-300 flex justify-between">
                                <span>General Info</span>

                            </div>
                            <div className="text-gray-600 dark:text-gray-400">
                                <Add afterSubmission={() => { setToggleAdd(!toggleAdd); setRefresh(!isRefreshed) }} />
                            </div>
                        </CardBody>
                    </Card>
                    : ''
            }

            <Button icon={PlusIcon} className="my-4" onClick={e => setToggleAdd(!toggleAdd)}>{toggleAdd ? 'Close Adding Form' : "Add new file"}</Button>

            <Card className="mb-8 shadow-md">
                <CardBody>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
                        {
                            files.map((file, index) =>
                                <div
                                    className="relative overflow-auto"
                                    key={index}
                                    title={`P (${file.number_of_product_images}) | B(${file.number_of_brands}) | A(${file.number_of_advertisements})`}
                                >

                                    <img src={process.env.REACT_APP_FILE_PATH + "/" + file.path} alt={file.name + "image"} className="rounded-t" onClick={e => viewImage(file)} />

                                    <div className="absolute top-0 right-0 p-2 bg-red-600 text-white rounded" onClick={e => handleDeletion(file)}>
                                        <TrashIcon className="w-5 h-5" />
                                    </div>
                                    <div className="bg-gray-700 text-white text-center rounded-b" title={file.name}>
                                        <span className="p-1 block truncate">{file.name}</span>
                                    </div>

                                </div>
                            )
                        }
                    </div>
                </CardBody>
            </Card>


        </>


    );
}

export default File;