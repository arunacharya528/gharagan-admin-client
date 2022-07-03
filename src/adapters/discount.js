const apiURL = process.env.REACT_APP_API_URL;

const axios = require('axios');
const qs = require('qs');

export const getDiscounts = (token) => {

    let config = {
        method: 'get',
        url: `${apiURL}/discount`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        maxRedirects: 0
    };

    return axios(config)
}

export const postDiscount = (token,data) => {
    data = qs.stringify(data);
    let config = {
        method: 'post',
        url: `${apiURL}/discount`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization": `Bearer ${token}`
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}

export const putDiscount = (token,data, id) => {

    data = qs.stringify(data);
    let config = {
        method: 'put',
        url: `${apiURL}/discount/${id}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization": `Bearer ${token}`
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}

export const deleteDiscount = (token,id) => { 
    let config = {
        method: 'delete',
        url: `${apiURL}/discount/${id}`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        maxRedirects: 0
    };

    return axios(config)
}