import { Input, HelperText, Label, Textarea } from '@windmill/react-ui'
import React from 'react';
import { useContext } from 'react';
import { PageContext } from '../../context/PageContext';
import Select from 'react-select'

export const PageLinkForm = (props = {
    name: { value: String, setValue: Function },
    location: { value: String, setValue: Function },
    url_slug: { value: String, setValue: Function },
}) => {



    const locations = ['head', 'left-foot', 'middle-foot', 'right-foot'].map((location) => {
        return {
            value: location,
            label: location
        }
    })

    var { pages } = useContext(PageContext);

    pages = pages.map((page) => {
        return {
            value: page.slug,
            label: page.title
        }
    })


    return (
        <div>
            <Label>
                <span>Name</span>
                <Input className="mt-1" value={props.name.value} onChange={e => props.name.setValue(e.target.value)} placeholder="Name of given url" />
            </Label>

            <Label className="mt-4">
                <span>Location</span>
                <Select options={locations} defaultValue={props.location.value} onChange={e => props.location.setValue(e.value)} className="mt-1" />
            </Label>

            <Label className="mt-4">
                <span>Page</span>
                <Select options={pages} defaultValue={props.url_slug.value} onChange={e => props.url_slug.setValue(e.value)} className="mt-1" />
            </Label>
        </div>
    );
}