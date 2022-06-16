import React, { useState } from "react";
import { Input, HelperText, Label, Select, Textarea, Button } from '@windmill/react-ui'
import { CrossIcon } from "../../icons";
import { postFile } from "../../adapters/file";
import toast from "react-hot-toast";

export const Add = ({ afterSubmission }) => {

    const [uploadingData, setUploadingData] = useState([]);

    const handleFileUpload = (e) => {

        var dataCollection = [];
        for (var key of Object.keys(e.target.files)) {
            const file = e.target.files[key];
            const data = { name: file.name, file: file };
            dataCollection.push(data);
        }
        setUploadingData([...uploadingData, ...dataCollection])
    }

    const handleEdit = (value, index) => {
        const firstPart = uploadingData.slice(0, index);
        var middlePart = uploadingData[index]
        middlePart.name = value;
        const lastPart = uploadingData.slice(index + 1, uploadingData.length);

        setUploadingData([...firstPart, ...[middlePart], ...lastPart]);
    }

    const handleRemoval = (index) => {
        setUploadingData(uploadingData.filter((item, i) => i !== index))
    }

    const handleUpload = () => {
        uploadingData.map((data, index) => {
            toast.promise(
                postFile({
                    file: data.file,
                    name: data.name
                })
                    .then(response => {
                        if (uploadingData.length - 1 === index) {
                            afterSubmission();
                        }
                    })
                , {
                    loading: "Uploading file",
                    success: "Uploaded file",
                    error: "Error uploading file"
                }
            )
        })
    }

    return (
        <div>
            {uploadingData.map((item, index) =>
                <div className="grid grid-cols-5 gap-5 w-100 mt-4" key={index}>
                    <Label className="flex items-center col-span-3">
                        <Input className="" placeholder="Enter file name" value={item.name} onChange={e => handleEdit(e.target.value, index)} />
                    </Label>

                    <img src={URL.createObjectURL(item.file)} className="rounded" />

                    <div className="flex items-center">
                        <Button icon={CrossIcon} layout="link" aria-label="Remove" onClick={e => handleRemoval(index)} />
                    </div>
                </div>
            )}

            <input type="file" className="mt-4" multiple onChange={handleFileUpload} />
            <br />
            <Button className="mt-4" onClick={handleUpload}>Upload Selected Data</Button>
        </div>
    );
}