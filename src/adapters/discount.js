const apiURL = process.env.REACT_APP_API_URL;

const axios = require('axios');
const qs = require('qs');

export const getDiscounts = () => {

    let config = {
        method: 'get',
        url: `${apiURL}/discount`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}

export const postDiscount = (data) => {
    data = qs.stringify(data);
    let config = {
        method: 'post',
        url: `${apiURL}/discount`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}

export const putDiscount = (data, id) => {

    data = qs.stringify(data);
    let config = {
        method: 'put',
        url: `${apiURL}/discount/${id}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}

export const deleteDiscount = (id) => { 
    let config = {
        method: 'delete',
        url: `${apiURL}/discount/${id}`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}