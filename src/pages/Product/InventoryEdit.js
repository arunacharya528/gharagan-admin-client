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
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { DiscountContext } from '../../context/DiscountContext';
import { ModalContext } from '../../context/ModalContext';


export const InventoryEdit = () => {

    const [inventories, setinventories] = useState([]);

    const [type, setType] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [discountId, setDiscountId] = useState(null);

    const location = useLocation();

    const { discounts,getActiveDiscounts } = useContext(DiscountContext)

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
        setDiscountId(0);
    }
    const handleSubmission = () => {
        postInventory({
            type: type,
            product_id: location.pathname.split('/')[3],
            discount_id: discountId,
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


    const { setModalData, openModal, closeModal } = useContext(ModalContext)

    const handleEdit = (inventory) => {
        openModal();

        const afterUpdate = () => {
            closeModal();
            setRefresh(!isRefreshed);
        }

        setModalData({
            title: "Update Inventory data",
            body: <InventoryUpdate inventory={inventory} discounts={discounts} submitted={afterUpdate} />
        });
    }

    const handleDeletion = (id) => {
        const confirmDeletion = () => {
            toast.promise(deleteInventory(id)
                .then(response => { setRefresh(!isRefreshed); closeModal() }),
                {
                    loading: "Deleting",
                    success: "Deleted inventory item",
                    error: "Error deleting inventory item"
                })
        }
        setModalData({
            title: "Are you sure you want to delete this inventory?",
            body: <div>
                <p>The inventory instance would be permanently deleted</p>
                <Button onClick={confirmDeletion}>Confirm Delete</Button>
            </div>
        })
        openModal()
    }

    return (

        <>
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
                                            <>
                                                {inventory.discount.name + " " + inventory.discount.discount_percent + "%"}
                                                <Badge type={inventory.discount.active === 1 ? 'success' : 'danger'}>{inventory.discount.active === 1 ? 'active' : 'inactive'}</Badge>
                                            </>

                                            : "None"}

                                    </td>
                                    <td>{
                                        discounts.length !== 0 ?
                                            getDiscountedPrice(inventory.price, inventory.discount ? inventory.discount.id : null, discounts)
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
                            <Select className="mt-1" value={discountId} onChange={e => setDiscountId(e.target.value === "None" ? null : e.target.value)}>
                                <option>None</option>
                                {getActiveDiscounts().map((discount, index) =>
                                    <option value={discount.id} key={index}>{discount.name} - {discount.discount_percent}%</option>
                                )}
                            </Select>
                        </th>
                        <th className='w-32'>

                            {getDiscountedPrice(price, discountId, discounts)}

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