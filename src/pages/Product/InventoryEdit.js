import { Input, HelperText, Label, Select, Textarea, Badge } from '@windmill/react-ui'
import React, { useEffect, useState } from 'react';
import { CheckIcon, CrossIcon, EditIcon } from '../../icons';
import { Button } from '@windmill/react-ui'
import { useLocation } from 'react-router-dom';
import { deleteInventory, getInventoryByProduct, postInventory } from '../../adapters/inventory';
import { getDiscounts } from '../../adapters/discount';
import { Card, CardBody, Modal, ModalHeader, ModalBody } from '@windmill/react-ui'
import { InventoryUpdate } from './InventoryUpdate';
import { getDiscountedPrice } from '../../utils/helper/discount';


export const InventoryEdit = () => {

    const [inventories, setinventories] = useState([]);

    const [type, setType] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [discount, setDiscount] = useState(null);

    const location = useLocation();

    const [discountList, setDiscountList] = useState([]);

    const [isRefreshed, setRefresh] = useState(false);
    useEffect(() => {
        getInventoryByProduct(location.pathname.split('/')[3])
            .then((response) => {
                setinventories(response.data)
            })
            .catch((error) => {
                console.log(error);
            });

    }, [isRefreshed])

    useEffect(() => {
        getDiscounts()
            .then(response => {
                setDiscountList(response.data)
            })
    }, [])


    const getStatusBadge = (status) => {
        switch (status) {
            case 0:
                return <Badge type="danger">inactive</Badge>
            case 1:
                return <Badge type="success">active</Badge>

        }
    }

    const setDefault = () => {
        setType('');
        setPrice(0);
        setQuantity(0);
        setDiscount(0);
    }
    const handleSubmission = () => {
        postInventory({
            type: type,
            product_id: location.pathname.split('/')[3],
            discount_id: discount,
            price: price,
            type: type,
            quantity: quantity
        })
            .then(response => { setRefresh(!isRefreshed); setDefault(); })
            .catch(error => console.log(error))
    }

    //=========================================
    //      Modal data
    //=========================================


    const [modalData, setModalData] = useState({ title: undefined, body: undefined });
    const [isModalOpen, setIsModalOpen] = useState(false)
    function openModal() {
        setIsModalOpen(true)
    }
    function closeModal() {
        setIsModalOpen(false)
    }

    const handleEdit = (inventory) => {
        openModal();

        const afterUpdate = () => {
            closeModal();
            setRefresh(!isRefreshed);
        }

        setModalData({
            title: "Update Inventory data",
            body: <InventoryUpdate inventory={inventory} discounts={discountList} submitted={afterUpdate} />
        });
    }

    const handleDeletion = (id) => {
        deleteInventory(id)
            .then(response => { setRefresh(!isRefreshed); })
            .catch(error => console.log(error))
    }

    return (

        <>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalHeader>{modalData.title}</ModalHeader>
                <ModalBody>
                    {modalData.body}
                </ModalBody>

            </Modal>
            <table className='table-auto w-full text-gray-600 dark:text-gray-400 '>
                <tbody>
                    <tr className='text-left text-gray-600 dark:text-gray-300'>
                        <th className='py-2'>Type</th>
                        <th className='py-2'>Price</th>
                        <th className='py-2'>Quantity</th>
                        <th className='py-2'>Discount %</th>
                        <th className='py-2'>Amount</th>
                        <th className='py-2'>Action</th>
                    </tr>
                    {
                        inventories.length !== 0 ?
                            inventories.map((inventory, index) =>
                                <tr key={index}>
                                    <td>{inventory.type}</td>
                                    <td>{inventory.price}</td>
                                    <td>{inventory.quantity}</td>
                                    <td>
                                        {inventory.discount ?
                                            inventory.discount.name + " " + inventory.discount.discount_percent + "%"
                                            : "None"}

                                    </td>
                                    <td>{
                                        discountList.length !== 0 ?
                                            getDiscountedPrice(inventory.price, inventory.discount ? inventory.discount.id : null, discountList)
                                            : ''
                                    }</td>
                                    <td className='flex flex-row flex-no-wrap'>
                                        <Button icon={EditIcon} layout="link" aria-label="Like" onClick={e => handleEdit(inventory)} />
                                        <Button icon={CrossIcon} layout="link" aria-label="Like" onClick={e => handleDeletion(inventory.id)} />
                                    </td>
                                </tr>
                            )
                            : ''
                    }
                    <tr>
                        <th>
                            <Input className="mt-1" placeholder="Eg: Red, XL, L, etc" value={type} onChange={e => setType(e.target.value)} />
                        </th>
                        <th className='w-32'>
                            <Input className="mt-1" type="number" placeholder="Offering price" value={price} onChange={e => setPrice(e.target.value)} />
                        </th>
                        <th className='w-32'>
                            <Input className="mt-1" type="number" placeholder="Available Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
                        </th>
                        <th className='w-64'>
                            <Select className="mt-1" value={discount} onChange={e => setDiscount(e.target.value === "None" ? null : e.target.value)}>
                                <option>None</option>
                                {discountList.map((discount, index) =>
                                    <option value={discount.id} key={index}>{discount.name} - {discount.discount_percent}%</option>
                                )}
                            </Select>
                        </th>
                        <th className='w-32'>

                            {getDiscountedPrice(price, discount, discountList)}

                        </th>
                        <th>
                            <Button icon={CheckIcon} layout="link" aria-label="Like" onClick={handleSubmission} />
                            <Button icon={CrossIcon} layout="link" aria-label="Like" onClick={e => setDefault()} />
                        </th>
                    </tr>


                </tbody>
            </table>
        </>
    );
}