const apiURL = process.env.REACT_APP_API_URL;

const axios = require('axios');
const qs = require('qs');


export const getProductImages = (productId) => {
    let config = {
        method: 'get',
        url: `${apiURL}/productImage?product_id=${productId}`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}
export const postProductImage = (data) => {
    data = qs.stringify(data);
    let config = {
        method: 'post',
        url: `${apiURL}/productImage`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)

}

export const deleteProductImage = (id) => {
    let config = {
        method: 'delete',
        url: `${apiURL}/productImage/${id}`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}
