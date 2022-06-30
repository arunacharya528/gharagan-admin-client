const apiURL = process.env.REACT_APP_API_URL;

const axios = require('axios');
const qs = require('qs');

export const getCategories = () => {
    let config = {
        method: 'get',
        url: `${apiURL}/allCategory`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}


export const getCategory = (token, id) => {
    let config = {
        method: 'get',
        url: `${apiURL}/productCategory/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0
    };

    return axios(config)
}

export const postCategory = (token, data) => {
    data = qs.stringify(data);
    let config = {
        method: 'post',
        url: `${apiURL}/productCategory`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config);
}


export const putCategory = (token, data, id) => {
    data = qs.stringify(data);
    let config = {
        method: 'put',
        url: `${apiURL}/productCategory/${id}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}

export const deleteCategory = (token, id) => {
    let config = {
        method: 'delete',
        url: `${apiURL}/productCategory/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0
    };

    return axios(config)
}
