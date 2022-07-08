const apiURL = process.env.REACT_APP_API_URL;
const webURL = process.env.REACT_APP_WEB_URL;
const qs = require('qs');
const axios = require('axios');


export const getOrders = (token) => {

    let config = {
        method: 'get',
        url: `${apiURL}/orderDetail`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        maxRedirects: 0
    };

    return axios(config)
}

export const updateOrder = (token, data, id) => {
    data = qs.stringify(data);
    let config = {
        method: 'put',
        url: `${apiURL}/orderDetail/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}

export const cancelOrder = (token, id) => {

    let config = {
        method: 'delete',
        url: `${apiURL}/orderDetail/${id}/cancel`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0
    };

    return axios(config)
}

export const deleteOrder = (token, id) => {
    let config = {
        method: 'delete',
        url: `${apiURL}/orderDetail/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0
    };

    return axios(config)
}


export const getInvoice = (token, id) => {
    return fetch(`${webURL}/view/invoice/${id}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}