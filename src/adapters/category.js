const apiURL = process.env.REACT_APP_API_URL;

const axios = require('axios');
const qs = require('qs');

export const getCategories = () => {
    let config = {
        method: 'get',
        url: `${apiURL}/productCategory`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}


export const getCategory = (id) => {
    let config = {
        method: 'get',
        url: `${apiURL}/productCategory/${id}`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}

export const postCategory = (data) => { 
    data = qs.stringify(data);
    let config = {
        method: 'post',
        url: `${apiURL}/productCategory`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config);
}


export const putCategory = (data, id) => {
    data = qs.stringify(data);
    let config = {
        method: 'put',
        url: `${apiURL}/productCategory/${id}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}