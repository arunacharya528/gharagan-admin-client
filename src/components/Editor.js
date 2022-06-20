import React from "react"
import CKEditor from "react-ckeditor-component";

export const RichTextEditor = (props = { text: { value: String, setValue: Function } }) => {
    return (

        <CKEditor
            activeClass=""
            content={props.text.value}
            events={{
                "change": (e) => { props.text.setValue(e.editor.getData()) }
            }}
        />

    );
}