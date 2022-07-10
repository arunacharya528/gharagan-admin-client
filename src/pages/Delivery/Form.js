import React from "react";
import { Card, CardBody, Label, Input } from '@windmill/react-ui'
export const DeliveryForm = (props = {
    region: { value: String, setValue: Function },
    price: { value: String, setValue: Function }
}) => {

    return (
        <>
            <Label>
                <span>Region</span>
                <Input className="mt-1" placeholder="Enter region eg:KTM" value={props.region.value} onChange={e=>props.region.setValue(e.target.value) } />
            </Label>
            <Label className="mt-4">
                <span>Price</span>
                <Input type="number" className="mt-1" value={props.price.value} onChange={e => props.price.setValue(e.target.value)} />
            </Label>
        </>
    );
}