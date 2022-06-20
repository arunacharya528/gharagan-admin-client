import React from "react";
import toast from "react-hot-toast";
import { CopyIcon, FileIcon } from "../../icons";
import { isImgLink } from "../../utils/helper/checkImageLink";
import { copyToClipboard } from "../../utils/helper/copyToClipboard";

export const ImageThumbnail = ({ file, viewAction, removalAction }) => {

    const getTitle = () => {
        return `P (${file.product_images_count}) | B(${file.brands_count}) | A(${file.advertisements_count})`
    }
    return (
        <div
            className="relative overflow-auto"
            title={getTitle()}
        >
            <div onClick={e => viewAction()} >
                {
                    isImgLink(process.env.REACT_APP_FILE_PATH + "/" + file.path) ?
                        <img src={process.env.REACT_APP_FILE_PATH + "/" + file.path} alt={file.name + "image"} className="rounded-t object-contain h-auto w-full" />
                        :
                        <span className="flex items-center  dark:text-white text-gray-700 justify-center">
                            <FileIcon className="w-16 m-5 p-2" />
                        </span>
                }
            </div>


            <div className="absolute top-0 right-0 p-2 bg-black text-white rounded cursor-pointer" onClick={removalAction.action}>
                {removalAction.icon}
            </div>
            <div className="absolute top-0 left-0 p-2 bg-blue-500 text-white rounded cursor-pointer" onClick={e => { copyToClipboard(process.env.REACT_APP_FILE_PATH + "/" + file.path); toast.success("Copied image URL to clipboard") }}>
                <CopyIcon className="w-5 h-5"/>
            </div>
            <div className="bg-gray-700 text-white text-center rounded-b" title={file.name}>
                <span className="p-1 block truncate">{file.name}</span>
            </div>

        </div>
    );
}