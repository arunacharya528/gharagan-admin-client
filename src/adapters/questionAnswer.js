const apiURL = process.env.REACT_APP_API_URL;
const axios = require('axios');
const qs = require('qs');

export const getQAs = (token) => {

    let config = {
        method: 'get',
        url: `${apiURL}/questionAnswer`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        maxRedirects: 0
    };

    return axios(config)
}

export const updateQA = (token, data, id) => {
    data = qs.stringify(data);
    let config = {
        method: 'put',
        url: `${apiURL}/questionAnswer/${id}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization": `Bearer ${token}`
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}

export const deleteQA = (token, id) => {

    let config = {
        method: 'delete',
        url: `${apiURL}/questionAnswer/${id}`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        maxRedirects: 0
    };

    return axios(config)
}