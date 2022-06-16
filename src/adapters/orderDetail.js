const apiURL = process.env.REACT_APP_API_URL;
const qs = require('qs');
const axios = require('axios');


export const getOrders = () => {

    let config = {
        method: 'get',
        url: `${apiURL}/orderDetail`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}


export const getOrder = (id) => {
    let config = {
        method: 'get',
        url: `${apiURL}/orderDetail/${id}`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}

export const updateOrder = (bearerToken, data, id) => {
    data = qs.stringify(data);
    let config = {
        method: 'put',
        url: `${apiURL}/orderDetail/${id}`,
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}

export const cancelOrder = (bearerToken, id) => {

    let config = {
        method: 'delete',
        url: `${apiURL}/orderDetail/${id}/cancel`,
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        },
        maxRedirects: 0
    };

    return axios(config)
}

export const deleteOrder = (bearerToken, id) => {
    let config = {
        method: 'delete',
        url: `${apiURL}/orderDetail/${id}`,
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        },
        maxRedirects: 0
    };

    return axios(config)
}
