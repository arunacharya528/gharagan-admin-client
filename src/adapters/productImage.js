const apiURL = process.env.REACT_APP_API_URL;

const axios = require('axios');
const qs = require('qs');


export const getProductImages = (token,productId) => {
    let config = {
        method: 'get',
        url: `${apiURL}/productImage?product_id=${productId}`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        maxRedirects: 0
    };

    return axios(config)
}
export const postProductImage = (token,data) => {
    data = qs.stringify(data);
    let config = {
        method: 'post',
        url: `${apiURL}/productImage`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization": `Bearer ${token}`
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)

}

export const deleteProductImage = (token,id) => {
    let config = {
        method: 'delete',
        url: `${apiURL}/productImage/${id}`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        maxRedirects: 0
    };

    return axios(config)
}
