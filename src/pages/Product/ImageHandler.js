import React, { useEffect, useState } from "react"
import { FileSelect } from "../File/Select";
import { Button } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { deleteProductImage, getProductImages, postProductImage } from "../../adapters/productImage";
import { useLocation } from "react-router-dom";
import { CrossIcon } from "../../icons";


export const ImageHandler = () => {

    const [isSelectorDisplayed, setSelectorTodisplay] = useState(false);

    const [url, setUrl] = useState('');
    const location = useLocation();
    const productId = location.pathname.split('/')[3]

    const [images, setImages] = useState([]);

    const [isRefreshed, setRefresh] = useState(false);
    useEffect(() => {
        getProductImages(productId)
            .then(response => { setImages(response.data) })
            .catch(error => console.log(error))
    }, [isRefreshed])


    const handleUrlSubmission = () => {

        postProductImage({
            product_id: productId,
            image_url: url
        })
            .then(response => { setRefresh(!isRefreshed); setUrl(''); })
            .catch(error => console.log(error))

    }


    const handleFileSubmission = (data) => {

        data.map((id) => {
            postProductImage({
                product_id: productId,
                file_id: id
            })
                .then(response => { setRefresh(!isRefreshed) })
                .catch(error => console.log(error))
        })

    }

    const handleImageDeletion = (id) => {
        deleteProductImage(id)
            .then(response => { setRefresh(!isRefreshed) })
            .catch(error => console.log(error))
    }

    return (
        <div>
            <div className="grid gap-5 sm:grid-cols-3 md:grid-cols-5">
                {images.map((image, index) =>
                    <div className="relative" key={index}>
                        <img src={image.file ? process.env.REACT_APP_FILE_PATH + "/" + image.file.path : image.image_url} className="rounded" />
                        <CrossIcon className="absolute bottom-0 right-0 rounded bg-red-800 h-8 w-8 p-2" onClick={e => handleImageDeletion(image.id)} />
                    </div>

                )}
            </div>

            {
                url ?
                    <div>
                        <span className="mb-3">Preview</span>
                        <img src={url} className="h-64 rounded" />
                    </div>
                    : ''
            }
            <div className="flex py-3">
                <Label>
                    <Input className="" placeholder="Enter URL of an image" value={url} onChange={e => setUrl(e.target.value)} />
                </Label>
                <Button className="ml-3" onClick={handleUrlSubmission}>
                    Add Image
                </Button>
            </div>

            <Button className={"mb-5 " + (isSelectorDisplayed ? 'bg-red-700' : '')} onClick={e => setSelectorTodisplay(!isSelectorDisplayed)}>
                {isSelectorDisplayed ? 'Close Selection Mode' : 'Select Image from Database'}
            </Button>

            {isSelectorDisplayed ?
                <FileSelect selectedIds={handleFileSubmission} />
                : ''}
        </div>
    );
}