const axios = require('axios');
const apiURL = process.env.REACT_APP_API_URL;
const qs = require('qs');


export const getUsers = (token) => {
    let config = {
        method: 'get',
        url: `${apiURL}/user`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0
    };

    return axios(config)
}

export const getUser = (token, id) => {
    let config = {
        method: 'get',
        url: `${apiURL}/user/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0
    };

    return axios(config)
}

export const postUser = (token, data) => {
    data = qs.stringify(data);
    let config = {
        method: 'post',
        url: `${apiURL}/user`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}

export const deleteUser = (token, id) => {
    let config = {
        method: 'delete',
        url: `${apiURL}/user/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0
    };

    return axios(config)
}