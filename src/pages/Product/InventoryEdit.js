import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import React from 'react';

export const InventoryEdit = () => { 


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
                        <Input className="mt-1" placeholder="Jane Doe" />
                    </th>
                    <th>
                        <Input className="mt-1" placeholder="Jane Doe" />
                    </th>
                    <th>
                        <Input className="mt-1" placeholder="Jane Doe" />
                    </th>
                    <th>
                        123
                    </th>
                    <th>
                        <Select className="mt-1">
                            <option value={'active'}>Active</option>
                            <option value={'inactive'}>Inactive</option>
                        </Select>
                    </th>
                    <th>
                        <button>Save</button>
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