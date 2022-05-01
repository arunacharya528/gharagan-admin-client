import React, { createContext, useState } from "react";

import { Modal, ModalHeader, ModalBody } from "@windmill/react-ui"

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {

    const [modalData, setModalData] = useState({ title: null, body: null });
    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }


    return <ModalContext.Provider value={{ setModalData, openModal, closeModal }}>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ModalHeader>{modalData.title}</ModalHeader>
            <ModalBody>
                {modalData.body}
            </ModalBody>
        </Modal>
        {children}
    </ModalContext.Provider>
}
