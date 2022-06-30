const apiURL = process.env.REACT_APP_API_URL;
const axios = require('axios');
const qs = require('qs');

export const getBrands = () => {
    let config = {
        method: 'get',
        url: `${apiURL}/allBrand`,
        headers: {},
        maxRedirects: 0
    };
    return axios(config)
}

export const getBrand = (id) => {
    let config = {
        method: 'get',
        url: `${apiURL}/oneBrand/${id}`,
        headers: {},
        maxRedirects: 0
    };
    return axios(config)
}

export const postBrand = (token, data) => {
    data = qs.stringify(data);
    let config = {
        method: 'post',
        url: `${apiURL}/brand`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}

export const putBrand = (token, data, id) => {
    data = qs.stringify(data);
    let config = {
        method: 'put',
        url: `${apiURL}/brand/${id}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}

export const deleteBrand = (token, id) => {

    let config = {
        method: 'delete',
        url: `${apiURL}/brand/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0
    };

    return axios(config)
}