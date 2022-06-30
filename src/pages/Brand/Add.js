import {
    Button,
} from '@windmill/react-ui'

import { Card, CardBody } from '@windmill/react-ui'

import React, { useContext, useState } from 'react';
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'

import PageTitle from '../../components/Typography/PageTitle'
import { CrossIcon, PlusIcon } from '../../icons';
import { FileSelect } from '../File/Select';
import { postBrand } from '../../adapters/brand';
import { FileContext } from '../../context/FileContext';
import { ImageThumbnail } from '../File/ImageThumbnail';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from '../../context/UserContext';


const Add = () => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState(null);
    const [fileId, setFileId] = useState(null);
    const { files } = useContext(FileContext);

    const [isSelectorDisplayed, setSelectorTodisplay] = useState(false);
    const history = useHistory();
    const { user } = useContext(UserContext)

    const handleBrandSubmission = (e) => {
        var data = { name: name }
        data = fileId ? { ...data, ...{ file_id: fileId } } : {
            ...data, ...{ image_url: url }
        }

        toast.promise(
            postBrand(user.data.token,data)
                .then(response => { history.push("/app/brand") })
            ,
            {
                loading: "Saving Brand",
                success: "Brand saved",
                error: "Error saving brand"
            }
        )
    }

    return (
        <>
            <PageTitle>
                Add Brand
            </PageTitle>
            <Card className="mb-8 shadow-md">
                <CardBody>
                    <div className="mb-4 font-semibold text-gray-600 dark:text-gray-300 flex justify-between">
                        <span>General Info</span>

                    </div>
                    <div className="text-gray-600 dark:text-gray-400">

                        <Label>
                            <span>Name</span>
                            <Input className="mt-1" placeholder="Enter brand name" onChange={e => setName(e.target.value)} value={name} />
                        </Label>

                        {
                            url ?
                                <div>
                                    <span className="mb-3">Preview</span>
                                    <img src={url} className="h-64 rounded" />
                                </div>
                                : ''
                        }

                        <Label className="w-full mt-4 flex">
                            {/* <span>Image URL</span> */}
                            <Input className="" placeholder="Enter URL of an image" value={url} onChange={e => setUrl(e.target.value)} />
                        </Label>

                        <Label className="mt-4">
                            <span>File would be prioritized over image URL if both are provided</span>
                        </Label>

                        {
                            fileId ?
                                <div className="grid grid-cols-4 gap-5 mt-4">

                                    {files.filter((file) => file.id === fileId).map((file, index) =>
                                        <ImageThumbnail
                                            file={file}

                                            removalAction={{
                                                action: () => { setFileId(null) },
                                                icon: <CrossIcon className='w-8 h-8 p-2' />
                                            }}

                                            viewAction={() => { }}
                                            key={index}
                                        />
                                    )}
                                </div>
                                : ''
                        }



                        <Button className={"mt-4"} onClick={e => setSelectorTodisplay(!isSelectorDisplayed)}>
                            {isSelectorDisplayed ? 'Close Selection Mode' : 'Select Image from Database'}
                        </Button>

                        {
                            isSelectorDisplayed ?
                                <div className='mt-4'>
                                    <FileSelect selectedIds={ids => setFileId(ids[0])} />
                                </div>
                                : ''
                        }
                        <div>
                            <Button className="mt-4" onClick={handleBrandSubmission}>
                                Create
                            </Button>
                        </div>

                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default Add;