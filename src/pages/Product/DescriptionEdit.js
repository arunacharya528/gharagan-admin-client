import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Input, HelperText, Label, Select, Textarea, Button } from '@windmill/react-ui'

import "./default.scss";
import { CheckIcon, CrossIcon } from "../../icons";
import { getProduct, putProduct } from "../../adapters/product";
import { useLocation } from "react-router-dom";
export const DescriptionEdit = () => {


    const [description, setDescription] = useState('');
    const sample =
        `# Heading
## Sub-Heading
___
1. Hello There
2. Hi There
2. This is a list
2. This is an ordered list
___
- This is an unordered list
- This is another point of unordered list
___
|This|Is|Table|Header|
|--|--|--|--|
|This |is|another|line of table body|
|This |is|another|line of table body|
|This |is|another|line of table body|
___
[Here is link to the cheatsheet ctrl+click to open in new tab](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
___
Here is example to include a youtube video
[![Youtube video](http://img.youtube.com/vi/IkDAb4hlof0/0.jpg)](http://www.youtube.com/watch?v=IkDAb4hlof0)
___
Embedding an image
![Image](https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png)
    `;

    const [isExampleHidden, hideExample] = useState(true);
    const Preview = (text) => {
        return (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
        );
    };

    const location = useLocation();

    const [toggleCancel, setToggleCancel] = useState(false);
    useEffect(() => {
        getProduct(location.pathname.split('/')[3])
            .then(response => {
                setDescription(response.data.description)
            })
            .catch(error => console.log(error))
    }, [toggleCancel])


    const handleSubmission = () => {
        putProduct({ description: description })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <>
            {isExampleHidden ? '' :
                <div className="grid gap-6 md:grid-cols-2">

                    <Label className="">
                        <span>Example</span>
                        <Textarea className="mt-1" rows="30" placeholder="Enter some long form content." value={sample} />
                    </Label>

                    <Label className="">
                        <span>Preview</span>
                        <div className="unrest">
                            {Preview(sample)}
                        </div>
                    </Label>
                </div>

            }

            <Button className="mb-3" onClick={e => hideExample(!isExampleHidden)}>{isExampleHidden ? "Display" : "Hide"}  Example</Button>
            <div className="grid gap-6 md:grid-cols-2">

                <Label className="">
                    <span>Description</span>
                    <Textarea className="mt-1" rows="15" placeholder="Enter some long form content." value={description} onChange={e => setDescription(e.target.value)} />
                </Label>

                <Label className="">
                    <span>Preview</span>
                    <div className="unrest">
                        {Preview(description)}
                    </div>
                </Label>
            </div>

            <div className="flex justify-between">
                <div className="mt-4">
                    <Button icon={CheckIcon} layout="link" aria-label="Save" onClick={handleSubmission} />
                </div>
                <div className="mt-4">
                    <Button icon={CrossIcon} layout="link" aria-label="Cancel"
                        onClick={e => setToggleCancel(!toggleCancel)} />
                </div>
            </div>

        </>
    );
}