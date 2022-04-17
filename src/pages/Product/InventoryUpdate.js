import React, { useEffect, useState } from "react";
import { Input, HelperText, Label, Select, Textarea, Badge, Button } from '@windmill/react-ui'
import { getDiscountedPrice } from "../../utils/helper/discount";
import { putInventory } from "../../adapters/inventory";


export const InventoryUpdate = ({ inventory, discounts, submitted }) => {

    const [type, setType] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [discount, setDiscount] = useState(null);

    useEffect(() => {
        setType(inventory.type)
        setPrice(inventory.price)
        setQuantity(inventory.quantity)
        setDiscount(inventory.discount.id)
    }, [])

    const handleSubmission = () => {
        putInventory(inventory.id, {
            type: type,
            price: price,
            quantity: quantity,
            discount_id: discount
        }).then(reponse => {
            submitted()
        })
            .catch(error => console.log(error))
    }

    return (
        <div>

            <Label className="mt-4">
                <span>Type</span>
                <Input className="mt-1" placeholder="Eg: Red, XL, L, etc" value={type} onChange={e => setType(e.target.value)} />
            </Label>

            <Label className="mt-4">
                <span>Price</span>
                <Input className="mt-1" type="number" placeholder="Offering price" value={price} onChange={e => setPrice(e.target.value)} />
            </Label>

            <Label className="mt-4">
                <span>Quantity</span>
                <Input className="mt-1" type="number" placeholder="Available Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
            </Label>

            <Label className="mt-4">
                <span>Discount</span>
                <Select className="mt-1" value={discount} onChange={e => setDiscount(e.target.value === "None" ? null : e.target.value)}>
                    <option>None</option>
                    {discounts.map((discount, index) =>
                        <option value={discount.id} key={index}>{discount.name} - {discount.discount_percent}%</option>
                    )}
                </Select>
            </Label>

            <Label className="mt-4">
                <span>Price after calulation: </span>
                <span className="font-bold">{getDiscountedPrice(price, discount, discounts)}</span>
            </Label>

            <Button className="mt-4" onClick={handleSubmission} >Update</Button>

        </div>
    );
}