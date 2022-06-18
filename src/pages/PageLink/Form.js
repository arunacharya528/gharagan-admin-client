import { Input, HelperText, Label, Textarea, Select } from '@windmill/react-ui'
import React from 'react';
import { useContext } from 'react';
import { PageContext } from '../../context/PageContext';
// import Select from 'react-select'?

export const PageLinkForm = (props = {
    name: { value: String, setValue: Function },
    location: { value: String, setValue: Function },
    url_slug: { value: String, setValue: Function },
}) => {



    const locations = ['head', 'left-foot', 'middle-foot', 'right-foot'];

    const { pages } = useContext(PageContext);
    return (
        <div>
            <Label>
                <span>Name</span>
                <Input className="mt-1" value={props.name.value} onChange={e => props.name.setValue(e.target.value)} placeholder="Name of given url" />
            </Label>

            <Label className="mt-4">
                <span>Location</span>
                <Select className="mt-1" value={props.location.value} onChange={e => props.location.setValue(e.target.value)}>
                    <option hidden selected>--- Select option ---</option>
                    {locations.map((location, index) =>
                        <option key={index} value={location}>{location}</option>
                    )}
                </Select>
            </Label>

            <Label className="mt-4">
                <span>Page</span>
                <Select className="mt-1" value={props.url_slug.value} onChange={e => props.url_slug.setValue(e.target.value)}>
                    <option hidden selected>--- Select option ---</option>
                    {pages.map((page, index) =>
                        <option key={index} value={page.slug}>{page.title}</option>
                    )}
                </Select>
                
            </Label>
        </div>
    );
}