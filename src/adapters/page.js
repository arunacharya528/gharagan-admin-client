const axios = require('axios');
const apiURL = process.env.REACT_APP_API_URL;
const qs = require('qs');

export const getPages = () => {
    let config = {
        method: 'get',
        url: `${apiURL}/page`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}


export const getPage = (id) => {
    let config = {
        method: 'get',
        url: `${apiURL}/page/${id}`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}

export const postPage = (data) => {
    data = qs.stringify(data);
    let config = {
        method: 'post',
        url: `${apiURL}/page`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}


export const putPage = (data, id) => {

    data = qs.stringify(data);
    let config = {
        method: 'put',
        url: `${apiURL}/page/${id}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}
