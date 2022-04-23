export const isImgLink = (url) => {
    if (typeof url !== 'string') return false;
    return (url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp|svg)(\?(.*))?$/gmi) != null);
}