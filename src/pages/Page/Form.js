import React from "react";
import { Label, Input } from '@windmill/react-ui'
import { RichTextEditor } from "../../components/Editor";

export const PageForm = (props = {
    title: { value: String, setValue: Function },
    content: { value: String, setValue: Function }
}) => {


    return (
        <>
            <Label>
                <span>Title</span>
                <Input className="mt-1" placeholder="Jane Doe" value={props.title.value} onChange={e => props.title.setValue(e.target.value)} />
            </Label>

            <div className="mt-4">
                <span className="text-sm">Content</span>
                <RichTextEditor text={{ value: props.content.value, setValue: props.content.setValue }} />
            </div>

        </>
    );
}