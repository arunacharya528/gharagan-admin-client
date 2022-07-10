const apiURL = process.env.REACT_APP_API_URL;

const axios = require('axios');
const qs = require('qs');

export const getDeliveries = (token) => {
    let config = {
        method: 'get',
        url: `${apiURL}/delivery`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0
    };

    return axios(config)
}

export const postDelivery = (token, data) => {
    data = qs.stringify(data)
    let config = {
        method: 'post',
        url: `${apiURL}/delivery`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}

export const putDelivery = (token, data, id) => {
    data = qs.stringify(data)
    let config = {
        method: 'put',
        url: `${apiURL}/delivery/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}


export const deleteDelivery = (token,id) => {
    let config = {
        method: 'delete',
        url: `${apiURL}/delivery/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0,
    };

    return axios(config)
}

