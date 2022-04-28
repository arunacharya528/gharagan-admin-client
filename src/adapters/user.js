const axios = require('axios');
const apiURL = process.env.REACT_APP_API_URL;
const qs = require('qs');


export const getUsers = () => {
    let config = {
        method: 'get',
        url: `${apiURL}/user`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}

export const postUser = (data) => {
    data = qs.stringify(data);
    let config = {
        method: 'post',
        url: `${apiURL}/user`,
        headers: {},
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}

export const deleteUser = (id) => {
    let config = {
        method: 'delete',
        url: `${apiURL}/user/${id}`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}