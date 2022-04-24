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