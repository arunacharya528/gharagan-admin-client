import React from "react";
import { FileIcon } from "../../icons";
import { isImgLink } from "../../utils/helper/checkImageLink";

export const ImageThumbnail = ({ file, viewAction, removalAction }) => {

    const getTitle = () => {
        return file.number_of_advertisements || file.number_of_brands || file.number_of_product_images ?
            `P (${file.number_of_product_images}) | B(${file.number_of_brands}) | A(${file.number_of_advertisements})`
            : ''
    }
    return (
        <div
            className="relative overflow-auto"
            title={getTitle()}
        >
            <div onClick={e => viewAction()} >
                {
                    isImgLink(process.env.REACT_APP_FILE_PATH + "/" + file.path) ?
                        <img src={process.env.REACT_APP_FILE_PATH + "/" + file.path} alt={file.name + "image"} className="rounded-t" />
                        :
                        <span className="flex items-center  dark:text-white text-gray-700 justify-center">
                            <FileIcon className="w-16 m-5 p-2" />
                        </span>
                }
            </div>


            <div className="absolute top-0 right-0 p-2 bg-black text-white rounded" onClick={removalAction.action}>
                {removalAction.icon}
            </div>
            <div className="bg-gray-700 text-white text-center rounded-b" title={file.name}>
                <span className="p-1 block truncate">{file.name}</span>
            </div>

        </div>
    );
}