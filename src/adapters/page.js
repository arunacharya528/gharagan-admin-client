const axios = require('axios');
const apiURL = process.env.REACT_APP_API_URL;
const qs = require('qs');

export const getPages = (token) => {
    let config = {
        method: 'get',
        url: `${apiURL}/page`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0
    };

    return axios(config)
}


export const getPage = (token, id) => {
    let config = {
        method: 'get',
        url: `${apiURL}/page/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0
    };

    return axios(config)
}

export const postPage = (token, data) => {
    data = qs.stringify(data);
    let config = {
        method: 'post',
        url: `${apiURL}/page`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}


export const putPage = (token, data, id) => {

    data = qs.stringify(data);
    let config = {
        method: 'put',
        url: `${apiURL}/page/${id}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}


export const deletePage = (token, id) => {
    let config = {
        method: 'delete',
        url: `${apiURL}/page/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0
    };

    return axios(config)
}
