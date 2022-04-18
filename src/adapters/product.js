const apiURL = process.env.REACT_APP_API_URL;

const axios = require('axios');
const qs = require('qs');

export const getProducts = () => {
    let config = {
        method: 'get',
        url: `${apiURL}/product`,
        headers: {},
        maxRedirects: 0
    };
    return axios(config)
}


export const getProduct = (id) => {
    let config = {
        method: 'get',
        url: `${apiURL}/product/${id}`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config);
}

export const postProduct = (data) => {
    data = qs.stringify(data);
    let config = {
        method: 'post',
        url: `${apiURL}/product`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}

export const putProduct = (productData, id) => {

    let data = qs.stringify(productData);
    let config = {
        method: 'put',
        url: `${apiURL}/product/${id}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config);
}