import React from "react";
import { Label, Input } from '@windmill/react-ui'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
                <CKEditor
                    editor={ClassicEditor}
                    data={props.content.value}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        props.content.setValue(data);
                    }}
                />
            </div>

        </>
    );
}