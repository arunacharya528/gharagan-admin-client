const apiURL = process.env.REACT_APP_API_URL;
const qs = require('qs');
const axios = require('axios');

export const getInventoryByProduct = (product_id) => {
    let config = {
        method: 'get',
        url: `${apiURL}/productInventory?product_id=${product_id}`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config);
}


export const postInventory = (data) => {
    data = qs.stringify(data);
    let config = {
        method: 'post',
        url: `${apiURL}/productInventory`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}

export const putInventory = (id, data) => {
    data = qs.stringify(data);
    let config = {
        method: 'put',
        url: `${apiURL}/productInventory/${id}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}

export const deleteInventory = (id) => {
    let config = {
        method: 'delete',
        url: `${apiURL}/productInventory/${id}`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}