const apiURL = process.env.REACT_APP_API_URL;
const axios = require('axios');
const qs = require('qs');

export const getBrands = () => {
    let config = {
        method: 'get',
        url: `${apiURL}/brand`,
        headers: {},
        maxRedirects: 0
    };
    return axios(config)
}

export const getBrand = (id) => {
    let config = {
        method: 'get',
        url: `${apiURL}/brand/${id}`,
        headers: {},
        maxRedirects: 0
    };
    return axios(config)
}

export const postBrand = (data) => {
    data = qs.stringify(data);
    let config = {
        method: 'post',
        url: `${apiURL}/brand`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}

export const putBrand = (data,id) => {
    data = qs.stringify(data);
    let config = {
        method: 'put',
        url: `${apiURL}/brand/${id}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}

export const deleteBrand = (id) => {

    let config = {
        method: 'delete',
        url: `${apiURL}/brand/${id}`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}