import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import React, { useState } from 'react';
import { CheckIcon } from '../../icons';
import { Button } from '@windmill/react-ui'

export const InventoryEdit = () => {

    const [inventories, setinventories] = useState([]);

    const [type, setType] = useState('');
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(1);
    const [status, setStatus] = useState(true);

    const discountList = [
        { id: 1, name: "Discount 1", discount_percentage: 5 },
        { id: 2, name: "Discount 2", discount_percentage: 10 },
        { id: 3, name: "Discount 3", discount_percentage: 15 }
    ];

    const getDiscountedPrice = (discountId) => {
        return (price - (0.01 * discountList.find((element) => element.id === discount).discount_percentage * price))
    }

    const handleSubmission = () => {
        console.log({ type, price, discount, status })
    }

    return (
        <table className='table-auto w-full text-gray-600 dark:text-gray-400 '>
            <tbody>
                <tr className='text-left text-gray-600 dark:text-gray-300'>
                    <th className='py-2'>Type</th>
                    <th className='py-2'>Price</th>
                    <th className='py-2'>Discount %</th>
                    <th className='py-2'>Amount</th>
                    <th className='py-2'>Status</th>
                </tr>
                <tr>
                    <th>
                        <Input className="mt-1" placeholder="Eg: Red, XL, L, etc" value={type} onChange={e => setType(e.target.value)} />
                    </th>
                    <th>
                        <Input className="mt-1" placeholder="Offering price" value={price} onChange={e => setPrice(e.target.value)} />
                    </th>
                    <th>
                        <Select className="mt-1" value={discount} onChange={e => setDiscount(parseInt(e.target.value))}>
                            {discountList.map((discount, index) =>
                                <option value={discount.id} key={index}>{discount.name} - {discount.discount_percentage}%</option>
                            )}
                        </Select>
                    </th>
                    <th>
                        {getDiscountedPrice(discount)}
                    </th>
                    <th>
                        <Select className="mt-1" value={status} onChange={e => setStatus(e.target.value)}>
                            <option value={true}>Active</option>
                            <option value={false}>Inactive</option>
                        </Select>
                    </th>
                    <th>
                        <div>
                            <Button icon={CheckIcon} layout="link" aria-label="Like" onClick={handleSubmission} />
                        </div>
                    </th>
                </tr>

                {/* {data.inventories.map((inventory, index) =>
                                <tr key={index}>
                                    <td>{inventory.type}</td>
                                    <td>{inventory.price}</td>
                                    <td>{inventory.discount.discount_percent}%</td>
                                    <td>{getDiscountedPrice(inventory.price, inventory.discount.discount_percent)}</td>
                                    <td>{getStatusBadge(inventory.discount.active)}</td>
                                </tr>
                            )} */}
            </tbody>
        </table>
    );
}